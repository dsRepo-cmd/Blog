import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticlesPage.module.scss";
import { useTranslation } from "react-i18next";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      ArticlesPage
    </div>
  );
};

export default memo(ArticlesPage);
