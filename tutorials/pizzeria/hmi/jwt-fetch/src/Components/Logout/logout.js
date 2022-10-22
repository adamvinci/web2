import { clearAuthenticatedUser } from '../../utils/auth';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const Logout = () => {
  clearAuthenticatedUser();
  Navbar();
  Navigate('/login');
};

export default Logout;
