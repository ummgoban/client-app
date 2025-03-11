export type ReviewInfo = {
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
