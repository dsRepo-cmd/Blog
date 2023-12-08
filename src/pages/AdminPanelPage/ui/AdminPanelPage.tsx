import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./AdminPanelPage.module.scss";
import { useTranslation } from "react-i18next";

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.AdminPanelPage, {}, [className])}></div>
  );
};

export default memo(AdminPanelPage);
