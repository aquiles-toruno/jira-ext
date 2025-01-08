import Issue from "../../components/issue/issue";
import useSearch from "../../hooks/useSearch";

export default function Issues() {
    const { searchInput, result, handleInputChange } = useSearch();
    console.log('result', result)

    return <div>
        <div className="filter-box">
            <input type="text" className="input-control" value={searchInput} onChange={handleInputChange} />
            <div className="suggested-filters">

            </div>
        </div>
        {
            result.map((issue) => {
                return <Issue issue={issue} />
            })
        }
    </div>
}