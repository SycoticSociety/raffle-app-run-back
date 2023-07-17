import { Card, Text } from "@chakra-ui/react";

type Props = {
  status: boolean;
};

const LotteryStatus: React.FC<Props> = ({ status }) => {
  let backgroundColor = status ? "green.200" : "red.200";
  let borderColor = status ? "green.500" : "red.500";
  let textColor = status ? "green.700" : "red.700";

  return (
    <Card
      py={2}
      textAlign={"center"}
      backgroundColor={backgroundColor}
      border={"1px solid"}
      borderColor={borderColor}
      width={"50%"} // Set the width to 50%
      margin={"auto"} // Center the card horizontally
    >
      <Text fontWeight={"bold"} color={textColor} fontSize={"sm"}>
        Lottery Status: {status ? "Open" : "Closed"}
      </Text>
    </Card>
  );
};

export default LotteryStatus;
