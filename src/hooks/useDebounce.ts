import { useRef } from "react";

const useDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = (fn: () => void, delay: number) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fn();
      debounceTimeout.current = null;
    }, delay);
  };

  return debounce;
};

export default useDebounce;
