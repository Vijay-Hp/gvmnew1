import React, { useState, useEffect } from "react";
import "./style.js";
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
import Dashboard from "../icons/dashboard.svg";
import Sales from "../icons/sales.svg";
import Vechical from "../icons/vechicle.svg";
import Rental from "../icons/rental_products.svg";
import General from "../icons/general_entry.svg";
import Logout1 from "../icons/logout.svg";
import Construction from "../icons/new_construction.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Purchase from "../icons/purchase.svg";
import Salary from "../icons/salary.svg";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { NavbarStyle } from "./style";
import Dropdown from "react-bootstrap/Dropdown";
import { PATH } from "./Routes.js";
import Addregister from "../icons/309049_add_user_human_person_plus_icon.svg";

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

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = useState("dashboard"); // Initialize with "dashboard"

  //set as default Dashboard activated in Navbar
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === PATH.DASHBOARD) {
      setActiveItem("dashboard");
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
  const typoStylesBottom1 = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    marginBottom: "-20px",
    marginTop: "22px",
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
                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
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
                to={PATH.DASHBOARD}
                selected={activeItem === "dashboard"}
                onClick={() => handleItemClick("dashboard")}
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
                    color: activeItem === "dashboard" ? "#f43984" : "white",
                  }}
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

              <AccordionDetails style={{ marginTop: "-15px" }}>
                <Typography
                  component={Link}
                  to={PATH.ADDPURCHASE}
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
                  to="/view_purchase"
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

                <Typography
                  component={Link}
                  to="/update_purchase"
                  style={typoStylesBottom}
                  selected={activeItem === "purchase2"}
                  onClick={() => handleItemClick("purchase2")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "purchase2" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "purchase2" ? "#f43984" : "white",
                    }}
                  >
                    Purchase Payment
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
              <AccordionDetails style={{ marginTop: "-15px" }}>
                <Typography
                  component={Link}
                  to="/add_sales"
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
                  to="/view_sales"
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
                <Typography
                  component={Link}
                  to="/update_sales"
                  style={typoStylesBottom}
                  selected={activeItem === "sales2"}
                  onClick={() => handleItemClick("sales2")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "sales2" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "sales2" ? "#f43984" : "white",
                    }}
                  >
                    Sales Payment
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/sales_invoice"
                  style={typoStylesBottom1}
                  selected={activeItem === "sales3"}
                  onClick={() => handleItemClick("sales3")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "sales3" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "sales3" ? "#f43984" : "white",
                    }}
                  >
                    Sales Invoice
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
              <AccordionDetails style={{ marginTop: "-15px" }}>
                <Typography
                  component={Link}
                  to="/add_vehicle"
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
                  to="/view_vehicle"
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
                <Typography
                  component={Link}
                  to="/add_service"
                  style={typoStyles}
                  selected={activeItem === "vehicle2"}
                  onClick={() => handleItemClick("vehicle2")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "vehicle2" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "vehicle2" ? "#f43984" : "white",
                    }}
                  >
                    Add Maintenance
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/view_service"
                  style={typoStylesBottom}
                  selected={activeItem === "vehicle3"}
                  onClick={() => handleItemClick("vehicle3")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "vehicle3" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "vehicle3" ? "#f43984" : "white",
                    }}
                  >
                    View Maintenance
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
              <AccordionDetails style={{ marginTop: "-15px" }}>
                <Typography
                  component={Link}
                  to="/add_salary"
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
                  to="/view_salary"
                  style={typoStylesBottom}
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

            <Accordion component={Link} style={linkStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <img
                    src={Rental}
                    alt="Rental icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <Typography style={{ marginLeft: "-22px" }}>
                  Rental Products
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ marginTop: "-15px" }}>
                <Typography
                  component={Link}
                  to="/rental_products"
                  style={typoStyles}
                  selected={activeItem === "rental"}
                  onClick={() => handleItemClick("rental")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "rental" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "rental" ? "#f43984" : "white",
                    }}
                  >
                    Assing Rental
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/rental_products_view"
                  style={typoStyles}
                  selected={activeItem === "rental1"}
                  onClick={() => handleItemClick("rental1")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "rental1" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "rental1" ? "#f43984" : "white",
                    }}
                  >
                    View Rental
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/rental_payment"
                  style={typoStylesBottom}
                  selected={activeItem === "rental2"}
                  onClick={() => handleItemClick("rental2")}
                >
                  <AddIcon
                    style={{
                      color: activeItem === "rental2" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color: activeItem === "rental2" ? "#f43984" : "white",
                    }}
                  >
                    Payment History
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/rental_products"
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
            </ListItem> */}

            {/* <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/general_entry"
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

            <Accordion component={Link} style={linkStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <img
                    src={Construction}
                    alt="Rental icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <Typography style={{ marginLeft: "-22px" }}>
                  Constructions
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ marginTop: "-15px" }}>
                <Typography
                  component={Link}
                  to="/add_construction"
                  style={typoStyles}
                  selected={activeItem === "construction"}
                  onClick={() => handleItemClick("construction")}
                >
                  <AddIcon
                    style={{
                      color:
                        activeItem === "construction" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color:
                        activeItem === "construction" ? "#f43984" : "white",
                    }}
                  >
                    Registration
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/add_construction_empsalary"
                  style={typoStyles}
                  selected={activeItem === "construction1"}
                  onClick={() => handleItemClick("construction1")}
                >
                  <AddIcon
                    style={{
                      color:
                        activeItem === "construction1" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color:
                        activeItem === "construction1" ? "#f43984" : "white",
                    }}
                  >
                    Add Expenses
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/add_construction_view"
                  style={typoStyles}
                  selected={activeItem === "construction2"}
                  onClick={() => handleItemClick("construction2")}
                >
                  <AddIcon
                    style={{
                      color:
                        activeItem === "construction2" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color:
                        activeItem === "construction2" ? "#f43984" : "white",
                    }}
                  >
                    View Expenses
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/construction_income"
                  style={typoStyles}
                  selected={activeItem === "construction3"}
                  onClick={() => handleItemClick("construction3")}
                >
                  <AddIcon
                    style={{
                      color:
                        activeItem === "construction3" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color:
                        activeItem === "construction3" ? "#f43984" : "white",
                    }}
                  >
                    Add Income
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/view_construction_income"
                  style={typoStyles}
                  selected={activeItem === "construction4"}
                  onClick={() => handleItemClick("construction4")}
                >
                  <AddIcon
                    style={{
                      color:
                        activeItem === "construction4" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color:
                        activeItem === "construction4" ? "#f43984" : "white",
                    }}
                  >
                    View Income
                  </span>
                </Typography>
                <Typography
                  component={Link}
                  to="/construction_income_payment"
                  style={typoStyles}
                  selected={activeItem === "construction5"}
                  onClick={() => handleItemClick("construction5")}
                >
                  <AddIcon
                    style={{
                      color:
                        activeItem === "construction5" ? "#f43984" : "white",
                    }}
                  />
                  <span
                    style={{
                      color:
                        activeItem === "construction5" ? "#f43984" : "white",
                    }}
                  >
                    Payment History
                  </span>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/add_construction"
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
            </ListItem> */}

            <ListItem disablePadding style={listItemStyle}>
              <ListItemButton
                component={Link}
                to="/register"
                selected={activeItem === "Register"}
                onClick={() => handleItemClick("Register")}
              >
                <ListItemIcon>
                  <img
                    src={Addregister}
                    alt="register icon"
                    className="listItemStyles"
                  />
                </ListItemIcon>
                <ListItemText
                  primary="New Register"
                  style={{
                    marginLeft: "-22px",
                    color: activeItem === "Register" ? "#f43984" : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding style={listItemStyle1}>
              <ListItemButton
                component={Link}
                to="/logout"
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
