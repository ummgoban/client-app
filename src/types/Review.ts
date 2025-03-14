export type MarketReviewInfo = {
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
  };
};

export type CustomerReviewInfo = {
  id: number;
  marketId: number;
  marketName: number;
  content: string;
  rating: number;
  products: string[];
  createdAt: string;
  imageUrls: string[];
  reviewReplies: {
    reviewReplyId: number;
    createAt: string;
    content: string;
  };
};
