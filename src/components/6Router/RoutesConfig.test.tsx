import { createMemoryRouter, RouterProvider } from "react-router";
import { routesConfig } from "./RoutesConfig";
import { render, screen } from "@testing-library/react";

vi.mock('./Routes/Home', () => ({
    Home: () => <div data-testid='HomeMock' />
}))

vi.mock('./Routes/About', () => ({
    About: () => <div data-testid='AboutMock' />
}))

vi.mock('./Routes/PageNotFound', () => ({
    PageNotFound: () => <div data-testid='PageNotFoundMock' />
}))

vi.mock('./Routes/Post', () => ({
    Post: () => <div data-testid='PostMock' />
}))


describe('Routes config tests', () => {

    it('Should load the home component first', () => {
        const route = '/'
        const router = createMemoryRouter(
            routesConfig, {
                initialEntries:[route]
            }
        )
        render(
            <RouterProvider router={router}/>
        )
        const home = screen.getByTestId('HomeMock')
        expect(home).toBeInTheDocument();
    })

    it('Should load the about component on about route', () => {
        const route = '/about'
        const router = createMemoryRouter(routesConfig, {
            initialEntries: [route]
        })
        render(<RouterProvider router={router} />)

        const about = screen.getByTestId('AboutMock')
        expect(about).toBeInTheDocument();
    })

    it('Should load the not found component on invalid route', () => {
        const route = '/notSupported'
        const router = createMemoryRouter(routesConfig, {
            initialEntries: [route]
        })
        render(<RouterProvider router={router} />)

        const pageNotFound = screen.getByTestId('PageNotFoundMock')
        expect(pageNotFound).toBeInTheDocument();
    })

    it('Should load the Post component on post route', () => {
        const route = '/post/2'
        const router = createMemoryRouter(routesConfig, {
            initialEntries: [route]
        })
        render(<RouterProvider router={router} />)

        const post = screen.getByTestId('PostMock')
        expect(post).toBeInTheDocument();
    })
});