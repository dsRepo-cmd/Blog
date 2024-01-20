import React from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./AboutPage.module.scss";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import Text from "@/shared/ui/redesigned/Text/Text";
import { VStack } from "@/shared/ui/redesigned/Stack";
import AppImage from "@/shared/ui/redesigned/AppImage/AppImage";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";

interface AboutPageProps {
  className?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page
      data-testid={"AboutPage"}
      className={classNames(cls.AboutPage, {}, [className])}
    >
      <VStack gap={"24"} align={"center"}>
        <Text title={t("About Page")} />
        <Text text="Pellentesque elementum tempus justo, vel fermentum risus eleifend vel. Suspendisse bibendum eros eget erat venenatis pulvinar id ac eros. Etiam viverra euismod varius. Praesent velit ex, mollis et ullamcorper in, dapibus eget leo. Aliquam imperdiet semper orci, sit amet aliquam ex efficitur a. Duis sed maximus libero. Integer neque odio, facilisis non pharetra et, egestas id enim. Nunc tincidunt scelerisque tortor, eu rutrum dolor. Integer id molestie dolor. Integer a fermentum risus, vitae ornare ex. Etiam ac justo vitae dolor vestibulum efficitur ut sed elit. Proin at rhoncus lacus, id porta elit. Aenean a consectetur tellus, id suscipit tellus." />
        <Text text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ea, tempore fugiat vero quaerat soluta dolorum error? Asperiores pariatur molestias iste, doloribus voluptas odio saepe delectus, consectetur, atque explicabo nobis" />
        <Text text="Donec volutpat, massa pulvinar aliquam interdum, elit diam luctus mi, ac dictum ipsum tellus malesuada augue. Proin a pretium justo. Pellentesque bibendum enim sit amet aliquet tempus. Aliquam ac velit erat. Nulla tincidunt justo quis mi dapibus ullamcorper eu non ex. Morbi egestas mi quis purus lobortis, ac faucibus ante commodo. Integer pulvinar condimentum molestie. Donec suscipit, enim eget suscipit finibus, leo justo tempor nibh, ac blandit arcu nibh et turpis. Sed sit amet libero et ex malesuada consectetur eu et massa. Pellentesque rhoncus, metus at sodales aliquam, ex nisl venenatis dui, a convallis erat massa nec purus. Mauris laoreet lectus libero, ac vehicula ligula hendrerit sit amet. Curabitur interdum dui sed lorem consequat convallis. Sed suscipit, leo id imperdiet posuere, velit eros eleifend elit, eget faucibus quam lacus et massa." />
        <AppImage
          className={classNames(cls.image, {}, [className])}
          fallback={<Skeleton width={"100%"} height={350} />}
          src="https://picsum.photos/650/400?random=1"
        />
      </VStack>
    </Page>
  );
};

export default AboutPage;
