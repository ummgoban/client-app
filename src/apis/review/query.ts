import {useMutation, useInfiniteQuery} from '@tanstack/react-query';
import {
  createReview,
  updateReview,
  uploadReviewImage,
  getReviewListForMarket,
  getReviewListForCustomer,
} from './client';
import {
  CreateReviewRequest,
  ReadMarketReviewRequest,
  UpdateReviewRequest,
  ReadCustomerReviewRequest,
} from './model';

export const useReadReviewListForMarket = (
  marketId: ReadMarketReviewRequest['marketId'],
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

export const useReadReviewListForCustomer = (
  memberId: ReadCustomerReviewRequest['memberId'],
) =>
  useInfiniteQuery({
    queryKey: ['readReviewListForCustomer', memberId],
    queryFn: ({pageParam = 0}) =>
      getReviewListForCustomer({memberId, cursorId: pageParam, size: 5}),
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
    mutationFn: ({
      marketId,
      uploadImage,
    }: {
      marketId: number;
      uploadImage: FormData;
    }) => uploadReviewImage({marketId, uploadImage}),
  });
