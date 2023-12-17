import { ActionIcon, Box, Container, Flex, Loader, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { EmployeeDepartmentRegistry } from "~/components/employee-department-registry";
import { EmployeeDetailCard } from "~/components/employee-detail-card";
import { api } from "~/utils/api";

export default function EmployeeDetails() {
  const { query } = useRouter();

  const { isLoading, data: employeeData } = api.employees.getById.useQuery(
    {
      id: Number(query.id),
    },
    {
      enabled: !!query.id,
    },
  );

  const employeeFullName = `${employeeData?.firstName} ${employeeData?.lastName}`;

  if (isLoading) return <Loader />;

  return (
    <>
      <Head>
        <title>{employeeFullName} - Employee Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container component="main">
        <Flex align="baseline" gap="md">
          <Link href="/" passHref>
            <ActionIcon variant="transparent" color="dark">
              <IconArrowLeft size={20} />
            </ActionIcon>
          </Link>
          <Title order={1} py="lg">
            {employeeFullName} details
          </Title>
        </Flex>

        {employeeData && <EmployeeDetailCard {...employeeData} />}

        <Box mt="lg">
          <Title order={3} mb="sm">
            Employee's department history
          </Title>

          {employeeData && <EmployeeDepartmentRegistry id={employeeData.id} />}
        </Box>
      </Container>
    </>
  );
}
