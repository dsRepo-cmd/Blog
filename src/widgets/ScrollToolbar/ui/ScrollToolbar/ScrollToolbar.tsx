import { FC, memo } from "react";
import { VStack } from "@/shared/ui/Stack";
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
      maxHeight
      className={classNames("", {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
};
export default memo(ScrollToolbar);
