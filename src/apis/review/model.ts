import {CustomerReviewInfo, MarketReviewInfo} from '@/types/Review';

export type ReadMarketReviewRequest = {
  marketId: number;
  cursorId: number;
  size: number;
};

export type ReadCustomerReviewRequest = {
  memberId: number;
  cursorId: number;
  size: number;
};

export type ReadMarketReviewResponse = {
  reviews: MarketReviewInfo[];
  reviewNum: number;
  averageRating: number;
  hasNext: boolean;
};

export type ReadCustomerReviewResponse = {
  reviews: CustomerReviewInfo[];
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
