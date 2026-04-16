import store from "../store.js";
import { handleAddNote,
         handleNoteActions
 } from "../controller/notesController.js";

 export default function renderNotesSection(container){
    container.innerHTML=`
    <div class="notes-page">
      <div class="note-form">
        <textarea id="note-input" placeholder="Write your note..."></textarea>
        <button id="add-note">Add Note</button>
      </div>

      <div id="notes-list"></div>
    </div>
    `;

    container
       .querySelector("#add-note")
       .addEventListener("click",handleAddNote);

      const list=container.querySelector("#notes-list");
      list.addEventListener("click",handleNoteActions)

       renderNotesList();
 }

 function renderNotesList() {
    const state =store.getState();
    const list=document.getElementById("notes-list");

    list.innerHTML="";

    state.notes.forEach(note=>{
        const div=document.createElement("div");
        div.className="note";
        div.dataset.id=note.id;

    div.innerHTML=`
     <p>${note.text}</p>
     <div class="actions">
       <button data-action="edit" class="edit-btn btn">Edit</button>
       <button data-action="delete" class="dlt-btn btn">Delete</button>
     </div>
    `;

    list.appendChild(div);
    });
 }