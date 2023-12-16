import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./EditableProfileCardHeader.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getUserAuthData } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { profileActions } from "../../model/slice/ProfileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { HStack } from "@/shared/ui/redesigned/Stack";

import ButtonDeprecated, {
  ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/lib/features/ui/ToggleFeatures/ToggleFeatures";
import Button from "@/shared/ui/redesigned/Button/Button";
import Card from "@/shared/ui/redesigned/Card/Card";
import TextDeprecated from "@/shared/ui/deprecated/Text/Text";
import Text from "@/shared/ui/redesigned/Text/Text";

interface EditableProfileCardHeaderProps {
  className?: string;
}

const EditableProfileCardHeader: React.FC<EditableProfileCardHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation();
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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
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
                    {t("Edit")}
                  </Button>
                ) : (
                  <HStack gap="8">
                    <Button
                      onClick={onCancelEdit}
                      data-testid="EditableProfileCardHeader.CancelButton"
                      color="error"
                    >
                      {t("Cancel")}
                    </Button>
                    <Button
                      onClick={onSave}
                      data-testid="EditableProfileCardHeader.SaveButton"
                      color="success"
                    >
                      {t("Save")}
                    </Button>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        </Card>
      }
      off={
        <HStack
          max
          justify="between"
          className={classNames("", {}, [className])}
        >
          <TextDeprecated title={t("Profile")} />
          {canEdit && (
            <div>
              {readonly ? (
                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE}
                  onClick={onEdit}
                  data-testid="EditableProfileCardHeader.EditButton"
                >
                  {t("Edit")}
                </ButtonDeprecated>
              ) : (
                <HStack gap="8">
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={onCancelEdit}
                    data-testid="EditableProfileCardHeader.CancelButton"
                  >
                    {t("Cancel")}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSave}
                    data-testid="EditableProfileCardHeader.SaveButton"
                  >
                    {t("Save")}
                  </ButtonDeprecated>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      }
    />
  );
};

export default memo(EditableProfileCardHeader);
