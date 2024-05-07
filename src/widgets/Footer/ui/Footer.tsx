import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./Footer.module.scss";
import { useTranslation } from "react-i18next";
import StarIcon from "@/shared/assets/icons/star-r.svg";

import { HStack } from "@/shared/ui/Stack";
import { Icon } from "@/shared/ui/Icon/Icon";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <HStack
      padding="24"
      align="center"
      justify="center"
      max
      className={classNames(cls.Footer, {}, [className])}
    >
      <Icon Svg={StarIcon} />
      <Icon Svg={StarIcon} />
      <Icon Svg={StarIcon} />
    </HStack>
  );
};

export default memo(Footer);
