
  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyBMDZG_TnVrwDV0VuwAvB6v-il8LpQ9llY",
    authDomain: "sadapa-cmsc5373.firebaseapp.com",
    projectId: "sadapa-cmsc5373",
    storageBucket: "sadapa-cmsc5373.appspot.com",
    messagingSenderId: "921264832587",
    appId: "1:921264832587:web:ad8288540a4487116f8dce",
    
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
