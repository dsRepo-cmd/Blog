import { FC, memo } from "react";
import CircleIcon from "@/shared/assets/icons/circle-up.svg";
import { classNames } from "@/shared/lib/classNames";
import { Icon } from "@/shared/ui/Icon/Icon";

interface ScrollToTopButtonProps {
  className?: string;
}

const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({ className }) => {
  const onCLick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Icon
      Svg={CircleIcon}
      clickable
      onClick={onCLick}
      width={32}
      height={32}
      className={classNames("", {}, [className])}
    />
  );
};

export default memo(ScrollToTopButton);
