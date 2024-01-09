import React, { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "../EditableArticleCard/EditableArticleCard.module.scss";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateArticleEditData } from "../../model/services/updateArticleEditData";
import { articleEditActions } from "../../model/slice/ArticleEditSlice";
import { ArticleBlockType } from "@/entities/Article";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import SaveIcon from "@/shared/assets/icons/disk.svg";
import TextIcon from "@/shared/assets/icons/edit.svg";
import ImageIcon from "@/shared/assets/icons/picture.svg";
import CodeIcon from "@/shared/assets/icons/square-code.svg";
import DeleteIcon from "@/shared/assets/icons/delete.svg";
import PuclishIcon from "@/shared/assets/icons/add-document.svg";
import DividerIcon from "@/shared/assets/icons/minus.svg";
import { deleteArticle } from "../../model/services/deleteArticle";

import { useNavigate, useParams } from "react-router-dom";
import {
  getRouteArticleDetails,
  getRouteArticles,
} from "@/shared/const/router";
import Modal from "@/shared/ui/redesigned/Modal/Modal";
import Button from "@/shared/ui/redesigned/Button/Button";
import Text from "@/shared/ui/redesigned/Text/Text";
import { useSelector } from "react-redux";
import { getArticleEditData } from "../../model/selectors/getArticleEdit";

interface EditableArticlePanelProps {
  className?: string;
}

const EditableArticlePanel: React.FC<EditableArticlePanelProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const data = useSelector(getArticleEditData);

  const onAddTextBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.TEXT,
        paragraphs: [""],
        title: "",
      })
    );
    scrollToBottom();
  }, [dispatch]);

  const onAddCodeBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.CODE,
        code: "",
      })
    );
    scrollToBottom();
  }, [dispatch]);

  const onAddImageBlock = useCallback(() => {
    dispatch(
      articleEditActions.addBlock({
        id: Date.now().toString(),
        type: ArticleBlockType.IMAGE,
        src: "https://",
      })
    );
    scrollToBottom();
  }, [dispatch]);

  const onUpdate = useCallback(() => {
    dispatch(updateArticleEditData());
  }, [dispatch]);

  const onDeleteArticle = useCallback(() => {
    setIsModalOpen(true);
  }, [dispatch]);

  const onAcceptDelete = useCallback(() => {
    if (id) {
      dispatch(deleteArticle(id));
      setIsModalOpen(false);
      navigate(getRouteArticles());
    }
    if (data?.id) {
      dispatch(deleteArticle(data?.id));
      setIsModalOpen(false);
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
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <HStack
      gap={"8"}
      className={classNames(cls.ButtonsWrapper, {}, [className])}
    >
      <Icon
        onClick={onUpdate}
        Svg={SaveIcon}
        clickable
        className={cls.panelIcon}
      />
      <Icon
        onClick={onAddTextBlock}
        Svg={TextIcon}
        clickable
        className={cls.panelIcon}
      />
      <Icon
        onClick={onAddCodeBlock}
        Svg={CodeIcon}
        clickable
        className={cls.panelIcon}
      />
      <Icon
        onClick={onAddImageBlock}
        Svg={ImageIcon}
        clickable
        className={cls.panelIcon}
      />

      <Icon Svg={DividerIcon} className={cls.panelIconDivider} />

      <Icon
        onClick={onPublishArticle}
        Svg={PuclishIcon}
        clickable
        className={cls.panelIcon}
      />

      <Icon
        onClick={onDeleteArticle}
        Svg={DeleteIcon}
        clickable
        className={cls.panelIcon}
      />
      <Modal isOpen={isModalOpen} lazy>
        <VStack align="center" gap="24">
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
    </HStack>
  );
};

export default memo(EditableArticlePanel);
