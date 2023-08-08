import { useEffect } from 'react';
import './App.css';
import Home from './components/home/Home';
import { doc, getDoc } from 'firebase/firestore';
import db from './firebase';
import { useUserState } from './context/UserState';

function App() {
  const [user, dispatch] = useUserState()

  const getUser = async () => {
    const docRef = doc(db, "users", localStorage.getItem('uid'));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      dispatch({
        type: "SET_USER",
        user: docSnap.data()
      })
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    console.log(user);
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
