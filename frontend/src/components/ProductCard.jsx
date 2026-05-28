import {
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useColorMode } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { colorMode } = useColorMode();
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        closable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        closable: true,
      });
    }
  };
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
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <IconButton>
                <CiEdit />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <DialogBackdrop>
                <DialogPositioner>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Product</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                      <VStack gap={4}>
                        <Input
                          bg={colorMode === "light" ? "white" : "gray.600"}
                          placeholder="Product name"
                          name="name"
                          value={updatedProduct.name}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              name: e.target.value,
                            })
                          }
                        />
                        <Input
                          bg={colorMode === "light" ? "white" : "gray.600"}
                          placeholder="Price"
                          name="price"
                          value={updatedProduct.price}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              price: e.target.value,
                            })
                          }
                        />
                        <Input
                          bg={colorMode === "light" ? "white" : "gray.600"}
                          placeholder="Image URL"
                          name="image"
                          value={updatedProduct.image}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              image: e.target.value,
                            })
                          }
                        />
                      </VStack>
                    </DialogBody>
                    <DialogFooter>
                      <Dialog.ActionTrigger asChild>
                        <Button variant={"outline"}>Cancel</Button>
                      </Dialog.ActionTrigger>
                      <Dialog.ActionTrigger asChild>
                        <Button
                          variant={"outline"}
                          onClick={() =>
                            handleUpdateProduct(
                              updatedProduct._id,
                              updatedProduct,
                            )
                          }
                        >
                          Update
                        </Button>
                      </Dialog.ActionTrigger>
                    </DialogFooter>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton />
                    </Dialog.CloseTrigger>
                  </DialogContent>
                </DialogPositioner>
              </DialogBackdrop>
            </Portal>
          </Dialog.Root>

          <IconButton onClick={() => handleDeleteProduct(product._id)}>
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
