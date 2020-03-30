import React, { useEffect, useState } from 'react';
import Signin from './pages/Signin/Signin';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import useUserApi from './common/hooks/UserApi.hook';
import { useDispatch } from 'react-redux';
import { setCurrentUser, removeCurrentUser } from './redux/user/user.actions';
import useUserSelectors from './redux/user/user.selectors';
import AppContainer from './common/components/AppContainer/AppContainer';
import { NavigationItemProps } from './common/components/NavigationItems/NavigationItemsProps.type';

const App = ({ history, location }): JSX.Element => {

    const { isLoggedIn } = useUserSelectors()
    const dispatch = useDispatch();
    const userApi = useUserApi();
    const [loading, setLoading] = useState(true);


    const [currentRoute, setCurrentRoute] = useState<string>();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location]);

    const getUser = async () => {
        try {
            const user = await userApi.getUser();
            user && dispatch(setCurrentUser(user));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    function getNavigationItems(): NavigationItemProps[] {
        return [
            {
                id: 'home',
                text: 'Home',
                route: '/',
                active: true,
            },
            {
                id: 'test',
                text: 'Test',
                route: '/test',
                visible: isLoggedIn,
            },
            {
                id: 'logout',
                text: 'Logout',
                clickHandler: handleLogout,
                visible: isLoggedIn,
            },
        ];
    }

    const handleNavigationItemClick = (route: string) => {
        history.push(route);
    };

    const handleLogout = () => {
        userApi.logout();
        dispatch(removeCurrentUser());
    };

    const showContentOnly = location.pathname === '/signin';

    return (
        <>
            {loading
                ? <div>loding...</div>
                : <AppContainer
                    navigationItems={getNavigationItems()}
                    navigationItemClickHandler={handleNavigationItemClick}
                    activeUrl={currentRoute}
                    showContentOnly={showContentOnly}
                >
                    {isLoggedIn
                        ? <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/signin' render={() => <Redirect to='/' />} />
                            <Route path='*' component={() => <div>404</div>} />
                        </Switch>
                        : <>
                            <Route path='/signin' component={Signin} />
                            <Route path='*' render={() => <Redirect to='/signin' />} />
                        </>
                    }
                </AppContainer>
            }
        </>
    );
};

export default withRouter(App);