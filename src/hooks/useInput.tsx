import {ChangeEvent, useState} from 'react'

export const useInput = () => {
    const [input, setInput] = useState({})

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    });

    return [input, handleInputChange]
}
