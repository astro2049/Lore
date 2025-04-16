import { OverlayType } from "../../constants/types.ts";
import icon_cross from "../../assets/icon-cross-rotated.svg";
import { useContext } from "react";
import { OverlayContext } from "../../constants/contexts.ts";

function CancelButton() {
    const { setOverlayType } = useContext(OverlayContext);

    return (
        <button
            onClick={() => setOverlayType(OverlayType.None)}
            className="p-0.25 border-2 border-transparent hover:border-white/50"
        >
            <img src={icon_cross} alt="Cancel"/>
        </button>
    );
}

export default CancelButton;
