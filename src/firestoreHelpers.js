window.firestore = {};


window.firestore.createSampleUsers = () => {
    db.collection('users').add({
        bio: `This is a choach`,
        image: null,
        isCoach: true,
        isAdmin: true,
        isMember: true,
        name: `Coach`,
    });

    for (let i = 0; i < 2; i ++) {
        db.collection('users').add({ 
            bio: `This is a mentor's bio ${i}`,
            image: null,
            isMentor: true,
            isAdmin: true,
            isMember: true,
            name: `Mentor ${i}`,
        });
    }

    for (let i = 0; i < 2; i ++) {
        db.collection('users').add({
            bio: `This is a test person's bio ${i}`,
            image: null,
            isMember: true,
            name: `Test User ${i}`
        });
    }
}

window.firestore.deleteAllUsersExceptJakub = () => {
    db.collection('users').get().then(snapshot => {
        snapshot.forEach(doc => {
            if (doc.id != 'uxpQm2SHJ8bXSqbpLyfxdOLiXpn2') db.collection('users').doc(doc.id).delete();
        });
    });
}
