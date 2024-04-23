import Add_construction from "./Add_construction";
import Add_construction_view from "./Add_construction_view";
import Add_purchase from "./Add_purchase";
import Add_purchase_payment from "./Add_purchase_payment";
import Add_purchase_vehicle from "./Add_purchase_vehicle";
import Add_salary from "./Add_salary";
import Add_sales from "./Add_sales";
import Add_sales_payment from "./Add_sales_payment";
import Add_sales_vehicle from "./Add_sales_vehicle";
import Sales_invoice from "./Sales_invoice.js";
import Add_vehicle from "./Add_vehicle";
import Add_service from "./Add_service.js";
import View_service from "./View_services.js";
import Dashboard from "./Dashboard";
import General_entry from "./General_entry";
import General_entry_sales from "./General_entry_sales";
import Login from "./Login";
import Logout from "./Logout";
import Navbar from "./Navbar";
import Rental_products_view1 from "./Rental_product_view1";
import Rental_products from "./Rental_products";
import Rental_products_update from "./Rental_products_update";
import Rental_products_update1 from "./Rental_products_update1";
import Rental_products_view from "./Rental_products_view";
import Construction_income from "./Add_construction_income";
import View_construction_income from "./View_construction_income";
import Construction_income_payment from "./construction_income_payment.js";
import Rental_payment from "./Rental_payment";
import Settings from "./Settings";
import Start from "./Start.js";
import Update_purchase from "./Update_purchase";
import Update_purchase_payment from "./Update_purchase_payment";
import Update_purchase_vehicle from "./Update_purchase_vehicle";
import Update_salary from "./Update_salary";
import Update_sales from "./Update_sales";
import Update_sales_payment from "./Update_sales_payment";
import Update_sales_vehicle from "./Update_sales_vehicle";
import Update_vehicle from "./Update_vehicle";
import View_purchase from "./View_purchase";
import View_salary from "./View_salary";
import View_sales from "./View_sales";
import View_vehicle from "./View_vehicle";
import "../components/style.js";
import UserNavbar from "./user/User_Navbar.js";
import UserDash from "./user/User_Dash.js";
import UserAdd_purchase from "./user/UserAdd_purchase.js";
import UserAdd_purchase_payment from "./user/UserAdd_purchase_payment.js";
import UserAdd_purchase_vehicle from "./user/UserAdd_purchase_vehicle.js";
import UserAdd_sales from "./user/UserAdd_sales.js";
import UserAdd_sales_payment from "./user/UserAdd_sales_payment.js";
import UserAdd_sales_vehicle from "./user/UserAdd_sales_vehicle.js";
import UserView_purchase from "./user/UserView_purchase.js";
import UserUpdate_purchase from "./user/UserUpdate_purchase.js";
import UserUpdate_purchase_payment from "./user/UserUpdate_purchase_payment.js";
import UserUpdate_purchase_vehicle from "./user/UserUpdate_purchase_vehicle.js";
import UserView_sales from "./user/UserView_sales.js";
import UserUpdate_sales from "./user/UserUpdate_sales.js";
import UserUpdate_sales_payment from "./user/UserUpdate_sales_payment.js";
import UserUpdate_sales_vehicle from "./user/UserUpdate_sales_vehicle.js";
import UserAdd_vehicle from "./user/UserAdd_vehicle.js";
import UserView_vehicle from "./user/UserView_vehicle.js";
import UserUpdate_vehicle from "./user/UserUpdate_vehicle.js";
import UserAdd_salary from "./user/UserAdd_salary.js";
import UserView_salary from "./user/UserView_salary.js";
import UserUpdate_salary from "./user/UserUpdate_salary.js";
import UserRental_products from "./user/UserRental_products.js";
import UserStart from "./user/UserStart.js";
import UserRental_products_view from "./user/UserRental_products_view.js";
import UserRental_products_view1 from "./user/UserRental_product_view1.js";
import UserRental_products_update from "./user/UserRental_products_update.js";
import UserRental_products_update1 from "./user/UserRental_products_update1.js";
import UserGeneral_entry from "./user/UserGeneral_entry.js";
import UserGeneral_entry_sales from "./user/UserGeneral_entry_sales.js";
import UserAdd_construction from "./user/UserAdd_construction.js";
import UserAdd_constructionempsal from "./user/UserAdd_construction_empsal.js";
import UserAdd_construction_view from "./user/UserAdd_construction_view.js";
import UserLogout from "./user/UserLogout.js";
import Register from "./Register.js";
import RegisterExist from "./Register_exist.js";
import Add_construction_empsal from "./Add_construction_empsal.js";
import test from "./test.js";
import Test from "./test.js";
import rental_payment from "./Rental_payment.js";

