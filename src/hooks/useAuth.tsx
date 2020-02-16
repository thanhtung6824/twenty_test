import useLocalStorage from './useLocalStorage';
import {
    useHistory
} from 'react-router-dom';

const useAuth = () => {
    const history = useHistory();
    const [user, setUser, removeUser] = useLocalStorage('user', '');
    const [token, setToken, removeToken] = useLocalStorage('token', '');
    const [expiredTime, setExpiredTime, removeExpiredTime] = useLocalStorage('expiredTime', '');

    const isAuthenticated = () => {
        const isExpired = +expiredTime < Math.floor(Date.now() / 1000);
        return !isExpired && user && token;
    };

    const logOut = () => {
        removeUser('user');
        removeToken('token');
        removeExpiredTime('expiredTime');
        history.replace('/')
    };

    return [isAuthenticated, logOut]
};

export default useAuth;

