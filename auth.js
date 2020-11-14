function login() {
    var uiConfig = {
        signInSuccessUrl: '/',
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


function initAuth(options) {
    const root = document.getElementById('root');
    const appTemplate = document.getElementById('appTemplate').innerHTML;
    const signInTemplate = document.getElementById('signInTemplate').innerHTML;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const app = document.getElementById('app');
            if (!app) {
                root.innerHTML = appTemplate;
                document.getElementById('logout').addEventListener('click', () => {
                    logout()
                })
            }

            options?.onLogin && options.onLogin()
        } else {
            const signInUI = document.getElementById('firebaseSignInUI');
            if (!signInUI) {
                root.innerHTML = signInTemplate;
                login();
            }

            options?.onLogout && options.onLogout()
        }
    })
}


export { initAuth }