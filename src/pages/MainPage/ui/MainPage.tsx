import React, { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import cls from "./MainPage.module.scss";
import { useTranslation } from "react-i18next";

import { Page } from "widgets/Page";

import { Country } from "entities/Coutnry";
import ListBox from "shared/ui/ListBox/ListBox";

interface MainPageProps {
  className?: string;
}

const options = [
  { value: Country.USA, content: Country.USA },
  { value: Country.UKRAINE, content: Country.UKRAINE, disabled: true },
  { value: Country.POLLAND, content: Country.POLLAND },
];
const MainPage: React.FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {}, []);

  return (
    <Page className={classNames(cls.MainPage, {}, [className])}>
      <ListBox onChange={onChangeHandler} items={options} />
      <ListBox
        defaultValue="List"
        items={options}
        onChange={onChangeHandler}
        value={undefined}
      />
    </Page>
  );
};

export default memo(MainPage);
