import { createHashRouter, createMemoryRouter } from "react-router-dom";
import Content from "./components/content/content";
import Assigned from "./pages/assigned/page";
import Issues from "./pages/issue/page";
import Popup from "./layout";
import IssueDetail from "./pages/issue/[code]/page";

export default function GetRoutes() {
    return createHashRouter([
        {
            path: "/",
            element: <Popup />,
            children: [
                {
                    index: true,
                    element: <Content />
                },
                {
                    path: "assigned",
                    caseSensitive: false,
                    element: <Assigned />
                },
                {
                    path: "issues",
                    caseSensitive: false,
                    children: [
                        {
                            index: true,
                            element: <Issues />
                        },
                        {
                            path: ":code",
                            caseSensitive: false,
                            element: <IssueDetail />
                        }
                    ]
                }
            ]
        },
    ]);
}