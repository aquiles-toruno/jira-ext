import { useEffect, useState } from 'react';
import CurrentIssue from '../current-issue/current-issue';
import './header.css';
import { CurrentIssueDto } from '../../../types/currentIssue.dto';
import Menu from '../menu/menu';

export default function Header() {
    const [currentIssue, setCurrentIssue] = useState<CurrentIssueDto>({
        key: '',
        name: '',
        time: 0
    });

    useEffect(() => {
        chrome.storage.sync.get(['current_issue'], result => {
            if (result.issue)
                setCurrentIssue(result.current_issue);
        });
    }, []);

    const currentlyWorking = currentIssue.key === '';

    const currentIssueComponent = currentlyWorking ? <>
        <p>
            Actualmente no esta trabajando en ningun issue.
        </p>
    </> : <CurrentIssue {...currentIssue} />;

    return (
        <>
            <div className="header">
                <h1 className="text-2xl font-bold">JIRA</h1>
            </div>
            <Menu />
        </>
    )
}