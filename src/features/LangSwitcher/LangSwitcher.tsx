import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/Button/Button";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

const LangSwitcher: React.FC<LangSwitcherProps> = memo(
  ({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const toggleLang = () => {
      i18n.changeLanguage(i18n.language === "ua" ? "en" : "ua");
    };

    return (
      <Button onClick={toggleLang} variant="clear">
        {t(short ? "Lang" : "Language")}
      </Button>
    );
  }
);

export default LangSwitcher;
