import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import ButtonDeprecated, {
  ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/lib/features/ToggleFeatures/ToggleFeatures";
import Button from "@/shared/ui/redesigned/Button/Button";

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Button variant="clear">{t(short ? "Lang" : "Language")}</Button>}
        off={
          <ButtonDeprecated
            className={classNames("", {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggleLang}
          >
            {t("US")}
          </ButtonDeprecated>
        }
      />
    );
  }
);

export default LangSwitcher;
