import { defineSessionStorage } from '../base/storageBase';

interface ICountStorage {
  name: string;
  age: number;
}

export default defineSessionStorage<ICountStorage>('count');
