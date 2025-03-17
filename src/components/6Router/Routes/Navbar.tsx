import { NavLink } from 'react-router'

export default function NavBar() {

    return <div className="navbar" data-testid='NavBar'>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/posts"}>Posts</NavLink>
    </div>
}