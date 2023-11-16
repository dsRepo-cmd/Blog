import React, { useState } from "react";
import classes from "./Counter.module.scss";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1 className={classes.h1}>{count}</h1>
      <button onClick={handleCount}>Counter</button>
    </div>
  );
};

export default Counter;
