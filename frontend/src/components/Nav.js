import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Nav = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Matcha
                </Typography>
                <Button color="inherit" href='/register'>Register</Button>
                <Button color="inherit" href='/login'>Login</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}
 
export default Nav;