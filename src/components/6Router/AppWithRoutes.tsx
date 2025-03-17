import { createBrowserRouter, RouterProvider } from 'react-router'
import { routesConfig } from './RoutesConfig'

export function AppWithRoutes(){

    const router = createBrowserRouter(routesConfig)

    return <div className="wrapper">
        <RouterProvider router={router}/>
    </div>

}