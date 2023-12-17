import { useContext } from "react";
import { EmployeeDetailContext } from "~/contexts/employee-detail.context";

export function useEmployeeDetailContext() {
  const context = useContext(EmployeeDetailContext);

  if (!context) {
    throw new Error(
      "useEmployeeDetailContext must be used within a EmployeeDetailProvider",
    );
  }

  return context;
}
