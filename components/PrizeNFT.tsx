import { Box, Card, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { ThirdwebNftMedia, useContract, useContractMetadata, useContractRead, useNFT } from "@thirdweb-dev/react";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";

export default function PrizeNFT() {
    const { contract: lotteryContract } = useContract(LOTTERY_CONTRACT_ADDRESS);

    const { data: nftContractAddress } = useContractRead(lotteryContract, "nftContract");
    const { data: nftTokenId } = useContractRead(lotteryContract, "tokenId");

    const { contract: nftContract } = useContract(nftContractAddress);
    const { data: nftContractMetadata, isLoading: nftContractMetadataLoading } = useContractMetadata(nftContract);

    const { data: nft, isLoading: nftLoading } = useNFT(nftContract, nftTokenId);

    return (
        <Card p="5%" ml="5px" backgroundColor="rgba(255, 255, 255, 0.2)" color="gray">
            <Heading></Heading>
            {!nftContractMetadataLoading && !nftLoading ? (
                <Stack spacing="20px" textAlign="center">
                    <Box>
                        <ThirdwebNftMedia metadata={nft?.metadata!} height="97%" width="97%" />
                    </Box>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" color="white">{nftContractMetadata.name}</Text>
                        <Text fontWeight="bold" color="Gray">{nft?.metadata.name}</Text>
                    </Box>
                </Stack>
            ) : (
                <Spinner />
            )}
        </Card>
    );
}
