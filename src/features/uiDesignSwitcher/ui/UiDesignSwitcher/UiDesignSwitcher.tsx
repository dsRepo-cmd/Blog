import { useTranslation } from "react-i18next";
import { FC, memo, useState } from "react";
import { useSelector } from "react-redux";
import { ListBox } from "@/shared/ui/redesigned/Popups";

import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "@/entities/User";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { getFeatureFlag } from "@/shared/lib/features/lib/setGetFeatures";
import Text from "@/shared/ui/redesigned/Text/Text";
import Skeleton from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { updateFeatureFlag } from "@/shared/lib/features";

interface UiDesignSwitcherProps {
  className?: string;
}

const UiDesignSwitcher: FC<UiDesignSwitcherProps> = ({ className }) => {
  const { t } = useTranslation();
  const isAppRedesigned = getFeatureFlag("isAppRedesigned");
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const items = [
    {
      content: t("New"),
      value: "new",
    },
    {
      content: t("Old"),
      value: "old",
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlag({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === "new",
          },
        })
      ).unwrap();
      setIsLoading(false);
    }
  };

  return (
    <HStack gap={"24"}>
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          label={t("Interface option")}
          onChange={onChange}
          items={items}
          value={isAppRedesigned ? "new" : "old"}
          className={className}
        />
      )}
    </HStack>
  );
};

export default memo(UiDesignSwitcher);
