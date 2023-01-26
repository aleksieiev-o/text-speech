import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from './constants';

export const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export const hexToRgb = (hex: string): {r: number, g: number, b: number} => {
  const bigint = parseInt(hex.replace('#', ''), 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};
