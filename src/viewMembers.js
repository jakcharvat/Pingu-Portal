import MemberCard from './memberCard.js';


class ViewMembers {
    onAppear() {
        this.shouldNextUserBeInverted = false;
        this.shouldInsertGapBeforeNextUser = false;
        this.createUserContainer();
        this.getUsers();
    }


    createUserContainer() {
        this.userContainer = document.createElement('div');
        this.userContainer.id = 'memberContainer'
    }


    async getUsers() {
        const users = db.collection('users')
        const members = await users.where('isMember', '==', true).orderBy('name').get();
        const sorted = this.createSortedArrayOfUsersFromSnapshot(members);
        
        for (let i = 0; i < sorted.length; i ++) this.addUser(sorted[i], i);
        this.showUserContainer();
    }

    createSortedArrayOfUsersFromSnapshot(snapshot) {
        this.firstCoachIndex = 0;
        this.firstMentorIndex = 0;
        this.firstMemberIndex = 0;

        let arr = [];
        
        snapshot.forEach(doc => {
            let data = doc.data();
            if (data.isCoach) {
                arr.splice(this.firstMentorIndex, 0, data);
                this.firstMentorIndex ++;
                this.firstMemberIndex ++;
            } else if (data.isMentor) {
                arr.splice(this.firstMemberIndex, 0, data);
                this.firstMemberIndex ++;
            } else {
                arr.push(data);
            }
        })

        return arr;
    }

    addUser(user, index) {
        const userEl = new MemberCard(user, this.shouldNextUserBeInverted);
        // if (index == this.firstMentorIndex || index == this.firstMemberIndex) userEl.markAsSectionHeader();
        if (index == this.firstMentorIndex || index == this.firstMemberIndex) this.addDivider();
        this.shouldNextUserBeInverted = !this.shouldNextUserBeInverted;
        this.userContainer.appendChild(userEl);
    }

    addDivider() {
        const dividerEl = document.createElement('hr');
        this.userContainer.appendChild(dividerEl);
    }

    showUserContainer() {
        const placeholder = document.getElementById('loadingMembers');
        const parent = placeholder.parentElement;
        placeholder.remove();
        parent.appendChild(this.userContainer);
    }
}


export default ViewMembers;