import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import PrizeNFT from "../components/PrizeNFT";
import CurrentEntries from "../components/CurrentEntries";
import LotteryStatus from "../components/Status";
import { HERO_IMAGE_URL, LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";

const Home = () => {
  const address = useAddress();

  const { contract } = useContract(LOTTERY_CONTRACT_ADDRESS);

  const { data: lotteryStatus } = useContractRead(contract, "lotteryStatus");

  const { data: ticketCost, isLoading: ticketCostLoading } = useContractRead(
    contract,
    "ticketCost"
  );
  const ticketCostInEther = ticketCost
    ? ethers.utils.formatEther(ticketCost)
    : "0";

  const { data: totalEntries, isLoading: totalEntriesLoading } =
    useContractRead(contract, "totalEntries");

  const [ticketAmount, setTicketAmount] = useState(0);
  const ticketCostSubmit = parseFloat(ticketCostInEther) * ticketAmount;

  function increaseTicketAmount() {
    setTicketAmount(ticketAmount + 1);
  }

  function decreaseTicketAmount() {
    if (ticketAmount > 0) {
      setTicketAmount(ticketAmount - 1);
    }
  }

  function resetTicketAmount() {
    setTicketAmount(0);
  }

  return (
    <Container maxW={"1440px"} bg="black">
      <SimpleGrid columns={2} spacing={4} minH={"60vh"}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          {lotteryStatus ? (
            <PrizeNFT />
          ) : (
            <MediaRenderer src={HERO_IMAGE_URL} width="90%" height="90%" />
          )}
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} p={"5%"} color="white">
          <Stack spacing={10}>
            <Box>
              <Text fontSize={"xl"}></Text>
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                Buy tickets to win the NFT Prize!
              </Text>
            </Box>

            <Text fontSize={"xl"}>
              Buy Entries for a chance to win the NFT! The winner will be selected
              and transferred the NFT. More entries increase your chance of
              winning the prize.
            </Text>

            <LotteryStatus status={lotteryStatus} />
            {!ticketCostLoading && (
              <Text fontSize={"1xl"} fontWeight={"bold"}>
                Cost Per Ticket: {ticketCostInEther} MATIC
              </Text>
            )}
            {address ? (
              <Flex flexDirection={"row"} alignItems="center">
                <Text ml={4} color="red" textDecoration="underline" cursor="pointer" onClick={resetTicketAmount}>
                  Reset
                </Text>
                <Flex flexDirection={"row"} w={"20%"} mr={"30px"}>
                  <Button onClick={decreaseTicketAmount}>-</Button>
                  <Input
                    value={ticketAmount}
                    type={"number"}
                    onChange={(e) =>
                      setTicketAmount(parseInt(e.target.value))
                    }
                    textAlign={"center"}
                    mx={2}
                  />
                  <Button onClick={increaseTicketAmount}>+</Button>
                </Flex>
                <Text>
                  Selected Tickets:{" "}
                  <Text as="span" color="green">
                    {ticketAmount}
                  </Text>
                </Text>

                <Web3Button
                  contractAddress={LOTTERY_CONTRACT_ADDRESS}
                  action={(contract) =>
                    contract.call("buyTicket", [ticketAmount], {
                      value: ethers.utils.parseEther(
                        ticketCostSubmit.toString()
                      ),
                    })
                  }
                  isDisabled={!lotteryStatus}
                >
                  {`Buy Ticket(s)`}
                </Web3Button>
              </Flex>
            ) : (
              <Text>Connect wallet to buy ticket.</Text>
            )}
            {!totalEntriesLoading && (
              <Text mt={4}>Total Entries: {totalEntries.toString()}</Text>
            )}
          </Stack>
        </Flex>
      </SimpleGrid>
      <Stack mt={"40px"} textAlign={"center"}>
        <Text fontSize={"xl"}>Current lottery Participants:</Text>
        <CurrentEntries />
      </Stack>
    </Container>
  );
};

export default Home;
