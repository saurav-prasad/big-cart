import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db from "../firebase";

const getCollectionItems = async (uid, coll) => {
    let a = []
    // Query a reference to a subcollection
    const querySnapshot = await getDocs(collection(db, "users", uid, coll));
    querySnapshot.forEach((doc) => {
        a.push({ ...doc.data(), id: doc.id })
    });
    return a
}
export default getCollectionItems