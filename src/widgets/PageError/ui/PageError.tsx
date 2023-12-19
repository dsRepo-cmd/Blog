import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./PageError.module.scss";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/redesigned/Button/Button";

interface PageErrorProps {
  className?: string;
}

const PageError: React.FC<PageErrorProps> = memo(
  ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
      location.reload();
    };
    return (
      <div className={classNames(cls.PageError, {}, [className])}>
        <p>{t("Unexpected Error")}</p>
        <Button variant={"outline"} onClick={reloadPage} className={cls.button}>
          {t("Update Page")}
        </Button>
      </div>
    );
  }
);

export default PageError;
