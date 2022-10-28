import { clearAuthenticatedUser } from "../../utils/auth";
import Navbar from "../Navbar/Navbar";
import Navigate from "../Router/Navigate";

 
 const LogoutPage=()=>{
    clearAuthenticatedUser();
    Navbar();
    Navigate('/login')
 }

 export default LogoutPage;