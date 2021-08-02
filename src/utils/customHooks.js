// Dan Abramov's fancy custom hook used for polling our check-in records.
// Calculate 'real' view height based on window property to account for browser bars and add resize listener.

import { useEffect, useRef } from "react";

export function useInterval(delay, callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useResponsiveViewHeight() {
  const setViewHeightVariable = () =>
    document.documentElement.style.setProperty("--vh", `${window.innerHeight / 100}px`);

  setViewHeightVariable();
  window.addEventListener("resize", setViewHeightVariable);
}
