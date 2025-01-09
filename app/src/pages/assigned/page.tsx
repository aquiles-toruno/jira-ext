import { useEffect, useState } from "react"
import Issue from "../../components/issue/issue";

export default function Assigned() {
    const [issues, setIssues] = useState<any[]>([])

    useEffect(() => {
        fetch("http://tcqa.simplexity.com.co:8050/rest/api/2/search?jql=assignee=aquiles.gonzalez", {
            headers: {
                "Authorization": 'Basic ' + btoa(`${process.env.REACT_APP_JIRA_USER}:${process.env.REACT_APP_JIRA_PASS}`)
            }
        })
            .then((response) => {
                response.json().then(response => {
                    setIssues(response.issues)
                })
            })
            .catch(console.error)
    }, []);

    return <div>
        {
            issues.map((issue) => {
                return <Issue issue={issue}/>
            })
        }
    </div>
}