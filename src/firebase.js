import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDfG_CrPIWEzBmY5-_xKNqERESS-ZwOZa8",
    authDomain: "lottobit-b5360.firebaseapp.com",
    projectId: "lottobit-b5360",
    storageBucket: "lottobit-b5360.appspot.com",
    messagingSenderId: "461626456390",
    appId: "1:461626456390:web:810f7163c9d83a7cd78d47",
    measurementId: "G-99YLDV9WTL"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  




//   async function initializeVotesCollection() {
//     const voteCounts = [];
//     for (let i = 1; i <= 21; i++) {
//       voteCounts.push({ key: i, value: 0 });
//     }
  
//     const docRef = doc(db, 'votes', 'voteDocument');
//     await setDoc(docRef, {
//       voteCount: voteCounts
//     });
  
//     console.log("Votes collection initialized with a single document containing a list of objects");
//   }

// initializeVotesCollection()
//   .then(() => {
//     console.log("Initialization completed");
//   })
//   .catch((error) => {
//     console.error("Error initializing votes collection: ", error);
//   });


  export { db, app, auth, provider, signOut };
