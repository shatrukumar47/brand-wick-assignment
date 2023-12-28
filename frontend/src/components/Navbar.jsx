import { Box, Button, Container, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { logoutAction } from '../redux/authReducer/actions';

const Navbar = () => {
  const navigate = useNavigate();

  //Redux Store
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authReducer.token);

  //Logout Button
  const handleLogout = () => {
    navigate("login");
    dispatch(logoutAction());
  };

  return (
    <Box shadow={"lg"}>
       <Container maxW={"7xl"}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} padding={"10px"}>
            <Text fontWeight={"bold"} cursor={"pointer"} onClick={()=> navigate("/")}>The Brand Wick</Text>
            { !token && <Button colorScheme='blue' onClick={()=> navigate("/login")}>Login</Button>}
            { token && <Button colorScheme='red' onClick={handleLogout}>Logout</Button>}
        </Stack>
        </Container> 
    </Box>
  )
}

export default Navbar
