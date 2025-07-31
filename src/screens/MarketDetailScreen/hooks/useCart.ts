import {useState} from 'react';
import {useValidateBucket, useAddToBucket} from '@/apis/buckets';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import {ProductType} from '@ummgoban/shared/lib';
import {BucketProductType} from '@/types/Bucket';

export type CartItem = {
  productId: number;
  productName: string;
  count: number;
};

export const useCart = (products: ProductType[]) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartPending, setIsCartPending] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {mutateAsync: validateBucket} = useValidateBucket();
  const {mutateAsync: addToBucket} = useAddToBucket();

  const handleCountChange = (productId: number, newCount: number) => {
    handleCart(
      productId,
      products.find(product => product.id === productId)?.name || '',
      newCount,
    );
  };

  const handleCart = (
    productId: number,
    productName: string,
    count: number,
  ) => {
    setCart(prevCart => {
      if (count === 0) {
        return prevCart.filter(item => item.productId !== productId);
      }
      const existingItemIndex = prevCart.findIndex(
        item => item.productId === productId,
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {productId, productName, count};
        return updatedCart;
      } else {
        return [...prevCart, {productId, productName, count}];
      }
    });
  };

  const handleCheckout = async (marketId: number, cartItems: CartItem[]) => {
    if (cartItems.length === 0) {
      Alert.alert('장바구니가 비어있습니다.');
      return;
    }

    try {
      setIsCartPending(true);
      const bucketProducts = cartItems.map(item => ({
        productId: item.productId,
        count: item.count,
      }));

      const validationResult = await validateBucket(marketId);

      if (validationResult) {
        navigation.navigate('Checkout', {
          marketId,
          products: bucketProducts,
        });
      } else {
        Alert.alert(
          '기존에 담아두었던 장바구니가 존재합니다.',
          '장바구니에 담으시겠습니까?',
          [
            {
              text: '예',
              onPress: () => {
                handleCheckout(marketId, cartItems);
                setCart([]);
              },
            },
            {
              text: '아니오',
              onPress: () => {
                setCart([]);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      Alert.alert('오류', '장바구니 처리 중 오류가 발생했습니다.');
    } finally {
      setIsCartPending(false);
    }
  };

  const addProductToBucket = async (
    marketId: number,
    addProducts: CartItem[],
  ) => {
    if (addProducts.length === 0) {
      Alert.alert('장바구니가 비어있습니다.');
      return;
    }

    try {
      setIsCartPending(true);

      const bucketProducts: BucketProductType[] = addProducts.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) throw new Error('상품 정보가 존재하지 않습니다.');
        return {
          count: item.count,
          id: product.id,
          name: product.name,
          image: product.image,
          originPrice: product.originPrice,
          discountPrice: product.discountPrice,
          discountRate: product.discountRate,
        };
      });

      const validationResult = await validateBucket(marketId);

      if (validationResult) {
        Alert.alert(
          '장바구니',
          '장바구니에 담으시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
              onPress: () => {
                setIsCartPending(false);
              },
            },
            {
              text: '확인',
              onPress: async () => {
                try {
                  await addToBucket({
                    marketId,
                    products: bucketProducts,
                  });
                  navigation.navigate('Bucket');
                } catch (error) {
                  Alert.alert('오류', '장바구니 처리 중 오류가 발생했습니다.');
                } finally {
                  setIsCartPending(false);
                }
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert('장바구니 오류', '장바구니에 담을 수 없습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '장바구니 처리 중 오류가 발생했습니다.');
    } finally {
      setIsCartPending(false);
    }
  };

  return {
    cart,
    isCartPending,
    handleCountChange,
    handleCart,
    handleCheckout,
    addProductToBucket,
  };
};
