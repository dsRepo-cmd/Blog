import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { counterActions } from "../model/slice/counterSlice";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Counter.module.scss";
import { memo } from "react";

interface CounterProps {
  className?: string;
}
export const Counter: React.FC<CounterProps> = memo(({ className }) => {
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);
  const { t } = useTranslation();

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div className={classNames(cls.Counter, {}, [className])}>
      <h1 className={cls.value} data-testid="value-title">
        {counterValue}
      </h1>
      <Button
        theme={ButtonTheme.OUTLINE_INVERTED}
        onClick={increment}
        data-testid="increment-btn"
      >
        {t("increment")}
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE_INVERTED}
        data-testid="decrement-btn"
        onClick={decrement}
      >
        {t("decrement")}
      </Button>
    </div>
  );
});
