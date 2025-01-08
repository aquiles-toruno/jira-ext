import { useState } from "react";

function useSearch() {
    const [searchInput, setSearchInput] = useState<string>('');
    const [result, setResult] = useState<any[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setSearchInput(value);

        if (value)
            fetch(`http://tcqa.simplexity.com.co:8050/rest/api/2/search?jql=summary ~ "${value}"`, {
                headers: {
                }
            })
                .then((response) => {
                    response.json().then(response => {
                        setResult(response.issues)
                    })
                })
                .catch(console.error)
        else
            setResult([])
    };

    return { searchInput, result, handleInputChange };
}

export default useSearch;