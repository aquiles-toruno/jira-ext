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
                    "Authorization": 'Basic ' + btoa(`${process.env.REACT_APP_JIRA_USER}:${process.env.REACT_APP_JIRA_PASS}`)
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