import { useState } from "react";

export const useLocalStorageState = <T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prevValue: T) => T)) => void] => {
  const [state, setState] = useState<T>(() => {
    // ローカルストレージから初期値を取得
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setLocalStorageState = (value: T | ((prevValue: T) => T)) => {
    setState((prevState) => {
      // 新しい状態を計算
      const newState =
        typeof value === "function"
          ? (value as (prevValue: T) => T)(prevState) // 関数の場合、現在の状態を引数にして呼び出し
          : value; // 値の場合、そのまま使用

      // ローカルストレージに新しい状態を保存
      localStorage.setItem(key, JSON.stringify(newState));

      // 新しい状態を返して状態を更新
      return newState;
    });
  };

  return [state, setLocalStorageState];
};
