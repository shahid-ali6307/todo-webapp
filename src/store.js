let state={
    tasks:[],
    notes:[]
};

let listeners=[];

const store={
    getState() {
        return state;
    },


    setState(updater) {
        state=updater(state);
        this.save();
        listeners.forEach(fn=>fn(state));
    },


    subscribe(fn) {
        listeners.push(fn);
    },


    save() {
        try{
            localStorage.setItem("app_state",JSON.stringify(state));
        } catch(err){
            console.error("save failed", err);
        }
    },


    load() {
        try{
            const data=localStorage.getItem("app_state");
            if(data){
                const parsed=JSON.parse(data);

                state = {
                    tasks: (parsed.tasks || []).map(task=>({
                        ...task,
                        completed: task.completed ?? false
                    })),
                    notes: parsed.notes || []
                }
            }
        } catch(err){
            console.error("Load failed",err);            
        }
    }
};

export default store;

