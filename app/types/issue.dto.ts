export type IssueDto = {
    id: number,
    key: string,
    fields: {
        aggregateprogress: {
            percent: number
        },
        aggregatetimespent: number,
        aggregatetimeoriginalestimate: number,
        created: string,
        updated: string,
        summary: string,
        project: {
            key: string,
            name: string,
            avatarUrls: {
                "32x32": string
            }
        },
        status: {
            id: string,
            name: string
        },
        creator: {
            displayName: string,
            emailAddress: string,
            avatarUrls: {
                "32x32": string,
                "16x16": string
            }
        },
        reporter: {
            displayName: string,
            emailAddress: string,
            avatarUrls: {
                "32x32": string,
                "16x16": string
            }
        },
        assignee: {
            displayName: string,
            emailAddress: string,
            avatarUrls: {
                "32x32": string,
                "16x16": string
            }
        },
        priority: {
            name: string,
            iconUrl: string
        },
        issuetype: {
            name: string,
            iconUrl: string
        },
        timetracking: {
            originalEstimate: string,
            remainingEstimate: string,
            timeSpent: string
        },
        worklog: {
            worklogs: Array<
                {
                    id: string,
                    author: {
                        displayName: string,
                        emailAddress: string,
                        avatarUrls: {
                            "32x32": string,
                            "16x16": string
                        }
                    },
                    comment: string,
                    started: string,
                    timeSpent: string,
                    timeSpentSeconds: number
                }>
        }
    }
}