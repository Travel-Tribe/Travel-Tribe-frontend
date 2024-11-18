import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<string | null>(
    !localStorage.getItem(key)
      ? null
      : JSON.stringify(localStorage.getItem(key)),
  );

  const setValue = (value: string | null) => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }

    setStoredValue(value);
    window.dispatchEvent(new Event("local-storage")); // Trigger sync event
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedItem = window.localStorage.getItem(key);
      setStoredValue(updatedItem);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;
