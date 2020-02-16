import {useEffect} from "react";

// @ts-ignore
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event: { target: any; }) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}

export default useOnClickOutside;
