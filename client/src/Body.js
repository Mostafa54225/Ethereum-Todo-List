import React, { useState } from 'react'

const Body = ({tasks, createTask, completedTasks}) => {

  const[content, setContent] = useState("")
  const onsubmit = (e) => {
    e.preventDefault()
    createTask(content)
  }
  
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            <div id="loader" className="text-center">
              <p className="text-center"></p>
            </div>
            <div id="content">
              <form onSubmit={onsubmit}>
                <input id="newTask" onChange={e => setContent(e.target.value)} type="text" className="form-control" placeholder="Add task..." required />
                <input type="submit" hidden="" />
              </form>

              <ul id="taskList" className="list-unstyled">
                { tasks.map((task, key) => {
                  return(
                    <div className="taskTemplate" key={key}>
                      <label>
                        <input 
                          type="checkbox"
                          defaultChecked={task.completed} 
                          onClick={e => {completedTasks(task.id)}}/>
                        <span style={{textDecorationLine: task.completed === true ? 'line-through': 'none'}}>{task.content}</span>
                      </label>
                    </div>
                  )
                })}
              </ul>

              <ul id="completedTaskList" className="list-unstyled">
              </ul>
            </div>
          </main>
        </div>
      </div>
  </div>
  )
}

export default Body