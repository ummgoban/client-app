import {ReviewInfo} from '@/types/Review';

export type ReadReviewRequest = {
  marketId: number;
  cursorId: number;
  size: number;
};

export type ReadReviewResponse = {
  reviews: ReviewInfo[];
  reviewNum: number;
  averageRating: number;
  hasNext: boolean;
};

export type ReviewContent = {
  rating: number;
  imageUrls: string[];
  content: string;
};

export type CreateReviewRequest = {
  orderId: string;
  body: ReviewContent;
};

export type UpdateReviewRequest = {
  reviewId: string;
  body: Partial<ReviewContent>;
};
