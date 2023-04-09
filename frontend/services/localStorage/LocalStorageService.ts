export default class LocalStorageService {
    /**
     * Sets an item in localStorage with a given key and value.
     * @param key The key under which to store the data.
     * @param value The data to be stored.
     */
    setItem(key: string, value: any): void {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    /**
     * Retrieves an item from localStorage with a given key.
     * @param key The key under which the data is stored.
     * @returns The data stored under the given key, or null if no such data exists.
     */
    getItem<T>(key: string): T | null {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      }
      return null;
    }
  
    /**
     * Removes an item from localStorage with a given key.
     * @param key The key under which the data is stored.
     */
    removeItem(key: string): void {
      localStorage.removeItem(key);
    }
  }