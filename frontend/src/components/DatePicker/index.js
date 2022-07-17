import React, { useState, } from "react";
import { useSpring, config, animated } from '@react-spring/web';
import { useHeight } from "./useHeight";





const DatePickerModule = (props) => {
  const [showB, setShowB] = useState(false);


  const [heightRef, height] = useHeight();
  const slideInStyles = useSpring({
    config: { ...config.stiff },
    from: { opacity: 0, height: 0 },
    to: {
      opacity: props.showModule ? 1 : 0,
      height: props.showModule ? height : 0
    }
  });



  return (
    <div>
      <div>
        <animated.div style={{ ...slideInStyles, overflow: "hidden" }}>
          <div ref={heightRef}>
            This content will
            <br />
            fade in
            <br />
            and
            <br />
            fade out
            <input />
            <br />
            with sliding
          </div>
        </animated.div>
      </div>

    </div>
  );
}

export default DatePickerModule;