import { handleSubmit } from "../controller/taskController.js";

export default function renderTaskForm(container){
    container.innerHTML = `
         <div class="form-section">
            <h2>Add Task</h2>
            <form id="task-form">
                <input type="text" name="title" required />
                <textarea name="description"></textarea>
                <select name="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input type="date" name="dueDate" />
                <input type="text" name="tags" placeholder="Comma Seperated" />
                <button type="submit">Add Task</button>
            </form>
          </div>
    `;

    const form=container.querySelector("#task-form");
    form.addEventListener("submit",handleSubmit);
}