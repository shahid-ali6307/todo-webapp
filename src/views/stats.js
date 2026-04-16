import renderStat from "../components/statsSection.js";
import store from "../store.js";

export default function renderStats(container){
    function render(){
        container.innerHTML=`
        <div class="page">
           <h1>Stats</h1>
           <div id="stats-content"></div>
        </div>
        `;

    const content =container.querySelector("#stats-content");
    renderStat(content);
    }

    store.subscribe(render);
    render(); 
}