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
        <section>
          <figure>
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
                alt={employee.fullName}
              />
            </Indicator>
          </figure>
        </section>

        <Flex direction="column" gap="md" component="article">
          <Text size="lg" fw="bold">
            {employee.fullName}
          </Text>
          <Flex direction="column">
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
              aria-disabled={departmentHasChanged}
            >
              Update
            </Button>
          </Stack>
        </Flex>

        <Stack ml="auto" gap={0}>
          <header>
            <Title order={5}>Hire Date</Title>
          </header>

          <Stack>
            <Flex gap="sm">
              <time>{DateUtils.formatDate(employee.data?.hireDate)}</time>
              <span>({DateUtils.timeOfService(employee.data?.hireDate)})</span>
            </Flex>

            <Button
              onClick={handleToggleStatus}
              color={employee.data?.status === "active" ? "red" : "teal"}
              aria-label={
                employee.data?.status === "active"
                  ? "Deactivate Employee"
                  : "Activate Employee"
              }
            >
              {employee.data?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Card>
  );
}
