import React, { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
import { Dropdown } from "@/shared/ui/Popups";
import Avatar from "@/shared/ui/Avatar/Avatar";

import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { LogInModal, SignUpModal } from "@/features/AuthByUsername";
import SignUpIcon from "@/shared/assets/icons/user-plus.svg";
import SignInIcon from "@/shared/assets/icons/login.svg";
import LogoutIcon from "@/shared/assets/icons/logout.svg";
import SettingsIcon from "@/shared/assets/icons/settings.svg";
import AdminIcon from "@/shared/assets/icons/user-edit.svg";
import ArticleIcon from "@/shared/assets/icons/article-add.svg";
import ProfileIcon from "@/shared/assets/icons/user-circle.svg";

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

  const [isSignIn, setSignIn] = useState(false);
  const [isSignup, setSignup] = useState(false);

  const onCloseSignInModal = useCallback(() => {
    setSignIn(false);
  }, []);

  const onShowSignInModal = useCallback(() => {
    setSignIn(true);
  }, []);

  const onCloseSignUpModal = useCallback(() => {
    setSignup(false);
  }, []);

  const onShowSignUpModal = useCallback(() => {
    setSignup(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t("Administration"),
            href: getRouteAdmin(),
            id: "1",
            svg: AdminIcon,
          },
        ]
      : []),

    ...(authData
      ? [
          {
            content: t("Profile"),
            href: getRouteProfile(authData.id),
            id: "2",
            svg: ProfileIcon,
          },
          {
            content: t("Settings"),
            href: getRouteSettings(),
            id: "3",
            svg: SettingsIcon,
          },
          {
            content: t("New Article"),
            href: getRouteArticleCreate(),
            id: "4",
            svg: ArticleIcon,
          },
          {
            content: t("Exit"),
            onClick: onLogout,
            id: "5",
            svg: LogoutIcon,
          },
        ]
      : [
          {
            content: t("Sign in"),
            onClick: onShowSignInModal,
            id: "6",
            svg: SignInIcon,
          },
          {
            content: t("Sign up"),
            onClick: onShowSignUpModal,
            id: "7",
            svg: SignUpIcon,
          },
        ]),
  ];

  return (
    <>
      <Dropdown
        direction="bottom left"
        className={classNames("", {}, [className])}
        items={items}
        trigger={<Avatar size={40} src={authData ? authData.avatar : ""} />}
      />

      {isSignIn && (
        <LogInModal isOpen={isSignIn} onClose={onCloseSignInModal} />
      )}
      {isSignup && (
        <SignUpModal isOpen={isSignup} onClose={onCloseSignUpModal} />
      )}
    </>
  );
};

export default memo(AvatarDropdown);
