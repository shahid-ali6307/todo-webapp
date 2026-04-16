// export function createTask(data){
//     return {
//         id: Date.now(),
//         title: data.title.trim(),
//         description: data.description.trim(),
//         priority: data.priority || "low",
//         dueDate: data.dueDate || null,
//         tags: data.tags || [],
//         completed: false,
//         createdAt: Date.now()
//     };
// }


// function normalizeTags(tagString=""){
//     return tagString
//     .split(",")
//     .map(tag=>tag.trim())
//     .filter(Boolean);
// }
import store from "../store.js";
import TaskCard from "./taskCard.js";
import { handleTaskActions } from "../controller/taskController.js";

export default function renderTaskList(container,tasks){

    container.innerHTML+=`<ul id=task-list></ul>`;

    const list=container.querySelector("#task-list");
    list.addEventListener("click",e=>handleTaskActions(e,container));

    // const state = store.getState();
    // state.tasks.forEach(task => {
    //   const card=new TaskCard(task);
    //   card.mount(list);
    // })

    tasks.forEach(task => {
      const card=new TaskCard(task);
      card.mount(list);
    });
}