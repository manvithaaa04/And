
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';


export default function UpdateProfilePage() {
	const [user,setUser] = useRecoilState(userAtom);
	const [inputs,setInputs] = useState({
		name: user.name,
		username: user.username,
		email: user.email,
		bio: user.bio,
		password: ''
	});
	const fileRef = useRef(null);
  const [updating,setUpdating] = useState(false);
    const {handleImageChange, imgUrl} = usePreviewImg()

	const showToast = useShowToast();
	const handleSubmit = async (e) => {
		e.preventDefault();
    if(updating) return;
    setUpdating(true);
		try {
			const res = await fetch(`/api/users/update/${user._id}`,{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({...inputs, profilePic:imgUrl}),
			})
			const data = await res.json()
			if(data.error){
				showToast("Error",data.error,"error");
				return;
			}
			showToast("Success","Profile Updated Successfully","success");
			setUser(data);
			localStorage.setItem("user-threads",JSON.stringify(data));
		} catch (error) {
			console.error(error);
			showToast('Error',error,'error');
		} finally {
      setUpdating(false);
    }
	};

  return (
	<form onSubmit={handleSubmit}>
    <Flex
      my={6}
      align={'center'}
      justify={'center'}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
       >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl >
         
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" boxShadow={"md"} src={imgUrl  || user.profilePic} />
            </Center>
            <Center w="full">
              <Button w="full" onClick={()=> fileRef.current.click()}>Change Avatar</Button>
			  <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl  >
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder='John Doe'
			value={inputs.name}
			onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
			_placeholder={{ color: "gray.500" }}
			type='text'
          />
        </FormControl>
		<FormControl  >
          <FormLabel>User Name</FormLabel>
          <Input
           placeholder='johndoe'
		   value={inputs.username}
		   onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
		   _placeholder={{ color: "gray.500" }}
		   type='text'
          />
        </FormControl>
        <FormControl >
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder='your-email@example.com'
			value={inputs.email}
			onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			_placeholder={{ color: "gray.500" }}
			type='email'
          />
		  <FormControl >
          <FormLabel>Bio</FormLabel>
          <Input
           placeholder='Your Bio'
		   value={inputs.bio}
		   onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
		   _placeholder={{ color: "gray.500" }}
		   type='text'
          />
        </FormControl>
        </FormControl>
        <FormControl >
          <FormLabel>Password</FormLabel>
          <Input
           placeholder='password'
		   value={inputs.password}
		   onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
		   _placeholder={{ color: "gray.500" }}
		   type='password'
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'gray.light'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'gray.00',
            }}>
            Cancel
          </Button>
          <Button
            bg={'gray.700'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'gray.800',
            }}
			type='submit' isLoading={updating}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
	</form>
  )
}