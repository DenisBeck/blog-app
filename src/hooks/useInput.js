import { useEffect, useState } from 'react';

export default function useInput(value) {
  const [inputValue, setInputValue] = useState(value);

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const inputProps = {
    value: inputValue,
    onChange,
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return inputProps;
}
