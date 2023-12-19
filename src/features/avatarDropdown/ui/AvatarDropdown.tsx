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
import {
  getRouteAdmin,
  getRouteProfile,
  getRouteSettings,
} from "@/shared/const/router";
import { Dropdown } from "@/shared/ui/redesigned/Popups";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";

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

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t("Administration"),
            href: getRouteAdmin(),
          },
        ]
      : []),
    {
      content: t("Profile"),
      href: getRouteProfile(authData.id),
    },
    {
      content: t("Settings"),
      href: getRouteSettings(),
    },
    {
      content: t("Exit"),
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
      direction="bottom left"
      className={classNames("", {}, [className])}
      items={items}
      trigger={<Avatar size={40} src={authData.avatar} />}
    />
  );
};

export default memo(AvatarDropdown);
