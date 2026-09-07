import { useState, useEffect, useCallback } from 'react';

/**
 * Defensive useLocalStorage hook with schema verification,
 * try/catch resilience against corrupt stored values, quota errors, and SSR safety.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validator?: (value: unknown) => value is T
): [T, (value: T | ((val: T) => T)) => void] {
  // Read value from localStorage with full error boundary
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      const parsed = JSON.parse(item);

      // Validate against custom schema if validator provided
      if (validator && !validator(parsed)) {
        console.warn(
          `[useLocalStorage] Corrupted data for key "${key}". Resetting to initial value.`
        );
        return initialValue;
      }

      return parsed as T;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, validator]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === 'undefined') {
        return;
      }

      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (storageError) {
            console.warn(
              `[useLocalStorage] Failed writing key "${key}" to localStorage:`,
              storageError
            );
          }
          return valueToStore;
        });
      } catch (error) {
        console.warn(`[useLocalStorage] Error in setValue for key "${key}":`, error);
      }
    },
    [key]
  );

  // Sync state if storage changes across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (!validator || validator(parsed)) {
            setStoredValue(parsed);
          }
        } catch {
          // Ignore invalid parse from foreign writes
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, validator]);

  return [storedValue, setValue];
}
