import React from 'react';
import {ToastContainer} from 'react-toastify';

const Toast: React.FC = ({...props}) => {
    return (
        <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            {...props}
        />
    )
};

export default Toast;
