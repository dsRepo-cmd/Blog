import { FC, memo } from "react";

import cls from "./ScrollToolbar.module.scss";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ScrollToTopButton } from "@/features/scrollToTopButton";
import { classNames } from "@/shared/lib/classNames";

interface ScrollToolbarProps {
  className?: string;
}

const ScrollToolbar: FC<ScrollToolbarProps> = ({ className }) => {
  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classNames(cls.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
};
export default memo(ScrollToolbar);
