import {useState, ChangeEvent, Dispatch, SetStateAction} from 'react'

type Return<T> = [T, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, Record<keyof T, boolean>, () => void, Dispatch<SetStateAction<T>>]


function useInput<T>(): Return<T> {
    const [input, setInput] = useState<T>({} as T);
    const [isDirty, setDirty] = useState({} as Record<keyof T, boolean>);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setDirty({
            ...isDirty,
            [e.target.name]: true
        });
    };

    const resetInput = () => {
        Object.keys(input).map((v) => (input[v as keyof T] as unknown as string) = '');
        Object.keys(isDirty).map((v) => (isDirty[v as keyof T] as unknown as string) = '');
        setInput({...input});
        setDirty({...isDirty});
    };

    return [input, handleInputChange, isDirty, resetInput, setInput]
}

export default useInput;
