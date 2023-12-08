import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import Page from "widgets/Page/Page";
import { EditableProfileCard } from "features/editableProfileCard";
import { useParams } from "react-router-dom";
import Text from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Text text={t("Profile not found")} />;
  }
  return (
    <Page className={classNames("", {}, [className])}>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default memo(ProfilePage);
