import { Card, Loader, Table } from "@mantine/core";
import { useEmployeeDetailContext } from "~/hooks/use-employee-detail-context";
import { DateUtils } from "~/utils/date";

export function EmployeeDepartmentRegistry() {
  const {
    departmentRegistryQuery: { isLoading, isError, data },
  } = useEmployeeDetailContext();

  if (isLoading) return <Loader />;

  if (isError) return <div>Something went wrong</div>;

  return (
    <Card withBorder p={0}>
      <Table withRowBorders highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th p="md">Department</Table.Th>
            <Table.Th p="md">Start date</Table.Th>
            <Table.Th p="md">End date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((registry, index) => (
            <Table.Tr key={index}>
              <Table.Td p="md" fw="normal">
                {registry.department.name}
              </Table.Td>
              <Table.Td p="md" fw="normal">
                {DateUtils.formatDate(registry.startDate)}
              </Table.Td>
              <Table.Td p="md" fw="normal">
                {(registry.endDate && DateUtils.formatDate(registry.endDate)) ??
                  "Present"}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
