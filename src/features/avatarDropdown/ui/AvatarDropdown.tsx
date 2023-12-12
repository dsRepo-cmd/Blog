import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "@/entities/User";

import Avatar from "@/shared/ui/Avatar/Avatar";
import { Dropdown } from "@/shared/ui/Popups";
import { RoutePath } from "@/shared/const/router";

interface AvatarDropdownProps {
  className?: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames("", {}, [className])}
      direction="bottom left"
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t("Administration"),
                href: RoutePath.admin_panel,
              },
            ]
          : []),
        { content: t("Profile"), href: RoutePath.profile + authData.id },
        { content: t("Exit"), onClick: onLogout },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
};

export default memo(AvatarDropdown);
