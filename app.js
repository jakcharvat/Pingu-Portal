import { initAuth } from './auth.js';
import Router from './router.js';

window.onload = () => {
    let router = null
    initAuth({ onLogin: () => {
        router = new Router();
    }, onLogout: () => {
        router?.deactivate();
        router = null;
    }});
}