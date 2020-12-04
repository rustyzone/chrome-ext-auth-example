
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "xxxx.firebaseapp.com",
  databaseURL: "https://xxxx.firebaseio.com",
  projectId: "xxxx",
  storageBucket: "xxxx.appspot.com",
  messagingSenderId: "xxxx",
  appId: "x:xxxx:web:xxxxx"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if(msg.command == 'logoutAuth'){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      response({type: "un-auth", status: "success", message: true});
    }, function(error) {
      // An error happened.
      response({type: "un-auth", status: "false", message: error});
    });
  }
  if(msg.command == 'checkAuth'){
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      response({type: "auth", status: "success", message: user});
    } else {
      // No user is signed in.
      response({type: "auth", status: "no-auth", message: false});
    }
  }
  if(msg.command == 'loginUser'){
    console.log(msg.data);
    var email = msg.data.e;
    var pass = msg.data.p;
    //Add seperate values for auth info here instead of fixed variables...
    firebase.auth().signInWithEmailAndPassword('test@test.com', 'testing').catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      response({type: "auth", status: "error", message: error});
      // ...
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        response({type: "auth", status: "success", message: user});
      } else {
        // No user is signed in.
      }
    });
  }

  return true;
});
