import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import emptyPic from './../images/empty.png'

const { useState } = React;
function Todolist (){
  
  const defList = [{
      sysid: 0,
      checked: false,
      todoContent: "把冰箱發霉的檸檬拿去丟",
    },{
      sysid: 1,
      checked: true,
      todoContent: "打電話叫媽媽匯款給我",
    },{
      sysid: 2,
      checked: false,
      todoContent: "整理電腦資料夾",
    },{
      sysid: 3,
      checked: false,
      todoContent: "繳電費水費瓦斯費",
    },{
      sysid: 4,
      checked: false,
      todoContent: "約vicky禮拜三泡溫泉",
    },{
      sysid: 5,
      checked: false,
      todoContent: "約ada禮拜四吃晚餐",
    }] //預設代辦事項清單

  // const [allList, setAllList] = useState([...defList]); //全部清單
  const [allList, setAllList] = useState([]); //全部清單
  const [currentTab, setCurrentTab] = useState(1) //目前頁籤
  
  // input box
  function InputBox (){
    const [newTodo, setNewTodo] = useState('') //新增代辦事項
    //add new todo
    function addNewBtn(){
      console.log(allList)
      const sysid = allList.length <= 0 ? 0 : allList[allList.length-1]?.sysid + 1 
      setAllList([
        ...allList, 
        { sysid: sysid, 
          checked: false, 
          todoContent: newTodo
        }
      ])
      setNewTodo('')
    }
    
    return <>
      <input type="text" 
        value={newTodo} 
        onChange={ (e)=>setNewTodo(e.target.value) } 
        placeholder="請輸入待辦事項" 
        />
      <span onClick={ ()=> addNewBtn() }><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></span>
    </>
  }
  
  // todolist item
  function TodoListArea(props){
    const {...rest} = props;
    
    // build lists
    function ListLi(){
      return (
        <ul className="todoList_item" > {
            allList.filter( (item)=> currentTab === 1 
                           ? true : currentTab === 2 
                           ? !item.checked : item.checked )
              .map((item, i, arr)=>(
              <li key={i}>
                <label className="todoList_label">
                  <input sysid={item.sysid} className="todoList_input" type="checkbox" checked={item.checked} onChange={ ()=> handleCheckBox(item.sysid) } />
                  <span>{item.todoContent}</span>
                </label>
                <span onClick={ ()=> delTodoItem(item.sysid) } style={{paddingBottom:'14px'}}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></span>
              </li>
            ))
        }</ul>
      )
    }

    // change checkbox
    function handleCheckBox(sysid){
      // const index = allList.findIndex( (item)=> item.sysid === sysid ) //.findIndex()not supported in IE
      const index = allList.map( item => item.sysid ).indexOf(sysid)
      console.log(index)
      allList[index].checked = !allList[index].checked
      setAllList([...allList])
      console.log(allList)
    }  

    // delete button
    function delTodoItem(sysid){
      console.log(sysid)
      const index = allList.map( item => item.sysid ).indexOf(sysid)

      setAllList(allList.filter( (item, i)=> i !== index ))
      console.log(allList)
    }
    
    return <div {...rest}>
              <div className="todoList_list">
                  <ul className="todoList_tab">
                    <li onClick={()=>setCurrentTab(1)}>
                      <span className={currentTab === 1 ? "active" : ""}>全部</span>
                    </li>
                    <li onClick={()=>setCurrentTab(2)}>
                      <span className={currentTab === 2 ? "active" : ""}>待完成</span>
                    </li>
                    <li onClick={()=>setCurrentTab(3)}>
                      <span className={currentTab === 3 ? "active" : ""}>已完成</span>
                    </li>
                  </ul>
                  <div className="todoList_items">
                    <ListLi currentTab={currentTab} setCurrentTab={setCurrentTab}></ListLi>
                    <div className="todoList_statistics">
                      { currentTab === 2 
                        ? <p>{allList.filter(item=> item.checked === false).length} 待完成項目</p>
                        : <p>{allList.filter(item=> item.checked === true).length} 個已完成項目</p>
                      }
                        <span onClick={ ()=> setAllList(
                          allList.filter(item=> item.checked === false)) }>清除已完成項目</span>
                    </div>
                  </div>
              </div>
      </div>
  }
 
  return  <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1><span>ONLINE TODO LIST</span></h1>
          <ul>
            <li className="todo_sm"><span><span>王小明的代辦</span></span></li>
            <li><a href="#loginPage">登出</a></li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <InputBox></InputBox>
            </div>
            { allList.length === 0 
              ? <div style={{width:"240px",margin:"60px auto",textAlign:"center"}}>
                  <p style={{marginBottom:"16px"}}>目前尚無代辦事項</p>
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