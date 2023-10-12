import { deleteDoc, doc } from "firebase/firestore"
import db from "../firebase"

const deleteFromSubcollection = async (coll, uid, subColl, id) => {
    const a = doc(db, coll, uid, subColl, id)
    await deleteDoc(a)
}
export default deleteFromSubcollection