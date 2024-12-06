import {ChangeEvent, useState, useTransition} from "react";

/**
 * TODO
 * x do not block whole app when rendering filtered data
 * x show user, that the list is "loading"
 * - useDeferredValue
 */

const data = Array.from({length: 10000})
    .fill("")
    .map((v, i) => `content ${i}`)

export default function TransitionsPage() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [isPending, startTransition] = useTransition();

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
        <ul style={{opacity: isPending ? 0.5 : 1}}>
            {filteredData.map(v => <li key={v}>{v}</li>)}
        </ul>
    </div>
}
