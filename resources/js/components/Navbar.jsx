import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
}));

const Navbar = ({
    title,
    items,
}) => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Check if screen is mobile
    const isMobile = window.innerWidth <= 600;

    const navigate = useNavigate();



    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
    };

    const renderMenuItems = () => (
        <List>

            {items.map(item => (
                <ListItem key={item.name}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
                {isMobile && <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>}

                <Box width="100%" justifyContent="center" alignItems="center" display="flex">

                    {!isMobile && items.map(item => (
                        <Button key={item.name} color="inherit" className={classes.button} startIcon={item.icon} onClick={(e) => {
                            navigate(item.link)
                        }}>{item.name}</Button>
                    ))}
                </Box>


                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    classes={{ paper: classes.drawer }}
                >
                    {renderMenuItems()}
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
