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
            <NavLink extact to='/register'>
                Register
            </NavLink>
        </nav>
    );
}
 
export default Nav;