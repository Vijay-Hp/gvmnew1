import React, { useState, useEffect } from "react";
import "../style.js";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import Dashboard from "./icons/dashboard.svg";
import Sales from "./icons/sales.svg";
import Vechical from "./icons/vechicle.svg";
import Rental from "./icons/rental_products.svg";
import General from "./icons/general_entry.svg";
import Logout1 from "./icons/logout.svg";
import Construction from "./icons/new_construction.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Purchase from "./icons/purchase.svg";
import Salary from "./icons/salary.svg";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { NavbarStyle } from "./style";
import Dropdown from "react-bootstrap/Dropdown";
import { PATH } from "../Routes.js";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const listItemStyle = {
  position: "fixed",
  bottom: "50px",
  width: "auto",
};

const listItemStyle1 = {
  position: "fixed",
  bottom: "0px",
  width: "auto",
};
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function UserNavbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = useState("user_dashboard"); // Initialize with "dashboard"

  //set as default Dashboard activated in Navbar
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === PATH.USERDASHBOARD) {
      setActiveItem("user_dashboard");
    } else {
      setActiveItem(null);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName === activeItem ? null : itemName); // Toggle active item
  };
  const linkStyles = {
    textDecoration: "none",
    marginTop: "-10px",
    color: "white",
  };
  const typoStyles = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    color: "black",
  };
  const typoStylesBottom = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    marginBottom: "-20px",
    color: "black",
  };

  return (
    <NavbarStyle>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} className="navbar-bg">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="dashboard-container"
            >
              GVM CONSTRUCTIONS
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Dropdown>
              <Dropdown.Toggle
                style={{ backgroundColor: "inherit", border: "none" }}
              >
                <AccountCircleIcon style={{ height: "40px", width: "40px" }} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* <Dropdown.Item href="/setting">Settings</Dropdown.Item> */}
                <Dropdown.Item href="/user_logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#232135",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon style={{ color: "white" }} />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List sx={{ color: "white" }}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={PATH.USERDASHBOARD}
                selected={activeItem === "user_dashboard"} // Apply selected style based on activeItem
                onClick={() => handleItemClick("user_dashboard")}
              >
                <ListItemIcon>
                  <img
                    src={Dashboard}
                    alt="Dashboard icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  style={{
                    marginLeft: "-22px",
                    color:
                      activeItem === "user_dashboard" ? "#f43984" : "white",
                  }} // Apply red color if active
                />
              </ListItemButton>
            </ListItem>

            <Accordion component={Link} style={linkStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <img
                    src={Purchase}
                    alt="purchase icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <Typography style={{ marginLeft: "-22px" }}>
                  Purchase
                </Typography>
              </AccordionSummary>

              <AccordionDetails style={{ marginTop: "-20px" }}>
                <Typography
                  component={Link}
                  to={PATH.USERADDPURCHASE}
                  style={typoStyles}
                  selected={activeItem === "purchase"}
                  onClick={() => handleItemClick("purchase")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "purchase" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "purchase" ? "#f43984" : "white",
                    }}
                  >
                    Add Details
                  </span>
                </Typography>

                <Typography
                  component={Link}
                  to={PATH.USERVIEWPURCHASE}
                  style={typoStyles}
                  selected={activeItem === "purchase1"}
                  onClick={() => handleItemClick("purchase1")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "purchase1" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "purchase1" ? "#f43984" : "white",
                    }}
                  >
                    View Details
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion component={Link} style={linkStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <img
                    src={Sales}
                    alt="sales Icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <Typography style={{ marginLeft: "-22px" }}>Sales</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ marginTop: "-20px" }}>
                <Typography
                  component={Link}
                  to={PATH.USERADDSALES}
                  style={typoStyles}
                  selected={activeItem === "sales"}
                  onClick={() => handleItemClick("sales")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "sales" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "sales" ? "#f43984" : "white",
                    }}
                  >
                    Add Sales
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to={PATH.USERVIEWSALES}
                  style={typoStyles}
                  selected={activeItem === "sales1"}
                  onClick={() => handleItemClick("sales1")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "sales1" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "sales1" ? "#f43984" : "white",
                    }}
                  >
                    View Sales
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion component={Link} style={linkStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <img
                    src={Vechical}
                    alt="Vechical icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <Typography style={{ marginLeft: "-22px" }}>
                  Vehicle & Maintenance
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ marginTop: "-20px" }}>
                <Typography
                  component={Link}
                  to={PATH.USERADDVEHICLE}
                  style={typoStyles}
                  selected={activeItem === "vehicle"}
                  onClick={() => handleItemClick("vehicle")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "vehicle" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "vehicle" ? "#f43984" : "white",
                    }}
                  >
                    Add Vechicle
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to={PATH.USERVIEWVEHICLE}
                  style={typoStyles}
                  selected={activeItem === "vehicle1"}
                  onClick={() => handleItemClick("vehicle1")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "vehicle1" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "vehicle1" ? "#f43984" : "white",
                    }}
                  >
                    View Vechicle
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion component={Link} style={linkStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <img
                    src={Salary}
                    alt="Salary icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <Typography style={{ marginLeft: "-22px" }}>
                  Employee Salary
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ marginTop: "-20px" }}>
                <Typography
                  component={Link}
                  to={PATH.USERADDSALARY}
                  style={typoStyles}
                  selected={activeItem === "salary"}
                  onClick={() => handleItemClick("salary")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "salary" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "salary" ? "#f43984" : "white",
                    }}
                  >
                    Add Salary
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to={PATH.USERVIEWSALARY}
                  style={typoStyles}
                  selected={activeItem === "salary1"}
                  onClick={() => handleItemClick("salary1")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "salary1" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "salary1" ? "#f43984" : "white",
                    }}
                  >
                    View Salary
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={PATH.USERRENTALPRODUCTS}
                selected={activeItem === "rental_products"}
                onClick={() => handleItemClick("rental_products")}
              >
                <ListItemIcon>
                  <img
                    src={Rental}
                    alt="Rental icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Rental Products"
                  style={{
                    marginLeft: "-22px",
                    color:
                      activeItem === "rental_products" ? "#f43984" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={PATH.USERGENERALENTRY}
                selected={activeItem === "general_entry"}
                onClick={() => handleItemClick("general_entry")}
              >
                <ListItemIcon>
                  <img
                    src={General}
                    alt="Rental icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <ListItemText
                  primary="General Entry"
                  style={{
                    marginLeft: "-22px",
                    color: activeItem === "general_entry" ? "#f43984" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={PATH.USERADDCONSTRUCTIONS}
                selected={activeItem === "Constructions"}
                onClick={() => handleItemClick("Constructions")}
              >
                <ListItemIcon>
                  <img
                    src={Construction}
                    alt="Rental icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Constructions"
                  style={{
                    marginLeft: "-22px",
                    color: activeItem === "Constructions" ? "#f43984" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding style={listItemStyle1}>
              <ListItemButton
                component={Link}
                to={PATH.USERLOGOUT}
                selected={activeItem === "logout"}
                onClick={() => handleItemClick("logout")}
              >
                <ListItemIcon>
                  <img
                    src={Logout1}
                    alt="Rental icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  style={{
                    marginLeft: "-22px",
                    color: activeItem === "logout" ? "#f43984" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open} className="Box1">
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </NavbarStyle>
  );
}
