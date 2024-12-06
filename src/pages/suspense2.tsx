import {QueryClient, QueryClientProvider, QueryErrorResetBoundary, useSuspenseQuery} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import React, {PropsWithChildren, Suspense, useState} from "react";
import {sleep} from "radash";
import {ErrorBoundary} from "react-error-boundary";

import {ClientOnly} from '@/ClientOnly';
import {Loader} from "@/Loader";
import {SomeData} from "@/SomeData";

/**
 * TODO
 * x explore SuspensePage, SomeData components
 * x add error boundary to display errors
 * x share suspense boundary for multiple/nested components
 * - use resettable boundary
 */

export default function SuspenseStuff() {
    const [client] = useState(() => new QueryClient())
    return <QueryClientProvider client={client}>
        <ClientOnly>
            <SuspensePage/>
        </ClientOnly>
        <ReactQueryDevtools initialIsOpen/>
    </QueryClientProvider>
}


export const SuspensePage = () => {
    return <>
        abc
        <Suspense fallback={<Loader/>}>
            <ErrorBoundary fallback={"Omg error"}>
                <Auth>
                    <SomeData timeout={1500} queryKey="a" errChance={1}/>
                    <SomeData timeout={2500} queryKey="b" errChance={1}/>
                </Auth>
            </ErrorBoundary>
        </Suspense>
    </>
}


const Auth = ({children}: PropsWithChildren) => {
    useSuspenseQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            await sleep(1000);
            return true;
        }
    })

    return <div>
        Authed
        <>{children}</>
    </div>
}

const ResettableErrorBoundary = ({children}: PropsWithChildren) => {
    return <QueryErrorResetBoundary>
        {({reset}) => {
            return <ErrorBoundary
                onReset={reset}
                fallbackRender={({resetErrorBoundary}) => <div>Error omg <button
                    onClick={() => resetErrorBoundary()}>Reset</button></div>}>
                {children}
            </ErrorBoundary>
        }}
    </QueryErrorResetBoundary>
}
