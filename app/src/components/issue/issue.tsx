import { IssueProperties } from "./issue.props";
import "./issue.css";
import { Link } from "react-router-dom";

export default function Issue({ issue }: IssueProperties) {
    const _getStatusColor = (status: string) => {
        let className = 'badge';

        switch (status) {
            default:
            case "1":
                className += ' info';
                break;
            case "3":
                className += ' warning';
                break;
        }

        return className;
    }

    return <div className="group/item flex issue p-2">
        <div className="flex-none w-10">
            <img src={issue.fields.project.avatarUrls['32x32']} alt="Project_Avatar" title={issue.fields.project.name} />
        </div>
        <div className="flex-auto">
            <div className="flex items-center space-x-1">
                <span className="code">
                    <Link to={`/issues/${issue.key}`}>{
                        issue.key
                    }</Link>
                </span>
                <span className="name">{issue.fields.summary}</span>
            </div>
            <div className="flex items-center">
                <small className={_getStatusColor(issue.fields.status.id)}>{issue.fields.status.name}</small>
                <span className="meta">
                    Creado por:
                    <a href={`mailto:${issue.fields.creator.emailAddress}`} > {issue.fields.creator.displayName}</a>
                </span>
                <span className="meta">
                    Reportado por:
                    <a href={`mailto:${issue.fields.reporter.emailAddress}`} > {issue.fields.reporter.displayName}</a>
                </span>
                <span className="meta">
                    <img src={issue.fields.priority.iconUrl} alt="Priority" title={issue.fields.priority.name} />
                </span>
                <span className="meta">
                    <img src={issue.fields.issuetype.iconUrl} alt="IssueType" title={issue.fields.issuetype.name} />
                </span>
            </div>
        </div>
        <div className="flex-auto">
            <a className="group/edit invisible hover:bg-slate-200 group-hover/item:visible ..." href="tel:{person.phone}">
                <span className="group-hover/edit:text-gray-700 ...">Call</span>
                <i className="fa-solid fa-camera"></i>
            </a>
        </div>
    </div >
}