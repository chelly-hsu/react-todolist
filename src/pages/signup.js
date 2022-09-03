import React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import logoPic from './../images/logo.png'
import imgPic from './../images/img.png'

function Signup(){
  const { useRef } = React;
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const axios = require('axios').default;
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmitEvent = (data) => {
    const postData = { user: data };
    console.log(postData)
    axios.post('https://todoo.5xcamp.us/users', postData)
      .then(res => {
      alert(`送出成功：${res.data.message}`)
    })
      .catch(err => {
        const error = err.response.data;
        alert(`${error.message}:${error.error}`);
    })
  }
  
  return (
      <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
          <div className="side">
            <a href="#"><img className="logoImg" src={logoPic} alt="" /></a>
            <img className="d-m-n" src={ imgPic } alt="workImg" />
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(onSubmitEvent)}>
              <h2 className="formControls_txt">註冊帳號</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input className="formControls_input" type="text" 
                     name="email" placeholder="請輸入 email" 
                     id="email" {
                      ...register("email", { 
                        required: {value : true, message: "此欄位必填"}, 
                        pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "不符合 Email 規則"} 
               })} />
              <span className="mt-1 text-red-500 text-sm">{errors.email?.message}</span>
              <label className="formControls_label" htmlFor="name">您的暱稱</label>
              <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱"
                id="nickname" {
                  ...register("nickname", { 
                    required: {value : true, message: "此欄位必填"}
              })} />
              <span className="mt-1 text-red-500 text-sm">{errors.nickname?.message}</span>
              <label className="formControls_label" htmlFor="password">密碼</label>
              <input className="formControls_input" type="password" name="password" placeholder="請輸入密碼" 
                id="password" {
                  ...register("password", { 
                    required: {value : true, message: "此欄位必填"}, 
                    minLength: {value:  6, message: "密碼至少為 6 碼"} 
                  })} />
              <span className="mt-1 text-red-500 text-sm">{errors.password?.message}</span>
              <label className="formControls_label" htmlFor="confirmPassword">再次輸入密碼</label>
              
              <input className="formControls_input" type="password" name="confirmPassword" placeholder="請輸入密碼" 
                id="confirmPassword" {
                  ...register("confirmPassword", { 
                    required: {value : true, message: "此欄位必填"},
                    validate: value => value === password.current || "密碼輸入不相同"
                  })} />
                <span className="mt-1 text-red-500 text-sm">{errors.confirmPassword?.message}</span>
              <input className="formControls_btnSubmit" type="submit" value="註冊帳號" disabled={Object.keys(errors).length > 0}/>
              <Link className="formControls_btnLink" to="/login">登入</Link>
            </form>
          </div>
        </div>

      </div>
    )
}

export default Signup;
