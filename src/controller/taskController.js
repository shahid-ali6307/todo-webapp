import store from "../store.js";
import renderTaskForm from "../components/taskForm.js";

let editTaskId=null;

export function deleteTask(id){
    store.setState(prev=>({
      ...prev,
      tasks:prev.tasks.filter(task=>task.id!==id)
    }));
  }

export function editTask(id,container){
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

  function toggleTask(id){
    store.setState(prev=>({
      ...prev,
      tasks:prev.tasks.map(task => 
        task.id === id ? {...task,completed: !task.completed} :task
      )
    }));
  }

export function handleTaskActions(e,container){
    const action=e.target.dataset.action;
    
    if(!action) return;

    const taskElement=e.target.closest(".task");
    const taskId=Number(taskElement.dataset.id);

    if(action==="delete"){
      deleteTask(taskId);
    }

    else if(action=="edit"){
      editTask(taskId,container);
    }

    else if(action==="toggle"){
      toggleTask(taskId);
    }
  }

export function handleSubmit(e){
      e.preventDefault();

      const formData=new FormData(e.target);

      const taskData = {
          title: formData.get("title"),
          description: formData.get("description"),
          priority: formData.get("priority"),
          dueDate: formData.get("dueDate"),
          tags: formData.get("tags")
          ? formData.get("tags").split(" ").map(t => t.trim())
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
        ...taskData,
        completed:false
      };
      store.setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
    }
    e.target.reset();
    e.target.querySelector("button[type='submit']").textContent = "Add Task";
    }
