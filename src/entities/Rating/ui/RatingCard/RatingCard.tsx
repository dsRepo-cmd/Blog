import React, { memo, useCallback, useState } from "react";
import cls from "./RatingCard.module.scss";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames";
import Card from "@/shared/ui/deprecated/Card/Card";
import { HStack, VStack } from "@/shared/ui/deprecated/Stack";
import Text from "@/shared/ui/deprecated/Text/Text";

import { Input } from "@/shared/ui/deprecated/Input/Input";
import { BrowserView, MobileView } from "react-device-detect";
import Modal from "@/shared/ui/deprecated/Modal/Modal";
import Button, {
  ButtonSize,
  ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { Drawer } from "@/shared/ui/deprecated/Drawer/Drawer";
import StarRating from "@/shared/ui/deprecated/StarRating/StarRating";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

const RatingCard: React.FC<RatingCardProps> = ({
  className,
  title,
  feedbackTitle,
  hasFeedback,
  onCancel,
  onAccept,
  rate = 0,
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState("");

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t("Your feedback")}
      />
    </>
  );

  return (
    <Card className={classNames(cls.RatingCard, {}, [className])}>
      <VStack align="center" gap="8">
        <Text title={starsCount ? t("Thanks for your feedback!") : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
                {t("Close")}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE_INVERTED}
                onClick={acceptHandle}
              >
                {t("Send")}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap="32">
            {modalContent}
            <Button
              theme={ButtonTheme.OUTLINE_INVERTED}
              fullWidth
              onClick={acceptHandle}
              size={ButtonSize.L}
            >
              {t("Send")}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
};

export default memo(RatingCard);
