import { collection, deleteDoc, doc } from "firebase/firestore"
import db from "../firebase"


const deleteFromSubcollection = async (id) => {
    console.log(id);
    const a = doc(db, 'users', localStorage.getItem('uid'), 'cart', id)
    console.log(a);
    const b = await deleteDoc(a)
    console.log(b);
}
export default deleteFromSubcollection