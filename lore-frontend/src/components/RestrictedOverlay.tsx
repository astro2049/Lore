function RestrictedOverlay() {
    return (<>
        {import.meta.env.PROD &&
            <div
                className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(
                            -45deg,
                            rgba(255, 255, 0, 0.5) 0,
                            rgba(255, 255, 0, 0.5) 10px,
                            transparent 10px,
                            transparent 30px
                      )`,
                }}
            >
                <span className="text-base font-mono font-semibold">Restricted</span>
            </div>
        }
    </>);
}

export default RestrictedOverlay;
