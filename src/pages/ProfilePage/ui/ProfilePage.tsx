import React from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./ProfilePage.module.scss";
import { useTranslation } from "react-i18next";
import DynamicModuleLoader, {
  ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { profileReducer } from "entities/Profile";

const reducers: ReducerList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  className,
}: ProfilePageProps) => {
  const { t } = useTranslation();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        {t("Profile Page")}
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
