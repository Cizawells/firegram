import {useState, useEffect} from "react"
import {db} from "../firebase/config"
import { collection, query, doc, onSnapshot } from "firebase/firestore";

const useFirestore = (col) => {
    const [docs, setDocs] = useState([])
    useEffect(() => {
        
const q = query(collection(db, col));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents)
          
          });
          return () => unsubscribe()
    }, [col])
   return {docs} 
}

export default useFirestore;