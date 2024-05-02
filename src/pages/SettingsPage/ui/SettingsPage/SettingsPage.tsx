import { useTranslation } from "react-i18next";
import { FC, memo } from "react";
import { Page } from "@/widgets/Page";
import { VStack } from "@/shared/ui/Stack";
import { UiDesignSwitcher } from "@/features/uiDesignSwitcher";
import Text from "@/shared/ui/Text/Text";
import UserRoleSwitcher from "@/features/userRoleSwitcher/ui/UserRoleSwitcher";

interface SettingsPageProps {
  className?: string;
}

const SettingsPage: FC<SettingsPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page>
      <VStack gap="16">
        <Text title={t("User Settings")} />
        <UiDesignSwitcher />
        <UserRoleSwitcher />
      </VStack>
    </Page>
  );
};

export default memo(SettingsPage);
