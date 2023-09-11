import { useEffect, useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });

  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
    Space: "jump",
  };

  const findKey = (key: string) => keys[key];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        setInput((m) => ({...m, [findKey(e.code)] : true}))
    };
    const handleKeyUp = (e: KeyboardEvent) => {
        setInput((m) => ({...m, [findKey(e.code)] : false}))
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return input;
};
