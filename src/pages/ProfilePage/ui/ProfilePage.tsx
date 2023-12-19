import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import { EditableProfileCard } from "@/features/editableProfileCard";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import Text from "@/shared/ui/redesigned/Text/Text";

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
    <Page data-testid="ProfilePage" className={classNames("", {}, [className])}>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default memo(ProfilePage);
