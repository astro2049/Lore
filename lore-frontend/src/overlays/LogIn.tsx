import { OverlayType } from "../constants/types.ts";
import { FormEvent, useContext, useState } from "react";
import { UserContext, OverlayContext } from "../constants/contexts.ts";
import LabeledInput from "../components/LabeledInput/LabeledInput.tsx";
import { api } from "../Utils.ts";
import CancelButton from "./components/CancelButton.tsx";

type LoginResponseData = {
    access_token: string
}

function LogIn() {
    const [, setOverlayType] = useContext(OverlayContext)!;
    const [username_, setUsername_] = useState("");
    const [password, setPassword] = useState("");
    const { storeLogInData } = useContext(UserContext)!;
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoggingIn(true);
        api.post<LoginResponseData>("auth/login", {
            username: username_,
            password: password
        })
            .then((res) => {
                console.log(res);
                storeLogInData(username_);
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsLoggingIn(false);
            })
    }

    return (
        <div className="w-[500px] pt-1 px-1 pb-3 bg-dark rounded-2xl">
            {/* Heading */}
            <div className="pb-0.75 flex w-full justify-end items-center">
                <CancelButton/>
            </div>
            <div className="px-3 flex flex-col grow">
                <h1 className="text-center text-2xl font-[700] text-white-custom">Log In</h1>
                <form onSubmit={handleSubmit}>
                    {/* Labeled Inputs */}
                    <LabeledInput label="Username" value={username_} setValue={setUsername_} disabled={isLoggingIn}/>
                    <LabeledInput label="Password" value={password} setValue={setPassword} disabled={isLoggingIn}/>

                    {/* text prompt for Sign Up */}
                    <div className="mt-1 text-sm text-blue-light-custom-3">
                        New to Lore?
                        <button
                            type="button"
                            onClick={() => setOverlayType(OverlayType.SignUp)}
                            className="ml-0.25 text-blue-500"
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Log In Button */}
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="mt-2.5 w-full py-0.5 px-1 text-dark font-bold bg-white-custom rounded-2xl disabled:bg-white/70"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
