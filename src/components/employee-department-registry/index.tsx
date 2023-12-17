import { Card, Loader, Table } from "@mantine/core";
import { EmployeeCardUtils } from "~/components/employee-card/employee-card.utils";
import { api } from "~/utils/api";

type Props = {
  id: number;
};

export function EmployeeDepartmentRegistry({ id }: Props) {
  const { isLoading, data } = api.employees.getDepartmentRegistry.useQuery({
    employeeId: id,
  });

  if (isLoading) return <Loader />;

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
              <Table.Th p="md" fw="normal">
                {registry.department.name}
              </Table.Th>
              <Table.Th p="md" fw="normal">
                {EmployeeCardUtils.formatDate(registry.startDate)}
              </Table.Th>
              <Table.Th p="md" fw="normal">
                {(registry.endDate &&
                  EmployeeCardUtils.formatDate(registry.endDate)) ??
                  "Present"}
              </Table.Th>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
