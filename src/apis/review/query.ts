import {useMutation, useInfiniteQuery} from '@tanstack/react-query';
import {
  createReview,
  updateReview,
  uploadReviewImage,
  getReviewListForMarket,
} from './client';
import {
  CreateReviewRequest,
  ReadReviewRequest,
  UpdateReviewRequest,
} from './model';

export const useReadReviewListForMarket = (
  marketId: ReadReviewRequest['marketId'],
) =>
  useInfiniteQuery({
    queryKey: ['readReviewListForMarket', marketId],
    queryFn: ({pageParam = 0}) =>
      getReviewListForMarket({marketId, cursorId: pageParam, size: 5}),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.hasNext
        ? lastPage.reviews[lastPage.reviews.length - 1].id
        : undefined,
  });

export const useCreateReviewMutation = (
  orderId: CreateReviewRequest['orderId'],
) =>
  useMutation({
    mutationKey: ['createReview'],
    mutationFn: (body: CreateReviewRequest['body']) =>
      createReview({orderId, body}),
  });

export const useUpdateReviewMutation = (
  reviewId: UpdateReviewRequest['reviewId'],
) =>
  useMutation({
    mutationKey: ['updateReview'],
    mutationFn: (body: UpdateReviewRequest['body']) =>
      updateReview({reviewId, body}),
  });

export const useUploadReviewImageMutation = () =>
  useMutation({
    mutationKey: ['uploadReviewImage'],
    mutationFn: (updateImage: FormData) => uploadReviewImage(updateImage),
  });
