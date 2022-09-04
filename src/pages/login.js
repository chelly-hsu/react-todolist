import React, { useState } from "react"
import { useAuth } from "./../components/Context";
import { Navigate, useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import logoPic from './../images/logo.png'
import imgPic from './../images/img.png'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


function Login() {
  const { token, setToken } = useAuth()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, setLogin] = useState(false);

  const axios = require('axios').default;
  const onSubmitEvent = (data) => {
    const postData = { user: data };
    console.log(postData)
    axios.post('https://todoo.5xcamp.us/users/sign_in', postData)
      .then(resHead => {
        console.log(resHead)
        setToken(resHead.headers.authorization);
        localStorage.setItem('token', resHead.headers.authorization);
        localStorage.setItem('userName', resHead.data.nickname);
        setLogin(true);
        MySwal.fire({
          icon: 'success',
          title: `送出成功：${resHead.data.message}`,
        })
        navigate('/todo')
      })
      .catch(err => {
        console.log(err)
        const error = err.response.data;
        return MySwal.fire({
          icon: 'error',
          title: error.message,
        })
      })
  }

  // const onSubmitEvent = postData => {

  //   const _url = "https://todoo.5xcamp.us/users/sign_in";
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   fetch(_url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: postData
  //     })
  //   })
  //     .then(resHead => {
  //       console.log(resHead)
  //       if (resHead.status === 401) { //登入失敗
  //         throw new Error('登入失敗，請重新檢驗！');
  //       }
  //       setToken(resHead.headers.get("authorization"));
  //       localStorage.setItem('token', resHead.headers.get("authorization"));
  //       return resHead.json()
  //     })
  //     .then(response => {
  //       console.log(response)
  //       localStorage.setItem('userName', response.nickname);
  //       setLogin(true);

  //       MySwal.fire({
  //         icon: 'success',
  //         title: response.message,
  //       })
  //       navigate('/todo')
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       return MySwal.fire({
  //         icon: 'error',
  //         title: err.message,
  //       })
  //     })
  // }

  return (
    <>
      <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
          <div className="side">
            <a href="#"><img className="logoImg" src={logoPic} alt="" /></a>
            <img className="d-m-n" src={imgPic} alt="workImg" />
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(onSubmitEvent)}>
              <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input className="formControls_input" type="text" name="email" placeholder="請輸入 email"
                id="email" {
                ...register("email", {
                  required: { value: true, message: "此欄位必填" },
                  pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "不符合 Email 規則" }
                })} />
              <span className="mt-1 text-red-500 text-sm">{errors.email?.message}</span>
              <label className="formControls_label" htmlFor="password">密碼</label>
              <input className="formControls_input" type="password" name="password" placeholder="請輸入密碼"
                id="password" {
                ...register("password", {
                  required: { value: true, message: "此欄位必填" },
                  minLength: { value: 6, message: "密碼至少為 6 碼" }
                })} />
              <span className="mt-1 text-red-500 text-sm">{errors.password?.message}</span>
              <input className="formControls_btnSubmit" type="submit" value="登入" disabled={Object.keys(errors).length > 0} />
              <Link className="formControls_btnLink" to="/register">註冊帳號</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login;