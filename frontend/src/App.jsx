import { Container,Box } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from './components/Header';
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/updateProfilePage.jsx";
import CreatePost from "./components/CreatePost.jsx";
function App() {
  const user = useRecoilValue(userAtom);
  return (
  <>
    <Box position={"relative"} w='full'>
    <Container maxW={ { base: "620px", md: "900px" } }>
    <Header />
    
     <Routes>
     <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
     <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
     <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
      <Route path='/:username' element={ user ? (
        <>
        <UserPage />
        <CreatePost />
        </>
      ) : (
         <UserPage />
      )}/>
      <Route path='/:username/post/:pid' element={<PostPage />}/>
     </Routes>

      
   
     </Container>
    </Box>
    </>
  );
}

export default App;
