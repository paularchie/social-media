import React from 'react';
import clsx from 'clsx';
import { NavigationItemProps } from './NavigationItemsProps.type';
import { withStyles, Theme, createStyles } from '@material-ui/core';

const NavigationItems = ({ items, activeUrl, clickHandler, classes }: any/* NavigationItemsProps*/): JSX.Element => {

    const handleClick = (item: NavigationItemProps): void => {
        clickHandler && item.route && clickHandler(item.route);
        item.clickHandler && item.clickHandler();
    }

    return (
        <ul className="navigation-items">
            {items.map((item, index) => (item.visible === undefined || item.visible)
                && (
                    <li
                        className="navigation-item"
                        key={index}
                    >
                        <a
                            className={clsx(
                                { 'active': item.route === activeUrl },
                                classes.a
                            )}
                            onClick={() => handleClick(item)}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
        </ul>
    )
}

export default withStyles((theme: Theme) =>
    createStyles({
        a: {
            '&.active, &:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.dark
            }
        }
    }))(NavigationItems);