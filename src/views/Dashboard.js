import renderTaskForm from "../components/taskForm.js";

export default function renderDashboard(container){
   container.innerHTML=`
   <div class="page">
      <h1>Dashboard</h1>
      <div id="dashboard-content"></div>
    </div>
   `;

   const content=container.querySelector("#dashboard-content");
   renderTaskForm(content);   
}