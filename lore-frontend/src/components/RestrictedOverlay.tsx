function RestrictedOverlay() {
    return (<>
        {import.meta.env.PROD &&
            <div className="warning absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
                <span className="text-base font-mono font-semibold">Restricted</span>
            </div>
        }
    </>);
}

export default RestrictedOverlay;
