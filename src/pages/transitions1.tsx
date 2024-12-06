import {ChangeEvent, startTransition, useState} from "react";

/**
 * TODO
 * x do not block whole app when rendering filtered data
 * - show user, that the list is "loading"
 * - useDeferredValue
 */

const data = Array.from({length: 10000})
    .fill("")
    .map((v, i) => `content ${i}`)

export default function TransitionsPage() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const s = e.currentTarget.value;
        setSearch(s);
        startTransition(() => {
            setFilteredData(data.filter(v => v.includes(search)));
        });
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
