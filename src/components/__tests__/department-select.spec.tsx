import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DepartmentSelect } from "~/components/department-select";

vi.mock("~/utils/api", async () => {
  return {
    api: {
      departments: {
        getAll: {
          useQuery: async () => {
            return {
              isLoading: false,
              data: [
                {
                  id: 1,
                  name: "IT",
                },
              ],
            };
          },
        },
      },
    },
  };
});

describe("DepartmentSelect component", () => {
  beforeEach(() => {
    render(
      <MantineProvider>
        <DepartmentSelect />
      </MantineProvider>,
    );
  });

  it("should show department select", () => {
    const expected = screen.getByTestId("department-select");

    expect(expected).not.toBeNull();
  });

  it("should show department select label", () => {
    const expected = screen.getByText("Select a department");

    expect(expected).not.toBeNull();
  });
});
