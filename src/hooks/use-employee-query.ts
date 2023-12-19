import { api } from "~/utils/api";

type Props = {
  employeeId: number;
};

export function useEmployeeQuery({ employeeId }: Props) {
  const { data, isError, isLoading, refetch } = api.employees.getById.useQuery(
    {
      id: employeeId,
    },
    {
      enabled: !!employeeId,
      select(data) {
        return {
          ...data,
          fullName: `${data.firstName} ${data.lastName}`,
        };
      },
    },
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
}
