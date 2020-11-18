function login() {
    var uiConfig = {
        signInSuccessUrl: `${window.location.pathname}${window.location.hash}`,
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        signInFlow: 'popup',
    };
    
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseSignInUI', uiConfig);
}


function logout() {
    firebase.auth().signOut();
}


function initAuth() {
    const root = document.getElementById('root');
    const appTemplate = document.getElementById('appTemplate').innerHTML;
    const signInTemplate = document.getElementById('signInTemplate').innerHTML;
    const authObject = new Authenticator();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const app = document.getElementById('app');
            if (!app) {
                root.innerHTML = appTemplate;
                document.getElementById('logout').addEventListener('click', () => {
                    logout();
                })
            }

            authObject.onLogin();
        } else {
            const signInUI = document.getElementById('firebaseSignInUI');
            if (!signInUI) {
                root.innerHTML = signInTemplate;
                login();
            }

            authObject.onLogout();
        }
    });

    return authObject;
}


class Authenticator {
    constructor() {
        this.onLogin = () => { };
        this.onLogout = () => { };
    }
}


export { initAuth };