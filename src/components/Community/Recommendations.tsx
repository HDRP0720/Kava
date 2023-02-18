import { Community } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';
import { Flex, Icon, Skeleton, SkeletonCircle, Stack, Text, Image, Box, Button, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Accordion } from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaReddit } from 'react-icons/fa';

const Recommendations:React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);

    try {
      const communityQuery = query(
        collection(firestore, 'communities'),
        orderBy('numberOfMembers', 'desc'),
        limit(5)
      )
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setCommunities(communities as Community[]);

    } catch (error) {
      console.log('getCommunityRecommendations error', error)
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, [])
    
  return (
    <Flex 
      direction='column'
      bg='white'
      borderRadius={4}
      border='1px solid'
      borderColor='gray.300'
    >
      <Flex
        align='flex-end'
        color='white'
        p='6px 10px'
        height='70px'
        borderRadius='4px 4px 0px 0px'
        fontWeight={700}
        bgImage='url(/images/lorenzo-herrera-p0j-mE6mGo4-unsplash-banner.png)'
        backgroundSize='cover'
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('images/lorenzo-herrera-p0j-mE6mGo4-unsplash-banner.png')"
      >        
        <Text>Communities</Text>
      </Flex>

      <Flex direction='column'>
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
              return (
                <Link key={item.id} href={`/r/${item.id}`}>
                  <Flex
                    position='relative'
                    align='center' 
                    fontSize='10pt' 
                    borderBottom='1px solid' 
                    borderColor='gray.200' 
                    p='10px 12px'
                    fontWeight={600}
                  >
                    <Flex width="80%" align="center">
                      <Flex width='15%'>
                        <Text mr={2}>{index + 1}</Text>
                      </Flex>

                      <Flex align="center" width="80%">
                        {item.imageURL ? (
                          <Image
                            borderRadius="full"
                            boxSize="28px"
                            src={item.imageURL}
                            alt='Community Image'
                            mr={2}
                          />
                        ) : (
                          <Icon
                            as={FaReddit}
                            fontSize={30}
                            color="brand.100"
                            mr={2}
                          />
                        )}

                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {`r/${item.id}`}
                        </span>
                      </Flex>
                    </Flex>

                    <Box position='absolute' right='10px'>
                      <Button
                        height='22px'
                        fontSize='8pt'
                        variant={isJoined ? 'outline' : 'solid'}
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinOrLeaveCommunity(item, isJoined)
                        }}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              )
            })}

              {/* <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box as="span" flex='1'>
                      <Button height='30px' width='100%'>View All</Button>
                    </Box>                 
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
            </Accordion>             */}

            {/* <Box p='10px 20px'>
              <Button height='30px' width='100%'>View All</Button>
            </Box> */}
          </>
        )}
      </Flex>
    </Flex>
  )
}
export default Recommendations;