import React, { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "../EditableArticleCard/EditableArticleCard.module.scss";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateArticleEditData } from "../../model/services/updateArticleEditData";
import { articleEditActions } from "../../model/slice/ArticleEditSlice";
import { ArticleBlockType } from "@/entities/Article";
import { Icon } from "@/shared/ui/Icon/Icon";
import SaveIcon from "@/shared/assets/icons/disk.svg";
import TextIcon from "@/shared/assets/icons/edit.svg";
import ImageIcon from "@/shared/assets/icons/picture.svg";
import CodeIcon from "@/shared/assets/icons/square-code.svg";
import DeleteIcon from "@/shared/assets/icons/trash.svg";
import PuclishIcon from "@/shared/assets/icons/add-document.svg";
import DividerIcon from "@/shared/assets/icons/minus.svg";
import { deleteArticle } from "../../model/services/deleteArticle";

import { useNavigate, useParams } from "react-router-dom";
import {
  getRouteArticleDetails,
  getRouteArticles,
} from "@/shared/const/router";
import Modal from "@/shared/ui/Modal/Modal";
import Button from "@/shared/ui/Button/Button";
import Text from "@/shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getArticleEditData } from "../../model/selectors/getArticleEdit";
import { BrowserView, MobileView } from "react-device-detect";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

interface EditableArticlePanelProps {
  className?: string;
}

const EditableArticlePanel: React.FC<EditableArticlePanelProps> = ({
  className,
}) => {
  const { t } = useTranslation("article");
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getArticleEditData);

  //Add Blocks
  const onAddTextBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.TEXT,
        paragraph: "",
        title: "",
      })
    );
    setTimeout(() => scrollToBottom(), 300);
  }, [dispatch]);

  const onAddCodeBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.CODE,
        code: "",
      })
    );
    setTimeout(() => scrollToBottom(), 300);
  }, [dispatch]);

  const onAddImageBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.IMAGE,
        src: "https://",
      })
    );
    setTimeout(() => scrollToBottom(), 300);
  }, [dispatch]);

  //===========

  const onUpdate = useCallback(() => {
    dispatch(updateArticleEditData());
  }, [dispatch]);

  const onModalDelete = useCallback(() => {
    setModalOpen(true);
  }, [dispatch]);

  const onAcceptDelete = useCallback(() => {
    if (id) {
      dispatch(deleteArticle(id));
      setModalOpen(false);
      navigate(getRouteArticles());
    } else if (data?.id) {
      dispatch(deleteArticle(data?.id));
      setModalOpen(false);

      navigate(getRouteArticles());
    }
  }, [dispatch]);

  const onPublishArticle = useCallback(() => {
    dispatch(articleEditActions.updateArticleEdit({ isPublished: true }));

    dispatch(updateArticleEditData());
    if (id) navigate(getRouteArticleDetails(id));
    if (data?.id) navigate(getRouteArticleDetails(data.id));
  }, [dispatch]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const cancelHandle = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return (
    <HStack
      gap={"8"}
      className={classNames(cls.ButtonsWrapper, {}, [className])}
    >
      <Icon
        title={t("Save")}
        onClick={onUpdate}
        Svg={SaveIcon}
        clickable
        className={cls.panelIcon}
      />
      <Icon
        title={t("Add Text Block")}
        onClick={onAddTextBlock}
        Svg={TextIcon}
        clickable
        className={cls.panelIcon}
      />
      <Icon
        title={t("Add Code Block")}
        onClick={onAddCodeBlock}
        Svg={CodeIcon}
        clickable
        className={cls.panelIcon}
      />
      <Icon
        title={t("Add Image Block")}
        onClick={onAddImageBlock}
        Svg={ImageIcon}
        clickable
        className={cls.panelIcon}
      />

      <Icon Svg={DividerIcon} className={cls.panelIconDivider} />

      <Icon
        title={t("Save and Publish The Article")}
        onClick={onPublishArticle}
        Svg={PuclishIcon}
        clickable
        className={cls.panelIcon}
      />

      <Icon
        variant={"error"}
        title={t("Delete Article")}
        onClick={onModalDelete}
        Svg={DeleteIcon}
        clickable
        className={cls.panelIcon}
      />

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack padding="24" align="center" gap="24">
            <Text title={t("Are you sure you want to delete the article?")} />

            <HStack gap="12">
              <Button data-testid="RatingCard.Send" onClick={onAcceptDelete}>
                {t("Delete")}
              </Button>
              <Button data-testid="RatingCard.Close" onClick={cancelHandle}>
                {t("Cancel")}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer padding isOpen={isModalOpen} onClose={cancelHandle} lazy>
          <VStack align="center" gap="24">
            <Text title={t("Are you sure you want to delete the article?")} />

            <HStack gap="12">
              <Button data-testid="RatingCard.Send" onClick={onAcceptDelete}>
                {t("Delete")}
              </Button>
            </HStack>
          </VStack>
        </Drawer>
      </MobileView>
    </HStack>
  );
};

export default memo(EditableArticlePanel);
