import { classNames } from "shared/lib/classNames";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [])}>
      <div className={classNames(cls.links)}>/</div>
    </div>
  );
};
