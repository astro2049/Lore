import InformationBar from "./InformationBar.tsx";

function Profile() {
    return (
        <div className="w-full ">
            <div className="flex gap-x-1.5">
                <main className="mt-[30%] grow mb-2 text-3xl text-center">
                    <span className="block font-serif tracking-wide">! Under Construction !</span>
                    <span className="font-semibold">Page: Profile</span>
                </main>

                <div className="pt-1">
                    {/* User Information */}
                    <InformationBar/>
                </div>
            </div>
        </div>
    );
}

export default Profile;
