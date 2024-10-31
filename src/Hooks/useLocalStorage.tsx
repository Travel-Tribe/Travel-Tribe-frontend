import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<string | null>(
    localStorage.getItem(key) === "undefined"
      ? ""
      : JSON.stringify(localStorage.getItem(key)),
  );

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value; // 함수가 전달된 경우 처리
    console.log("setValue", valueToStore);
    setStoredValue(valueToStore); // 상태 업데이트
    window.localStorage.setItem(key, JSON.stringify(valueToStore)); // localStorage 업데이트
  };

  // 데이터가 변경될 때마다 리렌더링 되도록 useEffect 사용
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedItem = window.localStorage.getItem(key) || "";
      setStoredValue(updatedItem);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue]; // 상태와 설정 함수 반환
};

export default useLocalStorage;
