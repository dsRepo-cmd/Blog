import React from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./LangSwitcher.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";

interface LangSwitcherProps {
  className?: string;
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({
  className,
}: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ua" ? "en" : "ua");
  };

  return (
    <Button
      className={classNames(cls.LangSwitcher, {}, [])}
      theme={ThemeButton.CLEAR}
      onClick={toggleLang}
    >
      {t("Language")}
    </Button>
  );
};

export default LangSwitcher;
