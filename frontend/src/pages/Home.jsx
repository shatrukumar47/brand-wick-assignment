import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  //Redux Store
  const username = useSelector((store) => store.authReducer.username) || "";

  return (
    <Flex justifyContent={"center"} alignItems={"center"} minHeight={"80vh"}>
      <Box padding={"50px 20px"}>
        <Heading color={"green.500"}>Hello, {username}</Heading>
        <Heading color={"tomato"}>Welcome to Brand Wick</Heading>
        <Box width={"80%"} margin={"30px auto"}>
          <Text color={"gray"}>
            {" "}
            We are a leading web3 development and marketing company dedicated to
            supporting startups in building innovative web3 products, smart
            contracts, and NFT projects. We offer a unique combination of
            investment and development expertise, which enables us to provide
            startups with the support they need to bring their ideas to life. Our
            team has a deep understanding of the web3 ecosystem and is passionate
            about helping startups succeed in this exciting space. Our web3
            development services cover a wide range of areas, including blockchain
            development, smart contract development, decentralized applications
            (DApps), and NFT projects.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
