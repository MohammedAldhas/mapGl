import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Box,
    useColorModeValue,
    Flex,
    Text,
    CloseButton,
    SimpleGrid,
    Avatar,
    Badge,
    ListIcon,
    Icon, HStack,
} from '@chakra-ui/react'
import restaurantIcon from "../icons/restaurant.svg";
import bc from "../icons/cafe.svg";
import mallIcon from "../icons/mall.svg";
import hotelIcon from "../icons/hotel.svg";
import mosqueIcon from "../icons/mosque.svg";
import bho from "../icons/hospital.svg";


import {
    FormControl,
    Heading,
    Input,
    Stack,
} from '@chakra-ui/react'

import App from "../App.jsx";
import TrafficLayerCard from "./TrafficLayerCard.jsx";
// import {LayersPanel} from "./LayersPanel.jsx";
import { FaHospitalAlt } from "react-icons/fa";
import {
    MdHotel, MdLocalAtm,
    MdLocalCafe,
    MdLocalGasStation,
    MdLocalGroceryStore,
    MdLocalHospital,
    MdLocalMall,
    MdMosque
} from "react-icons/md";
import { MdOutlineRestaurant } from "react-icons/md";
import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../constants/Constants.js";

export function CategoriesPanel({isOpen, onOpen, onClose, map, mapglAPI}) {
    const [bbox, setBbox] = useState("");
    const [activeCategory, setActiveCategory] = useState("");
    const [activeLoading, setActiveLoading] = useState("");
    const [markers] = useState([]);


    const icons = {
        restaurant: restaurantIcon,
        cafe: bc,
        malls: mallIcon,
        hotel: hotelIcon,
        mosques: mosqueIcon,
        hospital: bho,
    };


    function showCategoryOnMap(category){
        if(category == activeCategory){
            return
        }
        setActiveLoading(category)
        let polygonGeom;
        if (map) {
            try {
                const bounds = map.getBounds();
                if (bounds) {
                    const northEast = bounds.northEast;
                    const southWest = bounds.southWest;

                    polygonGeom =
                        southWest[0] +
                        " " +
                        southWest[1] +
                        "," +
                        southWest[0] +
                        " " +
                        northEast[1] +
                        "," +
                        northEast[0] +
                        " " +
                        northEast[1] +
                        "," +
                        northEast[0] +
                        " " +
                        southWest[1]

                }
            } finally {
                if (map.getZoom() >= 15) {
                    // comparefunc(data?.items);
                    // setMessage("There is no places in currunt area");
                } else {
                    // setMessage("The Zoom is too far, Please be click here");
                    // deletMarkers();
                }
            }
        }

        axios.get(BASE_URL + `/items?q=${category}&polygon=POLYGON((${polygonGeom}))&fields=items.point&key=demo&locale=en_SA`).then((res) => {
            setActiveCategory(category)
            setActiveLoading("")
            let data = res.data?.result?.items;

            if (markers.length > 0) {
                markers.forEach((marker) => {
                    marker.destroy();
                });
            }

            data?.map((w) => {
                let marker = new mapglAPI.Marker(map, {
                    coordinates: [w.point.lon, w.point.lat],
                    icon: icons[category]
                });
                markers.push(marker);
                marker.on("click", () => {
                    goToLoc([w.point.lon, w.point.lat]);
                });
                marker.on("mouseover", () => {
                    showMAarker.push(
                        new mapglAPI.Marker(map, {
                            coordinates: [w.point.lon, w.point.lat],
                            icon: redIcons[`${types}`],
                        })
                    );
                });
                marker.on("mouseout", () => {
                    if (showMAarker.length > 0) {
                        showMAarker.forEach((mrk) => {
                            mrk.destroy();
                        });
                    }
                });
            });
        })
    }

    return (
        <>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <Flex onClose={() => onClose} display={{ base: 'none', md: 'block' }} >
                    <Box
                        transition="3s ease"
                        bg={useColorModeValue('white', 'gray.900')}
                        borderRight="1px"
                        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                        w={{ base: 'full', md: 60 }}
                        pos="fixed"
                        h="full"
                        >
                        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                                {/*Categories*/}
                            </Text>
                            <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
                        </Flex>

                    </Box>
                </Flex>
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="md"
                >
                    <DrawerContent>
                        <DrawerCloseButton />

                        <Flex
                            align={'center'}
                            justify={'center'}
                            // bg={useColorModeValue('gray.50', 'gray.800')}
                        >
                            <Stack
                                spacing={4}
                                w={'full'}
                                maxW={'md'}
                                bg={useColorModeValue('white', 'gray.700')}
                                rounded={'xl'}
                                boxShadow={'lg'}
                                p={6}
                                my={16}>
                                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                                    Categories
                                </Heading>
                                <Text
                                    fontSize={{ base: 'sm', sm: 'md' }}
                                    color={useColorModeValue('gray.800', 'gray.400')}>
                                    Search For Places & Addresses
                                </Text>
                                <FormControl id="email">
                                    <Input
                                        placeholder="Search..."
                                        _placeholder={{ color: 'gray.500' }}
                                        type="email"
                                    />
                                </FormControl>

                                <Box p={4}>
                                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>

                                        <Button
                                            leftIcon={<MdLocalMall />}
                                            direction="column"
                                            align="center"
                                            onClick={() => showCategoryOnMap("malls")}
                                            isLoading={activeLoading == "malls"}
                                            colorScheme={activeCategory == "malls" ? 'blue' : 'gray'}
                                        >
                                            <Text>Malls</Text>
                                        </Button>
                                        <Button
                                            leftIcon={<MdMosque />}
                                            direction="column"
                                            align="center"
                                            onClick={() => showCategoryOnMap("mosques")}
                                            isLoading={activeLoading == "mosques"}
                                            colorScheme={activeCategory == "mosques" ? 'blue' : 'gray'}
                                        >
                                            <Text>Mosques</Text>
                                        </Button>
                                        <Button leftIcon={<MdLocalGasStation />} direction="column" align="center">
                                            <Text>Gas</Text>
                                        </Button>
                                        <Button leftIcon={<MdHotel />} direction="column" align="center">
                                            <Text>Hotels</Text>
                                        </Button>

                                        <Button leftIcon={<MdLocalGroceryStore />} direction="column" align="center">
                                            <Text>Groceries</Text>
                                        </Button>
                                        <Button leftIcon={<MdLocalCafe />} direction="column" align="center">
                                            <Text>Cafes</Text>
                                        </Button>
                                        <Button leftIcon={<MdOutlineRestaurant />} direction="column" align="center">
                                            <Text>Eat Out</Text>
                                        </Button>
                                        <Button leftIcon={<MdLocalAtm />} direction="column" align="center">
                                            <Text>ATMs</Text>
                                        </Button>



                                    </SimpleGrid>
                                </Box>

                            </Stack>


                        </Flex>



                    </DrawerContent>
                </Drawer>
                {/* mobilenav */}
                <Box ml={{ base: 0, md: 60 }}>
                    {/* Content */}
                    {/*<App />*/}
                </Box>
            </Box>
        </>
    )
}
