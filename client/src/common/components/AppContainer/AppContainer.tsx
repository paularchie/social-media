import React, { useState } from 'react';
import './AppContainer.scss';
import SideDrawer from "../SideDrawer/SideDrawer";
import NavBar from '../NavBar/NavBar';
import { AppContainerProps } from './AppContainerProps.type';
import Footer from '../Footer/Footer';

const AppContainer = (props: AppContainerProps): JSX.Element => {

    const {
        showContentOnly,
        navigationItems,
        activeUrl,
        navigationItemClickHandler,
        children
    } = props

    const [showSideDrawer, setShowSideDrawer] = useState<boolean>(false);

    const handleMenuIconClick = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    const handleBackdropClick = () => {
        setShowSideDrawer(false);
    };

    const handleNavItemClick = (route: string) => {
        setShowSideDrawer(false);
        navigationItemClickHandler && navigationItemClickHandler(route);
    }

    return (
        <div className="flex column full-size">
            {!showContentOnly &&
                <>
                    <NavBar
                        menuIconClickHandler={handleMenuIconClick}
                        navigationItems={navigationItems}
                        navigationItemClickHandler={handleNavItemClick}
                        activeUrl={activeUrl}
                    ></NavBar>

                    <SideDrawer
                        showSideDrawer={showSideDrawer}
                        backdropClickHandler={handleBackdropClick}
                        navigationItems={navigationItems}
                        navigationItemClickHandler={handleNavItemClick}
                        activeUrl={activeUrl}
                    ></SideDrawer>
                </>}

            <main className='full-size'>
                {children}
            </main>

            {!showContentOnly && <Footer />}
        </div>
    )
}

export default AppContainer;
