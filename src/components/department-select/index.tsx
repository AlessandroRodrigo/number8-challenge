import { Loader, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { api } from "~/utils/api";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export function DepartmentSelect({ value, onChange }: Props) {
  const { isLoading, data } = api.departments.getAll.useQuery(undefined, {
    onError() {
      notifications.show({
        title: "Error",
        message: "Failed to load departments",
        color: "red",
      });
    },
  });

  if (isLoading) return <Loader />;

  return (
    <Select
      label="Select a department"
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