export const PATH = {
  HOME: "/",
  NAVBAR: "/admin",
  DASHBOARD: "/dashboard",
  ADDPURCHASE: "/add_purchase",
  ADDPURCHASEPAYMENT: "/add_purchase_payment",
  ADDPURCHASEVEHICLE: "/add_purchase_vehicle",
  VIEWPURCHASE: "/view_purchase",
  UPDATEPURCHASE: "/update_purchase",
  UPDATEPURCHASEPAYMENT: "/update_purchase_payment",
  UPDATEPURCHASEVEHICLE: "/update_purchase_vehicle",
  ADDSALES: "/add_sales",
  ADDSALESPAYMENT: "/add_sales_payment",
  ADDSALESVEHICLE: "/add_sales_vehicle",
  VIEWSALES: "/view_sales",
  UPDATESALES: "/update_sales",
  UPDATESALESPAYMENT: "/update_sales_payment",
  UPDATESALESVEHICLE: "/update_sales_vehicle",
  SALESINVOICE: "/sales_invoice",
  ADDVEHICLE: "/add_vehicle",
  VIEWVEHICLE: "/view_vehicle",
  ADDSERVICE: "/add_service",
  VIEWSERVICE: "/view_service",
  UPDATEVEHICLE: "/update_vehicle",
  ADDSALARY: "/add_salary",
  VIEWSALARY: "/view_salary",
  UPDATESALARY: "/update_salary",
  RENTALPRODUCTS: "/rental_products",
  RENTALPRODUCTS1: "/start",
  RENTALPAYMENT: "/rental_payment",
  VIEWRENTAL: "/rental_products_view",
  VIEWRENTAL1: "/rental_products_view1",
  UPDATERENTAL: "/rental_products_update",
  UPDATERENTAL1: "/rental_products_update1",
  GENERALENTRY: "/general_entry",
  GENERALENTRYSALES: "/general_entry_sales",
  CONSTRUCTIONS: "/add_construction",
  CONSTRUCTIONSEMPSALARY: "/add_construction_empsalary",
  CONSTRUCTIONSVIEW: "/add_construction_view",
  CONSTRUCTIONINCOME: "/Construction_income",
  VIEWCONSTRUCTIONINCOME: "view_construction_income",
  CONSTRUCTIONINCOMEPAYMENT: "construction_income_payment",
  SETTINGS: "/setting",
  REGISTER: "/register",
  REGISTEREXIST: "/register_exist",
  LOGOUT: "/logout",
  USERNAVBAR: "/user",
  USERDASHBOARD: "/user_dashboard",
  USERADDPURCHASE: "/user_addpurchase",
  USERADDPURCHASEPAYMENT: "/useradd_purchase_payment",
  USERADDPURCHASEVEHICLE: "/useradd_purchase_vehicle",
  USERVIEWPURCHASE: "/user_viewpurchase",
  USERUPDATEPURCHASE: "/user_updatepurchase",
  USERUPDATEPURCHASEPAYMENT: "/userupdate_purchase_payment",
  USERUPDATEPURCHASEVEHICLE: "/userupdate_purchase_vehicle",
  USERADDSALES: "/user_addsales",
  USERADDSALESPAYMENT: "/useradd_sales_payment",
  USERADDSALESVEHICLE: "/useradd_sales_vehicle",
  USERVIEWSALES: "/user_viewsales",
  USERUPDATESALES: "/user_updatesales",
  USERUPDATESALESPAYMENT: "/userupdate_sales_payment",
  USERUPDATESALESVEHICLE: "/userupdate_sales_vehicle",
  USERADDVEHICLE: "/user_addvehicle",
  USERVIEWVEHICLE: "/user_viewvehicle",
  USERUPDATEVEHICLE: "/user_updatevehicle",
  USERADDSALARY: "/user_addsalary",
  USERVIEWSALARY: "/user_viewsalary",
  USERUPDATESALARY: "/user_updatesalary",
  USERRENTALPRODUCTS: "/user_rentalproducts",
  USERRENTALPRODUCTS1: "/user_rentalproducts1",
  USERRENTALVIEWPRODUCTS: "/user_rentalviewproducts",
  USERRENTALVIEWPRODUCTS1: "/user_rentalviewproducts1",
  USERRENTALUPDATEPRODUCTS: "/user_rentalupdateproducts",
  USERRENTALUPDATEPRODUCTS1: "/user_rentalupdateproducts1",
  USERGENERALENTRY: "/user_generalentry",
  USERGENERALENTRYSALES: "/user_generalentry_sales",
  USERADDCONSTRUCTIONS: "/user_addconstructions",
  USERADDCONSTRUCTIONSEMPSAL: "/user_addconstructionsempsal",
  USERVIEWCONSTRUCTIONS: "/user_viewconstructions",
  USERLOGOUT: "/user_logout",
  TEST: "/test",
};

