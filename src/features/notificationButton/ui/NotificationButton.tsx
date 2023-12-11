import React, { memo } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./NotificationButton.module.scss";
import { useTranslation } from "react-i18next";

interface NotificationButtonProps {
  className?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.NotificationButton, {}, [className])}></div>
  );
};

export default memo(NotificationButton);
