import '@fortawesome/fontawesome-free/css/all.min.css';
import './app.css';
import { useEffect } from "react";

interface AppProperties {
    children: React.ReactNode | React.ReactNode[]
}

export default function App({ children }: AppProperties) {
    useEffect(() => {
        document.body.classList.add('body-popup');
    }, []);

    return <>
        {children}
    </>
}