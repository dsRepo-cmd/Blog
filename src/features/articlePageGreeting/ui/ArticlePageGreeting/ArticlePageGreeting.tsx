import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getUserAuthData,
  saveJsonSettings,
  useJsonSettings,
} from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import Modal from "@/shared/ui/Modal/Modal";
import { isMobile } from "react-device-detect";
import Text from "@/shared/ui/Text/Text";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { useSelector } from "react-redux";

const ArticlePageGreeting: React.FC = ({}) => {
  const { t } = useTranslation("article");
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector(getUserAuthData);
  const { isArticlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageWasOpened && userData) {
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
