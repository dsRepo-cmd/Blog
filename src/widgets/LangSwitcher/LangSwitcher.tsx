import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import { useTranslation } from "react-i18next";
import Button, { ButtonTheme } from "shared/ui/Button/Button";

interface LangSwitcherProps {
  className?: string;
}

const LangSwitcher: React.FC<LangSwitcherProps> = memo(
  ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const toggleLang = () => {
      i18n.changeLanguage(i18n.language === "ua" ? "en" : "ua");
    };

    return (
      <Button
        className={classNames("", {}, [className])}
        theme={ButtonTheme.CLEAR}
        onClick={toggleLang}
      >
        {t("US")}
      </Button>
    );
  }
);

export default LangSwitcher;
