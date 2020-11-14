const defaultPageIdentifier = 'root'

class Router {
    constructor() {
        const pages = document.querySelectorAll('template[data-page]');
        const appElement = document.getElementById('app');
        this.appElement = appElement;
        
        let pagedict = {};

        pages.forEach(page => {
            const pageId = page.getAttribute('data-page');
            pagedict[pageId] = page.innerHTML;
        });

        this.pages = pagedict;
        this.showInitialPage();

        window.addEventListener('hashchange', e => this.onHashChange(e));
    }


    showInitialPage() {
        const pageId = getHash() || defaultPageIdentifier;

        if (pageId && this.pages[pageId]) {
            this.navigateTo(pageId);
        } else {
            this.appElement.innerHTML = `<h1>No root element provided</h1>`;
        }
    }


    activateLinks() {
        const linkButtons = document.querySelectorAll('button[data-link]');
        linkButtons.forEach(button => {
            const target = button.getAttribute('data-link');
            button.addEventListener('click', () => {
                this.navigateTo(target);
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