import App from './components/App.js';
import store from './store.js';
import initRouter from './router.js';


const app=document.getElementById("app");
// App(app);
store.load();
initRouter();