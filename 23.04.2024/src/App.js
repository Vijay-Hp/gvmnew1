import React from "react";
import { AdminRoute, PublicRoute, UserRoute } from "./components/CustomRoute";
import "./components/style.js";
import DataContextProvider from "./components/context/DataContext.jsx";
function App() {
  const auth = true;
  return (
    <div>
      <DataContextProvider>
        <PublicRoute />
        <AdminRoute />
        <UserRoute />
      </DataContextProvider>
    </div>
  );
}

export default App;
