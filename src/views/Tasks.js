import store from "../store.js";
import renderTaskForm from "../components/taskForm.js";
import renderTaskList from "../components/taskList.js";


export default function renderTasks(container){

    let currentFilter="all";

    const filterList=document.getElementById("filter-list");
    filterList.addEventListener("click",(e)=>{
        const filter=e.target.dataset.filter;
        if(!filter) return;

        currentFilter=filter;
        render();
    });

    function render(){
        container.innerHTML=`
     <div class="page">
        <h1>Tasks</h1>
        <div id="task"></div>
        <div id="task-content"></div>

    </div>
    `;
    const content=container.querySelector("#task-content");
    const form=container.querySelector('#task');

    const state=store.getState();
    let filteredTask=state.tasks;

    if(currentFilter === "completed"){
        filteredTask=state.tasks.filter(t=>t.completed);
    }

    if(currentFilter === "pending"){
        filteredTask=state.tasks.filter(t=>!t.completed);
    }

    renderTaskList(content,filteredTask);
    
    }

    store.subscribe(render);
    store.load();
    render();
}
