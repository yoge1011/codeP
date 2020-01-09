import { SubmissionError } from "redux-form";
import { SIGN_OUT_USER } from "./authConstants";
import { closeModal } from "../modals/modalActions";
import { firestoreReducer } from "redux-firestore";

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log(createdUser);
    await createdUser.user.updateProfile({
      displayName: user.displayName
    })
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await firestoreReducer.set(`users/${createdUser.user.uid}`, {...newUser})
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
  }
};
