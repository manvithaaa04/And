import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';

const UserPage = () => {

  const [user,setUser] = useState(null);
  const {username} = useParams();
  const showToast = useShowToast();

  useEffect(() => {
       const getUser = async() => {
        try {
          const res = await fetch (`/api/users/profile/${username}`)
          const data = await res.json()
         if(data.error){
          showToast("Error",data.error,"error");
          return;
         }
         setUser(data);
        } catch (error) {
          showToast("Error",error,"error");
        }
       };
       getUser();
  },[username, showToast]);

  if(!user) return null;

  return(
    <>
    <UserHeader user={user}/>
    <UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Let's talk about threads."/>
    <UserPost likes={890} replies={81} postImg="/post1.png" postTitle="Let's talk about threads."/>
    <UserPost likes={678} replies={478} postImg="/post1.png" postTitle="wassup guys."/>
    <UserPost likes={453} replies={432} postImg="/post1.png" postTitle="Super cool."/>
    <UserPost likes={453} replies={432} postTitle="This is my first post"/>
    </>
  );
};

export default UserPage;
