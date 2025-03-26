import { useContext } from "react";
import { PopupContext } from "../constants/contexts.ts";

type ShareButtonProps = {
    link: string,
    className: string
}

function ShareButton({ link, className }: ShareButtonProps) {
    const popupContext = useContext(PopupContext);

    return (
        <button
            onClick={() => {
                void navigator.clipboard.writeText(`${import.meta.env.VITE_SITE_ADDRESS as string}/${link}`);
                popupContext.showPopup("Link copied");
            }}
            className={className}
        >
            -&gt; Share
        </button>
    );
}

export default ShareButton;
