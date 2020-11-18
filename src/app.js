import { initAuth } from './auth.js';
import Router from './router.js';
import ViewMembers from './viewMembers.js';

let currentPageScript = null;

window.onload = async () => {
    let router = null

    const authenticator = initAuth();
    authenticator.onLogin = () => {
        router = new Router();
        router.onRouteChanged = onRouteChanged;
        router.showInitialPage();
    }
    authenticator.onLogout = () => {
        router?.deactivate();
        router = null;
    }
}


function onRouteChanged(newPage) {
    switch (newPage) {
        case 'viewMembers':
            currentPageScript = new ViewMembers();
            currentPageScript.onAppear();
            break;
    
        default:
            currentPageScript = null;
            break;
    }
}