import { notifications } from "@mantine/notifications";
import { useEmployeeQuery } from "~/hooks/use-employee-query";
import { api } from "~/utils/api";

type Props = {
  employeeId: number;
};

export function useUpdateEmployeeStatus({ employeeId }: Props) {
  const employeeQuery = useEmployeeQuery({ employeeId });

  const updateEmployeeMutation = api.employees.update.useMutation({
    onSuccess() {
      void employeeQuery.refetch();
    },
  });

  async function toggleStatus() {
    if (!employeeQuery.data) return;

    await updateEmployeeMutation.mutateAsync({
      id: employeeQuery.data.id,
      status: employeeQuery.data.status === "active" ? "inactive" : "active",
    });

    notifications.show({
      title: "Employee status updated",
      message: `${employeeQuery.data.fullName}'s status has been updated`,
    });
  }

  return {
    toggleStatus,
    isUpdating: updateEmployeeMutation.isLoading,
  };
}
