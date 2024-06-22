import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
const UserPage = () => {
  return(
    <>
    <UserHeader />
    <UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Let's talk about threads."/>
    <UserPost likes={890} replies={81} postImg="/post1.png" postTitle="Let's talk about threads."/>
    <UserPost likes={678} replies={478} postImg="/post1.png" postTitle="wassup guys."/>
    <UserPost likes={453} replies={432} postImg="/post1.png" postTitle="Super cool."/>
    <UserPost likes={453} replies={432} postTitle="This is my first post"/>
    </>
  );
};

export default UserPage;
