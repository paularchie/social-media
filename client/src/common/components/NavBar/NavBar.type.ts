import { NavigationItemProps } from "../NavigationItems/NavigationItemsProps.type";

export type NavBarProps = {
    navigationItems: NavigationItemProps[],
    menuIconClickHandler: () => void;
    navigationItemClickHandler: (route: string) => void;
    activeUrl: string;
}