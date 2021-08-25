import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import Body from './Body'
import TodoListabi from './contracts/TodoList.json'
import Navbar from './Navbar'

function App() {

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  
  const[loader, setLoader] = useState(true)
  const[currnetAccount, setCurrentAccount] = useState("")
  const[todoListSC, setTodoListSC] = useState()
  const[taskCount, setTaskCount] = useState(0)
  const[tasks, setTasks] = useState([])
  
  const loadWeb3 = async () => {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    } else if(window.web3) window.web3 = new Web3(window.web3.currentProvider)
    else window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }

  const loadBlockchainData = async () => {
    
    setLoader(true)
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    setCurrentAccount(account)

    const networkId = await web3.eth.net.getId()
    const networkData = TodoListabi.networks[networkId]
    
    if(networkData) {
      const todoList = new web3.eth.Contract(TodoListabi.abi, networkData.address)
      setTodoListSC(todoList)
      fetchData(todoList)
      setLoader(false)
      
    }
  }

  const fetchData = async (todoList) => {
    const count = await todoList.methods.taskCount().call()
    setTaskCount(count)
    let tasks = []
    for(let i=1; i <= count; i++) {
      const task = await todoList.methods.tasks(i).call()
      tasks.push(task)
    }
    setTasks(tasks)
  }

  const createTask = async(content) => {
    setLoader(true)
    await todoListSC
    .methods
    .createTask(content)
    .send({from: currnetAccount})
    .on('transactionhash', () => {console.log("Created Successfully")})
    setLoader(false)
    window.location.reload()
  }

  const completedTasks = async (taskId) => {
    setLoader(true)
    await todoListSC
    .methods
    .completedTasks(taskId)
    .send({from: currnetAccount})
    .on('completed', () => {console.log("Completed Successfully")})
    setLoader(false)
    window.location.reload()
  }


  if(loader){
    return <div>Loading...</div>
  } 
  return (
    <div className="App">
      <Navbar account={currnetAccount}/>
      <Body 
        tasks={tasks}
        createTask={createTask}
        completedTasks={completedTasks}
      />
    </div>
  );
}

export default App;
