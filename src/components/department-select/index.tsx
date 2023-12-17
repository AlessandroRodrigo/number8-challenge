import { Loader, Select } from "@mantine/core";
import { api } from "~/utils/api";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export function DepartmentSelect({ value, onChange }: Props) {
  const { isLoading, data } = api.departments.getAll.useQuery();

  if (isLoading) return <Loader />;

  return (
    <Select
      value={value}
      onChange={(value) => {
        if (!value) return;
        onChange?.(value);
      }}
      data={
        data?.map((department) => ({
          value: department.id.toString(),
          label: department.name,
        })) ?? []
      }
    />
  );
}
