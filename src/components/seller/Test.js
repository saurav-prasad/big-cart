import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../firebase";
import { v4 } from 'uuid'
export default function Test() {

  const [imageUpload, setImageUpload] = useState()

  const handleSubmit1 = (e) => {
    e.preventDefault()
    if (!imageUpload) return
    console.log(imageUpload);
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((response) => {
      getDownloadURL(response.ref).then((response)=>{
      console.log(response);})
      alert("image uploaded")
    })

  }

  return (
    <>
      <input type="file" onChange={(e) => { setImageUpload(e.target.files[0]) }} />
      <button typeof="submit" onClick={handleSubmit1}>upload image</button>
    </>
  )
}
