import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ArticlesPage.module.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <Link to={"/article/1"}>Article1</Link>
    </div>
  );
};

export default memo(ArticlesPage);
