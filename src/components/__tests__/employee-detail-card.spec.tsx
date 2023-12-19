import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, vi } from "vitest";
import { EmployeeDetailCard } from "~/components/employee-detail-card";
import { EmployeeDetailContext } from "~/contexts/employee-detail.context";

vi.mock("../../utils/api.ts", async () => {
  return {
    api: {
      departments: {
        getAll: {
          useQuery: async () => ({
            data: [
              {
                id: 1,
                name: "Engineering",
              },
              {
                id: 2,
                name: "Sales",
              },
            ],
            isLoading: false,
          }),
        },
      },
    },
  };
});

describe("EmployeeDetailCard", () => {
  const mockHandleDepartmentChange = vi.fn();
  const mockHandleToggleStatus = vi.fn();

  beforeEach(() => {
    render(
      <MantineProvider>
        <EmployeeDetailContext.Provider
          value={{
            employeeQuery: {
              data: {
                id: 1,
                address: "123 Main St",
                department: {
                  id: 1,
                  name: "Engineering",
                },
                firstName: "John",
                fullName: "John Doe",
                hireDate: new Date(),
                lastName: "Doe",
                phone: "1234567890",
                status: "active",
              },
              isError: false,
              isLoading: false,
              refetch: vi.fn(),
            },
            departmentRegistryQuery: {
              data: [
                {
                  department: {
                    id: 1,
                    name: "Engineering",
                  },
                  endDate: null,
                  startDate: new Date(),
                },
              ],
              isError: false,
              isLoading: false,
              refetch: vi.fn(),
            },
            updateEmployeeDepartment: {
              department: "1",
              departmentHasChanged: false,
              isUpdating: false,
              setDepartment: vi.fn(),
              updateEmployeeDepartment: mockHandleDepartmentChange,
            },
            updateEmployeeStatus: {
              isUpdating: false,
              toggleStatus: mockHandleToggleStatus,
            },
          }}
        >
          <EmployeeDetailCard />
        </EmployeeDetailContext.Provider>
      </MantineProvider>,
    );
  });

  it("renders employee details correctly", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Employee ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Department: Engineering")).toBeInTheDocument();
    expect(screen.getByText("Telephone: 1234567890")).toBeInTheDocument();
    expect(screen.getByText("Address: 123 Main St")).toBeInTheDocument();
  });

  it("calls handleDepartmentChange when Update button is clicked", () => {
    fireEvent.click(screen.getByText("Update"));
    expect(mockHandleDepartmentChange).toHaveBeenCalled();
  });

  it("calls handleToggleStatus when Activate/Deactivate button is clicked", () => {
    fireEvent.click(screen.getByText("Deactivate"));
    expect(mockHandleToggleStatus).toHaveBeenCalled();
  });
});
