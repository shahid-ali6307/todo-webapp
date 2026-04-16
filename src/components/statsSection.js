import store from "../store.js";

export default function renderStat(container){
    container.innerHTML=`
       <div class="stats-page">
        <h2>Statistics</h2>

        <div class="stats-grid">
            <div class="card" id="total-tasks"></div>
            <div class="card" id="completed-tasks"></div>
            <div class="card" id="pending-tasks"></div>
            <div class="card" id="high-priority-tasks"></div>
            <div class="card" id="medium-priority-tasks"></div>
            <div class="card" id="low-priority-tasks"></div>
            <div class="card" id="overdue-tasks"></div>
            <div class="card" id="total-notes"></div>
        </div>
    </div>
    </div>
    `;
      
    function calculateStats(state){
        const now=new Date();
        console.log(state);
        
        let totalTasks=state.tasks.length;
        let completed=0;
        let pending=0;
        let high=0,medium=0,low=0;
        let overdue=0;

        state.tasks.forEach(task => {
            if(task.completed){
                completed++;
            }else{
                pending++;
            }

            if(task.priority==="high") high++;
            if(task.priority==="medium")medium++;
            if(task.priority==="low") low++;

            if(task.dueDate && new Date(task.dueDate) < now && !task.completed){
                overdue++;
            }
        });



        return {
            totalTasks,completed,pending,high,medium,low,overdue,totalnotes:state.notes.length
        };
    }

    const state = store.getState();
  const stats = calculateStats(state);

  document.getElementById("total-tasks").textContent =
    `Total Tasks: ${stats.totalTasks}`;

  document.getElementById("completed-tasks").textContent =
    `Completed: ${stats.completed}`;

  document.getElementById("pending-tasks").textContent =
    `Pending: ${stats.pending}`;

  document.getElementById("high-priority-tasks").textContent =
    `High Priority: ${stats.high}`;

  document.getElementById("medium-priority-tasks").textContent =
    `Medium Priority: ${stats.medium}`;

  document.getElementById("low-priority-tasks").textContent =
    `Low Priority: ${stats.low}`;

  document.getElementById("overdue-tasks").textContent =
    `Overdue: ${stats.overdue}`;

  document.getElementById("total-notes").textContent =
    `Total Notes: ${stats.totalnotes}`;

    store.subscribe(renderStat);
}