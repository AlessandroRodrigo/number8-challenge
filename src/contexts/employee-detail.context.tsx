import { notifications } from "@mantine/notifications";
import { createContext, useState, type PropsWithChildren } from "react";
import { api } from "~/utils/api";

type EmployeeDetailContextProps = {
  department: string;
  employee: {
    fullName: string;
    data:
      | {
          id: number;
          firstName: string;
          lastName: string;
          department: {
            id: number;
            name: string;
          };
          phone: string;
          address: string;
          hireDate: Date;
          status: string;
        }
      | undefined;
    isLoading: boolean;
  };
  departmentRegistry: {
    data:
      | {
          department: {
            id: number;
            name: string;
          };
          startDate: Date;
          endDate: Date | null;
        }[]
      | undefined;
    isLoading: boolean;
  };
  departmentHasChanged: boolean;
  isUpdating: boolean;

  setDepartment: (value: string) => void;
  handleDepartmentChange: () => Promise<void>;
  handleToggleStatus: () => Promise<void>;
};

export const EmployeeDetailContext = createContext<EmployeeDetailContextProps>({
  department: "",
  employee: {
    fullName: "",
    data: undefined,
    isLoading: false,
  },
  departmentRegistry: {
    data: undefined,
    isLoading: false,
  },
  departmentHasChanged: false,
  isUpdating: false,

  setDepartment: () => {
    return;
  },
  handleDepartmentChange: async () => {
    return;
  },
  handleToggleStatus: async () => {
    return;
  },
});

type ProviderProps = {
  id: number;
};

export function EmployeeDetailProvider({
  children,
  id,
}: PropsWithChildren<ProviderProps>) {
  const [department, setDepartment] = useState("");

  const employeeQuery = api.employees.getById.useQuery(
    {
      id,
    },
    {
      enabled: !!id,
      onSuccess(data) {
        setDepartment(data.department.id.toString());
      },
    },
  );
  const departmentRegistryQuery = api.employees.getDepartmentRegistry.useQuery({
    employeeId: id,
  });

  const departmentHasChanged =
    department === employeeQuery.data?.department.id.toString();
  const fullName = `${employeeQuery.data?.firstName} ${employeeQuery.data?.lastName}`;

  const updateEmployeeMutation = api.employees.update.useMutation({
    onSuccess() {
      if (!employeeQuery.data?.id) return;

      void employeeQuery.refetch();
      void departmentRegistryQuery.refetch();
    },
  });

  async function handleDepartmentChange() {
    if (!employeeQuery.data) return;

    await updateEmployeeMutation.mutateAsync({
      id: employeeQuery.data.id,
      departmentId: Number(department),
    });

    notifications.show({
      title: "Department updated",
      message: `${fullName}'s department has been updated`,
    });
  }

  async function handleToggleStatus() {
    if (!employeeQuery.data) return;

    await updateEmployeeMutation.mutateAsync({
      id: employeeQuery.data.id,
      status: employeeQuery.data.status === "active" ? "inactive" : "active",
    });

    notifications.show({
      title: "Employee status updated",
      message: `${fullName}'s status has been updated`,
    });
  }

  return (
    <EmployeeDetailContext.Provider
      value={{
        department,
        employee: {
          fullName,
          data: employeeQuery.data,
          isLoading: employeeQuery.isLoading,
        },
        departmentRegistry: {
          data: departmentRegistryQuery.data,
          isLoading: departmentRegistryQuery.isLoading,
        },
        departmentHasChanged,
        isUpdating: updateEmployeeMutation.isLoading,

        setDepartment,
        handleDepartmentChange,
        handleToggleStatus,
      }}
    >
      {children}
    </EmployeeDetailContext.Provider>
  );
}
