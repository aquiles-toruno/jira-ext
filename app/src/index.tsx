import ReactDOM from 'react-dom/client'
import App from './app'
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import GetRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const routes = GetRoutes();

root.render(
    <React.StrictMode>
        <App >
            <RouterProvider router={routes} />
        </App>
    </React.StrictMode>
);