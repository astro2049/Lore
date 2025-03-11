import { OverlayType } from "../../constants/types.ts";
import icon_cross from "../../assets/icon-cross-rotated.svg";
import { useContext, useState } from "react";
import { OverlayContext } from "../../constants/contexts.ts";
import LabeledInput from "../../components/LabeledInput/LabeledInput.tsx";

function SignUp() {
    const [, setOverlayType] = useContext(OverlayContext)!;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="w-[500px] pt-1 px-1 pb-3 bg-dark rounded-2xl">
            {/* Heading */}
            <div className="pb-0.75 flex w-full justify-end items-center">
                <button
                    onClick={() => setOverlayType(OverlayType.None)}
                    className="p-[6px] border-2 border-transparent hover:border-white/20 rounded-full"
                >
                    <img src={icon_cross} alt="Cancel"/>
                </button>
            </div>
            <div className="px-3 flex flex-col grow">
                <h1 className="text-center text-2xl font-[700] text-white-custom">Sign Up</h1>
                {/* Labeled Inputs */}
                <LabeledInput label="Username" value={username} setValue={setUsername}/>
                <LabeledInput label="Password" value={password} setValue={setPassword}/>
                <div className="mt-1 text-sm text-blue-light-custom-3">
                    Already have an account?
                    <button
                        onClick={() => setOverlayType(OverlayType.LogIn)}
                        className="ml-0.25 text-blue-500"
                    >
                        Log In
                    </button>
                </div>
                {/* Log In Button */}
                <button
                    className="mt-2.5 py-0.5 px-1 text-dark font-bold bg-white-custom rounded-2xl"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default SignUp;
