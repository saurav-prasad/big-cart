import { deleteDoc, doc } from "firebase/firestore"
import db from "../firebase"

const deleteFromSubcollection = async (coll, subColl, id) => {
    const a = doc(db, coll, localStorage.getItem('uid'), subColl, id)
    await deleteDoc(a)
}
export default deleteFromSubcollection