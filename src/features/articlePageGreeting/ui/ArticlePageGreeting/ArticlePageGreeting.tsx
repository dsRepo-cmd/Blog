import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { saveJsonSettings, useJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";
import Modal from "@/shared/ui/redesigned/Modal/Modal";
import { isMobile } from "react-device-detect";
import Text from "@/shared/ui/redesigned/Text/Text";
import { HStack } from "@/shared/ui/redesigned/Stack";

const ArticlePageGreeting: React.FC = ({}) => {
  const { t } = useTranslation("article");
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
    }
  }, [dispatch, isArticlesPageWasOpened]);

  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t("Welcome to the articles page")}
      text={t("Here you can search and view articles on various topics")}
    />
  );

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      <HStack padding="16">{text}</HStack>
    </Modal>
  );
};

export default memo(ArticlePageGreeting);
