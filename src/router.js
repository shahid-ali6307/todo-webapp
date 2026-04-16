import renderDashboard from "./views/Dashboard.js";
import renderNotes from "./views/notes.js";
import renderStat from "./views/stats.js";
import renderTasks from "./views/Tasks.js";

export default function initRouter(){
    window.addEventListener("hashchange",handleRoute);
    window.addEventListener("DOMContentLoaded",handleRoute);
}

const routes={
    "#dashboard" : renderDashboard,
    "#tasks" : renderTasks,
    "#notes" : renderNotes,
    "#stats" : renderStat
};

function handleRoute(){
    const hash=location.hash || "#dashboard";

    const view = routes[hash];

    const container=document.getElementById("app");

    if(view){
        view(container);
    } else {
        container.innerHTML="<h2>404  -  Page Not Found</h2>"
    }
}