import { classNames } from "@/shared/lib/classNames";
import cls from "./Navbar.module.scss";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { NotificationButton } from "@/features/notificationButton";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = memo(({ className }: NavbarProps) => {
  const authData = useSelector(getUserAuthData);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <HStack padding="8" gap="12" className={cls.wrapper}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <VStack padding="8" className={cls.wrapper}>
        <AvatarDropdown />
      </VStack>
    </header>
  );
});
