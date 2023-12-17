import { ActionIcon, Box, Container, Flex, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { EmployeeDepartmentRegistry } from "~/components/employee-department-registry";
import { EmployeeDetailCard } from "~/components/employee-detail-card";
import { EmployeeDetailProvider } from "~/contexts/employee-detail.context";

export default function EmployeeDetails() {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Employee Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EmployeeDetailProvider id={Number(query.id)}>
        <Container component="main" pb="lg">
          <Flex align="baseline" gap="md">
            <Link href="/" passHref>
              <ActionIcon variant="transparent" color="dark">
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Link>
            <Title order={1} py="lg">
              Employee details
            </Title>
          </Flex>

          <EmployeeDetailCard />

          <Box mt="lg">
            <Title order={3} mb="sm">
              Employee's department history
            </Title>

            <EmployeeDepartmentRegistry />
          </Box>
        </Container>
      </EmployeeDetailProvider>
    </>
  );
}
