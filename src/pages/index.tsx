import Head from "next/head";
import { EmployeeCard } from "~/components/employee-card";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-auto flex min-h-screen w-6/12 flex-col gap-4 py-6">
        <h1 className="text-left text-4xl font-bold">Employee page</h1>

        <EmployeeList />
      </main>
    </>
  );
}

function EmployeeList() {
  const { isLoading, data } = api.employees.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col gap-2">
      {data?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
