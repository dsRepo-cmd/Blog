import React, { memo, useCallback, useEffect, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./UsersListEdit.module.scss";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import DynamicModuleLoader, {
  ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { usersEditReducer } from "../model/slice/usersEdit";
import { useSelector } from "react-redux";
import { getUsersEditForm } from "../model/selectors/getUsersListEdit";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchUsersEditData } from "../model/services/fetchUsersEditData";
import Text from "@/shared/ui/redesigned/Text/Text";
import Card from "@/shared/ui/redesigned/Card/Card";
import AppLink from "@/shared/ui/redesigned/AppLink/AppLink";
import { getRouteProfile } from "@/shared/const/router";
import Avatar from "@/shared/ui/redesigned/Avatar/Avatar";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import DeleteIcon from "@/shared/assets/icons/delete.svg";
import AvatarIcon from "@/shared/assets/icons/avatar.svg";

import { deleteUser } from "../model/services/deleteUser";
import Modal from "@/shared/ui/redesigned/Modal/Modal";
import Button from "@/shared/ui/redesigned/Button/Button";
import { BrowserView, MobileView } from "react-device-detect";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";

interface UsersListEditProps {
  className?: string;
}

const reducers: ReducerList = {
  usersEdit: usersEditReducer,
};

const UsersListEdit: React.FC<UsersListEditProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEditData, setUserEditData] = useState({
    userId: "",
    userEmail: "",
  });

  const dispatch = useAppDispatch();
  const form = useSelector(getUsersEditForm);

  useEffect(() => {
    dispatch(fetchUsersEditData());
  }, [dispatch]);

  const onOpenDeleteModal = useCallback(
    (userId: string, userEmail: string): void => {
      if (userId && userEmail) {
        setIsModalOpen(true);
        setUserEditData({ userId, userEmail });
      }
    },
    [dispatch]
  );

  const onAcceptDelete = useCallback(() => {
    console.log("userEditData", userEditData);
    if (userEditData.userId) {
      dispatch(deleteUser(userEditData.userId));

      setUserEditData({ userId: "", userEmail: "" });
      setIsModalOpen(false);
    }
    dispatch(fetchUsersEditData());
  }, [dispatch, isModalOpen, setIsModalOpen]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <BrowserView className={classNames(cls.UsersListEdit, {}, [className])}>
        <Card padding="12">
          <HStack
            gap="12"
            align={"center"}
            justify={"start"}
            className={cls.data}
          >
            <Icon Svg={AvatarIcon} width={40} height={40} />
            <Text bold text={t("Username")} />
            <Text bold text={t("Email")} />
            <Text bold text={t("Roles")} />

            <Text bold text={t("Delete")} />
          </HStack>
          <VStack gap="12">
            {form &&
              form?.map((user) => (
                <HStack
                  key={user.id}
                  className={cls.data}
                  align={"center"}
                  justify={"start"}
                  gap="12"
                  max
                >
                  <AppLink
                    className={cls.link}
                    to={getRouteProfile(user.id || "")}
                  >
                    <Avatar size={40} src={user.avatar} />
                  </AppLink>
                  <Text text={user.username} />
                  <Text className={cls.email} text={user.email} />
                  <Text text={user.roles?.join(", ")} />

                  <Icon
                    clickable
                    onClick={() => onOpenDeleteModal(user.id, user.email)}
                    className={cls.delete}
                    Svg={DeleteIcon}
                    width={20}
                  />
                </HStack>
              ))}
          </VStack>
          <Modal isOpen={isModalOpen} lazy>
            <VStack align="center" gap="24">
              <Text
                title={t(
                  `Are you sure you want to delete the user with email ${userEditData.userEmail}?`
                )}
              />

              <HStack gap="12">
                <Button data-testid="RatingCard.Send" onClick={onAcceptDelete}>
                  {t("Delete")}
                </Button>
                <Button data-testid="RatingCard.Close" onClick={cancelHandle}>
                  {t("Cancel")}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        </Card>
      </BrowserView>
      <MobileView
        className={classNames(cls.UsersMobileListEdit, {}, [className])}
      >
        <Card padding="12">
          <HStack
            gap="12"
            align={"center"}
            justify={"start"}
            className={cls.data}
          >
            <Icon Svg={AvatarIcon} width={40} height={40} />
            {/* <Text bold text={t("Username")} /> */}
            <Text bold text={t("Email")} />
            {/* <Text bold text={t("Roles")} />  */}
            <Text bold text={t("Delete")} />
          </HStack>
          <VStack gap="12">
            {form &&
              form?.map((user) => (
                <HStack
                  key={user.id}
                  className={cls.data}
                  align={"center"}
                  justify={"start"}
                  gap="12"
                  max
                >
                  <AppLink
                    className={cls.link}
                    to={getRouteProfile(user.id || "")}
                  >
                    <Avatar size={40} src={user.avatar} />
                  </AppLink>
                  {/* <Text text={user.username} /> */}
                  <Text className={cls.email} text={user.email} />
                  {/* <Text text={user.roles?.join(", ")} />  */}
                  <Icon
                    clickable
                    onClick={() => onOpenDeleteModal(user.id, user.email)}
                    className={cls.delete}
                    Svg={DeleteIcon}
                    width={20}
                  />
                </HStack>
              ))}
          </VStack>
          <Drawer isOpen={isModalOpen} onClose={cancelHandle} lazy>
            <VStack align="center" gap="24">
              <Text
                title={t(
                  `Are you sure you want to delete the user with email ${userEditData.userEmail}?`
                )}
              />

              <HStack gap="12">
                <Button data-testid="RatingCard.Send" onClick={onAcceptDelete}>
                  {t("Delete")}
                </Button>
              </HStack>
            </VStack>
          </Drawer>
        </Card>
      </MobileView>
    </DynamicModuleLoader>
  );
};

export default memo(UsersListEdit);