export const publicRoute = [
  {
    Component: Login,
    path: PATH.HOME,
  },
];

export const adminRoute = [
  {
    Component: Navbar,
    path: PATH.NAVBAR,
  },
  {
    Component: Dashboard,
    path: PATH.DASHBOARD,
  },
  {
    Component: Add_purchase,
    path: PATH.ADDPURCHASE,
  },
  {
    Component: Add_purchase_payment,
    path: PATH.ADDPURCHASEPAYMENT,
  },
  {
    Component: Add_purchase_vehicle,
    path: PATH.ADDPURCHASEVEHICLE,
  },
  {
    Component: View_purchase,
    path: PATH.VIEWPURCHASE,
  },
  {
    Component: Update_purchase,
    path: PATH.UPDATEPURCHASE,
  },
  {
    Component: Update_purchase_payment,
    path: PATH.UPDATEPURCHASEPAYMENT,
  },
  {
    Component: Update_purchase_vehicle,
    path: PATH.UPDATEPURCHASEVEHICLE,
  },
  {
    Component: Add_sales,
    path: PATH.ADDSALES,
  },
  {
    Component: Add_sales_payment,
    path: PATH.ADDSALESPAYMENT,
  },
  {
    Component: Add_sales_vehicle,
    path: PATH.ADDSALESVEHICLE,
  },
  {
    Component: View_sales,
    path: PATH.VIEWSALES,
  },
  {
    Component: Update_sales,
    path: PATH.UPDATESALES,
  },
  {
    Component: Sales_invoice,
    path: PATH.SALESINVOICE,
  },
  {
    Component: Update_sales_payment,
    path: PATH.UPDATESALESPAYMENT,
  },
  {
    Component: Update_sales_vehicle,
    path: PATH.UPDATESALESVEHICLE,
  },
  {
    Component: Add_vehicle,
    path: PATH.ADDVEHICLE,
  },
  {
    Component: View_vehicle,
    path: PATH.VIEWVEHICLE,
  },
  {
    Component: Add_service,
    path: PATH.ADDSERVICE,
  },
  {
    Component: View_service,
    path: PATH.VIEWSERVICE,
  },
  {
    Component: Update_vehicle,
    path: PATH.UPDATEVEHICLE,
  },
  {
    Component: Add_salary,
    path: PATH.ADDSALARY,
  },
  {
    Component: View_salary,
    path: PATH.VIEWSALARY,
  },
  {
    Component: Update_salary,
    path: PATH.UPDATESALARY,
  },
  {
    Component: Rental_products,
    path: PATH.RENTALPRODUCTS,
  },
  {
    Component: Start,
    path: PATH.RENTALPRODUCTS1,
  },
  {
    Component: Rental_products_view,
    path: PATH.VIEWRENTAL,
  },
  {
    Component: Rental_products_view1,
    path: PATH.VIEWRENTAL1,
  },
  {
    Component: Rental_products_update,
    path: PATH.UPDATERENTAL,
  },
  {
    Component: Rental_products_update1,
    path: PATH.UPDATERENTAL1,
  },
  {
    Component: Rental_payment,
    path: PATH.RENTALPAYMENT,
  },
  {
    Component: General_entry,
    path: PATH.GENERALENTRY,
  },
  {
    Component: General_entry_sales,
    path: PATH.GENERALENTRYSALES,
  },
  {
    Component: Add_construction,
    path: PATH.CONSTRUCTIONS,
  },
  {
    Component: Add_construction_empsal,
    path: PATH.CONSTRUCTIONSEMPSALARY,
  },

  {
    Component: Add_construction_view,
    path: PATH.CONSTRUCTIONSVIEW,
  },
  {
    Component: Construction_income,
    path: PATH.CONSTRUCTIONINCOME,
  },
  {
    Component: View_construction_income,
    path: PATH.VIEWCONSTRUCTIONINCOME,
  },
  {
    Component: Construction_income_payment,
    path: PATH.CONSTRUCTIONINCOMEPAYMENT,
  },
  {
    Component: Settings,
    path: PATH.SETTINGS,
  },
  {
    Component: Register,
    path: PATH.REGISTER,
  },
  {
    Component: RegisterExist,
    path: PATH.REGISTEREXIST,
  },
  {
    Component: Logout,
    path: PATH.LOGOUT,
  },
];

