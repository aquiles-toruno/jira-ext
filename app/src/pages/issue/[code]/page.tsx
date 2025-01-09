import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IssueDto } from "../../../../types/issue.dto";
import PersonLink from "../../../components/personLink/personLink";
import useJiraDate from "../../../hooks/useJiraDate";
import ProgressBar from "../../../components/progressBar/progressBar";

export default function IssueDetail() {
    const [issueDetail, setIssueDetail] = useState<IssueDto>({
        id: 0,
        key: '',
        fields: {
            created: '',
            updated: '',
            aggregateprogress: {
                percent: 0,
            },
            aggregatetimespent: 0,
            aggregatetimeoriginalestimate: 0,
            project: {
                key: '',
                name: '',
                avatarUrls: {
                    '32x32': ''
                },
            },
            summary: '',
            status: {
                id: '',
                name: ''
            },
            creator: {
                displayName: '',
                emailAddress: '',
                avatarUrls: {
                    "16x16": '',
                    '32x32': ''
                },
            },
            reporter: {
                displayName: '',
                emailAddress: '',
                avatarUrls: {
                    "16x16": '',
                    '32x32': ''
                },
            },
            assignee: {
                displayName: '',
                emailAddress: '',
                avatarUrls: {
                    "16x16": '',
                    '32x32': ''
                },
            },
            priority: {
                name: '',
                iconUrl: ''
            },
            issuetype: {
                name: '',
                iconUrl: ''
            },
            timetracking: {
                originalEstimate: '',
                remainingEstimate: '',
                timeSpent: ''
            },
            worklog: {
                worklogs: []
            }
        }
    });
    const { code } = useParams();
    const { formatDate } = useJiraDate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_JIRA_BASE_URL}/rest/api/2/issue/${code}`, {
            headers: {
                "Authorization": 'Basic ' + btoa(`${process.env.REACT_APP_JIRA_USER}:${process.env.REACT_APP_JIRA_PASS}`)
            }
        })
            .then((response) => {
                response.json().then(value => {
                    console.log(value)
                    setIssueDetail(value)
                })
            })
            .catch(console.error)
    }, [code]);

    const _dateFormatter = (date: Date) => {
        const formattedDate = date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: '2-digit' });
        const formattedTime = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${formattedDate} ${formattedTime}`
    }

    const _getEstimateTimePercentage = (originalTimeEstimate: number, spentTime: number) => {
        if (spentTime < originalTimeEstimate)
            return 100;

        let percentage = (originalTimeEstimate * 100) / spentTime;

        return Math.ceil(percentage);
    }

    return <div className="">
        <div className="bg-gray-100 border-b border-b-gray-400">
            <div className="p-2">
                <div className="flex items-center">
                    <div className="flex-none w-8">
                        <img src={issueDetail.fields.project.avatarUrls['32x32']} alt="Project_Avatar" />
                    </div>
                    <div className="flex-auto ml-5">
                        <div className="font-semibold text-sky-600">
                            {issueDetail.fields.project.name} / {code}
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg">
                                {issueDetail.fields.summary}
                            </span>
                            <span className="pt-1 pb-1 pr-1 pl-1" style={{ lineHeight: '16px' }}>
                                <img src={issueDetail.fields.priority.iconUrl} alt="Priority" title={issueDetail.fields.priority.name} />
                            </span>
                            <span className="pt-1 pb-1 pr-1 pl-1" style={{ lineHeight: '16px' }}>
                                <img src={issueDetail.fields.issuetype.iconUrl} alt="IssueType" title={issueDetail.fields.issuetype.name} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-2">
            <div>
                <fieldset className="no-border">
                    <legend className="font-semibold">General</legend>

                    <div className="flex flex-col space-y-3 p-1">
                        <div className="flex">
                            <span className="w-1/3 text-gray-500 font-medium text-sm">Creado:</span>
                            <span className="w-2/3">
                                {issueDetail.fields.created}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-1/3 text-gray-500 font-medium text-sm">Actualizado:</span>
                            <span className="w-2/3">
                                {issueDetail.fields.updated}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-1/3 text-gray-500 font-medium text-sm">Tiempo estimado:</span>
                            <span className="w-2/3">
                                <ProgressBar progressValue={_getEstimateTimePercentage(issueDetail.fields.aggregatetimeoriginalestimate, issueDetail.fields.aggregatetimespent)}
                                    color="info"
                                    title={formatDate(issueDetail.fields.timetracking.originalEstimate)} />
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-1/3 text-gray-500 font-medium text-sm">Tiempo restante:</span>
                            <span className="w-2/3">
                                <ProgressBar progressValue={issueDetail.fields.aggregateprogress.percent}
                                    color="default"
                                    bgcolor="warning"
                                    bgTitle={formatDate(issueDetail.fields.timetracking.remainingEstimate)} />
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-1/3 text-gray-500 font-medium text-sm">Tiempo registrado:</span>
                            <span className="w-2/3">
                                <ProgressBar progressValue={issueDetail.fields.aggregateprogress.percent}
                                    color="success"
                                    title={formatDate(issueDetail.fields.timetracking.timeSpent)} />
                            </span>
                        </div>
                    </div>
                </fieldset>
            </div>

            <div className="mt-1">
                <fieldset className="no-border">
                    <legend className="font-semibold">Personas</legend>

                    <div className="flex flex-col space-y-3 p-1">
                        <div className="flex">
                            <span className="w-1/3 text-gray-500 font-medium text-sm">Creado por:</span>
                            <span className="w-2/3 flex items-center">
                                <img className="mr-2" src={issueDetail.fields.creator.avatarUrls['16x16']} alt="Project_Avatar" />
                                <PersonLink label={issueDetail.fields.creator.displayName} url={`mailto:${issueDetail.fields.creator.emailAddress}`} />
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-1/3 text-gray-500 font-medium text-sm">Reportado por:</span>
                            <span className="w-2/3 flex items-center">
                                <img className="mr-2" src={issueDetail.fields.reporter.avatarUrls['16x16']} alt="Project_Avatar" />
                                <PersonLink label={issueDetail.fields.reporter.displayName} url={`mailto:${issueDetail.fields.reporter.emailAddress}`} />
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-1/3 text-gray-500 font-medium text-sm">Asignado a:</span>
                            <span className="w-2/3 flex items-center">
                                <img className="mr-2" src={issueDetail.fields.assignee.avatarUrls['16x16']} alt="Project_Avatar" />
                                <PersonLink label={issueDetail.fields.assignee.displayName} url={`mailto:${issueDetail.fields.assignee.emailAddress}`} />
                            </span>
                        </div>
                    </div>
                </fieldset>
            </div>

            <div className="mt-1">
                <fieldset className="no-border">
                    <legend className="font-semibold">Worklog</legend>
                    {
                        issueDetail.fields.worklog.worklogs.length > 0 ?
                            issueDetail.fields.worklog.worklogs.map(worklog => {
                                return <div key={worklog.id} className="border-b p-2 hover:bg-gray-100">
                                    <div className="flex space-x-1 items-center justify-between">
                                        <span className="flex items-center">
                                            <img className="mr-1" src={worklog.author.avatarUrls['16x16']} alt="Project_Avatar" />
                                            <PersonLink classNames="text-base"
                                                label={worklog.author.displayName}
                                                url={`mailto:${worklog.author.emailAddress}`} />
                                            <small className="ml-1 badge flex-none info">
                                                {formatDate(worklog.timeSpent)}
                                            </small>
                                        </span>
                                        <span className="font-light text-xs">
                                            {_dateFormatter(new Date(worklog.started))}
                                        </span>
                                    </div>
                                    <div className="mt-1">
                                        <span className="font-sans text-sm">
                                            {worklog.comment}
                                        </span>
                                    </div>
                                </div>
                            })
                            : null
                    }
                </fieldset>
            </div>
        </div>
    </div>;
}