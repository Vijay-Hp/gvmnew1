import React from 'react';
import './style.js';
import Login from './Login.js';
import Home from './Dashboard.js';
import Start from './Start.js';
import Add_purchase from './Add_purchase.js';
import Add_purchase_payment from './Add_purchase_payment.js';
import Add_purchase_vehicle from './Add_purchase_vehicle.js';
import View_purchase from './View_purchase.js';
import Update_purchase from './Update_purchase.js';
import Update_purchase_payment from './Update_purchase_payment.js';
import Update_purchase_vehicle from './Update_purchase_vehicle.js';
import Add_sales from './Add_sales.js';
import Add_sales_payment from './Add_sales_payment.js';
import Add_sales_vehicle from './Add_sales_vehicle.js';
import View_sales from './View_sales.js';
import Update_sales from './Update_sales.js';
import Update_sales_payment from './Update_sales_payment.js';
import Update_sales_vehicle from './Update_sales_vehicle.js';
import Add_vehicle from './Add_vehicle.js';
import View_vehicle from './View_vehicle.js';
import Update_vehicle from './Update_vehicle.js';
import Add_salary from './Add_salary.js';
import View_salary from './View_salary.js';
import Update_salary from './Update_salary.js';
import Rental_products from './Rental_products.js';
import Rental_products_view from './Rental_products_view.js';
import Rental_products_view1 from './Rental_product_view1.js';
import Rental_products_update from './Rental_products_update.js';
import Rental_products_update1 from './Rental_products_update1.js';
import General_entry from './General_entry.js';
import General_entry_sales from './General_entry_sales.js';
import Add_construction from './Add_construction.js';
import Setting from './Settings.js';
import Logout from './Logout.js';
import Add_construction_view from './Add_construction_view.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


export default function Route_com() {
  return (

    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add_purchase" element={<Add_purchase />} />
        <Route path="/add_purchase_payment" element={<Add_purchase_payment />} />
        <Route path="/add_purchase_vehicle" element={<Add_purchase_vehicle />} />
        <Route path="/view_purchase" element={<View_purchase />} />
        <Route path="/update_purchase" element={<Update_purchase />} />
        <Route path="/update_purchase_payment" element={<Update_purchase_payment />} />
        <Route path="/update_purchase_vehicle" element={<Update_purchase_vehicle />} />
        <Route path="/add_sales" element={<Add_sales />} />
        <Route path="/add_sales_payment" element={<Add_sales_payment />} />
        <Route path="/add_sales_vehicle" element={<Add_sales_vehicle />} />
        <Route path="/view_sales" element={<View_sales />} />
        <Route path="/update_sales" element={<Update_sales />} />
        <Route path="/update_sales_payment" element={<Update_sales_payment />} />
        <Route path="/update_sales_vehicle" element={<Update_sales_vehicle />} />
        <Route path="/add_vehicle" element={<Add_vehicle />} />
        <Route path="/view_vehicle" element={<View_vehicle />} />
        <Route path="/update_vehicle" element={<Update_vehicle />} />
        <Route path="/add_salary" element={<Add_salary />} />
        <Route path="/view_salary" element={<View_salary />} />
        <Route path="/update_salary" element={<Update_salary />} />
        <Route path="/rental_products" element={<Rental_products />} />
        <Route path="/rental_products_view" element={<Rental_products_view />} />
        <Route path="/rental_products_view1" element={<Rental_products_view1 />} />
        <Route path="/rental_products_update" element={<Rental_products_update />} />
        <Route path="/rental_products_update1" element={<Rental_products_update1 />} />
        <Route path="/general_entry" element={<General_entry />} />
        <Route path="/general_entry_sales" element={<General_entry_sales />} />
        <Route path="/add_construction" element={<Add_construction />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/start" element={<Start />} />
        <Route path="/add_construction_view" element={<Add_construction_view />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}
