const firebaseConfig = {
    apiKey: "AIzaSyAAkb-9LEqiZ6CiWIcHDUmGgP-DJYu0Yiw",
    authDomain: "heavenly-homemade.firebaseapp.com",
    projectId: "heavenly-homemade",
    storageBucket: "heavenly-homemade.appspot.com",
    messagingSenderId: "850172042635",
    appId: "1:850172042635:web:16709418eedd23cb95638e",
  };
  firebase.initializeApp(firebaseConfig);

  function insert_data() {
    var seller_name = document.getElementById("sname").value;
    var product_title = document.getElementById("title").value;
    var User_address = document.getElementById("address").value;
    var User_email= document.getElementById("email").value;
    const db = firebase.firestore();
    
    if (seller_name.trim() == "" || seller_name.trim() == null) {
         alert("Username cannot be null");
    } else if (product_title.trim() == "" || product_title.trim() == null) {
         alert(" products cannot be empty");
    } else if(User_address.trim()=="" || User_address.trim()==null ){
         alert("address cannot be empty");
    }else if(User_email.trim()=="" || User_email.trim()==null ){
         alert("email cannot be empty");
    } else {
      db.collection("products/")
        .doc()
        .set({
          name:  seller_name,
          title: product_title,
          email: User_email,
          address: User_address,
        })
        .then(() => {
          seller_name = "";
          product_title = "";
          User_address = "";
          User_email="";
          alert("Document successfully written!");
        })
        .catch((error) => {
          alert("Error writing document: ", error);
        });
    }
  }
  
  