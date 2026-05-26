import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useColorMode } from "./ui/color-mode";

const ProductCard = ({ product }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      bg={colorMode === "light" ? "white" : "gray.800"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text
          fontWeight={"bold"}
          fontSize={"xl"}
          color={colorMode === "light" ? "gray.600" : "gray.200"}
          mb={4}
        >
          ${product.price}
        </Text>
        <HStack gap={2}>
          <IconButton>
            <CiEdit />
          </IconButton>
          <IconButton>
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
