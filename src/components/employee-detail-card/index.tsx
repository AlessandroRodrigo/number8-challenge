import {
  Avatar,
  Button,
  Card,
  Flex,
  Indicator,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DepartmentSelect } from "~/components/department-select";
import { useEmployeeDetailContext } from "~/hooks/use-employee-detail-context";
import { DateUtils } from "~/utils/date";

export function EmployeeDetailCard() {
  const {
    employee,
    department,
    setDepartment,
    handleDepartmentChange,
    handleToggleStatus,
    isUpdating,
    departmentHasChanged,
  } = useEmployeeDetailContext();

  return (
    <Card padding="lg" radius="md" withBorder>
      <Flex gap="md">
        <div>
          <Indicator
            inline
            label={employee.data?.status === "active" ? "Active" : "Inactive"}
            color={employee.data?.status === "active" ? "teal" : "red"}
            size="24"
            position="bottom-center"
          >
            <Avatar
              size="xl"
              radius="sm"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="placeholder-image"
            />
          </Indicator>
        </div>

        <Flex direction="column" gap="md">
          <Text size="lg" fw="bold">
            {employee.fullName}
          </Text>
          <Flex direction="column" className="text-sm text-gray-700">
            <span>Employee ID: {employee.data?.id}</span>
            <span>Department: {employee.data?.department?.name}</span>
            <span>Telephone: {employee.data?.phone}</span>
            <span>Address: {employee.data?.address}</span>
          </Flex>
          <Stack gap="sm">
            <DepartmentSelect value={department} onChange={setDepartment} />
            <Button
              onClick={handleDepartmentChange}
              loading={isUpdating}
              disabled={departmentHasChanged}
            >
              Update
            </Button>
          </Stack>
        </Flex>

        <Stack ml="auto" gap={0}>
          <Title order={5}>Hire Date</Title>
          <Stack className="flex flex-col">
            <Flex gap="sm">
              <span className="text-sm text-gray-700">
                {DateUtils.formatDate(employee.data?.hireDate)}
              </span>
              <span>({DateUtils.timeOfService(employee.data?.hireDate)})</span>
            </Flex>

            <Button
              onClick={handleToggleStatus}
              color={employee.data?.status === "active" ? "red" : "teal"}
            >
              {employee.data?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Card>
  );
}
