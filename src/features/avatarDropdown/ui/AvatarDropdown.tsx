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
  getRouteArticleCreate,
  getRouteProfile,
  getRouteSettings,
} from "@/shared/const/router";
import { Dropdown } from "@/shared/ui/redesigned/Popups";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";

import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface AvatarDropdownProps {
  className?: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
            id: "1",
          },
        ]
      : []),
    {
      content: t("Profile"),
      href: getRouteProfile(authData.id),
      id: "2",
    },
    {
      content: t("Settings"),
      href: getRouteSettings(),
      id: "3",
    },
    {
      content: t("New Article"),
      href: getRouteArticleCreate(),
      id: "4",
    },
    {
      content: t("Exit"),
      onClick: onLogout,
      id: "5",
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
