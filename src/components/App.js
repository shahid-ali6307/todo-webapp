import store from "../store.js";
import TaskCard from "./taskCard.js";

export default function App(container) {

  let editTaskId=null;

  function deleteTask(id){
    store.setState(prev=>({
      ...prev,
      tasks:prev.tasks.filter(task=>task.id!==id)
    }));
  }

  function editTask(id){
    const state=store.getState();
    const task=state.tasks.find(t=>t.id===id);
    if(!task) return;

    const form=container.querySelector("#task-form");

    form.title.value=task.title;
    form.description.value=task.description;
    form.priority.value=task.priority;
    form.dueDate.value=task.dueDate;
    form.tags.value=task.tags?task.tags.join(","):"";

    editTaskId=id;

    form.querySelector("button[type='submit']").textContent="Update Task";
  }

  function handleTaskActions(e){
    const action=e.target.dataset.action;
    
    if(!action) return;

    const taskElement=e.target.closest(".task");
    const taskId=Number(taskElement.dataset.id);

    if(action==="delete"){
      deleteTask(taskId);
    }

    else if(action=="edit"){
      editTask(taskId);
    }
  }

  function handleSubmit(e){
      e.preventDefault();

      const formData=new FormData(e.target);

      const taskData = {
          title: formData.get("title"),
          description: formData.get("description"),
          priority: formData.get("priority"),
          dueDate: formData.get("dueDate"),
          tags: formData.get("tags")
          ? formData.get("tags").split(",").map(t => t.trim())
          : []
  };

    if(editTaskId){
      store.setState(prev=>({
        ...prev,
        tasks:prev.tasks.map(task => task.id===editTaskId ? {...task,...taskData}:task)
      }));
      editTaskId=null;
    }

    else{
      const newTask={
        id : Date.now(),
        ...taskData
      };
      store.setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
    }
    e.target.reset();
    e.target.querySelector("button[type='submit']").textContent = "Add Task";
    }

  function render() {
    container.innerHTML = `
         <div class="form-section">
            <h2>Add Task</h2>
            <form id="task-form">
                <input type="text" name="title" required />
                <textarea name="description"></textarea>
                <select name="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input type="date" name="dueDate" />
                <input type="text" name="tags" placeholder="Comma Seperated" />
                <button type="submit">Add Task</button>
            </form>
          </div>

        <ul id="task-list"></ul>

    `;

    const form=container.querySelector("#task-form");
    form.addEventListener("submit",handleSubmit); 

    const list=container.querySelector("#task-list");
    list.addEventListener("click",handleTaskActions);

    const state = store.getState();
    state.tasks.forEach(task => {
      const card=new TaskCard(task);
      card.mount(list);
    })
  }

  store.subscribe(render);
  store.load();
  render();

}