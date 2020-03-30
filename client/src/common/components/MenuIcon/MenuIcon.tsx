import React from 'react';

import './MenuIcon.scss';
import { MenuIconProps } from './MenuIconProps.type';

const MenuIcon = ({ clickHandler }: MenuIconProps): JSX.Element => {

    return (
        <div className="nav-icon-container" onClick={clickHandler}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    );

}
export default MenuIcon;
