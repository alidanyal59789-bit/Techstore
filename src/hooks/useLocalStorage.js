import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * State that mirrors itself into localStorage.
 *
 * Behaves like useState, with two additions:
 *  - the initial value is read back from localStorage on first render
 *  - every change is written back under `key`
 *
 * Storage access is wrapped in try/catch throughout: Safari private mode and
 * some embedded browsers throw on access rather than simply failing, and a
 * cart that cannot persist should still work for the current session.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  // Skip the very first write so a fresh visit does not create an empty entry.
  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Quota exceeded or storage blocked — carry on in memory. */
    }
  }, [key, value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, [key, initialValue]);

  return [value, setValue, reset];
}
