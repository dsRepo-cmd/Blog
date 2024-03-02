import React from "react";
import { Mods, classNames } from "@/shared/lib/classNames";
import cls from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
  center?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ className, center }: LoaderProps) => {
  const mods: Mods = {
    [cls.center]: center,
  };
  return (
    <div className={classNames(cls.lds_default, mods, [className])}>
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
