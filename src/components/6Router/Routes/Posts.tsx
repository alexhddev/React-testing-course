import { NavLink } from "react-router";


export function Posts(){

    return <div>
        <NavLink to={'/post/1'}>Post1</NavLink><br/>
        <NavLink to={'/post/2'}>Post2</NavLink><br/>
        <NavLink to={'/post/3'}>Post3</NavLink><br/>
    </div>

}