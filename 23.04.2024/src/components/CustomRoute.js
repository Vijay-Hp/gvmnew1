import { Route, Routes } from "react-router-dom";
import { routeConfig, publicRoute, adminRoute, userRoute } from "./Routes";
import './style.js';
import Navbar from "./Navbar.js";
import UserNavbar from './user/User_Navbar.js'


export function PublicRoute() {
  return (
    <Routes>
      {

        publicRoute.map(({ path, Component }, index) => {
          
          return (
            
            <Route path={path} element={<Component />} />

          )
        })
      }
    </Routes>
  );
}

export function AdminRoute() {
  return (
    <Routes>
      {
        adminRoute.map(({ path, Component }, index) => {
          // console.log(path)
          return (
            <Route element={<Navbar />}>
              <Route path={path} element={<Component />} />
            </Route>
          )
        })
      }
    </Routes>
  );
}

export function UserRoute() {
  return (
    <Routes>
      {
        userRoute.map(({ path, Component }, index) => {
          // console.log(path)
          return (
            <Route element={<UserNavbar />}>
              <Route path={path} element={<Component />} />
            </Route>
          )
        })
      }
    </Routes >
  );
}