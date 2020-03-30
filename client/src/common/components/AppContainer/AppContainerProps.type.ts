import { NavigationItemProps } from "../NavigationItems/NavigationItemsProps.type";

export type AppContainerProps = {
    navigationItems: NavigationItemProps[]
    navigationItemClickHandler?: (route: string) => void
    activeUrl?: string
    children?: any
    showContentOnly?: boolean
};