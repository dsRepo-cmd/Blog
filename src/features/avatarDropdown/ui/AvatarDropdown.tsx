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

import { Dropdown } from "@/shared/ui/deprecated/Popups";
import { getRouteAdmin, getRouteProfile } from "@/shared/const/router";
import Avatar from "@/shared/ui/deprecated/Avatar/Avatar";

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
                href: getRouteAdmin(),
              },
            ]
          : []),
        { content: t("Profile"), href: getRouteProfile(authData.id) },
        { content: t("Exit"), onClick: onLogout },
      ]}
      trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
    />
  );
};

export default memo(AvatarDropdown);
