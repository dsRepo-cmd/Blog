import React, { useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ProfilePageHeader.module.scss";
import { useTranslation } from "react-i18next";
import Text from "shared/ui/Text/Text";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import {
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from "entities/Profile";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "entities/User";
import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { HStack } from "shared/ui/Stack";

interface ProfilePageHeaderProps {
  className?: string;
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({
  className,
}: ProfilePageHeaderProps) => {
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

export default ProfilePageHeader;
