const firebaseConfig = {
  apiKey: "AIzaSyAAkb-9LEqiZ6CiWIcHDUmGgP-DJYu0Yiw",
  authDomain: "heavenly-homemade.firebaseapp.com",
  projectId: "heavenly-homemade",
  storageBucket: "heavenly-homemade.appspot.com",
  messagingSenderId: "850172042635",
  appId: "1:850172042635:web:16709418eedd23cb95638e",
};
firebase.initializeApp(firebaseConfig);

// firebase connection login
function c_login() {
  const con_email = document.getElementById("con-login-email").value;
  const con_pass = document.getElementById("con-login-pass").value;
  firebase
    .auth() 
    .signInWithEmailAndPassword(con_email, con_pass)
    .then((userCredential) => {
      // Signed in
      window.location.href = "home.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function signup() {
  var first_name = document.getElementById("con-sp-fname").value;
  var last_name = document.getElementById("con-sp-lname").value;
  var con_email = document.getElementById("con-sp-email").value;
  var con_phn = document.getElementById("con-sp-ph").value;
  var con_pass = document.getElementById("con-sp-pass").value;
  var con_cnfpass = document.getElementById("con-sp-cnfpass").value;
  var form = document.getElementById("con_form");

  if (first_name.trim() == null || first_name.trim() == "") {
    alert("Please enter First name!!");
  } else if (last_name.trim() == null || last_name.trim() == "") {
    alert("Please enter last name!!");
  } else if (con_phn.trim() == null || con_phn.trim() == "") {
    alert("Please enter valid phone number!");
  } else if (isNaN(con_phn)) {
    alert("Please enter valid phone number!");
  } else if (con_pass.trim() != con_cnfpass.trim()) {
    alert("Password and Confirm passsword doesn't match");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(con_email, con_cnfpass)
      .then(function (userCredential) {
        // Signed in
        var user_id = userCredential.user.uid;
        saveCon(first_name, last_name, con_email, con_phn, user_id);
        first_name = "";
        last_name = "";
        con_email = "";
        con_phn = "";
        con_pass = "";
        con_cnfpass = "";
        form.reset();
        console.log("Registered Successfully  ");
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
      alert("Logged out successfully");
    })
    .catch((error) => {
      // An error happened.
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

function saveCon(first_name, last_name, con_email, con_phn, user_id) {
  const db = firebase.firestore();
  db.collection("users")
    .doc(user_id)
    .set({
      fName: first_name,
      lName: last_name,
      conEmail: con_email,
      conPhn: con_phn,
    })
    .then(() => {
      alert("Document successfully written!");
    })
    .catch((error) => {
      alert("Error writing document: ", error.message);
    });
}

// function saveData(id) {
//   --id;

//   let a_email = dataArray[id][0];
//   let a_title = dataArray[id][1];
//   let a_address = dataArray[id][2];

//   // array to string
//   var email = a_email.toString();
//   var title = a_title.toString();
//   var address = a_address.toString();

//   // Add a new document in collection "users"
//   let user_uid = firebase.auth().currentUser.uid;
//   db.collection("users")
//     .doc(user_uid)
//     .collection("products")
//     .doc()
//     .set({
//       client_email: email,
//       client_title: title,
//       client_address: address,
//     })
//     .then(() => {
//       console.log("Document successfully written!");
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error.message);
//     });
// }
