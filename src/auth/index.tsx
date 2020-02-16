import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const AuthRoute: React.FC = ({children, ...rest}) => {
    const [isAuthenticated] = useAuth();

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};

export default AuthRoute;

