import { ReactNode, useState } from 'react';
import { PopupContext } from '../../constants/contexts.ts';

const popupTime = 3000;

type PopupControllerProps = {
    children: ReactNode
}

function PopupController({ children }: PopupControllerProps) {
    const [text, setText] = useState("");
    const [timeoutId, setTimeoutId] = useState(-1);

    function showPopup(text: string): void {
        setText(text);

        clearTimeout(timeoutId);
        setTimeoutId(
            window.setTimeout(() => {
                setText("");
            }, popupTime)
        );
    }

    return (
        <PopupContext.Provider
            value={{
                showPopup: showPopup
            }}
        >
            {children}
            {
                text !== "" &&
                <div
                    className="w-[300px] py-1.5 pl-2 fixed left-1/2 -translate-x-1/2 bottom-[100px] text-sm text-dark bg-white-custom rounded-full z-2">
                    {text}
                </div>
            }
        </PopupContext.Provider>
    );
}

export default PopupController;
