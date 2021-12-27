import { LocalStorage, SessionStorage, defineLocalStorage, defineSessionStorage } from './storageBase';

export {
  LocalStorage,
  SessionStorage,
  defineLocalStorage,
  defineSessionStorage
};

interface ICountStorage {
  name: string;
  age: number;
}
export const userCountStorage = defineSessionStorage<ICountStorage>('count');
