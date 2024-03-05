
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from '../Index';
import Home from '../pages/dashboard';
import { useEffect } from 'react';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index/>,
        children:[
            {
                path: '/dashboard',
                element: <Home/>
            },
        ]
    }
])

export default function Routes () {
    useEffect(() => {
        const redirectToHome = () => {
            if (window.location.pathname === '/') {
                window.location.href = '/dashboard';
            }                
        }

        redirectToHome();
    }, [])

    return (
        <RouterProvider router={router} />
    )
}
