import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from './components/Header';
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton  from "./components/LogoutButton.jsx";
function App() {
  const user = useRecoilValue(userAtom);
  return (
    <>
    <Header />
    <Container maxW='620px'>
     <Routes>
     <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
     <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
      <Route path='/:username' element={<UserPage />}/>
      <Route path='/:username/post/:pid' element={<PostPage />}/>
     </Routes>

      {user && <LogoutButton />}
     </Container>
     </>
  );
}

export default App;