export const userRoute = [
  {
    Component: UserNavbar,
    path: PATH.USERNAVBAR,
  },
  {
    Component: UserDash,
    path: PATH.USERDASHBOARD,
  },
  {
    Component: UserAdd_purchase,
    path: PATH.USERADDPURCHASE,
  },
  {
    Component: UserAdd_purchase_payment,
    path: PATH.USERADDPURCHASEPAYMENT,
  },
  {
    Component: UserAdd_purchase_vehicle,
    path: PATH.USERADDPURCHASEVEHICLE,
  },
  {
    Component: UserView_purchase,
    path: PATH.USERVIEWPURCHASE,
  },
  {
    Component: UserUpdate_purchase,
    path: PATH.USERUPDATEPURCHASE,
  },
  {
    Component: UserUpdate_purchase_payment,
    path: PATH.USERUPDATEPURCHASEPAYMENT,
  },
  {
    Component: UserUpdate_purchase_vehicle,
    path: PATH.USERUPDATEPURCHASEVEHICLE,
  },
  {
    Component: UserAdd_sales,
    path: PATH.USERADDSALES,
  },
  {
    Component: UserAdd_sales_payment,
    path: PATH.USERADDSALESPAYMENT,
  },
  {
    Component: UserAdd_sales_vehicle,
    path: PATH.USERADDSALESVEHICLE,
  },
  {
    Component: UserView_sales,
    path: PATH.USERVIEWSALES,
  },
  {
    Component: UserUpdate_sales,
    path: PATH.USERUPDATESALES,
  },
  {
    Component: UserUpdate_sales_payment,
    path: PATH.USERUPDATESALESPAYMENT,
  },
  {
    Component: UserUpdate_sales_vehicle,
    path: PATH.USERUPDATESALESVEHICLE,
  },
  {
    Component: UserAdd_vehicle,
    path: PATH.USERADDVEHICLE,
  },
  {
    Component: UserView_vehicle,
    path: PATH.USERVIEWVEHICLE,
  },
  {
    Component: UserUpdate_vehicle,
    path: PATH.USERUPDATEVEHICLE,
  },
  {
    Component: UserAdd_salary,
    path: PATH.USERADDSALARY,
  },
  {
    Component: UserView_salary,
    path: PATH.USERVIEWSALARY,
  },
  {
    Component: UserUpdate_salary,
    path: PATH.USERUPDATESALARY,
  },
  {
    Component: UserRental_products,
    path: PATH.USERRENTALPRODUCTS,
  },
  {
    Component: UserStart,
    path: PATH.USERRENTALPRODUCTS1,
  },
  {
    Component: UserRental_products_view,
    path: PATH.USERRENTALVIEWPRODUCTS,
  },
  {
    Component: UserRental_products_view1,
    path: PATH.USERRENTALVIEWPRODUCTS1,
  },
  {
    Component: UserRental_products_update,
    path: PATH.USERRENTALUPDATEPRODUCTS,
  },
  {
    Component: UserRental_products_update1,
    path: PATH.USERRENTALUPDATEPRODUCTS1,
  },
  {
    Component: UserGeneral_entry,
    path: PATH.USERGENERALENTRY,
  },
  {
    Component: UserGeneral_entry_sales,
    path: PATH.USERGENERALENTRYSALES,
  },
  {
    Component: UserAdd_construction,
    path: PATH.USERADDCONSTRUCTIONS,
  },
  {
    Component: UserAdd_constructionempsal,
    path: PATH.USERADDCONSTRUCTIONSEMPSAL,
  },
  {
    Component: UserAdd_construction_view,
    path: PATH.USERVIEWCONSTRUCTIONS,
  },
  {
    Component: UserLogout,
    path: PATH.USERLOGOUT,
  },
  {
    Component: Test,
    path: PATH.TEST,
  },
];
