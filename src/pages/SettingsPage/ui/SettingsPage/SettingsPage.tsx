import { useTranslation } from "react-i18next";
import { FC, memo } from "react";
import { Page } from "@/widgets/Page";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { UiDesignSwitcher } from "@/features/uiDesignSwitcher";
import Text from "@/shared/ui/redesigned/Text/Text";

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
      </VStack>
    </Page>
  );
};

export default memo(SettingsPage);
