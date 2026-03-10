/**
 * Type-safe storage utilities for localStorage operations
 * Provides JSON serialization/deserialization with proper error handling
 */

/**
 * Error types for storage operations
 */
export class StorageError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'StorageError';
  }
}

export class QuotaExceededError extends StorageError {
  constructor(key: string, cause?: unknown) {
    super(`Storage quota exceeded when setting key: ${key}`, cause);
    this.name = 'QuotaExceededError';
  }
}

/**
 * Get an item from localStorage with type safety and JSON deserialization
 * @param key - The storage key
 * @returns The parsed value or null if not found or invalid
 */
export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Failed to get item from localStorage with key: ${key}`, error);
    return null;
  }
}

/**
 * Set an item in localStorage with JSON serialization and quota handling
 * @param key - The storage key
 * @param value - The value to store
 * @throws {QuotaExceededError} When storage quota is exceeded
 */
export function setItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error(`Storage quota exceeded for key: ${key}`, error);
      throw new QuotaExceededError(key, error);
    } else if (error instanceof Error && error.message.includes('quota')) {
      console.error(`Storage quota exceeded for key: ${key}`, error);
      throw new QuotaExceededError(key, error);
    } else {
      console.error(`Failed to set item in localStorage with key: ${key}`, error);
      throw new StorageError(`Failed to set item with key: ${key}`, error);
    }
  }
}

/**
 * Remove an item from localStorage
 * @param key - The storage key to remove
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove item from localStorage with key: ${key}`, error);
  }
}

/**
 * Check if localStorage is available in the current environment
 * @returns true if localStorage is available, false otherwise
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, 'test');
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear all items from localStorage
 * Use with caution as this affects all stored data
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear localStorage', error);
    throw new StorageError('Failed to clear storage', error);
  }
}

/**
 * Get all keys currently stored in localStorage
 * @returns Array of storage keys
 */
export function getAllKeys(): string[] {
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null) {
        keys.push(key);
      }
    }
    return keys;
  } catch (error) {
    console.error('Failed to get all keys from localStorage', error);
    return [];
  }
}