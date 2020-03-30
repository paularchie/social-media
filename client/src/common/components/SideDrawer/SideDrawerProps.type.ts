import { NavigationItemProps } from "../NavigationItems/NavigationItemsProps.type";

export type SideDrawerProps = {
    navigationItems: NavigationItemProps[],
    backdropClickHandler: () => void;
    showSideDrawer: boolean;
    navigationItemClickHandler: (route: string) => void;
    activeUrl: string;
}