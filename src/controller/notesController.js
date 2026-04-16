import store from "../store.js";

let editNoteId=null;

export function deleteNote(id){
    store.setState(prev=>({
        ...prev,
        notes:prev.notes.filter(note=>note.id!==id)
    }));
}

export function editNote(id){
    const state=store.getState();
    const task=state.notes.find(note=>note.id===id);
    if(!task) return;
    
    document.getElementById("note-input").value=task.text;
    editNoteId=id;
}

export function handleAddNote(e,container){
    const textarea=document.getElementById("note-input");
    const text=textarea.value.trim();

    if(!text) return;

    if(editNoteId){
        store.setState(prev=>({
            ...prev,
            notes: prev.notes.map(note=>
                note.id===editNoteId?{...note,text}:note
            )
        }));
        editNoteId=null;

    } else{
        const newNote={
            id:Date.now(),
            text
        };

        store.setState(prev=>({
            ...prev,
            notes: [...prev.notes,newNote]
        }));
    }

    textarea.value="";
}

export function handleNoteActions(e){
    const action=e.target.dataset.action;
    if(!action) return;

    const noteEl=e.target.closest(".note");
    const id=Number(noteEl.dataset.id);

    if(action==="delete"){
       deleteNote(id);
    }

    if(action==="edit"){
        editNote(id);
    }
}