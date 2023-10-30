import { useState } from 'react';

type ToggleHookReturnType = {
  isToggled: boolean;
  toggle: () => void;
};

const useToggle = (initialState: boolean = false): ToggleHookReturnType => {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  const toggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  return { isToggled, toggle };
};

export default useToggle;
