import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";

const addToSubCollection = async (coll, doc, subColl, data) => {
    const a = collection(db, coll, doc, subColl)
    await addDoc(a, data)
}
export default addToSubCollection