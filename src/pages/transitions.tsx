import {ChangeEvent, useMemo, useState} from "react";

/**
 * TODO
 * - do not block whole app when rendering filtered data
 * - show user, that the list is "loading"
 * - useDeferredValue
 */

const data = Array.from({length: 10000})
    .fill("")
    .map((v, i) => `content ${i}`)

export default function TransitionsPage() {
    const [search, setSearch] = useState("");
    const filteredData = useMemo(() => data.filter(v => v.includes(search)), [search]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const s = e.currentTarget.value;
        setSearch(s);
    }

    return <div>
        <input value={search} onChange={handleChange}/>
        <br/>
        <br/>
        <ul>
            {filteredData.map(v => <li key={v}>{v}</li>)}
        </ul>
    </div>
}
