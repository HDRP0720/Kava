import { Community } from '@/atoms/communitiesAtom';
import useCommunityData from '@/hooks/useCommunityData';
import { Flex, Icon, Skeleton, SkeletonCircle, Stack, Text, Image, Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { HiOutlineDocumentSearch } from 'react-icons/hi';

const links = [
  { 
    name: 'GameDevExperiments', 
    href: 'https://www.youtube.com/@GameDevExperiments' 
  },
  { 
    name: 'BenCloward',
    href: 'https://www.youtube.com/@BenCloward' 
  },
  { 
    name: 'GabrielAguiarProd', 
    href: 'https://www.youtube.com/@GabrielAguiarProd' 
  },
  { 
    name: 'CodeMonkey', 
    href: 'https://www.youtube.com/@CodeMonkeyUnity' 
  },
  {
    name: '골드메탈',
    href: 'https://www.youtube.com/@goldmetal'
  },
  {
    name: 'Brackeys',
    href: 'https://www.youtube.com/@Brackeys'
  },
];

const Spotlights: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();  

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
        bgImage='url(/images/sean-whelan-NG_a-z0ScM0-unsplash-banner.png)'
        backgroundSize='cover'
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('images/sean-whelan-NG_a-z0ScM0-unsplash-banner.png')"
      >
        <Text>Spotlights Channel</Text>
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
              {links.map((link, index) => (
                <Link key={index} href={link.href} >              
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
                        <Text mr='2'>{index + 1}</Text>
                      </Flex>

                      <Flex align="center" width="80%">
                        <Icon 
                          as={AiFillYoutube} 
                          fontSize={20}
                          color="brand.100"
                          mr={2}
                        />
                        {link.name}
                      </Flex>
                    </Flex>
                  </Flex>
                </Link>
              ))}     
          </>
        )}
      </Flex>
    </Flex>
  )
}
export default Spotlights;