import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/Stack";
import { BrowserView, MobileView } from "react-device-detect";
import Modal from "@/shared/ui/Modal/Modal";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import StarRating from "@/shared/ui/StarRating/StarRating";
import Text from "@/shared/ui/Text/Text";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import Card from "@/shared/ui/Card/Card";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";

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
  const [isAlertModalOpen, setAlertModalOpen] = useState(false);

  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState("");
  const userData = useSelector(getUserAuthData);

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      if (userData) {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStarsCount);
        }
      } else {
        setAlertModalOpen(true);
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
        data-testid="RatingCard.Input"
        value={feedback}
        onChange={setFeedback}
        placeholder={t("Your feedback")}
      />
    </>
  );

  const content = (
    <>
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t("Thank you for rating!") : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack padding="24" max gap="32">
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button data-testid="RatingCard.Close" onClick={cancelHandle}>
                {t("Close")}
              </Button>
              <Button data-testid="RatingCard.Send" onClick={acceptHandle}>
                {t("Send")}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer padding isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap="32">
            {modalContent}
            <Button fullWidth onClick={acceptHandle} size="l">
              {t("Send")}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <>
      <Card max border={"partial"} padding="8">
        {content}
      </Card>

      <Modal isOpen={isAlertModalOpen} onClose={() => setAlertModalOpen(false)}>
        <Card variant="outlined" padding="24">
          <Text title={t("Please register to rate article")} />
        </Card>
      </Modal>
    </>
  );
};

export default memo(RatingCard);
