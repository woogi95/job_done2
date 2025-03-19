import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  VStack,
} from "@chakra-ui/react";

function AlertTestPage() {
  return (
    <Box p={8} maxW="800px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Success Alert */}
        <Alert status="success" borderRadius="md">
          <AlertIcon />
          <AlertTitle mr={2}>성공!</AlertTitle>
          <AlertDescription>작업이 성공적으로 완료되었습니다.</AlertDescription>
        </Alert>

        {/* Error Alert */}
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertTitle mr={2}>오류 발생!</AlertTitle>
          <AlertDescription>작업 중 오류가 발생했습니다.</AlertDescription>
        </Alert>

        {/* Warning Alert */}
        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          <AlertTitle mr={2}>경고!</AlertTitle>
          <AlertDescription>이 작업은 되돌릴 수 없습니다.</AlertDescription>
        </Alert>

        {/* Info Alert */}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <AlertTitle mr={2}>정보</AlertTitle>
          <AlertDescription>이 작업은 5분 정도 소요됩니다.</AlertDescription>
        </Alert>
      </VStack>
    </Box>
  );
}

export default AlertTestPage;
