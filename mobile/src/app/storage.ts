import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const setToken = (token: string) => {
  storage.set('accessToken', token);
};

export const getToken = (): string | undefined => {
  return storage.getString('accessToken');
};

export const clearToken = () => {
  storage.delete('accessToken');
};
