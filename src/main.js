import store from './store.js';
import initRouter from './router.js';


const app=document.getElementById("app");
store.load();
initRouter();