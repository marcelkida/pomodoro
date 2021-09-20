import React, { useEffect, useContext, useState, useRef } from 'react'
import Button from './components/Button'
import TodoList from './TodoList'
import CountdownAnimation from './components/CountdownAnimation'
import SetPomodoro from './components/SetPomodoro'
import { SettingsContext } from './context/SettingsContext'
import {v4 as uuidv4} from 'uuid'
import './index.css';


const LOCAL_STORAGE_KEY = 'todoApp.todos'
const App = () => {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn,
    buttonText } = useContext(SettingsContext)

    useEffect(() => {updateExecute(executing)}, [executing, startAnimate])

    useEffect(() =>{
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if (storedTodos) setTodos(storedTodos)
    }, [])
  
    useEffect(() =>{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])
  
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  
    function handleAddTodo(e){
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
          return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
        })
    }

  return (
    <div className="container">
      <h1>pomotomo</h1>
      {pomodoro !== 0 ?
      <>
      <Button title="settings" _callback={SettingsBtn} />
        <ul className="labels">
          <li>
            <Button 
              title="work" 
              activeClass={executing.active === 'work' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('work') } 
              //onClick= {document.documentElement.style.setProperty('--color', '#9974ba')}
            />
          </li>
          <li>
            <Button 
              title="short break" 
              activeClass={executing.active === 'short' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('short')}
              //onClick= {document.documentElement.style.setProperty('--color', '#74BA7B')} 
            />
          </li>
          <li>
            <Button 
              title="long break" 
              activeClass={executing.active === 'long' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('long')} 
              //onClick= {document.documentElement.style.setProperty('--color', '#7490ba')}
            />
          </li>
        </ul>
        
        <div className="timer-container">
          <div className="time-wrapper">
              <CountdownAnimation
                key={pomodoro} 
                timer={pomodoro} 
                animate={startAnimate}
              >
                {children}
              </CountdownAnimation>
          </div>
        </div>
        <div className="button-wrapper">
          <Button title="start" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} onClick/>
          <Button title="pause" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
        </div>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>add todo</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    
      </> : <SetPomodoro />}
    </div>
  )
}

export default App
