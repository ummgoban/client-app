import React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {ProductType} from '@ummgoban/shared/lib';

import Menu from '@/components/marketDetailPage/Menu';
import S from '../MarketDetail.style';

type ProductListProps = {
  sortedProductsByTags: {[key: string]: ProductType[]};
  selectedTag: string;
  cart: Array<{productId: number; productName: string; count: number}>;
  handleCountChange: (productId: number, newCount: number) => void;
  handleTagPress: (tag: string) => void;
  handleTagLayout: (tag: string) => any;
  handleLayout: (tag: string) => any;
  handleScroll: (event: any) => void;
  scrollViewRef: React.RefObject<ScrollView>;
  tagScrollViewRef: React.RefObject<ScrollView>;
  updateSectionOffsets: () => void;
};

const ProductList = ({
  sortedProductsByTags,
  selectedTag,
  cart,
  handleCountChange,
  handleTagPress,
  handleTagLayout,
  handleLayout,
  handleScroll,
  scrollViewRef,
  tagScrollViewRef,
  updateSectionOffsets,
}: ProductListProps) => {
  return (
    <>
      <S.SideTagBarScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={tagScrollViewRef}>
        {Object.keys(sortedProductsByTags).map(tag => (
          <TouchableOpacity
            key={tag}
            onLayout={handleTagLayout(tag)}
            onPress={() => handleTagPress(tag)}>
            <S.SideBarView selected={selectedTag === tag}>
              <S.SideBarText selected={selectedTag === tag}>
                {tag}
              </S.SideBarText>
            </S.SideBarView>
          </TouchableOpacity>
        ))}
      </S.SideTagBarScrollView>

      <S.MenuWrapper>
        <S.MenuScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          onLayout={updateSectionOffsets}
          decelerationRate="fast">
          {Object.entries(sortedProductsByTags).map(([tag, productsByTag]) => (
            <S.MenuView key={tag} onLayout={handleLayout(tag)}>
              <S.TagWrapper>
                <S.MenuText>{tag}</S.MenuText>
              </S.TagWrapper>
              {productsByTag.map(product => (
                <Menu
                  key={product.id}
                  product={product}
                  initCount={
                    cart.find(item => item.productId === product.id)?.count || 0
                  }
                  onCountChange={handleCountChange}
                />
              ))}
            </S.MenuView>
          ))}
        </S.MenuScrollView>
      </S.MenuWrapper>
    </>
  );
};

export default ProductList;
