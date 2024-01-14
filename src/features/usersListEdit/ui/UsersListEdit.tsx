import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./UsersListEdit.module.scss";
import { useTranslation } from "react-i18next";

interface UsersListEditProps {
  className?: string;
}

const UsersListEdit: React.FC<UsersListEditProps> = ({ className }) => {
  const { t } = useTranslation();

  return <div className={classNames(cls.UsersListEdit, {}, [className])}></div>;
};

export default memo(UsersListEdit);
