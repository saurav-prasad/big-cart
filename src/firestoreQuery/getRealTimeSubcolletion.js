import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../firebase";

const getRealTimeSubcollection = async (coll, uid, subColl) => {
    return new Promise((resolve, reject) => {
        const dataArr = [];

        const q = query(collection(db, coll, uid, subColl));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            dataArr.length = 0; // Clear the array before updating
            querySnapshot.forEach((doc) => {
                dataArr.push({ ...doc.data(), id: doc.id });
            });
            resolve(dataArr); // Resolve the promise with dataArr
        });

        // You can return the unsubscribe function if you want to unsubscribe manually
        // resolve({ dataArr, unsubscribe });
    });
};

export default getRealTimeSubcollection