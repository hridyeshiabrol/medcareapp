import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);


  function openprofile(){
    window.location.href = "./UserProfileForm";
  }

  function openmanager(){
    window.location.href = "./MedicineManager";
  }

  function openpost(){
    window.location.href = "./AvailMedicine";
  }
  function searchmed()
  {
    window.location.href = "./MedicineFinder";
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Home", "Contact Us", "About Us"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <HomeIcon /> : <ContactMailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Logout"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
    
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <center>
        <Typography paragraph>
          <Container>
            <Row   className="d-flex flex-row">
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="./pics/profileuser.PNG"
                    width="150px"
                    height="200px"
                  />
                  <center>
                    <Card.Body>
                      <Card.Title>User Profile</Card.Title>
                      <Button variant="primary" onClick={openprofile}>Go to Profile</Button>
                    </Card.Body>
                  </center>
                </Card>
              </Col>
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="./pics/medmanager.PNG"
                    width="150px"
                    height="200px"
                  />
                  <center>
                    <Card.Body>
                      <Card.Title>Medicine manager</Card.Title>
                      <Button variant="primary" onClick={openmanager}>Open manager</Button>
                    </Card.Body>
                  </center>
                </Card>
              </Col>
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="./pics/postmedcard.PNG"
                    width="150px"
                    height="200px"
                  />
                  <center>
                    <Card.Body>
                      <Card.Title>Post Medicine</Card.Title>
                      <Button variant="primary" onClick={openpost}>Create a post</Button>
                    </Card.Body>
                  </center>
                </Card>
              </Col>
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="./pics/searchmed.PNG"
                    width="150px"
                    height="200px"
                  />
                  <center>
                    <Card.Body>
                      <Card.Title>Search Medicine</Card.Title>
                      <Button variant="primary" onClick={searchmed} >Search Medicine</Button>
                    </Card.Body>
                  </center>
                </Card>
              </Col>
            </Row>
          </Container>
        </Typography>
        </center>
        <br/><br/>
        <center>
        <Typography paragraph>
          " Best clinical decisions are at the heart of appropriate care, the
          goal to which our system should aspire. "
          <b><i>  — DR. ANNA REID </i></b>
        </Typography>
        </center>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
