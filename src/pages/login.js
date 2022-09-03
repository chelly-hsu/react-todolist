import React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import logoPic from './../images/logo.png'
import imgPic from './../images/img.png'

function Login(){
  const axios = require('axios').default;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmitEvent = (data) => {
    const postData = { user: data };
    console.log(postData)
    axios.post('https://todoo.5xcamp.us/users/sign_in', postData)
      .then(res => {
      alert(`送出成功：${res.data.message}`)
    })
      .catch(err => {
        const error = err.response.data;
        alert(`${error.message}`);
    })
  }
  
  return(
      <>
          <div id="loginPage" className="bg-yellow">
              <div className="conatiner loginPage vhContainer ">
                  <div className="side">
                      <a href="#"><img className="logoImg" src={logoPic} alt="" /></a>
                      <img className="d-m-n" src={ imgPic } alt="workImg" />
                  </div>
                  <div>
                      <form className="formControls" onSubmit={handleSubmit(onSubmitEvent)}>
                          <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                          <label className="formControls_label" htmlFor="email">Email</label>
                          <input className="formControls_input" type="text" name="email" placeholder="請輸入 email" 
                            id="email" {
                              ...register("email", { 
                                required: {value : true, message: "此欄位必填"}, 
                                pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "不符合 Email 規則"} 
                          })} />
                          <span className="mt-1 text-red-500 text-sm">{errors.email?.message}</span>
                          <label className="formControls_label" htmlFor="password">密碼</label>
                          <input className="formControls_input" type="password" name="password" placeholder="請輸入密碼" 
                            id="password" {
                              ...register("password", { 
                                required: {value : true, message: "此欄位必填"}, 
                                minLength: {value: 6, message:  "密碼至少為 6 碼"} 
                          })} />
                          <span className="mt-1 text-red-500 text-sm">{errors.password?.message}</span>
                          <input className="formControls_btnSubmit" type="submit" value="登入" disabled={Object.keys(errors).length > 0}/>
                          <Link className="formControls_btnLink" to="/register">註冊帳號</Link>
                      </form>
                  </div>
              </div>
          </div>
      </>
  )
}
export default Login;