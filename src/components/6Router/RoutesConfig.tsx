import { Outlet, RouteObject } from "react-router";
import { About } from "./Routes/About";
import { Home } from "./Routes/Home";
import NavBar from "./Routes/Navbar";
import { PageNotFound } from "./Routes/PageNotFound";
import { Post } from "./Routes/Post";
import { Posts } from "./Routes/Posts";

export const routesConfig: RouteObject[] = [{
    element: (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </>
    ),
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/about',
            element: <About />
        },
        {
            path: '/posts',
            element: <Posts />
        },
        {
            path: '/post/:id',
            element: <Post />
        },
        {
            path: '*',
            element: <PageNotFound />
        }
    ]
}]