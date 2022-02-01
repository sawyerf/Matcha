import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className='nav'>
            <NavLink extact to='/'>
                Home
            </NavLink>
            <NavLink extact to='/login'>
                Login
            </NavLink>
        </nav>
    );
}
 
export default Nav;