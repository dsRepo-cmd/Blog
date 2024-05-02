import { FC, memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleAdditionalInfo.module.scss";
import { HStack, VStack } from "@/shared/ui/Stack";
import Avatar from "@/shared/ui/Avatar/Avatar";
import Text from "@/shared/ui/Text/Text";
import Button from "@/shared/ui/Button/Button";
import { classNames } from "@/shared/lib/classNames";
import { useSelector } from "react-redux";
import {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from "@/entities/Article/model/selectors/articleDetails";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { useNavigate } from "react-router-dom";
import { getRouteArticleEdit, getRouteProfile } from "@/shared/const/router";
import Card from "@/shared/ui/Card/Card";
import { BrowserView, MobileView } from "react-device-detect";
import EditIcon from "@/shared/assets/icons/edit.svg";
import { Icon } from "@/shared/ui/Icon/Icon";
import { UserRole, getUserAuthData } from "@/entities/User";
import { getStandartformatDate } from "@/shared/lib/features/lib/getCurrentDate";
import AppLink from "@/shared/ui/AppLink/AppLink";

interface ArticleAdditionalInfoProps {
  className?: string;
}

const ArticleAdditionalInfo: FC<ArticleAdditionalInfoProps> = ({
  className,
}) => {
  const [isAllowEdit, setAllowEdit] = useState(false);
  const { t } = useTranslation();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const navigate = useNavigate();

  const article = useSelector(getArticleDetailsData);
  const userData = useSelector(getUserAuthData);

  useEffect(() => {
    if (
      userData?.id === article?.user.id ||
      userData?.roles?.includes(UserRole.ADMIN)
    ) {
      setAllowEdit(true);
    } else {
      setAllowEdit(false);
    }
  }, [userData, article]);

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  if (isLoading) {
    return (
      <>
        <BrowserView>
          <Card padding="12">
            <VStack
              max
              gap="32"
              className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
            >
              <HStack gap="8">
                <Skeleton width={32} height={32} border={"50%"} />
                <Skeleton width={120} height={32} />
              </HStack>
              <Skeleton width={"80%"} height={40} />
              <Skeleton width={"80%"} height={16} />
            </VStack>
          </Card>
        </BrowserView>

        <MobileView>
          <Card padding="12">
            <HStack
              max
              gap="8"
              className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
            >
              <Skeleton width={"100%"} height={32} />
            </HStack>
          </Card>
        </MobileView>
      </>
    );
  }

  return (
    <>
      <BrowserView>
        <Card padding="12">
          <VStack
            gap="32"
            className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
          >
            {article?.user && (
              <>
                {userData ? (
                  <AppLink to={getRouteProfile(article.user.id)}>
                    <HStack gap="8">
                      <Avatar
                        size={32}
                        src={article.user.avatar}
                        className={cls.avatar}
                      />
                      <Text bold text={article.user.username} />
                    </HStack>
                  </AppLink>
                ) : (
                  <HStack gap="8">
                    <Avatar
                      size={32}
                      src={article.user.avatar}
                      className={cls.avatar}
                    />
                    <Text bold text={article.user.username} />
                  </HStack>
                )}
              </>
            )}

            <Text
              size="s"
              text={
                article?.createdAt && getStandartformatDate(article?.createdAt)
              }
            />
            {isAllowEdit && (
              <Button variant={"filled"} onClick={onEditArticle}>
                {t("Edit")}
              </Button>
            )}
            <Text text={t("{{count}} views", { count: article?.views })} />
          </VStack>
        </Card>
      </BrowserView>

      <MobileView>
        <Card padding="12">
          <HStack gap="12">
            {article?.user && (
              <>
                {userData ? (
                  <AppLink to={getRouteProfile(article.user.id)}>
                    <HStack gap="8">
                      <Avatar
                        size={32}
                        src={article.user.avatar}
                        className={cls.avatar}
                      />
                    </HStack>
                  </AppLink>
                ) : (
                  <HStack gap="8">
                    <Avatar
                      size={32}
                      src={article.user.avatar}
                      className={cls.avatar}
                    />
                  </HStack>
                )}
              </>
            )}
            <Text text={t("{{count}} views", { count: article?.views })} />
            {isAllowEdit && (
              <Icon
                Svg={EditIcon}
                width={"24"}
                height={"24"}
                clickable
                onClick={onEditArticle}
              />
            )}
          </HStack>
        </Card>
      </MobileView>
    </>
  );
};

export default memo(ArticleAdditionalInfo);
