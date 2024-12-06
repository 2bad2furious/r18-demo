import {useSuspenseQuery} from "@tanstack/react-query";
import {sleep} from "radash";
import React from "react";

export const SomeData = ({timeout, queryKey, errChance = 0}: {
    timeout: number,
    queryKey: unknown,
    errChance?: number
}) => {
    console.debug("Trying to render", queryKey);

    const {data} = useSuspenseQuery({
        queryKey: ["data", queryKey],
        queryFn: async () => {
            await sleep(timeout);
            if (Math.random() < errChance) {
                console.error("err")
                throw new Error("Failed to fetch " + queryKey)
            }
            return Math.floor(Math.random() * 100);
        },
        retry: false,
        staleTime: 60 * 1000
    });

    return <div>
        <h1>Random number</h1>
        <div>{data}</div>
    </div>
}