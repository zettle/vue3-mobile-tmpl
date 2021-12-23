import { LocalStorage, SessionStorage } from './storageBase';

export function useSessionStorage<T> (keyName: string): SessionStorage<T> {
  return new SessionStorage<T>(keyName);
}

export function useLocalStorage<T> (keyName: string): LocalStorage<T> {
  return new LocalStorage<T>(keyName);
}
