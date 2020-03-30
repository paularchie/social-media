export type NavigationItemProps = {
    id: string;
    text: string;
    route?: string;
    active?: boolean;
    visible?:boolean;
    clickHandler?: () => void;
}

export type NavigationItemsProps = {
    items: NavigationItemProps[];
    activeUrl?: string;
    clickHandler?: (route: string) => void 
}