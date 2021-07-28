let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userID) => {
    console.log("logged in as user "+userID);
    // 1 Get access to all the current user's notes
    const dbRef = firebase.database().ref('users/'+userID);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
    });    
}

const renderData = (data) => {
    console.log(data);
    const destination = document.querySelector('#app');
    destination.innerHTML = '';
    for(let key in data){
        const note = data[key];

        destination.innerHTML = createCard(note);
    }
};

const createCard = (note) => {
  let innerHTML = "";
  innerHTML += `<div class="column is-one-quarter">`
  innerHTML += `<div class="card">`
  innerHTML += `<header class="card-header">`
  innerHTML += `<p class="card-header-title">`
  innerHTML += `${note.title}`
  innerHTML += `</p>`
  innerHTML += `</header>`
  innerHTML += `<div class="card-content">`
  innerHTML += `<div class="content">`
  innerHTML += `${note.text}`
  innerHTML += `</div>`
  innerHTML += `</div>`
  innerHTML += `</div>`
  innerHTML += `</div>`
  return innerHTML;
};