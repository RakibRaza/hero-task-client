import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar, Typography, Container
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "250px",
  },
  links: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { logOut, currentUserInfo, user, setUser } = useAuthContext();
  const [open, setOpen] = useState(false);
  const handleLogOut = async () => {
    try {
      await logOut();
      setUser({})
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppBar position="static" color="secondary">
      <Container>
        <Toolbar>
          <Typography variant='h5' style={{ flexGrow: 1 }}>Jobs Hunt</Typography>
          <Hidden smDown>
            <Box className={classes.links}>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              {user[0]?.role === 'employer' && (
                <Button component={Link} to="/dashboard" color="inherit">
                  Dashboard
                </Button>
              )}
              {currentUserInfo ? (
                <Button
                  onClick={handleLogOut}
                  color="primary"
                  variant="contained"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  color="primary"
                  variant="contained"
                >
                  Login
                </Button>
              )}
            </Box>
            <Avatar alt="Remy Sharp" src={currentUserInfo?.photoURL} />
          </Hidden>
          <Hidden mdUp>
            <Box>
              <IconButton onClick={() => setOpen(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer open={open} onClose={() => setOpen(false)}>
              <List disablePadding className={classes.drawer}>
                <ListItem button component={Link} to="/">
                  <ListItemText primary="Home" />
                </ListItem>
                {currentUserInfo && (
                  <ListItem button component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                )}
              </List>
              {currentUserInfo ? (
                <Button
                  onClick={handleLogOut}
                  color="primary"
                  variant="contained"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  color="primary"
                  variant="contained"
                >
                  Login
                </Button>
              )}
              <Button>{currentUserInfo?.displayName}</Button>
            </Drawer>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
