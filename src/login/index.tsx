import React from 'react';
import classNames from 'classnames';
import {useHistory} from "react-router";
import {useInput, useToast, useLocalStorage} from "../hooks";
import {TextInput} from '../components'
import twenty_logo from "../twenty_logo.png";

interface IInput {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [input, handleChangeInput, isDirty, resetInput] = useInput<IInput>();
    const [user, setUser] = useLocalStorage('user', '');
    const [showToast] = useToast();
    const history = useHistory();

    const signIn = () => {
        if (input.username && input.password) {
            if (input.username === 'demo' && input.password === 'demo') {
                setUser(input.username);
                resetInput();
                return history.push('/posts');
            }
            return showToast('Username or Password incorrect.', 'error');
        }
    };

    return (
        <>
            <div className="w-full max-w-md mg-0-auto ">
                <div className="mt-32">
                    <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <img src={twenty_logo} alt=""/>
                        </div>
                        <TextInput
                            label={"Username"}
                            name={"username"}
                            type={"text"}
                            placeHolder={"Username"}
                            value={input.username}
                            onChange={handleChangeInput}
                            isDirty={isDirty.username}
                            textError={"Please enter your username."}/>
                        <TextInput
                            label={"Password"}
                            name={"password"}
                            type={"password"}
                            placeHolder={"***********"}
                            value={input.password}
                            onChange={handleChangeInput}
                            isDirty={isDirty.password}
                            textError={"Please enter your password."}/>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={signIn}
                                className={classNames(`bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none`, {
                                    'opacity-50 cursor-not-allowed': !input.username || !input.password,
                                    ' hover:bg-purple-700  focus:shadow-outline': input.username && input.password,
                                })}
                                type="button">
                                Sign In
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-purple-600 hover:text-purple-800"
                               href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Thanh Tung. All rights reserved.
                </p>
            </div>
        </>
    );
};

export default Login;


