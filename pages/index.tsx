import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
const Home: NextPage = () => {
  const [userInput, setUserInput] = useState('') 
  const [todoList, setTodoList] = useState([])

  const handleChange = (e) => {
    e.preventDefault()

    setUserInput(e.target.value)
    console.log(userInput)
  }

  const handleSubmit = (e) => {
    e.preventDefault(

      setTodoList([
        userInput,
        ...todoList
      ])
    )
  }

  const handleDelete = (todo) => {
    const updatedArr = todoList.filter(todoItem => todoList.indexOf(todoItem) != todoList.indexOf(todo));

    setTodoList(updatedArr)
  }
  return (

    <div className={styles.main}>
    <div >
    <div className={styles.title}>
    <a >NEXT JS TODO LIST</a>
    <form >
      <input className={styles.input} maxlength= "50" placeholder="Maximum 50 characters" type="text" onChange={handleChange}/>
      <button className={styles.button} onClick={handleSubmit}>Submit</button>
    </form></div>
    <ul className={styles.card}>
      {
        todoList.length >=1 ? todoList.map((todo, idx)=> {
          return <li key={idx}>{todo} 
          <DeleteIcon className={styles.button}
           onClick={(e)=> {
            e.preventDefault()
            handleDelete(todo)
          }}/></li>
        })
        : "Enter a todo item"
      }
    </ul>
    </div>
    </div>
  )
}

export default Home
