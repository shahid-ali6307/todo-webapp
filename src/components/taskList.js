import store from "../store.js";
import TaskCard from "./taskCard.js";
import { handleTaskActions } from "../controller/taskController.js";

export default function renderTaskList(container,tasks){

    container.innerHTML+=`<ul id=task-list></ul>`;

    const list=container.querySelector("#task-list");
    list.addEventListener("click",e=>handleTaskActions(e,container));

    tasks.forEach(task => {
      const card=new TaskCard(task);
      card.mount(list);
    });
}