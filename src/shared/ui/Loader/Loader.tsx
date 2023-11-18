import React from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }: LoaderProps) => {
  return (
    <div className={classNames(cls.lds_default, {}, [])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
