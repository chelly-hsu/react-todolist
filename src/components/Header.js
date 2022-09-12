import React, { useState } from "react";
import { useAuth } from "./../components/Context";
import { Loading } from "./../components/Loading";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function Header() {
    const [isLoading, setIsLoading] = useState(false)
    const { token, setToken } = useAuth()
    const userName = localStorage.userName;

    const axios = require('axios').default;

    async function logOutBtn() {
        setIsLoading(true)
        await axios.delete('https://todoo.5xcamp.us/users/sign_out', {
            headers: {
                authorization: localStorage.token
            }
        })
            .then(res => {
                MySwal.fire({
                    icon: 'success',
                    title: `登出成功：${res.data.message}`,
                })

                setIsLoading(false)
            })
            .then(() => setToken(null))
            .catch(err => {
                const error = err.response.data;
                MySwal.fire({
                    icon: 'error',
                    title: error.message,
                })
                setIsLoading(false)
            })
    }

    return (
        <>
            { isLoading ? <Loading /> : false}
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