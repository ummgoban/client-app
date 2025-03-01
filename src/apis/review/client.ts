import apiClient from '../ApiClient';
import {
  CreateReviewRequest,
  UpdateReviewRequest,
  ReadReviewRequest,
  ReadReviewResponse,
} from './model';

const entity = 'customer/review';

export const getReviewListForMarket = async (
  req: ReadReviewRequest,
): Promise<ReadReviewResponse> => {
  try {
    const res = await apiClient.get<{code: number; data: ReadReviewResponse}>(
      `${entity}/market/${req.marketId}`,
      {
        params: {
          cursorId: req.cursorId,
          size: req.size,
        },
      },
    );
    if (res && res.code === 200) {
      return res.data;
    }
    return {
      reviews: [],
      reviewNum: 0,
      averageRating: 0,
      hasNext: false,
    };
  } catch (error) {
    console.error(error);
    return {
      hasNext: false,
      reviews: [],
      reviewNum: 0,
      averageRating: 0,
    };
  }
};

export const createReview = async (
  req: CreateReviewRequest,
): Promise<boolean> => {
  try {
    const res = await apiClient.post<
      {
        code: number;
        message: string;
        data: Object;
      },
      CreateReviewRequest['body']
    >(`${entity}/${req.orderId}`, req.body);
    if (res && res.code === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateReview = async (
  req: UpdateReviewRequest,
): Promise<boolean> => {
  try {
    const res = await apiClient.patch<
      {
        code: number;
        message: string;
        data: Object;
      },
      UpdateReviewRequest['body']
    >(`${entity}/${req.reviewId}`, req.body);
    if (res && res.code === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const uploadReviewImage = async (
  updateImage: FormData,
): Promise<string | null> => {
  try {
    const res = await apiClient.post<{
      code: number;
      message: string;
      data: {
        imageUrl: string;
      };
    }>(`${entity}/images`, updateImage, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary="boundary"',
      },
      transformRequest: data => data,
    });

    if (res && res.code === 200) {
      return res.data.imageUrl;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
