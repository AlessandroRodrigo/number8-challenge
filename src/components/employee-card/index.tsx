import { Box, Button, Card, Flex, Text } from "@mantine/core";
import { type inferProcedureOutput } from "@trpc/server";
import Image from "next/image";
import Link from "next/link";
import { EmployeeCardUtils } from "~/components/employee-card/employee-card.utils";
import { type AppRouter } from "~/server/api/root";

type Props = {
  employee: inferProcedureOutput<AppRouter["employees"]["getById"]>;
};

export function EmployeeCard({ employee }: Props) {
  return (
    <Card withBorder>
      <Flex gap="lg">
        <Image
          width={150}
          height={150}
          src="https://via.placeholder.com/150"
          alt="test"
          style={{
            borderRadius: 4,
            objectFit: "cover",
          }}
        />

        <Box
          style={{
            flex: 1,
          }}
        >
          <Flex align="baseline" gap="sm">
            <Text size="lg" fw="bold">
              {employee.firstName}
            </Text>
            <Text opacity={0.75}>({employee.department.name})</Text>
          </Flex>

          <Flex direction="column">
            <Text>Hire Date</Text>
            <Text>
              {EmployeeCardUtils.formatDate(employee.hireDate)} (
              {EmployeeCardUtils.timeOfService(employee.hireDate)})
            </Text>
          </Flex>
        </Box>

        <Box>
          <Link href={`/employees/${employee.id}`} passHref>
            <Button>View details</Button>
          </Link>
        </Box>
      </Flex>
    </Card>
  );
}
