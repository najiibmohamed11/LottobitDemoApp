import { collection, addDoc, doc, updateDoc, increment, getDoc, getDocs, runTransaction, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

async function updateVoteCount(number) {
  const numberDocRef = doc(db, 'votes', 'voteDocument');
  try {
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(numberDocRef);
      if (!doc.exists()) {
        throw new Error("Document does not exist!");
      }

      const voteCountArray = doc.data().voteCount;
      voteCountArray[number - 1].value += 1; // Increment the value at the specified index

      transaction.update(numberDocRef, { voteCount: voteCountArray });
    });
    console.log("Vote count updated successfully");
  } catch (error) {
    console.error("Error updating vote count:", error);
  }
}

async function submitVotes(votedNumbers) {
  for (let number of votedNumbers) {
    await updateVoteCount(number);
  }
}

export async function submitPlayerData(selectedNumbers, votedNumbers, paidAmount, isWinner) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    const playersCollection = collection(db, 'players');
    await addDoc(playersCollection, {
      address: user.email,
      selectedNumbers,
      votedNumbers,
      paidAmount,
      isWinner,
      name: user.displayName
    });

    await updateLiquidityPool(paidAmount);
    await submitVotes(votedNumbers);
    await checkAndPublishResults(1000); // Ensure this is called after votes are updated
  } catch (error) {
    console.error("Error submitting player data:", error);
  }
}

async function updateLiquidityPool(amount) {
  const poolDocRef = doc(db, 'liquidityPool', 'currentPool');
  try {
    await updateDoc(poolDocRef, {
      totalAmount: increment(amount),
      isFull:false,
      resultsPublished:false
    });
  } catch (error) {
    console.error("Error updating liquidity pool:", error);
  }
}

async function checkAndPublishResults(TARGET_AMOUNT) {
  const poolDocRef = doc(db, 'liquidityPool', 'currentPool');
  try {
    const poolDoc = await getDoc(poolDocRef);
    if (poolDoc.exists() && poolDoc.data().totalAmount >= TARGET_AMOUNT && !poolDoc.data().resultsPublished) {
      const results = await getThe7HighestVotedNumbers();
      await updateDoc(poolDocRef, {
        isFull: true,
        resultsPublished: true,
        winers: results

      });
      console.log(results);
    }
  } catch (error) {
    console.error("Error checking and publishing results:", error);
  }
}

async function getThe7HighestVotedNumbers() {
  const result = [];

  try {
    const docRef = doc(db, 'votes', 'voteDocument');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.hasOwnProperty("voteCount")) {
        const voteCounts = data["voteCount"];

        // Sort the voteCounts array in descending order by the 'value' field
        voteCounts.sort((a, b) => b.value - a.value);

        // Get the top 7 items
        const top7 = voteCounts.slice(0, 2);

        top7.sort((a, b) => a.key - b.key);
      
        // Collect the keys of the top 7 items
        top7.forEach(item => {
          result.push({ key: item.key, value: item.value });
        });
      }
    } else {
      console.log("No such document!");
    }

    return result;
  } catch (error) {
    console.error("Error getting the highest voted numbers:", error);
  }
}


const getChosedAndVotedNumbers=async ()=>{

}

export const get7MostVoted = async () => {
  const poolDocRef = doc(db, 'liquidityPool', 'currentPool');
  const poolDoc = await getDoc(poolDocRef);
  return poolDoc.data().winers || [];
}

export const getTotalAmount = async () => {
  const poolDocRef = doc(db, 'liquidityPool', 'currentPool');
  const poolDoc = await getDoc(poolDocRef);
  return poolDoc.data().totalAmount;
}

export const isLequiditypolfull = async () => {
  const poolDocRef = doc(db, 'liquidityPool', 'currentPool');
  const poolDoc = await getDoc(poolDocRef);
  return poolDoc.data().isFull;
}


export const getSelectedNumbers = async () => {
  const playersCollection = collection(db, 'players');
  const q = query(playersCollection, where("address", "==", auth.currentUser.email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docData = querySnapshot.docs[0].data();
    return docData.selectedNumbers;
  }
  return [];
}

// Fetch voted numbers for the current user
export const getVotedNumbers = async () => {
  const playersCollection = collection(db, 'players');
  const q = query(playersCollection, where("address", "==", auth.currentUser.email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docData = querySnapshot.docs[0].data();
    return docData.votedNumbers;
  }
  return [];
}

export const IswinerOrnot = async () => {
  const selectedNumbers = await getSelectedNumbers();
  const mostVotedNumbers = await getThe7HighestVotedNumbers();

  const mostVotedNumberKeys = mostVotedNumbers.map(number => number.key);
  
  return selectedNumbers.every(number => mostVotedNumberKeys.includes(number));
}

export const IsVotedBefore=async()=>{
  const playersCollection= collection(db,"players");
  const q = query(playersCollection, where("address", "==", auth.currentUser.email));
  const querySnapshot = await getDocs(q);
  if(!querySnapshot.empty){
    return true;
  }

  return false;



}