import React, { useState } from 'react'
import {  Button, FormControl, FormLabel, HStack, Heading, Image, Input, InputGroup, InputRightElement, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import { FaExclamationCircle } from "react-icons/fa";
import loginPic from "../assets/images/login.png"
import {useNavigate} from "react-router-dom";
import { isValidEmail } from '../utility/validators';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/authReducer/actions';

const initialState = {
  email : "",
  password: ""
}

const Login = () => {
    const [user, setUser] = useState(initialState);
    const [emailError, setEmailError] = useState("");

    //show-hide password
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

     //navigate
     const navigate = useNavigate();

     // Toast feature
     const toast = useToast();

     //Redux Store
      const dispatch = useDispatch();
      const loading = useSelector((store) => store.authReducer.isLoading);
      const message = useSelector((store) => store.authReducer.message);
      const action = useSelector((store) => store.authReducer.action);

     const handleChange = (e)=>{
      let {value, name} = e.target;

      if(name === "email"){
          const err = isValidEmail(value) ? "" : "enter valid email address";
          setEmailError(err);
      }

      setUser((prev)=>{
          return { ...prev, [name]: value}
      })
  }

  const handleLogin = ()=>{
    if(user?.email && user?.password && !emailError){
      dispatch(loginAction(user))
    }else {
      toast({
        title: `Enter the valid credentials`,
        position: "top",
        isClosable: true,
        duration: 1000,
        status: "warning",
      });
    }
  }

  if(action){
    navigate("/")
  }
   



  return (
    <Stack direction={{base:"column", md:"row", lg:"row"}} justifyContent={"space-around"} alignItems={"center"} width={{base:"100%", md:"80%", lg:"80%"}} margin={"auto"} padding={"50px 0px"}>
      <Image display={{base:"none", md:"none", lg:"block"}} src={loginPic} />


      <form>
        <VStack width={{base:"300px", md:"350px", lg:"350px"}} border={"1px solid blue"} padding={{base:"40px 10px", md:"40px 20px", lg:"40px 20px"}} rounded={"lg"} shadow={"lg"}>
          <Heading size={"lg"}>Login</Heading>

          <Text color={action ? "green" : "red"}>{message}</Text>

          <FormControl isInvalid={emailError}>
              <FormLabel>Email</FormLabel>
              <Input type='email' placeholder='Email' name='email' value={user?.email} onChange={handleChange} isDisabled={loading} />
              {emailError && <HStack color={"red"} marginTop={"5px"}><FaExclamationCircle /><Text>{emailError}</Text></HStack>} 
          </FormControl>

          <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                  <Input type={show ? 'text' : 'password'} placeholder='Password' name='password' value={user?.password} onChange={handleChange} isDisabled={loading} />
                  <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                      </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>

          <Button isLoading={loading} isDisabled={loading} onClick={handleLogin} colorScheme='blue' marginTop={"30px"}>Login</Button>

          <HStack marginTop={"10px"} justifyContent={"center"}>
                <Text >Not registered?</Text>
                <Text color={"blue.400"} cursor={"pointer"} _hover={{ textDecoration: "underline"}} onClick={()=> navigate("/signup")}>Create account</Text>
          </HStack>
        </VStack>
      </form>
    </Stack>
  )
}

export default Login
