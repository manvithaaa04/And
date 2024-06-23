import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
import { useRecoilValue } from "recoil";
import authScreenatom from "../atoms/authAtom";
const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenatom);
     console.log(authScreenState);
  return (
    <>
     {authScreenState==="login"? <LoginCard/> : <SignupCard/>}
    </>
  );
};

export default AuthPage;
