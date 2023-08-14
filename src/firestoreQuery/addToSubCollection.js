import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";

const addToSubCollection = async (coll, subColl, data) => {
    const a = collection(db, coll, localStorage.getItem('uid'), subColl)
    const b = await addDoc(a, data)
}
export default addToSubCollection