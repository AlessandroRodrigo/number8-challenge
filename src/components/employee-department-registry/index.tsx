import { Card, Table } from "@mantine/core";
import { useEmployeeDetailContext } from "~/hooks/use-employee-detail-context";
import { DateUtils } from "~/utils/date";

export function EmployeeDepartmentRegistry() {
  const { departmentRegistry } = useEmployeeDetailContext();

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
          {departmentRegistry.data?.map((registry, index) => (
            <Table.Tr key={index}>
              <Table.Th p="md" fw="normal">
                {registry.department.name}
              </Table.Th>
              <Table.Th p="md" fw="normal">
                {DateUtils.formatDate(registry.startDate)}
              </Table.Th>
              <Table.Th p="md" fw="normal">
                {(registry.endDate && DateUtils.formatDate(registry.endDate)) ??
                  "Present"}
              </Table.Th>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
