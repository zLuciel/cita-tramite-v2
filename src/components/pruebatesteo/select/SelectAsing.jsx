import { MultiSelect, Group, Text, Badge } from "@mantine/core";
import { useState } from "react";

const renderMultiSelectOption = ({ option }) => {
  console.log(option, "viendo si hay");

  // Filtramos por status que sea "CORREGIDO" o "COMPLETO"
  const sumando = option?.statusCounts
    .filter((item) => item.status === "CORREGIDO" || item.status === "COMPLETO")
    .reduce((sum, item) => sum + parseInt(parseInt(item.count), 10), 0); 
  return (
    <div className="flex gap-3 justify-center items-center" gap="sm">
      <Badge fullWidth color="red">
        {sumando}
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
