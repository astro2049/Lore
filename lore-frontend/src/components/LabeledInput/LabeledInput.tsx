import "./LabeledInput.css"
import { Dispatch, SetStateAction } from "react";

type LabeledInputProps = {
    label: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

function LabeledInput({
                          label,
                          value,
                          setValue
                      }: LabeledInputProps
) {
    return (
        <div className="mt-1.5 relative">
            <input placeholder=""
                   value={value}
                   onInput={(e) => {
                       setValue(e.currentTarget.value);
                   }}
                   className="labeled-input block w-full h-[56px] py-0.5 px-1 border border-white/20 rounded-2xl"/>
            <label
                className="absolute left-1 top-1 text-white/50 transition-all duration-100 ease-in-out pointer-events-none">
                {label}
                <span className="text-red-500">*</span>
            </label>
        </div>
    );
}

export default LabeledInput;
