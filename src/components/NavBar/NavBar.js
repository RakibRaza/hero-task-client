import React, { useState } from "react";
import {
  AppBar, Avatar, Box, Button, Drawer, Hidden, IconButton, List,
  ListItem, ListItemText, makeStyles, Toolbar, Typography, Container
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory()
  const { logOut, currentUserInfo, user, setUser } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
      setUser({})
      history.replace('/')
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
              {user?.role === 'employer' && (
                <Button component={Link} to="/employarDashboard" color="inherit">
                  Dashboard
                </Button>
              )}
              {user?.role === 'admin' && (
                <Button component={Link} to="/adminDashboard" color="inherit">
                  Dashboard
                </Button>
              )}
              {user?.role === 'jobSeeker' && (
                <Button component={Link} to="/jobSeekerDashboard" color="inherit">
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
              </List>
            </Drawer>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
