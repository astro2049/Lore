import { ReactNode, useContext, useEffect, useState } from "react";
import { UserContext, CommunitiesContext } from "../../constants/contexts.ts";
import { api } from "../../Utils.ts";

type CommunitiesControllerProps = {
    children: ReactNode
}

function CommunitiesController({ children }: CommunitiesControllerProps) {
    const [communities, setCommunities] = useState([]);
    const [allCommunities, setAllCommunities] = useState([]);
    const { username } = useContext(UserContext);

    function updateCommunities() {
        api.get(`users/${username}?communities`)
            .then((res) => {
                // console.log(res.data);
                setCommunities(res.data.communities);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function updateAllCommunities() {
        api.get("communities")
            .then((res) => {
                // console.log(res.data);
                setAllCommunities(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        updateAllCommunities();
    }, []);

    return (
        <CommunitiesContext.Provider
            value={{
                communities: communities,
                updateCommunities: updateCommunities,
                allCommunities: allCommunities,
                updateAllCommunities: updateAllCommunities
            }}
        >
            {children}
        </CommunitiesContext.Provider>
    );
}

export default CommunitiesController;
