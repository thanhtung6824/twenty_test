import React from 'react';
import {useAuth} from '../hooks';

const Header: React.FC = () => {
    const [isAuthenticate, logOut] = useAuth();

    return (
        <>
            <nav className="flex items-center flex-wrap justify-end shadow-md p-8">
                <div onClick={logOut} className="cursor-pointer font-bold text-sm text-purple-600 hover:text-purple-800">
                    <span>Logout</span>
                </div>

            </nav>
        </>
    )
};

export default Header;
