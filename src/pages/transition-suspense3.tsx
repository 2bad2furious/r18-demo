import React, {PropsWithChildren, startTransition, Suspense, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ClientOnly} from "@/ClientOnly";
import {SomeData} from "@/SomeData";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


/**
 * TODO
 * x do not suspend whole app while we switch to b tab
 * x highlight b tab when switching to it
 */

export default function TransitionWithSuspense() {
    const [client] = useState(() => new QueryClient())
    return <QueryClientProvider client={client}>
        <ClientOnly>
            <Page/>
        </ClientOnly>
        <ReactQueryDevtools initialIsOpen/>
    </QueryClientProvider>
}

const TAB_OPTIONS = ["a", "b", "c"];
type Tab = typeof TAB_OPTIONS[number];

const Page = () => {
    const [activeTab, setActiveTab] = useState<Tab>("a");
    const [highlightedTab, setHighlightedTab] = useState<Tab>(activeTab);

    function handleTabChange(tab: Tab) {
        setHighlightedTab(tab);
        startTransition(() => {
            setActiveTab(tab);
        })
    }

    return <Suspense fallback={"Loading..."}>
        {TAB_OPTIONS.map(t => <Button key={t}
                                      active={activeTab == t}
                                      highlighted={highlightedTab == t && activeTab !== highlightedTab}
                                      activate={() => handleTabChange(t)}>
            {t}
        </Button>)}
        {activeTab === "b" && <SomeData timeout={1500} queryKey="b"/>}
    </Suspense>
}

const Button = ({children, highlighted, active, activate}: PropsWithChildren<{
    highlighted?: boolean;
    active: boolean;
    activate: () => void
}>) => {
    return <button onClick={activate} style={{
        background: active ? "darkgrey" : undefined,
        color: highlighted ? "lightgrey" : undefined
    }}>
        {children}
    </button>
}