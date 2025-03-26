import { Outlet, useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../Utils.ts";
import { CommunityContext } from "../../constants/contexts.ts";
import { Community } from "../../constants/types.ts";

function CommunityLayout() {
    const { community: name } = useParams();
    const [community, setCommunity] = useState<Community | undefined>();
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        api.get(`communities/${name}`)
            .then((res) => {
                console.log(res.data);
                setCommunity(res.data);
                setIsMember(res.data.isMember);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [name]);

    return (
        <CommunityContext.Provider value={{ community: community!, isMember: isMember, setIsMember: setIsMember }}>
            {community && <Outlet/>}
        </CommunityContext.Provider>
    );
}

export default CommunityLayout;
