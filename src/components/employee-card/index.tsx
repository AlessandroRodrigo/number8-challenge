import { Box, Button, Card, Flex, Text } from "@mantine/core";
import { type inferProcedureOutput } from "@trpc/server";
import Image from "next/image";
import Link from "next/link";
import { type AppRouter } from "~/server/api/root";
import { DateUtils } from "~/utils/date";

type Props = {
  employee: inferProcedureOutput<AppRouter["employees"]["getById"]>;
};

export function EmployeeCard({ employee }: Props) {
  return (
    <Card withBorder component="article">
      <Flex gap="lg">
        <Image
          data-testid="employee-image"
          width={150}
          height={150}
          src="https://via.placeholder.com/150"
          alt={employee.firstName}
          style={{
            borderRadius: 4,
            objectFit: "cover",
          }}
        />

        <Box
          style={{
            flex: 1,
          }}
          component="section"
        >
          <Flex align="baseline" gap="sm">
            <Text
              size="lg"
              fw="bold"
              component="h2"
              data-testid="employee-name"
            >
              {employee.firstName}
            </Text>
            <Text
              opacity={0.75}
              component="p"
              data-testid="employee-department"
            >
              ({employee.department.name})
            </Text>
          </Flex>

          <Flex direction="column">
            <Text component="p">Hire Date</Text>
            <Text component="p">
              {DateUtils.formatDate(employee.hireDate)} (
              {DateUtils.timeOfService(employee.hireDate)})
            </Text>
          </Flex>
        </Box>

        <nav>
          <Link
            data-testid="employee-details-button"
            href={`/employees/${employee.id}`}
            passHref
          >
            <Button>View details</Button>
          </Link>
        </nav>
      </Flex>
    </Card>
  );
}
