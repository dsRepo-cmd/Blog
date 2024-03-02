import React, { memo, useCallback } from "react";
import cls from "./EditableProfileCardHeader.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getUserAuthData } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { profileActions } from "../../model/slice/ProfileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import Button from "@/shared/ui/redesigned/Button/Button";
import Card from "@/shared/ui/redesigned/Card/Card";
import Text from "@/shared/ui/redesigned/Text/Text";
import { BrowserView, MobileView } from "react-device-detect";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import EditIcon from "@/shared/assets/icons/edit.svg";
import CancelIcon from "@/shared/assets/icons/delete.svg";
import SaveIcon from "@/shared/assets/icons/disk.svg";

interface EditableProfileCardHeaderProps {
  className?: string;
}

const EditableProfileCardHeader: React.FC<EditableProfileCardHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile");
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const readonly = useSelector(getProfileReadonly);

  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <>
      <BrowserView style={{ width: "100%" }}>
        <Card padding="24" max border="partial">
          <HStack
            max
            justify="between"
            className={classNames("", {}, [className])}
          >
            <Text title={t("Profile")} />
            {canEdit && (
              <div>
                {readonly ? (
                  <Button
                    onClick={onEdit}
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    <HStack gap="12">
                      <Icon filled width={20} Svg={EditIcon} />{" "}
                      <Text text={t("Edit")} />
                    </HStack>
                  </Button>
                ) : (
                  <HStack gap="8">
                    <Button
                      onClick={onCancelEdit}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      <HStack gap="12">
                        <Icon filled width={20} Svg={CancelIcon} />{" "}
                        <Text text={t("Cancel")} />
                      </HStack>
                    </Button>

                    <Button
                      onClick={onSave}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      <HStack gap="12">
                        <Icon
                          variant="error"
                          filled
                          width={20}
                          Svg={SaveIcon}
                        />{" "}
                        <Text text={t("Save")} />
                      </HStack>
                    </Button>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        </Card>
      </BrowserView>
      <MobileView style={{ width: "100%" }}>
        <Card padding="24" max border="partial">
          <VStack
            className={classNames("", {}, [className])}
            max
            gap="12"
            justify="between"
            align={"center"}
          >
            <Text title={t("Profile")} />
            {canEdit && (
              <HStack>
                {readonly ? (
                  <Button
                    round
                    onClick={onEdit}
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    <HStack gap="12">
                      <Icon filled width={20} Svg={EditIcon} />{" "}
                      <Text text={t("Edit")} />
                    </HStack>
                  </Button>
                ) : (
                  <HStack
                    justify={"between"}
                    max
                    className={cls.buttonWraper}
                    gap="8"
                  >
                    <Button
                      round
                      onClick={onCancelEdit}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      <HStack gap="12">
                        <Icon filled width={20} Svg={CancelIcon} />{" "}
                        <Text text={t("Cancel")} />
                      </HStack>
                    </Button>
                    <Button
                      round
                      onClick={onSave}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      <HStack gap="12">
                        <Icon filled width={20} Svg={SaveIcon} />{" "}
                        <Text text={t("Save")} />
                      </HStack>
                    </Button>
                  </HStack>
                )}
              </HStack>
            )}
          </VStack>
        </Card>
      </MobileView>
    </>
  );
};

export default memo(EditableProfileCardHeader);
