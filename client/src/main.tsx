import React, { useEffect, useState } from 'react';
import Signin from './pages/Signin/Signin';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './pages/Signin/Home/Home';
import useUserApi from './common/hooks/UserApi.hook';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import useUserSelectors from './redux/user/user.selectors';

const Main = () => {

    const {isLoggedIn} = useUserSelectors()
    const dispatch = useDispatch();
    const userApi = useUserApi();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const user = await userApi.getUser();
            user && dispatch(setCurrentUser(user));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    return (
        <>
            {loading
                ? <div>loding...</div>
                : <>
                    {isLoggedIn
                        ? <>
                            <Switch>
                                <Route path='/' exact component={Home} />
                                <Route path='/signin' render={() => <Redirect to='/' />} />
                                <Route path='*' component={() => <div>404</div>} />
                            </Switch>
                        </>
                        : <>
                            <Route path='/signin' component={Signin} />
                            <Route path='*' render={() => <Redirect to='/signin' />} />
                        </>
                    }
                </>
            }
        </>
    );
};

export default Main;