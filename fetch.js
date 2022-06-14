const firebaseConfig = {
  apiKey: "AIzaSyAAkb-9LEqiZ6CiWIcHDUmGgP-DJYu0Yiw",
  authDomain: "heavenly-homemade.firebaseapp.com",
  projectId: "heavenly-homemade",
  storageBucket: "heavenly-homemade.appspot.com",
  messagingSenderId: "850172042635",
  appId: "1:850172042635:web:16709418eedd23cb95638e",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
window.onload = function () {
  db.collection("products")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().title);
        var name = doc.data().name;
        var email = doc.data().email;
        var title = doc.data().title;
        var address = doc.data().address;
        addItems(email,name, title, address);
      });
    });
};

var product_id = 0;
var dataArray = [];
function addItems(email, sname, productTitle, address) {
  var con = document.getElementById("container");
  var div = document.getElementById("card");
  var card_body = document.getElementById("card_body");

  var id_num = document.createElement("h5");
  var seller_name= document.createElement("h5")
  var product_title = document.createElement("h4");
  var User_email=document.createElement("h4")
  var User_address = document.createElement("p");

  dataArray.push([email,sname, productTitle,address]);

  id_num.innerHTML = "PRODUCT " + ++product_id;
  seller_name.innerHTML = "<strong>Seller Name: </strong>" + sname;
  product_title.innerHTML = "<strong>Title: </strong>" + productTitle;
  User_email.innerHTML = "<strong>Contact: </strong>" + email;
  User_address.innerHTML = "<strong>Address: </strong>" + address;

  id_num.setAttribute("class", "card-header text-center");
  seller_name.setAttribute("class","card-title")
  product_title.setAttribute("class", "card-title pt-5");
  User_email.setAttribute("class","card-title pt-4");
  User_address.setAttribute("class", "card-text");

  card_body.appendChild(id_num);
  card_body.appendChild(seller_name);
  card_body.appendChild(product_title);
  card_body.appendChild(User_email);
  card_body.appendChild(User_address);
  div.appendChild(card_body);
  con.appendChild(div);
}
function loadPage(page) {
  let xhttp;
  var div = document.getElementById("container");

  if (page) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          div.innerHTML = this.responseText;
        }
      }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
    return;
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

function saveData(id) {
  --id;

  let a_email = dataArray[id][0];
  let a_title = dataArray[id][1];
  let a_desc = dataArray[id][2];

  // array to string
  var email = a_email.toString();
  var title = a_title.toString();
  var desc = a_desc.toString();

  // Add a new document in collection "users"
  let user_uid = firebase.auth().currentUser.uid;
  db.collection("users")
    .doc(user_uid)
    .collection("slots")
    .doc()
    .set({
      client_email: email,
      client_title: title,
      client_desc: desc,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error.message);
    });
}
