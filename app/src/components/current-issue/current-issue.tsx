import { CurrentIssueProperties } from './current-issue-props';
import './current-issue.css';

export default function CurrentIssue({ key, name, time }: CurrentIssueProperties) {
    return <div className="current-issue-caption">
        <p>
            Actualmente trabajando en:
        </p>
        <p>
            <strong>
                {key}
                ({time}hr.)
            </strong>
        </p>
    </div>
}