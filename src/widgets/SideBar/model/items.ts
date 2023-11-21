import Main from "shared/assets/icons/home.svg";
import About from "shared/assets/icons/document.svg";
import Profile from "shared/assets/icons/user.svg";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

export interface SideBarItemType {
  path: string;
  text: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const SideBarItemList: SideBarItemType[] = [
  { path: RoutePath.main, Icon: Main, text: "Main" },
  { path: RoutePath.about, Icon: About, text: "About" },
  { path: RoutePath.profile, Icon: Profile, text: "Profile" },
];
