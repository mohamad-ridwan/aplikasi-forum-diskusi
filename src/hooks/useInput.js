import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleReset = () => {
    setValue(defaultValue);
  };

  return [value, handleValueChange, setValue, handleReset];
}

export default useInput;
