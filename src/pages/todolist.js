import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import emptyPic from './../images/empty.png'
import Header from './../components/Header'
import { useAuth } from "./../components/Context";
import { useNavigate, Link } from "react-router-dom"

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function Todolist() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [allList, setAllList] = useState([]); //全部清單
  const [currentTab, setCurrentTab] = useState(1) //目前頁籤

  const axios = require('axios').default;
  // 取得清單
  function getTodo() {
    axios.get('https://todoo.5xcamp.us/todos', { headers: { 'Authorization': token } })
      .then(resHead => {
        console.log('resHead', resHead)
        setAllList(resHead.data.todos)

        // MySwal.fire({
        //   icon: 'success',
        //   title: resHead.data.message,
        // })
      })
      .catch(err => {
        console.log('err', err)
        const error = err.response.data
        return MySwal.fire({
          icon: 'error',
          title: error.message,
        })
      })
  }
  useEffect(() => {
    getTodo()
  }, [])
  // const getTodo = () => {
  //   const _url = "https://todoo.5xcamp.us/todos";
  //   fetch(_url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'authorization': token
  //     }
  //   })
  //     .then(resHead => {
  //       console.log(resHead)
  //       return resHead.json()
  //     })
  //     .then(response => {
  //       console.log(response)
  //       setAllList(response.todos)
  //     })
  // }

  // todo列表
  function TodoListArea(props) {
    const { ...rest } = props;

    // 建立列表 build lists
    function ListLi() {
      return (
        <ul className="todoList_item" > {
          allList.filter((item) => currentTab === 1
            ? true : currentTab === 2
              ? !item.completed_at : item.completed_at)
            .map((item, i, arr) => (
              <li key={i}>
                <label className="todoList_label">
                  <input id={item.id} className="todoList_input" type="checkbox" checked={item.completed_at} onChange={() => handleCheckBox(item.id)} />
                  <span>{item.content}</span>
                </label>
                <span onClick={() => delTodoItem(item.id)} style={{ paddingBottom: '14px' }}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></span>
              </li>
            ))
        }</ul>
      )
    }

    // 切換 完成｜待完成 change checkbox
    function handleCheckBox(id) {
      axios.patch(`https://todoo.5xcamp.us/todos/${id}/toggle`, {}, {
        headers: { 'Authorization': token },
      })
        .then(resHead => {
          console.log('resHead', resHead)
          const index = allList.map(item => item.id).indexOf(resHead.data.id)
          allList[index].completed_at = resHead.data.completed_at
          setAllList([...allList])
          console.log(allList)

          // MySwal.fire({
          //   icon: 'success',
          //   title: resHead.data.message,
          // })
        })
        .catch(err => {
          console.log('err', err)
          const error = err.response.data
          return MySwal.fire({
            icon: 'error',
            title: error.message,
          })
        })
    }

    // 刪除 delete button
    function delTodoItem(id) {
      console.log(id)
      axios.delete(`https://todoo.5xcamp.us/todos/${id}`, {
        headers: { 'Authorization': token },
      })
        .then(resHead => {
          console.log('resHead', resHead)
          const index = allList.map(item => item.id).indexOf(id)
          setAllList(allList.filter((item, i) => i !== index))

          // MySwal.fire({
          //   icon: 'success',
          //   title: resHead.data.message,
          // })
        })
        .catch(err => {
          console.log('err', err)
          const error = err.response.data
          return MySwal.fire({
            icon: 'error',
            title: error.message,
          })
        })
    }

    return <div {...rest}>
      <div className="todoList_list">
        <ul className="todoList_tab">
          <li onClick={() => setCurrentTab(1)}>
            <span className={currentTab === 1 ? "active" : ""}>全部</span>
          </li>
          <li onClick={() => setCurrentTab(2)}>
            <span className={currentTab === 2 ? "active" : ""}>待完成</span>
          </li>
          <li onClick={() => setCurrentTab(3)}>
            <span className={currentTab === 3 ? "active" : ""}>已完成</span>
          </li>
        </ul>
        <div className="todoList_items">
          <ListLi currentTab={currentTab} setCurrentTab={setCurrentTab}></ListLi>
          <div className="todoList_statistics">
            <p>{allList.filter(item => item.completed_at === null).length} 待完成項目</p>
            {/* { currentTab === 1 || currentTab === 2 
                        ? <p>{allList.filter(item=> item.completed_at === null).length} 待完成項目</p>
                        : <p>{allList.filter(item=> item.completed_at === true).length} 個已完成項目</p>
                      } */}
            <span onClick={() => setAllList(
              allList.filter(item => item.completed_at === null))}>清除已完成項目</span>
          </div>
        </div>
      </div>
    </div>
  }

  // 新增待辦事項
  function InputBox() {
    const [newTodo, setNewTodo] = useState('') //新增代辦事項

    //add new todo
    function addNewBtn() {
      console.log(newTodo)
      console.log(token)
      if (newTodo) {
        const postData = { todo: { content: newTodo } }
        console.log(postData)
        // function postTodo() {

        axios.post('https://todoo.5xcamp.us/todos',
          postData, {
          headers: { 'Authorization': token },
        })
          .then(resHead => {
            console.log('resHead', resHead)
            setAllList([...allList, resHead.data])
            // MySwal.fire({
            //   icon: 'success',
            //   title: resHead.data.message,
            // })
          })
          .catch(err => {
            console.log('err', err)
            const error = err.response.data
            return MySwal.fire({
              icon: 'error',
              title: error.message,
            })
          })
        // }
      } else {
        // throw new Error();
        return MySwal.fire({
          icon: 'error',
          title: '請先填寫待辦事項',
        })
      }
    }

    return <>
      <input type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="請輸入待辦事項"
      />
      <span onClick={() => addNewBtn()}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></span>
    </>
  }

  return <>
    <div id="todoListPage" className="bg-half">
      <Header></Header>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <InputBox></InputBox>
          </div>
          {allList.length === 0
            ? <div style={{ width: "240px", margin: "60px auto", textAlign: "center" }}>
              <p style={{ marginBottom: "16px" }}>目前尚無代辦事項</p>
              <div><img src={emptyPic} alt="0代辦事項"></img></div>
            </div>
            : <TodoListArea></TodoListArea>
          }
        </div>
      </div>
    </div>
  </>
}

export default Todolist;