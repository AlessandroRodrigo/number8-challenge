import {
  ActionIcon,
  Button,
  Card,
  Container,
  Flex,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { EmployeeCardUtils } from "~/components/employee-card/employee-card.utils";
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
      onSuccess(data, variables, context) {
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

        <Card padding="lg" radius="md" withBorder>
          <Flex gap="md">
            <Image
              width={250}
              height={250}
              src="https://via.placeholder.com/500"
              alt="placeholder-image"
            />

            <Flex direction="column" gap="md">
              <Text size="lg" fw="bold">
                {employeeFullName}
              </Text>

              <Flex direction="column" className="text-sm text-gray-700">
                <span>Employee ID: {employeeData?.id}</span>
                <span>Department: {employeeData?.department?.name}</span>
                <span>Telephone: {employeeData?.phone}</span>
                <span>Address: {employeeData?.address}</span>
              </Flex>

              <div className="flex flex-col gap-2">
                <span>Update department</span>
                <DepartmentSelect
                  value={currentDepartment}
                  onChange={(value) => setCurrentDepartment(value)}
                />
                <Button
                  onClick={handleDepartmentChange}
                  loading={isUpdating}
                  disabled={departmentHasChanged}
                >
                  Update
                </Button>
              </div>
            </Flex>

            <Stack ml="auto">
              <Title order={5}>Hire Date</Title>
              <Stack className="flex flex-col">
                <Flex gap="sm">
                  <span className="text-sm text-gray-700">
                    {EmployeeCardUtils.formatDate(employeeData?.hireDate)}
                  </span>
                  <span>
                    ({EmployeeCardUtils.timeOfService(employeeData?.hireDate)})
                  </span>
                </Flex>

                <Button
                  onClick={handleToggleStatus}
                  color={employeeData?.status === "active" ? "red" : "teal"}
                >
                  {employeeData?.status === "active"
                    ? "Deactivate"
                    : "Activate"}
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Card>
      </Container>
    </>
  );
}

type DepartmentSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
};

function DepartmentSelect({ value, onChange }: DepartmentSelectProps) {
  const { isLoading, data } = api.departments.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Select
      value={value}
      onChange={(value) => {
        if (!value) return;
        onChange?.(value);
      }}
      data={
        data?.map((department) => ({
          value: department.id.toString(),
          label: department.name,
        })) ?? []
      }
    />
  );
}
