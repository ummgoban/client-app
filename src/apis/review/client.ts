import {
  CreateReviewRequest,
  UpdateReviewRequest,
  ReadReviewRequest,
  ReadReviewResponse,
} from './model';

import apiClient from '../ApiClient';
import CustomError from '../CustomError';

const entity = 'customer/review';

export const getReviewListForMarket = async (
  req: ReadReviewRequest,
): Promise<ReadReviewResponse> => {
  try {
    const res = await apiClient.get<ReadReviewResponse>(
      `${entity}/market/${req.marketId}`,
      {
        params: {
          cursorId: req.cursorId,
          size: req.size,
        },
      },
    );
    if (res) {
      return res;
    }
    return {
      reviews: [],
      reviewNum: 0,
      averageRating: 0,
      hasNext: false,
    };
  } catch (error) {
    throw new CustomError(error);
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
    throw new CustomError(error);
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
    throw new CustomError(error);
  }
};

export const uploadReviewImage = async ({
  marketId,
  uploadImage,
}: {
  marketId: number;
  uploadImage: FormData;
}): Promise<string | null> => {
  try {
    const res = await apiClient.post<{
      code: number;
      message: string;
      data: {
        imageUrl: string;
      };
    }>(`${entity}/images/${marketId}`, uploadImage, {
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
    throw new CustomError(error);
  }
};
