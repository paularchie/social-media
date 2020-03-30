import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuIcon from '../MenuIcon/MenuIcon';
import { NavBarProps } from './NavBar.type';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

const NavBar = ({ navigationItems, menuIconClickHandler, navigationItemClickHandler, activeUrl }: NavBarProps): JSX.Element => {

    return (
        <div className="header">
            <div
                className="welcome-bar"
            >
                <Link to="/">
                    {/* <img src={logo} /> */}
                </Link>
            </div>
            <AppBar position="static">
                <Toolbar>
                    <nav className="mobile-only">
                        <MenuIcon clickHandler={menuIconClickHandler} />
                    </nav>
                    <nav className="desktop-only">
                        <NavigationItems
                            items={navigationItems}
                            activeUrl={activeUrl}
                            clickHandler={navigationItemClickHandler} />
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;