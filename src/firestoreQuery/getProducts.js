import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

const getProducts = async (category) => {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);

    const fetchData = async (ids) => {
        const temp = [];
        for (const id of ids) {
            const subcollectionRef = collection(db, "products", id, category);
            const subcollectionSnapshot = await getDocs(subcollectionRef);

            subcollectionSnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), productId: doc.id });
            });
        }
        return temp;
    };

    const docIds = querySnapshot.docs.map((doc) => doc.id);
    const result = await fetchData(docIds);
    return result;
};


export default getProducts