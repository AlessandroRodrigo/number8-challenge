import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useEmployeeQuery } from "~/hooks/use-employee-query";
import { api } from "~/utils/api";

type Props = {
  employeeId: number;
};

export function useUpdateEmployeeDepartment({ employeeId }: Props) {
  const employeeQuery = useEmployeeQuery({ employeeId });
  const [department, setDepartment] = useState("");
  const departmentHasChanged =
    department === employeeQuery.data?.department.id.toString();

  useEffect(() => {
    if (!employeeQuery.data) return;

    setDepartment(employeeQuery.data.department.id.toString());
  }, [employeeQuery.data]);

  const updateEmployeeMutation = api.employees.update.useMutation({
    onSuccess() {
      void employeeQuery.refetch();
    },
  });

  async function updateEmployeeDepartment() {
    if (!employeeQuery.data) return;

    await updateEmployeeMutation.mutateAsync({
      id: employeeQuery.data.id,
      departmentId: Number(department),
    });

    notifications.show({
      title: "Department updated",
      message: `${employeeQuery.data.fullName}'s department has been updated`,
    });
  }

  return {
    department,
    departmentHasChanged,
    updateEmployeeDepartment,
    setDepartment,
    isUpdating: updateEmployeeMutation.isLoading,
  };
}
