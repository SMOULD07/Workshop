// importe the declaration if the routers from main.jsx
import {Outlet} from "react-router-dom";

import "./App.css";



 export default function App() {

  return (
  
   <main>
        <Outlet/>
    </main>
  
  );
}


