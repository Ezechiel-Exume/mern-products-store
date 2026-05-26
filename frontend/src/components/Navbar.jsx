import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Link to={"/"}>
          <Text
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            background="linear-gradient(to left, cyan, blue)"
            backgroundClip="text"
            color="transparent"
          >
            Product Store 🛒
          </Text>
        </Link>
        <HStack gap={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <BsPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
