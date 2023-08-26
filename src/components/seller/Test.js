import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

export default function Test() {
  const [cred, setCred] = useState({ email: "", password: "" })
  const auth = getAuth();
  const handleSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, cred.email, cred.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  const onChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value
    })
  }

  const onReset = (e) => {
    e.preventDefault()
    const auth = getAuth();
    sendPasswordResetEmail(auth, cred.email)
      .then((e) => {
        // Password reset email sent!
        console.log(e);
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });

  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="email" name="email" value={cred.email} onChange={onChange} />
      <input type="text" placeholder="password" name="password" value={cred.password} onChange={onChange} />
      <button type="submit">Submit</button>
      <button type="button" onClick={onReset}>Submit</button>
    </form>
  )
}
