import React from 'react';
import clsx from 'clsx';
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from '../Backdrop/Backdrop';
import { SideDrawerProps } from './SideDrawerProps.type';

const SideDrawer = (props: SideDrawerProps): JSX.Element => {

    const classes = {
        "side-drawer": true,
        "open": props.showSideDrawer,
        "close": !props.showSideDrawer
    }

    return (
        <>
            <Backdrop
                showBackdrop={props.showSideDrawer}
                backdropClickHandler={props.backdropClickHandler}
            />
            <div className={clsx(classes)}>
                <nav >
                    <NavigationItems
                        items={props.navigationItems}
                        activeUrl={props.activeUrl}
                        clickHandler={props.navigationItemClickHandler} />
                </nav>
            </div>
        </>
    )
};

export default SideDrawer;