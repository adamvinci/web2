import HomePage from '../Pages/HomePage';
import AddMoviePage from '../Pages/AddMovie';
import ViewMoviePage from '../Pages/DisplayMovie'
import ViewOneMoviePage from '../Pages/ViewOneMoviePage';
import loginPage from '../Pages/Login';
import RegisterPage from '../Pages/Register';
import LogoutPage from '../Pages/Logout';

const routes = {
  '/': HomePage,
  '/addMovie': AddMoviePage,
  '/viewMovie': ViewMoviePage,
  '/movie':ViewOneMoviePage,
  '/login':loginPage,
  '/register':RegisterPage,
  '/logout':LogoutPage,
};

export default routes;
