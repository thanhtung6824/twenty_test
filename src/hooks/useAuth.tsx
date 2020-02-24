import {MouseEvent} from 'react';
import useLocalStorage from './useLocalStorage';
import {
    useHistory
} from 'react-router-dom';

const useAuth = () : [boolean, (event: MouseEvent<HTMLElement>) => void] => {
    const history = useHistory();
    const [user, setUser, removeItem] = useLocalStorage<string>('user', '');

    const isAuthenticated = !!user;

    const logOut = () => {
        removeItem();
        history.replace('/')
    };

    return [isAuthenticated, logOut]
};

export default useAuth;

