import React,  {useState, useEffect} from "react"
import {projectStorage, db} from "../firebase/config"
import {ref, uploadBytes , uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc , Timestamp, doc, setDoc } from "firebase/firestore"; 

const useStorage = (file) => {
const [progress, setProgress] = useState(0);
const [error, setError] = useState(null)
const [url, setUrl] = useState(null)

useEffect(() => {
//references
const storageRef = ref(projectStorage, file.name);
// storageRef.put(file).on("state_changed", (snap) => {
//     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
//     setProgress(percentage);
// }, (err) => {
//     setError(err)
// }, async () => {
//     const url = await storageRef.getDownloadURL();
//     setUrl(url)
// })

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setProgress(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    setError(error)
  }, 
   () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      console.log('File available at', downloadURL);
      setUrl(downloadURL)
     
    //   await setDoc(doc(db, "images", "LA"), {
    //     url: downloadURL
    //   });

      try {
        const createdAt = Timestamp.now()
        const docRef = await addDoc(collection(db, "images"), {
         downloadURL,
         createdAt
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  }
);
}, [file])

return {progress, url, error}
}

export default useStorage;