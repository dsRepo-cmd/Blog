import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./AdminPanelPage.module.scss";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { UsersListEdit } from "@/features/usersListEdit";

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page
      data-testid="AdminPanelPage"
      className={classNames(cls.AdminPanelPage, {}, [className])}
    >
      <UsersListEdit />
    </Page>
  );
};

export default memo(AdminPanelPage);
