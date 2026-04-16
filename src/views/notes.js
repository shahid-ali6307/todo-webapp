import store from "../store.js";
import renderNotesSection from "../components/notesSection.js";

export default function renderNotes(container){

    function render(){
        container.innerHTML=`
          <div class="page">
            <h1>Notes</h1>
            <div id="notes-content"></div>
        </div>
    `;

    const content=container.querySelector("#notes-content");

    renderNotesSection(content);
    }
    store.subscribe(render);
    render();
}