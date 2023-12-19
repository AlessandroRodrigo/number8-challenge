import {
  Avatar,
  Button,
  Card,
  Flex,
  Indicator,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DepartmentSelect } from "~/components/department-select";
import { useEmployeeDetailContext } from "~/hooks/use-employee-detail-context";
import { DateUtils } from "~/utils/date";

export function EmployeeDetailCard() {
  const {
    employeeQuery: { data, isLoading, isError },
    updateEmployeeDepartment: {
      department,
      departmentHasChanged,
      setDepartment,
      updateEmployeeDepartment,
      isUpdating: isUpdatingDepartment,
    },
    updateEmployeeStatus: { toggleStatus, isUpdating: isUpdatingStatus },
  } = useEmployeeDetailContext();

  if (isLoading) return <Loader />;

  if (isError) return <div>Something went wrong</div>;

  return (
    <Card padding="lg" radius="md" withBorder>
      <Flex gap="md">
        <section>
          <Indicator
            inline
            label={data?.status === "active" ? "Active" : "Inactive"}
            color={data?.status === "active" ? "teal" : "red"}
            size="24"
            position="bottom-center"
          >
            <Avatar
              size="xl"
              radius="sm"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt={data?.fullName}
            />
          </Indicator>
        </section>

        <Flex direction="column" gap="md" component="article">
          <Text size="lg" fw="bold">
            {data?.fullName}
          </Text>
          <Flex direction="column">
            <span>Employee ID: {data?.id}</span>
            <span>Department: {data?.department?.name}</span>
            <span>Telephone: {data?.phone}</span>
            <span>Address: {data?.address}</span>
          </Flex>
          <Stack gap="sm">
            <DepartmentSelect value={department} onChange={setDepartment} />
            <Button
              onClick={updateEmployeeDepartment}
              loading={isUpdatingDepartment}
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
              <time>{DateUtils.formatDate(data?.hireDate)}</time>
              <span>({DateUtils.timeOfService(data?.hireDate)})</span>
            </Flex>

            <Button
              role="toggle-status"
              onClick={toggleStatus}
              loading={isUpdatingStatus}
              color={data?.status === "active" ? "red" : "teal"}
              aria-label={
                data?.status === "active"
                  ? "Deactivate Employee"
                  : "Activate Employee"
              }
            >
              {data?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Card>
  );
}
