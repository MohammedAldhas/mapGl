import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Box,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Textarea,
    Button,
    InputRightAddon,
    Flex, SimpleGrid
} from '@chakra-ui/react'
import TrafficLayerCard from "./TrafficLayerCard.jsx";

export function LayersPanel({isOpen, onOpen, onClose}) {

    return (
        <Flex>
            <Drawer
                isOpen={isOpen}
                placement='bottom'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Activate a Layer
                    </DrawerHeader>

                    <DrawerBody>
                        <Box p={4}>
                            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
                                <TrafficLayerCard title={"Traffic"} image={"https://miro.medium.com/v2/resize:fit:887/1*pthOihKiuh3X0ehxwHincw.png"}/>
                                <TrafficLayerCard title={"Satellite"} image={"https://www.researchgate.net/publication/354379512/figure/fig7/AS:1064888667492353@1630900651608/A-Satellite-image-for-the-Business-Bay-Area-in-Dubai-Google-Maps-2020.jpg"}/>
                                <TrafficLayerCard title={"Heat Map"} image={"https://www.afrigis.co.za/wp-content/uploads/2021/08/HeatMap_KZN_PopDensity_600x600.jpg"}/>
                                <TrafficLayerCard title={"Satellite"} image={"https://www.researchgate.net/publication/354379512/figure/fig7/AS:1064888667492353@1630900651608/A-Satellite-image-for-the-Business-Bay-Area-in-Dubai-Google-Maps-2020.jpg"}/>
                            </SimpleGrid>
                        </Box>
                    </DrawerBody>

                    {/*<DrawerFooter borderTopWidth='1px'>*/}
                    {/*    <Button variant='outline' mr={3} onClick={onClose}>*/}
                    {/*        Cancel*/}
                    {/*    </Button>*/}
                    {/*    <Button colorScheme='blue'>Submit</Button>*/}
                    {/*</DrawerFooter>*/}
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}
