import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import BasicModal from "./Modal";
// import {useAuth} from "../../services/useAuth";
// import {LanguageSelector} from "../../utils/LanguageSelector";
// import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
// import {jwtDecode} from "jwt-decode";
// import {useApi} from "../../services/useApi";
import { MenuList } from '@mui/material';
// import Logo from '../../assets/whiteLogo.png'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const MyToolBar = ({ toolbarOpen, handleDrawerOpen, handleDrawerClose }) =>  {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    //Esraa added
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [notifList, setnotifList] = React.useState([]);
    const [isBusy, setBusy] = useState(true)
    // const {apiPublic, apiPrivate} = useApi();
    // const {getNotifications} = useAuth()

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    //Esraa added
    const isNotifMenuOpen = Boolean(anchorE2);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const navigate = useNavigate();
    // const {logout} = useAuth()
    const [email, setEmail] = useState("");

    useEffect(() => {
        let token = window.localStorage['token']
        // if(token){
        //     let decoded = jwtDecode(token);
        //     let email = decoded.sub.split('&&')[0];
        //     setEmail(email)
        // }
    }, [])

    // Esraa added
    const handleNotifMenuOpen = (event) => {
        setAnchorE2(event.currentTarget);

    };
    const handleNotifMenuClose = () => {
        setAnchorE2(null);
    };
    useEffect(() => {
        // setBusy(true);
        // apiPrivate.get('/api/v1/auth/notif/get').then((res) => {
        //     if ( Array.isArray(res.data) )
        //     { setnotifList( res.data) }
        //     //   setBusy(false);
        //     console.log(res.data);
        //     console.log(notifList)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }, []);

    //

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };



    const signOut = () => {
        logout()
    }

    const changePassword = () => {
        navigate("/changepassword")
    }
    // Esraa added
    const goPeronal = () => {
        var btn1 = document.getElementById('personalInfoTab')
        console.log(btn1)
        if(btn1)
        {
            btn1.style.backgroundColor = '#fa989b'
            btn1.style.borderRadius = '8px'
        }
        handleNotifMenuClose();
        navigate("/dashboard/personalinfo")

    }
    const goEducation = () => {
        var btn1 = document.getElementById('eduInfoTab')
        console.log(btn1)
        if(btn1)
        {
            btn1.style.backgroundColor = '#fa989b'
            btn1.style.borderRadius = '8px'
        }
        handleNotifMenuClose();
        navigate("/dashboard/personalinfo")

    }
    const goJob = () => {
        var btn1 = document.getElementById('jobInfoTab')
        console.log(btn1)
        if(btn1)
        {
            btn1.style.backgroundColor = '#fa989b'
            btn1.style.borderRadius = '8px'
        }
        handleNotifMenuClose();
        navigate("/dashboard/personalinfo")


    }
    const gostdList = () => {
        handleNotifMenuClose();
        if (window.localStorage.role == 'SCHOOL_ADMIN')
        { navigate("/dashboard/student") }
        else { navigate("/dashboard/studentteacher") }
    }
//  const goteacherList = () => {
//     handleNotifMenuClose();
//       navigate("/dashboard/teacher")
//  }
    const notifId = 'primary-search-notif-menu';
    const renderNotifMenu = (
        <Menu
            anchorEl={anchorE2}
            open={isNotifMenuOpen}
            onClose={handleNotifMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

        >


            { notifList && notifList.map(item => (
                ( item.type == "PP" &&  <MenuItem onClick={goPeronal}
                                                  sx = {{ backgroundColor : '#E6E6FA'}} >
                    <text>
                        <b> Incomplete Profile</b>
                        <br></br>
                        Please update your personal information </text>
                </MenuItem> ) ||

                ( item.type == "PE" &&  <MenuItem onClick={goEducation}
                                                  sx = {{ backgroundColor : '#E6E6FA'}}>
                        <text >
                            <b> Incomplete Profile</b>
                            <br></br>
                            Please update your educational information </text>
                    </MenuItem>
                ) ||
                ( item.type == "PJ" &&  <MenuItem onClick={goJob}
                                                  sx = {{ backgroundColor : '#E6E6FA'}}>
                        <text >
                            <b>  Incomplete Profile</b>
                            <br></br>
                            Please update your job information </text>
                    </MenuItem>
                ) ||
                ( item.type == "ST" &&  <MenuItem onClick={gostdList}
                                                  sx = {{ backgroundColor : '#E6E6FA'}}>
                        <text >
                            <b>New Student Assigned</b>
                            <br></br>
                            {item.message} </text>
                    </MenuItem>
                ) ||
                ( item.type == "SA" &&  <MenuItem onClick={gostdList}
                                                  sx = {{ backgroundColor : '#E6E6FA'}}>
                        <text >
                            <b>Unassigned Students</b>
                            <br></br>
                            {item.message} </text>
                    </MenuItem>
                )

            ))}


        </Menu>

    );
    const NotifLength = renderNotifMenu.length;
    //
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            sx={{ position: 'absolute', left: '0' }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={changePassword}>Change Password</MenuItem>
            {/*<LanguageSelector />*/}
            <MenuItem onClick={() => setOpen(true)}>Sign Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem onClick={handleNotifMenuOpen} >
                <IconButton
                    size="large"
                    aria-label="show new notifications"
                    aria-controls="primary-search-notif-menu"
                    color="inherit"
                    aria-haspopup="true"
                >
                    <Badge badgeContent={notifList.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <BasicModal handleClose={handleClose} open={open} signOut={signOut} />
            <AppBar position="fixed" sx={{ backgroundColor: '#101828',boxShadow: '0', border: 'none' }} open={toolbarOpen}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={open ? () => handleDrawerClose() : () => handleDrawerOpen()}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/*<Box onClick={() => navigate("/dashboard")} component="img" src={Logo} width="250px" sx={{ objectFit: 'contain'}}/>*/}


                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            aria-controls={notifId}
                            aria-haspopup="true"
                            onClick={handleNotifMenuOpen}
                        >
                            <Badge badgeContent={notifList.length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderNotifMenu}
            {/*{email ? " Welcome: " + email : "no logged in user!"}*/}
        </>
    );
}
