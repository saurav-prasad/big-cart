import { useEffect } from 'react';
import './App.css';
import Home from './components/home/Home';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import db from './firebase';
import { useUserState } from './context/UserState';
import getCollectionItems from './getCollectionItems';

function App() {
  const [{ userDetails }, dispatch] = useUserState()
  // test


  const getUser = async () => {
    const docRef = doc(db, "users", localStorage.getItem('uid'));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch({
        type: "SET_USER",
        userDetails: {
          name: docSnap.data().userDetails.name,
          email: docSnap.data().userDetails.email,
          photo: docSnap.data().userDetails.photo,
          uid: docSnap.data().userDetails.uid,
        },
        cart: await getCollectionItems(docSnap.data().userDetails.uid, "cart"),
      })
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() => {
    localStorage.getItem('uid') && getUser()
  }, [])

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
