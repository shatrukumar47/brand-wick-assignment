import React, { useState } from 'react'
import {  Button, CircularProgress, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Image, Input, InputGroup, InputRightElement, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import signupPic from "../assets/images/signup.png"
import {useNavigate} from "react-router-dom";
import { FaExclamationCircle, FaFrown, FaGrinHearts } from "react-icons/fa";
import { isPasswordValid, isValidEmail, isValidMobileNumber } from '../utility/validators';
import debounce from 'lodash/debounce';
import { userAPI } from '../redux/authReducer/actions';
import axios from 'axios';

const initialState = {
  name:"",
  username: "",
  phone: "",
  email : "",
  password: ""
}

const Signup = () => {
  const [user, setUser] = useState(initialState);
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [usernameAvailable, setusernameAvailable] = useState(false);
    const [loading, setLoading] = useState(false);

    //show-hide password
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

     //navigate
     const navigate = useNavigate();

     // Toast feature
    const toast = useToast();

     const checkUsernameAvailability = debounce(async (value) => {
      setUsernameLoading(true);
      try {
        const res = await axios.get(`${userAPI}/check-username/${value}`);
        setusernameAvailable(res.data.action)
        if(res.data.action){
          setUsernameError("");
        }else{
          setUsernameError("username not available")
        }
        setUsernameLoading(false);
      } catch (error) {
        setUsernameLoading(false);
        if(error.response.status === 400){
          if(!error.response.data.action){
            setusernameAvailable("")
            setUsernameError(error.response.data.message)
          }else{
            setusernameAvailable("")
            setUsernameError("Error checking username availability")
          }
        }
      }
    }, 500);

     const handleChange = (e)=>{
      let {value, name} = e.target;

      
      if(name === "username"){
        checkUsernameAvailability(value);
      }

      if(name === "email"){
        // checkUsernameAPI(value)
        const err = isValidEmail(value) ? "" : "enter valid email address";
        setEmailError(err);
      }

      if(name === "password"){
        const err = isPasswordValid(value) ? "" : "must contain one uppercase, one number, one special character";
        setPassError(err);
      }

      if(name === "phone"){
        // Allow only numeric input
        const numericInput = value.replace(/\D/g, '');

        // Restrict the length to 10 digits
        value = numericInput.slice(0, 10);

        const err = isValidMobileNumber(value) ? "" : "Enter a valid 10-digit mobile number";
        setPhoneError(err);
      }

      setUser((prev) => {
        return { ...prev, [name]: value };
      });
  }

  const handleLogout = ()=>{
    if(!emailError && !passError && user?.name && user?.username && user?.phone && user?.password && user?.email && !phoneError){
      setLoading(true);
      axios.post(`${userAPI}/register`, user).then((res)=>{
        setLoading(false)
        toast({
            title: `Registered successfully`,
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "success",
        });
        setUser(initialState);
        navigate("/login")
      }).catch((err)=>{
        setLoading(false)
        if(err?.response?.status === 400 && !err?.response?.data?.action ){
                toast({
                title: err?.response?.data?.message,
                position: "top",
                isClosable: true,
                duration: 1000,
                status: "error",
            });
        }else{
          toast({
            title: "Internal Server Error",
            position: "top",
            isClosable: true,
            duration: 1000,
            status: "error",
        });
        }
      })
    }else{
      toast({
        title: `All fields are required!`,
        position: "top",
        isClosable: true,
        duration: 1000,
        status: "warning",
      });
    }
  }




  return (
    <Stack direction={{base:"column", md:"row", lg:"row"}} justifyContent={"space-around"} alignItems={"center"} width={{base:"100%", md:"80%", lg:"80%"}} margin={"auto"} padding={"50px 0px"}>
    <Image display={{base:"none", md:"none", lg:"block"}} src={signupPic} />


    <form>
      <VStack width={{base:"300px", md:"500px", lg:"500px"}} border={"1px solid blue"} padding={{base:"40px 10px", md:"40px 20px", lg:"40px 20px"}} rounded={"lg"} shadow={"lg"}>
        <Heading size={"lg"}>Sign up</Heading>

        <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input type='text' placeholder='Fullname' name='name' value={user?.name} onChange={handleChange} isDisabled={loading} />
            {true && <FormErrorMessage>{emailError}</FormErrorMessage>} 
        </FormControl>

        <FormControl>
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <Input
                type="text"
                name="username"
                value={user?.username}
                placeholder="Username"
                onChange={handleChange}
              />
              <InputRightElement>
              {usernameLoading && <CircularProgress isIndeterminate size={"15px"} color='green' />}
              </InputRightElement>
            </InputGroup>
            {usernameError && <HStack color={"red"} gap={"5px"} alignItems={"center"}><FaFrown style={{fontSize:"11px", marginTop:"5px"}} /> <Text textAlign={"left"}>{usernameError}</Text></HStack> }
            {usernameAvailable && <HStack color={"green"} gap={"5px"} alignItems={"center"}><FaGrinHearts style={{fontSize:"11px", marginTop:"5px"}} /> <Text textAlign={"left"}>username available</Text></HStack> }
          </FormControl>

        <FormControl isInvalid={emailError}>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='Email' name='email' value={user?.email} onChange={handleChange} isDisabled={loading} />
            {emailError && <HStack color={"red"} marginTop={"5px"}><FaExclamationCircle /><Text>{emailError}</Text></HStack>} 
        </FormControl>

        <FormControl isInvalid={passError}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={show ? 'text' : 'password'} placeholder='Password' name='password' value={user?.password} onChange={handleChange} isDisabled={loading} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {passError && <HStack color={"red"} gap={"5px"} marginTop={"3px"} alignItems={"flex-start"}><FaExclamationCircle style={{marginTop:"5px"}} /> <Text textAlign={"left"}>{passError}</Text></HStack> }
        </FormControl>

        <FormControl isInvalid={phoneError}>
          <FormLabel>Mobile</FormLabel>
          <Input type='tel' placeholder='10 digits mobile number' name='phone' value={user?.phone} onChange={handleChange} />
          {phoneError &&  <HStack color={"red"} marginTop={"5px"}><FaExclamationCircle /><Text>{phoneError}</Text></HStack>} 
        </FormControl>

        <Button isLoading={loading} isDisabled={loading} onClick={handleLogout} colorScheme='green' marginTop={"30px"}>Signup</Button>

        <HStack marginTop={"10px"} justifyContent={"center"}>
          <Text >Already a user?</Text>
          <Text color={"blue.400"} cursor={"pointer"} _hover={{ textDecoration: "underline"}} onClick={()=> navigate("/login")}>Login</Text>
        </HStack>
      </VStack>
    </form>
  </Stack>
  )
}

export default Signup
