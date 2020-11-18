class MemberCard extends HTMLElement {
    constructor(user, inverted) {
        super();
        this.user = user;
        this.inverted = inverted ?? false;
        this.createMarkup();
    }

    markAsSectionHeader() {
        if (!this.classList.contains('header')) this.classList.add('header');
    }

    createMarkup() {
        this.innerHTML = `
            ${this.inverted ? `` : `<div class="member-image"></div>`}
            <div class="member-content_column">
                <div class="member-title_row">
                    <h2 class="member-name">${this.user.name}</h2>
                    <div class="member-tags">
                        ${this.user.isCoach ? `<div class="member-tag">Coach</div>` : ``}
                        ${this.user.isMentor ? `<div class="member-tag">Mentor</div>` : ``}
                        <!-- ${this.user.isAdmin ? `<div class="member-tag">Admin</div>` : ``} -->
                    </div>
                </div>

                <h5 class="member-role_description">Driver, Programming Lead and Mentor</h5>
                <p class="member-bio">${this.user.bio}</p>
            </div>
            ${this.inverted ? `<div class="member-image"></div>` : ``}
        `;
        if (this.inverted) { this.classList.add('inverted') }
    }


    remove() {
        super.remove();
    }
}


export default MemberCard;
customElements.define('member-card', MemberCard);
