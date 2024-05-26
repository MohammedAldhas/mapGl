import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor, Button, WrapItem, Tooltip, ButtonGroup,
} from '@chakra-ui/react'

export default function Identify({ loading, classN, data, setclassN}) {

    const close = () => {
        setclassN("hidden")
    }

    return (
<>
    <div className={`${classN} box-border shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-[280px] text-sm absolute top-14 right-20 `}>

    {loading ?
        <h1>Loading...</h1>
        :
        <Popover
            returnFocusOnClose={false}
            isOpen={true}
            onClose={close}
            placement='left'
            closeOnBlur={false}
        >
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>{data?.items[0].name || data?.items[0].full_name}</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <p>{data?.items[0].address_name || data?.items[0].full_name}</p>
                </PopoverBody>
                <PopoverFooter display='flex' justifyContent='flex-end'>
                    <ButtonGroup size='sm'>
                        <Button onClick={close} variant='outline'>Close</Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    }
    </div>


    {/*<div className={`${classN} box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-[280px] text-sm absolute top-0 right-0 bg-[#f5deb3c4]`}>*/}
    {/*    {loading ? (*/}
    {/*        <h1>Loading...</h1>*/}
    {/*    ) : (*/}
    {/*        <>*/}
    {/*            <p>*/}
    {/*                Address: {data?.items[0].address_name || data?.items[0].full_name}*/}
    {/*            </p>*/}
    {/*            <p>Name: {data?.items[0].name || data?.items[0].full_name}</p>*/}
    {/*            <p>Building: {data?.items[0].building_name || "Unknown"}</p>*/}
    {/*            <p>*/}
    {/*                lang: {data?.items[0]?.point ? data?.items[0]?.point.lat : ""}{" "}*/}
    {/*                lon: {data?.items[0]?.point ? data?.items[0]?.point.lon : ""}*/}
    {/*            </p>*/}
    {/*            <p>type:{data?.items[0]?.type}</p>*/}
    {/*        </>*/}
    {/*    )}*/}
    {/*</div>*/}

</>
    );
}
