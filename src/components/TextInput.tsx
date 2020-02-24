import React, {ChangeEvent} from 'react';
import classNames from "classnames";

interface IInput {
    label: string;
    name: string;
    type: string;
    placeHolder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isDirty: boolean;
    textError: string;
}

const TextInput: React.FC<IInput> = ({label, name, type, placeHolder, value, onChange, isDirty, textError}) => {
    return (
        <>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
                    {label}
                </label>
                <input
                    value={value}
                    onChange={onChange}
                    name={name}
                    className={classNames(`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`, {
                        'border-red-500': !value && isDirty
                    })}
                    id={name} type={type} placeholder={placeHolder}/>
                <p className={classNames(`text-red-500 text-xs italic`, {
                    'hidden': value || !isDirty
                })}>{textError}</p>
            </div>
        </>
    )
};

export default TextInput;

