import React from "react";
import { useAuth } from "./../components/Context";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function Header() {
    const { token, setToken } = useAuth()
    const userName = localStorage.userName;

    const axios = require('axios').default;
    localStorage.setItem('token', token);
    const logOutBtn = (data) => {
        const postData = { user: data };
        console.log(postData)
        axios.delete('https://todoo.5xcamp.us/users/sign_out', {
            headers: {
                authorization: localStorage.token
            }
        })
            .then(res => {
                MySwal.fire({
                    icon: 'success',
                    title: `登出成功：${res.data.message}`,
                })
                setToken(null)
            })
            .catch(err => {
                const error = err.response.data;
                MySwal.fire({
                    icon: 'error',
                    title: error.message,
                })
            })
    }

    return (
        <>
            <nav>
                <h1><span>ONLINE TODO LIST</span></h1>
                <ul>
                    <li className="todo_sm"><span><span>{userName}的代辦</span></span></li>
                    <li><a href="#" onClick={logOutBtn}>登出</a></li>
                </ul>
            </nav>
        </>
    )
}


export default Header;