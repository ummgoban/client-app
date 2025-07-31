import {useRef, useState, useCallback} from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  LayoutChangeEvent,
} from 'react-native';

export const useScroll = () => {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const tagScrollViewRef = useRef<ScrollView>(null);
  const [sectionOffsets, setSectionOffsets] = useState<{[key: string]: number}>(
    {},
  );

  const [tagWidths, setTagWidths] = useState<{[key: string]: number}>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const yOffset = event.nativeEvent.contentOffset.y;
      let closestSection = '';
      let minDistance = Number.MAX_VALUE;

      // 현재 스크롤 위치에 가장 가까운 섹션 찾기
      Object.entries(sectionOffsets).forEach(([tag, offset]) => {
        const distance = Math.abs(yOffset - offset);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = tag;
        }
      });

      if (closestSection && closestSection !== selectedTag) {
        setSelectedTag(closestSection);

        // 태그 스크롤뷰 위치 조정
        if (tagScrollViewRef.current && tagWidths[closestSection]) {
          const tagOffset = Object.keys(tagWidths)
            .slice(0, Object.keys(tagWidths).indexOf(closestSection))
            .reduce((acc, tag) => acc + (tagWidths[tag] || 0), 0);

          tagScrollViewRef.current.scrollTo({
            x: tagOffset,
            animated: true,
          });
        }
      }
    },
    [sectionOffsets, selectedTag, tagWidths],
  );

  const handleTagLayout = useCallback(
    (tag: string) => (event: LayoutChangeEvent) => {
      const {width} = event.nativeEvent.layout;
      setTagWidths(prev => ({...prev, [tag]: width}));
    },
    [],
  );

  const handleLayout = useCallback(
    (tag: string) => (event: LayoutChangeEvent) => {
      const {y} = event.nativeEvent.layout;
      setSectionOffsets(prev => ({...prev, [tag]: y}));
    },
    [],
  );

  const handleTagPress = useCallback(
    (tag: string) => {
      setSelectedTag(tag);
      if (scrollViewRef.current && sectionOffsets[tag] !== undefined) {
        scrollViewRef.current.scrollTo({
          y: sectionOffsets[tag],
          animated: true,
        });
      }
    },
    [sectionOffsets],
  );

  const updateSectionOffsets = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {}, 100);
  }, []);

  return {
    selectedTag,
    scrollViewRef,
    tagScrollViewRef,
    handleScroll,
    handleTagLayout,
    handleLayout,
    handleTagPress,
    updateSectionOffsets,
  };
};
