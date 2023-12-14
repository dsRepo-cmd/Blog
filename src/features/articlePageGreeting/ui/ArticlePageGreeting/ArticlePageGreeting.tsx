import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { saveJsonSettings, useJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Drawer } from "@/shared/ui/deprecated/Drawer/Drawer";
import Modal from "@/shared/ui/deprecated/Modal/Modal";
import Text from "@/shared/ui/deprecated/Text/Text";
import { isMobile } from "react-device-detect";

const ArticlePageGreeting: React.FC = ({}) => {
  const { t } = useTranslation();
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
      {text}
    </Modal>
  );
};

export default memo(ArticlePageGreeting);
