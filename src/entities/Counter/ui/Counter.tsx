import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { counterActions, useCounterActions } from "../model/slice/counterSlice";
import {
  getCounterValue,
  useCounterValue,
} from "../model/selectors/getCounterValue/getCounterValue";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Counter.module.scss";
import { memo } from "react";

interface CounterProps {
  className?: string;
}
export const Counter: React.FC<CounterProps> = memo(({ className }) => {
  const counterValue = useCounterValue();
  const { t } = useTranslation();

  const { decrement, increment, add } = useCounterActions();

  const handleInc = () => {
    increment();
  };

  const handleDec = () => {
    decrement();
  };

  const handleAddFive = () => {
    add(5);
  };

  return (
    <div className={classNames(cls.Counter, {}, [className])}>
      <h1 className={cls.value} data-testid="value-title">
        {counterValue}
      </h1>
      <Button
        theme={ButtonTheme.OUTLINE_INVERTED}
        onClick={handleAddFive}
        data-testid="increment-btn5"
      >
        {t("add5")}
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE_INVERTED}
        onClick={handleInc}
        data-testid="increment-btn"
      >
        {t("increment")}
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE_INVERTED}
        data-testid="decrement-btn"
        onClick={handleDec}
      >
        {t("decrement")}
      </Button>
    </div>
  );
});
