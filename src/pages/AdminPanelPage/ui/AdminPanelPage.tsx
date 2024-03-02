import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import { Page } from "@/widgets/Page";
import { UsersListEdit } from "@/features/usersListEdit";

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ className }) => {
  return (
    <Page
      data-testid="AdminPanelPage"
      className={classNames("", {}, [className])}
    >
      <UsersListEdit />
    </Page>
  );
};

export default memo(AdminPanelPage);
