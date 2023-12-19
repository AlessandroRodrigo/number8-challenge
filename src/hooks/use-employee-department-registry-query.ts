import { api } from "~/utils/api";

type Props = {
  employeeId: number;
};

export function useEmployeeDepartmentRegistryQuery({ employeeId }: Props) {
  const { data, isLoading, isError, refetch } =
    api.employees.getDepartmentRegistry.useQuery({
      employeeId,
    });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
