import {
  ActionIcon,
  Box,
  Card,
  Container,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { EmployeeDetailCard } from "~/components/employee-detail-card";
import { api } from "~/utils/api";

export default function EmployeeDetails() {
  const [currentDepartment, setCurrentDepartment] = useState("");
  const { query } = useRouter();

  const {
    isLoading,
    data: employeeData,
    refetch: refetchEmployeeData,
  } = api.employees.getById.useQuery(
    {
      id: Number(query.id),
    },
    {
      enabled: !!query.id,
      onSuccess: (data) => {
        setCurrentDepartment(data.department.id.toString());
      },
    },
  );

  const employeeFullName = `${employeeData?.firstName} ${employeeData?.lastName}`;

  const departmentHasChanged =
    currentDepartment === employeeData?.department?.id.toString();

  const { isLoading: isUpdating, mutateAsync: updateEmployee } =
    api.employees.update.useMutation({
      onSuccess() {
        void refetchEmployeeData();
      },
    });

  async function handleToggleStatus() {
    if (!employeeData?.id) return;

    await updateEmployee({
      id: employeeData?.id,
      status: employeeData?.status === "active" ? "inactive" : "active",
    });

    notifications.show({
      title: "Employee status updated",
      message: "Employee status has been updated successfully",
      color: "teal",
    });
  }

  async function handleDepartmentChange() {
    if (!employeeData?.id) return;

    await updateEmployee({
      id: employeeData?.id,
      departmentId: Number(currentDepartment),
    });

    notifications.show({
      title: "Employee department updated",
      message: "Employee department has been updated successfully",
      color: "teal",
    });
  }

  if (isLoading) return <div>Loading...</div>;

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

          <Card withBorder>
            <Text>Table</Text>
          </Card>
        </Box>
      </Container>
    </>
  );
}
