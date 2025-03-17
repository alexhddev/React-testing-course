import { render, screen } from '@testing-library/react';
import { TextEncoder } from 'util';
import { AppWithRoutes } from './AppWithRoutes';
import { MemoryRouter } from 'react-router';
global.TextEncoder = TextEncoder;

vi.mock('./Routes/Home', () => ({
    Home: () => <div data-testid='HomeMock' />
}))

vi.mock('./Routes/About', () => ({
    About: () => <div data-testid='AboutMock' />
}))

describe('App with routes test suite', ()=>{
    it('should always load the navbar', ()=>{
        render(<AppWithRoutes />)
        const navbar = screen.getByTestId('NavBar')

        expect(navbar).toBeInTheDocument()
    })

    it('Should initially load the home component', ()=>{
        render(<AppWithRoutes />)
        const home = screen.getByTestId('HomeMock')

        expect(home).toBeInTheDocument()
    })

    it.skip('Should initially load the home component', ()=>{
        render(
            <MemoryRouter initialEntries={['/about']}>
                <AppWithRoutes />
            </MemoryRouter>
        )
        const home = screen.getByTestId('HomeMock')

        expect(home).toBeInTheDocument()
    })


})