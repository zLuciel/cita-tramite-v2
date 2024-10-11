import { MultiSelect, Group, Text, Badge } from "@mantine/core";
import { useState } from "react";

const renderMultiSelectOption = ({ option }) => {
  return (
    <div
      className="flex gap-3 justify-center items-center"
      gap="sm"
    >
      <Badge fullWidth color="red">
        2000
      </Badge>
      <p
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        size="xs"
        opacity={0.5}
      >
        {option.label}
      </p>
    </div>
  );
};

function SelectAsing({ dataSelect, handleSectionAsing, selectValue, idUser }) {

  return (
    <MultiSelect
      data={dataSelect}
      renderOption={(value) => renderMultiSelectOption(value)}
      maxDropdownHeight={300}
      value={selectValue}
      comboboxProps={{ withinPortal: false }}
      onChange={(value) => handleSectionAsing(value, idUser)}
      hidePickedOptions
      placeholder="Eliga la sección"
    />
  );
}
export default SelectAsing;
