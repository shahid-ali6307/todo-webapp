export default class TaskCard{
    constructor(task) {
        this.task=task;
        this.el=document.createElement("li");
        this.el.className="task";
        this.el.dataset.id=task.id;
    }

    mount(container){
        this.render();
        container.appendChild(this.el);
    }

    render(){
        this.el.innerHTML=`
        <div class="task ${this.task.completed?"completed":""}">
           <div class="task-header">
        <h3>${this.task.title}</h3>
        <span class="priority priority-${this.task.priority}">Priority: ${this.task.priority}</span>
      </div>

      <p>Description: ${this.task.description || ""}</p>

      <div class="meta">
         <span>Due: ${this.task.dueDate || "No due date"}</span>
      </div>
      </div>

      <div class="actions">
         <button data-action="edit" id="edit" class="btn edit-btn">Edit</button>
         <button data-action="delete" id="dlt" class="btn dlt-btn">Delete</button>
         <button data-action="toggle" class="btn">${this.task.completed?"Undo":"Complete"}</button>
      </div>
        `;

        const metaDiv = this.el.querySelector(".meta");

        if (this.task.tags && this.task.tags.length > 0) {
      const tagsContainer = document.createElement("div");
      tagsContainer.className = "tags";

      this.task.tags.forEach(tag => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "tag";
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
      });

      metaDiv.appendChild(tagsContainer);
    }
   }
}