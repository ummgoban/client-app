import axios from 'axios';
import {UserType} from '../types/UserType';

// TODO: fetch user profile
const dummyProfile = {
  id: 1,
  name: '김영민',
  image: 'https://legacy.reactjs.org/logo-og.png',
};

export const getUserProfile = async (): Promise<UserType | null> => {
  try {
    // TODO: uri 수정
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

    if (!res) {
      return null;
    }

    return dummyProfile;
  } catch (e) {
    console.error(e);
    return null;
  }
};
