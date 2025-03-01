export type ReadReviewRequest = {
  marketId: number;
  cursorId: number;
  size: number;
};

export type ReadReviewResponse = {
  reviews: {
    id: number;
    name: string;
    content: string;
    rating: number;
    products: string[];
    createdAt: string;
    imageUrls: string[];
    reviewReplies: {
      reviewReplyId: number;
      createAt: string;
      content: string;
    }[];
  }[];
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
