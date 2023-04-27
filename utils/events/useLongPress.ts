import { useCallback, useRef, useState } from "react";

const useLongPress = (
  onLongPress,
  onClick,
  {
    shouldPreventDefault = true,
    delay = 300,
    longCallDelay = 300
  } = {}
  ) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef();
  const target = useRef();
  const intervalId = useRef();

  const start = useCallback(
    event => {
      console.log('intervalId');
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        console.log('interval called');
        
        intervalId.current = setInterval(function () {
          console.log('interval');
          onLongPress(event);
        }, longCallDelay);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick();
      console.log(intervalId.current);
      
      if(intervalId.current) clearInterval(intervalId.current);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: e => start(e),
    onTouchStart: e => start(e),
    onMouseUp: e => clear(e),
    onMouseLeave: e => clear(e, false),
    onTouchEnd: e => clear(e)
  };
};

const isTouchEvent = event => {
return "touches" in event;
};

const preventDefault = event => {
if (!isTouchEvent(event)) return;

if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
}
};

export default useLongPress;