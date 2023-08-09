import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";

const getCollectionItems = async (uid, coll) => {
    let a = []
    // Query a reference to a subcollection
    const querySnapshot = await getDocs(collection(db, "users", uid, coll));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        a.push(doc.data())
    });
    return a
}
export default getCollectionItems