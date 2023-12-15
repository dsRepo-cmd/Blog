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
import Text from "@/shared/ui/deprecated/Text/Text";
import ButtonDeprecated, {
  ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import Button from "@/shared/ui/redesigned/Button/Button";

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

  const onSaveEdit = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <ToggleFeatures
      feature={"isAppRedesigned"}
      on={
        <HStack
          max
          justify="between"
          className={classNames(cls.ProfilePageHeader, {}, [className])}
        >
          <Text title={t("Profile")} />
          {canEdit ? (
            <>
              {readonly ? (
                <Button variant={"outline"} onClick={onEdit}>
                  {t("Edit")}
                </Button>
              ) : (
                <>
                  <HStack gap="12" className={cls.btns}>
                    <Button
                      className={cls.saveBtn}
                      variant={"outline"}
                      onClick={onSaveEdit}
                    >
                      {t("Save")}
                    </Button>
                    <Button variant={"outline"} onClick={onCancelEdit}>
                      {t("Cancel")}
                    </Button>
                  </HStack>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </HStack>
      }
      off={
        <HStack
          max
          justify="between"
          className={classNames(cls.ProfilePageHeader, {}, [className])}
        >
          <Text title={t("Profile")} />
          {canEdit ? (
            <>
              {readonly ? (
                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE_INVERTED}
                  onClick={onEdit}
                >
                  {t("Edit")}
                </ButtonDeprecated>
              ) : (
                <>
                  <HStack gap="12" className={cls.btns}>
                    <ButtonDeprecated
                      className={cls.saveBtn}
                      theme={ButtonTheme.OUTLINE_INVERTED}
                      onClick={onSaveEdit}
                    >
                      {t("Save")}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={onCancelEdit}
                    >
                      {t("Cancel")}
                    </ButtonDeprecated>
                  </HStack>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </HStack>
      }
    />
  );
};

export default memo(EditableProfileCardHeader);
