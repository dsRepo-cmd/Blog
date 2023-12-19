import { useTranslation } from "react-i18next";
import { useCounterActions } from "../model/slice/counterSlice";
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Counter.module.scss";
import { memo } from "react";
import Button from "@/shared/ui/redesigned/Button/Button";

interface CounterProps {
  className?: string;
}
export const Counter: React.FC<CounterProps> = memo(({ className }) => {
  const counterValue = useCounterValue();
  const { t } = useTranslation();

  const { decrement, increment, add, sub } = useCounterActions();

  const handleInc = () => {
    increment();
  };

  const handleDec = () => {
    decrement();
  };

  const handleAdd = () => {
    add(5);
  };

  const handleSub = () => {
    sub(5);
  };

  return (
    <div className={classNames(cls.Counter, {}, [className])}>
      <h1 className={cls.value} data-testid="value-title">
        {counterValue}
      </h1>

      <Button
        variant={"outline"}
        data-testid="decrement-btn"
        onClick={handleDec}
      >
        {t("decrement")}
      </Button>

      <Button
        variant={"outline"}
        onClick={handleInc}
        data-testid="increment-btn"
      >
        {t("increment")}
      </Button>

      <Button
        variant={"outline"}
        onClick={handleAdd}
        data-testid="increment-btn5"
      >
        {t("+5")}
      </Button>

      <Button
        variant={"outline"}
        onClick={handleSub}
        data-testid="increment-btn5"
      >
        {t("-5")}
      </Button>
    </div>
  );
});
