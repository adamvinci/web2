import { setAuthenticatedUser } from '../../utils/auth';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Login';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onLogin);
}

async function onLogin(e) {
 e.preventDefault();
    const userName= document.querySelector("#username").value;
    const password=document.querySelector("#password").value;

    const options={
        method:'POST',
        body: JSON.stringify({
            userName,
            password
        }),
        headers:{
            'Content-Type':' application/json',
        },
    }
    const response=await fetch('api/auths/register',options)
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const user=await response;
    setAuthenticatedUser(user);
    Navbar();
    Navigate('/')
}

export default RegisterPage;