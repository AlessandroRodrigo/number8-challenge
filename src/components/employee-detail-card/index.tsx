import { Button, Card, Flex, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useState } from "react";
import { DepartmentSelect } from "~/components/department-select";
import { api } from "~/utils/api";
import { DateUtils } from "~/utils/date";

type Props = {
  id: number;
  firstName: string;
  lastName: string;
  department: {
    id: number;
    name: string;
  };
  phone: string;
  address: string;
  hireDate: Date;
  status: string;
};

export function EmployeeDetailCard(employee: Props) {
  const [department, setDepartment] = useState(
    employee.department.id.toString(),
  );
  const apiUtils = api.useUtils();
  const fullName = `${employee.firstName} ${employee.lastName}`;

  const { isLoading: isUpdating, mutateAsync: update } =
    api.employees.update.useMutation({
      onSuccess() {
        void apiUtils.employees.getById.refetch({
          id: employee.id,
        });
        void apiUtils.employees.getDepartmentRegistry.refetch({
          employeeId: employee.id,
        });
      },
    });

  const departmentHasChanged = department === employee.department.id.toString();

  async function handleDepartmentChange() {
    if (!employee.id) return;

    await update({
      id: employee.id,
      departmentId: Number(department),
    });

    notifications.show({
      title: "Department updated",
      message: `${fullName}'s department has been updated`,
    });
  }

  async function handleToggleStatus() {
    if (!employee.id) return;

    await update({
      id: employee.id,
      status: employee.status === "active" ? "inactive" : "active",
    });

    notifications.show({
      title: "Employee status updated",
      message: `${fullName}'s status has been updated`,
    });
  }

  return (
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
            {fullName}
          </Text>

          <Flex direction="column" className="text-sm text-gray-700">
            <span>Employee ID: {employee.id}</span>
            <span>Department: {employee.department?.name}</span>
            <span>Telephone: {employee.phone}</span>
            <span>Address: {employee.address}</span>
          </Flex>

          <div className="flex flex-col gap-2">
            <span>Update department</span>
            <DepartmentSelect value={department} onChange={setDepartment} />
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
                {DateUtils.formatDate(employee.hireDate)}
              </span>
              <span>({DateUtils.timeOfService(employee.hireDate)})</span>
            </Flex>

            <Button
              onClick={handleToggleStatus}
              color={employee.status === "active" ? "red" : "teal"}
            >
              {employee.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Card>
  );
}
