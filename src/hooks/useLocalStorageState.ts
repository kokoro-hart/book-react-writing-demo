import { useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prevValue: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setLocalStorageState = (value: T | ((prevValue: T) => T)) => {
    setState((prevState) => {
      const newState =
        typeof value === "function"
          ? (value as (prevValue: T) => T)(prevState)
          : value;

      localStorage.setItem(key, JSON.stringify(newState));

      return newState;
    });
  };

  return [state, setLocalStorageState];
}
