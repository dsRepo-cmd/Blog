import React from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./PageError.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ButtonTheme } from "shared/ui/Button/Button";

interface PageErrorProps {
  className?: string;
}

const PageError: React.FC<PageErrorProps> = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };
  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>{t("Unexpected Error")}</p>
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={reloadPage}
        className={cls.button}
      >
        {t("Update Page")}
      </Button>
    </div>
  );
};

export default PageError;
