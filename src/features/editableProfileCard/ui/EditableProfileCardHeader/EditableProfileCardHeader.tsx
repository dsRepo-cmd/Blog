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
import { HStack, VStack } from "@/shared/ui/Stack";
import Button from "@/shared/ui/Button/Button";
import Card from "@/shared/ui/Card/Card";
import Text from "@/shared/ui/Text/Text";
import { BrowserView, MobileView } from "react-device-detect";
import { Icon } from "@/shared/ui/Icon/Icon";
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
          <HStack max justify="between">
            <Text title={t("Profile")} />
            {canEdit && (
              <div>
                {readonly ? (
                  <Button
                    variant="filled"
                    onClick={onEdit}
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    <HStack gap="12">
                      <Icon width={18} Svg={EditIcon} /> {t("Edit")}
                    </HStack>
                  </Button>
                ) : (
                  <HStack gap="16">
                    <Button
                      variant="filled"
                      onClick={onCancelEdit}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      <HStack gap="12">
                        <Icon width={18} Svg={CancelIcon} />
                        {t("Cancel")}
                      </HStack>
                    </Button>

                    <Button
                      variant="filled"
                      onClick={onSave}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      <HStack gap="12">
                        <Icon width={18} Svg={SaveIcon} />
                        {t("Save")}
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
          <VStack max gap="12" justify="between" align={"center"}>
            <Text title={t("Profile")} />
            {canEdit && (
              <HStack max>
                {readonly ? (
                  <Button
                    onClick={onEdit}
                    variant="filled"
                    fullWidth
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    <HStack gap="12">
                      <Icon width={18} Svg={EditIcon} /> {t("Edit")}
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
                      variant="filled"
                      onClick={onCancelEdit}
                      fullWidth
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      <HStack gap="12">
                        <Icon width={18} Svg={CancelIcon} />
                        {t("Cancel")}
                      </HStack>
                    </Button>
                    <Button
                      variant="filled"
                      fullWidth
                      onClick={onSave}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      <HStack gap="12">
                        <Icon width={18} Svg={SaveIcon} /> {t("Save")}
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
