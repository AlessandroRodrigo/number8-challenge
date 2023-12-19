import { createContext, useEffect, type PropsWithChildren } from "react";
import { useEmployeeDepartmentRegistryQuery } from "~/hooks/use-employee-department-registry-query";
import { useEmployeeQuery } from "~/hooks/use-employee-query";
import { useUpdateEmployeeDepartment } from "~/hooks/use-update-employee-department";
import { useUpdateEmployeeStatus } from "~/hooks/use-update-employee-status";

type EmployeeDetailContextProps = {
  employeeQuery: ReturnType<typeof useEmployeeQuery>;
  departmentRegistryQuery: ReturnType<
    typeof useEmployeeDepartmentRegistryQuery
  >;
  updateEmployeeDepartment: ReturnType<typeof useUpdateEmployeeDepartment>;
  updateEmployeeStatus: ReturnType<typeof useUpdateEmployeeStatus>;
} | null;

export const EmployeeDetailContext =
  createContext<EmployeeDetailContextProps>(null);

type ProviderProps = {
  id: number;
};

export function EmployeeDetailProvider({
  children,
  id,
}: PropsWithChildren<ProviderProps>) {
  const employeeQuery = useEmployeeQuery({
    employeeId: id,
  });
  const updateEmployeeDepartment = useUpdateEmployeeDepartment({
    employeeId: id,
  });
  const departmentRegistryQuery = useEmployeeDepartmentRegistryQuery({
    employeeId: id,
  });
  const updateEmployeeStatus = useUpdateEmployeeStatus({
    employeeId: id,
  });

  useEffect(() => {
    void departmentRegistryQuery.refetch();
  }, [employeeQuery.data]);

  return (
    <EmployeeDetailContext.Provider
      value={{
        employeeQuery,
        updateEmployeeDepartment,
        departmentRegistryQuery,
        updateEmployeeStatus,
      }}
    >
      {children}
    </EmployeeDetailContext.Provider>
  );
}
