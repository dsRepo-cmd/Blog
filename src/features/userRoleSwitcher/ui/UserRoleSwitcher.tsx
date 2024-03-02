import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { UserRole, getUserAuthData } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { updateUserRoles } from "../model/services/updateUserRoles";

interface UserRoleSwitcherProps {
  className?: string;
}

const UserRoleSwitcher: React.FC<UserRoleSwitcherProps> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);

  const items = [
    {
      content: t("Admin"),
      value: UserRole.ADMIN,
    },
    {
      content: t("User"),
      value: UserRole.USER,
    },
    {
      content: t("Manager"),
      value: UserRole.MANAGER,
    },
  ];

  const onChangeRole = async (value: UserRole) => {
    const newRoles = [] as UserRole[];
    newRoles.push(value);

    if (authData?.id && newRoles) {
      dispatch(updateUserRoles({ newRoles, userId: authData?.id }));
    }
  };

  return (
    <HStack className={classNames("", {}, [className])}>
      <ListBox
        label="Roles option"
        value={authData?.roles && authData?.roles[0]}
        onChange={onChangeRole}
        items={items}
      />
    </HStack>
  );
};

export default memo(UserRoleSwitcher);
