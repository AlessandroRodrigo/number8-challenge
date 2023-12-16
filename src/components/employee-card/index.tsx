import { type inferProcedureOutput } from "@trpc/server";
import Image from "next/image";
import Link from "next/link";
import { EmployeeCardUtils } from "~/components/employee-card/employee-card.utils";
import { type AppRouter } from "~/server/api/root";

type Props = {
  employee: inferProcedureOutput<AppRouter["employees"]["getById"]>;
};

export function EmployeeCard({ employee }: Props) {
  return (
    <div className="flex gap-2 rounded-md border border-gray-200 p-4">
      <div className="overflow-hidden rounded-md">
        <Image
          width={150}
          height={150}
          src="https://via.placeholder.com/150"
          className="object-fill"
          alt="test"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between py-2">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold">{employee.firstName}</span>
          <span className="opacity-75">({employee.department})</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Hire Date</span>
          <span className="text-sm text-gray-700">
            {EmployeeCardUtils.formatDate(employee.hireDate)} (
            {EmployeeCardUtils.timeOfService(employee.hireDate)})
          </span>
        </div>
      </div>

      <div>
        <Link
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          href={`/employees/${employee.id}`}
        >
          View details
        </Link>
      </div>
    </div>
  );
}
