import React from "react"
import { useAuth } from "../components/Context";
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import logoPic from './../images/logo.png'
import imgPic from './../images/img.png'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function Register() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const axios = require('axios').default;
  const onSubmitEvent = async (data) => {
    const postData = { user: data };
    console.log(postData)
    await axios.post('https://todoo.5xcamp.us/users', postData)
      .then(resHead => {
        console.log('resHead', resHead)
        setToken(resHead.headers.authorization);
        localStorage.setItem('token', resHead.headers.authorization);
        localStorage.setItem('userName', resHead.data.nickname);

        MySwal.fire({
          icon: 'success',
          title: resHead.data.message,
        })
        navigate('/todo')
      })
      .catch(err => {
        console.log('err', err)
        const error = err.response.data
        return MySwal.fire({
          icon: 'error',
          title: error.message,
          text: error.error?.join()
        })
      })
  }

  // const onSubmitEvent = postData => {
  //   const _url = "https://todoo.5xcamp.us/users";
  //   console.log({
  //     user: postData
  //   });
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
  //       setToken(resHead.headers.get("authorization"));
  //       localStorage.setItem('token', resHead.headers.get("authorization"));
  //       return resHead.json()
  //     })
  //     .then(response => {
  //       console.log(response)
  //       MySwal.fire({
  //         // toast: true,
  //         // position: 'top-end',
  //         icon: response.message === '????????????' ? 'success' : 'error',
  //         title: response.message,
  //         text: response.error?.join() //if 422 fail
  //       })
  //       localStorage.setItem('userName', response.nickname);
  //       navigate('/login') // if 201 success
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
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
          <a href="#"><img className="logoImg" src={logoPic} alt="" /></a>
          <img className="d-m-n" src={imgPic} alt="workImg" />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmitEvent)}>
            <h2 className="formControls_txt">????????????</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" type="text"
              name="email" placeholder="????????? email"
              id="email" {
              ...register("email", {
                required: { value: true, message: "???????????????" },
                pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "????????? Email ??????" }
              })} />
            <span className="mt-1 text-red-500 text-sm">{errors.email?.message}</span>
            <label className="formControls_label" htmlFor="name">????????????</label>
            <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="?????????????????????"
              id="nickname" {
              ...register("nickname", {
                required: { value: true, message: "???????????????" }
              })} />
            <span className="mt-1 text-red-500 text-sm">{errors.nickname?.message}</span>
            <label className="formControls_label" htmlFor="password">??????</label>
            <input className="formControls_input" type="password" name="password" placeholder="???????????????"
              id="password" {
              ...register("password", {
                required: { value: true, message: "???????????????" },
                minLength: { value: 6, message: "??????????????? 6 ???" }
              })} />
            <span className="mt-1 text-red-500 text-sm">{errors.password?.message}</span>
            <label className="formControls_label" htmlFor="confirmPassword">??????????????????</label>

            <input className="formControls_input" type="password" name="confirmPassword" placeholder="???????????????"
              id="confirmPassword" {
              ...register("confirmPassword", {
                required: { value: true, message: "???????????????" },
                minLength: { value: 6, message: "??????????????? 6 ???" },
                validate: value => value === watch('password') || "???????????????"
              })} />
            <span className="mt-1 text-red-500 text-sm">{errors.confirmPassword?.message}</span>
            <input className="formControls_btnSubmit" type="submit" value="????????????" disabled={Object.keys(errors).length > 0} />
            <Link className="formControls_btnLink" to="/login">??????</Link>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Register;
