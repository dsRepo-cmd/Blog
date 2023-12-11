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
import { HStack } from "@/shared/ui/Stack";
import Text from "@/shared/ui/Text/Text";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";

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
    <HStack
      max
      justify="between"
      className={classNames(cls.ProfilePageHeader, {}, [className])}
    >
      <Text title={t("Profile")} />
      {canEdit ? (
        <>
          {readonly ? (
            <Button theme={ButtonTheme.OUTLINE_INVERTED} onClick={onEdit}>
              {t("Edit")}
            </Button>
          ) : (
            <>
              <HStack gap="12" className={cls.btns}>
                <Button
                  className={cls.saveBtn}
                  theme={ButtonTheme.OUTLINE_INVERTED}
                  onClick={onSaveEdit}
                >
                  {t("Save")}
                </Button>
                <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
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
  );
};

export default memo(EditableProfileCardHeader);
