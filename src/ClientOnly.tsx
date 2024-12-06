import {PropsWithChildren, useEffect, useState} from "react";

export const ClientOnly = ({children}: PropsWithChildren) => {
    const [client, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    },[])

    if(client){
        return children;
    }

    return null;
}