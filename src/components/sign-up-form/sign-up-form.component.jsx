import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () =>{
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    //     try {
    //       const response = await createAuthUserWithEmailAndPassword(
    //         email,
    //         password
    //       );
    //       console.log(response);
    //     } catch (error) {
    //       console.log("user creation encountered an error", error);
    //     }
    //   };

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );  
        await createUserDocumentFromAuth(user, {displayName});
        resetFormFields();

    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use')
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          name="displayName"
          type="text"
          onChange={handleChange}
          value={displayName}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={email}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
          required
        />

        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={confirmPassword}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
