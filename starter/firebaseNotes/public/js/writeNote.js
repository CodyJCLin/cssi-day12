let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
    // 1. Capture the form data
    const title = document.querySelector("#noteTitle");
    const text = document.querySelector("#noteText");
    // 2. Format the data    
    const note = {
        title: title.value,
        text: text.value
    }

    //console.log(googleUser);
    //console.log(note);

    // 4. Write it to our database
    const userID = 'users/'+googleUser.uid;
    console.log(userID);
    const dbRef = firebase.database().ref(userID);
    dbRef.push(note).then(() =>{
        // 3. Clear the form so that we can write a new note
        title.value = "";
        text.value = "";
    });
}
