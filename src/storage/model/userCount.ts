import { defineSessionStorage, SessionStorage } from '../base/storageBase';

interface ICountStorage {
  name: string;
  age: number;
}

// export default defineSessionStorage<ICountStorage>('count');

let instance: SessionStorage<ICountStorage>;
export function useCountSessionStorage (): SessionStorage<ICountStorage> {
  if (!instance) {
    instance = defineSessionStorage<ICountStorage>('count');
  }
  return instance;
}
