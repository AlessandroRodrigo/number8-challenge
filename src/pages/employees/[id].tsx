import { Button } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { EmployeeCardUtils } from "~/components/employee-card/employee-card.utils";
import { api } from "~/utils/api";

export default function EmployeeDetails() {
  const [currentDepartment, setCurrentDepartment] = useState("");
  const { query } = useRouter();

  const { isLoading, data } = api.employees.getById.useQuery(
    {
      id: Number(query.id),
    },
    {
      enabled: !!query.id,
      onSuccess: (data) => {
        if (!data.department) return;
        setCurrentDepartment(data.department.id.toString());
      },
    },
  );

  const { isLoading: isUpdating, mutateAsync: updateDepartment } =
    api.employees.updateDepartment.useMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Employee Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-auto flex min-h-screen w-6/12 flex-col gap-4 py-6">
        <h1 className="text-left text-4xl font-bold">Employee Details page</h1>

        <div className="flex gap-4 rounded-md border border-gray-200 p-4">
          <div className="overflow-hidden rounded-md">
            <Image
              width={300}
              height={300}
              src="https://via.placeholder.com/500"
              className="object-fill"
              alt="test"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold">
              {data?.firstName} {data?.lastName}
            </h2>

            <div className="flex flex-col text-sm text-gray-700">
              <span>Employee ID: {data?.id}</span>
              <span>Department: {data?.department?.name}</span>
              <span>Telephone: {data?.phone}</span>
              <span>Address: {data?.address}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span>Update department</span>
              <DepartmentSelect
                value={currentDepartment}
                onChange={(value) => setCurrentDepartment(value)}
              />
              <Button
                onClick={() =>
                  updateDepartment({
                    id: Number(query.id),
                    departmentId: Number(currentDepartment),
                  })
                }
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>

          <div className="ml-auto flex flex-col">
            <h2>Hire Date</h2>

            <div className="flex flex-col">
              <span className="text-sm text-gray-700">
                {EmployeeCardUtils.formatDate(data?.hireDate)}
              </span>
              <span>({EmployeeCardUtils.timeOfService(data?.hireDate)})</span>

              <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

type DepartmentSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
};

function DepartmentSelect({ value, onChange }: DepartmentSelectProps) {
  const { isLoading, data } = api.departments.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <select
      className="rounded border border-gray-200 px-2 py-1"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {data?.map((department) => (
        <option key={department.id} value={department.id}>
          {department.name}
        </option>
      ))}
    </select>
  );
}
