const defaultPageIdentifier = 'root'

class Router {
    constructor() {
        const pages = document.querySelectorAll('template[data-page]');
        const appElement = document.getElementById('app');
        this.appElement = appElement;

        this.onRouteChanged = _ => { };
        this.hasShownInitialPage = false;
        
        let pagedict = {};

        pages.forEach(page => {
            const pageId = page.getAttribute('data-page');
            pagedict[pageId] = page.innerHTML;
        });

        this.pages = pagedict;
    }


    showInitialPage() {
        if (this.hasShownInitialPage) { 
            console.error('Invoking Router.showInitialPage more than once');
            return;
        }

        const pageId = getHash() || defaultPageIdentifier;

        if (pageId && this.pages[pageId]) {
            this.navigateTo(pageId);
        } else {
            this.appElement.innerHTML = `<h1>No root element provided</h1>`;
        }

        window.addEventListener('hashchange', e => this.onHashChange(e));
    }


    activateLinks() {
        const linkButtons = document.querySelectorAll('button[data-link]');
        linkButtons.forEach(button => {
            const target = button.getAttribute('data-link');
            button.addEventListener('click', () => {
                window.location.hash = target
            })
        })
    }


    onHashChange(e) {
        this.navigateTo(getHash(), true)
    }


    navigateTo(page, reactingToHashChange) {
        if (page && this.pages[page]) {
            this.appElement.innerHTML = this.pages[page];
            this.activateLinks();

            if (!reactingToHashChange) {
                window.location.hash = page;
            }

            this.onRouteChanged(page);
        } else {
            console.error(`Page ${page} doesn't exist`);
        }
    }


    deactivate() {
        window.removeEventListener('hashchange', e => this.onHashChange(e));
    }
}


function getHash() {
    return window.location.hash.replace('#', '');
}


export default Router;