import {app} from "../index";

export const signInData = async ({email, password}) => {
  try{
    const auth = app.auth();
    const response = await auth.signInWithEmailAndPassword(email, password);
    return response;
  }catch (e){
    return  null;
  }
}

export const signUpData = async ({email, password, phoneNumber}) => {
  try{
    const auth = app.auth();
    const response = await auth.createUserWithEmailAndPassword(email, password);
    return response;
  }catch (e) {
    return null;
  }
}