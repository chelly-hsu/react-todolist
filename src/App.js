import './App.css';
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import Todolist from './pages/todolist';

const Login = () => {
  return <p>這是登入頁面</p>;
};
const Register = () => {
  return <p>這是註冊頁面</p>;
};

function App() {
  return (
    <div className="container">
      <HashRouter>
        <div className="nav-link">
          <NavLink to="/">
            <p>回到首頁</p>
          </NavLink>
          <NavLink to="/register">
            <p>註冊頁面</p>
          </NavLink>
          <NavLink to="/login">
            <p>登入頁面</p>
          </NavLink>
          <NavLink to="/todo">
            <p>Todo 頁面</p>
          </NavLink>
        </div>
        <Routes>
          <Route path="/" element={<p>這是首頁</p>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="todo" element={<Todolist />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;