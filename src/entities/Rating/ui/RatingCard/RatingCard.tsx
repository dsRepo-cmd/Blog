import React, { memo, useCallback, useState } from "react";

import { useTranslation } from "react-i18next";

import CardDeprecated from "@/shared/ui/deprecated/Card/Card";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import TextDepreacetd from "@/shared/ui/deprecated/Text/Text";

import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { BrowserView, MobileView } from "react-device-detect";
import Modal from "@/shared/ui/redesigned/Modal/Modal";
import ButtonDeprecated, {
  ButtonSize,
  ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";
import StarRating from "@/shared/ui/redesigned/StarRating/StarRating";
import { ToggleFeatures } from "@/shared/lib/features";
import Text from "@/shared/ui/redesigned/Text/Text";
import Input from "@/shared/ui/redesigned/Input/Input";
import Button from "@/shared/ui/redesigned/Button/Button";
import Card from "@/shared/ui/redesigned/Card/Card";

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t("Your feedback")}
          />
        </>
      }
      off={
        <>
          <TextDepreacetd title={feedbackTitle} />
          <InputDeprecated
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t("Your feedback")}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align="center" gap="8" max>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text title={starsCount ? t("Thank you for rating!") : title} />}
          off={
            <TextDepreacetd
              title={starsCount ? t("Thank you for rating!") : title}
            />
          }
        />
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
            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <HStack max gap="16" justify="end">
                  <Button data-testid="RatingCard.Close" onClick={cancelHandle}>
                    {t("Close")}
                  </Button>
                  <Button data-testid="RatingCard.Send" onClick={acceptHandle}>
                    {t("Send")}
                  </Button>
                </HStack>
              }
              off={
                <HStack max gap="16" justify="end">
                  <ButtonDeprecated
                    data-testid="RatingCard.Close"
                    onClick={cancelHandle}
                    theme={ButtonTheme.OUTLINE_RED}
                  >
                    {t("Close")}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    data-testid="RatingCard.Send"
                    onClick={acceptHandle}
                  >
                    {t("Send")}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap="32">
            {modalContent}
            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <Button fullWidth onClick={acceptHandle} size="l">
                  {t("Send")}
                </Button>
              }
              off={
                <ButtonDeprecated
                  fullWidth
                  onClick={acceptHandle}
                  size={ButtonSize.L}
                >
                  {t("Send")}
                </ButtonDeprecated>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card max border="round" padding="24">
          {content}
        </Card>
      }
      off={
        <CardDeprecated className={className} max data-testid="RatingCard">
          {content}
        </CardDeprecated>
      }
    />
  );
};

export default memo(RatingCard);
