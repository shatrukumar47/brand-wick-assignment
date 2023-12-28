import React from 'react'
import { Stack, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Stack direction={{base:"column", md:"row", lg:"row"}} width={"100%"} justifyContent={"space-between"} padding={"10px 30px"} bg={"gray"}>
      <Text>@2023 All Rights Reserved</Text>
      <Text>shatrukumar47@gmail.com</Text>
    </Stack>
  )
}

export default Footer
