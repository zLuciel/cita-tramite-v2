import React, { useState } from "react";
import { FileInput, Pill, ActionIcon } from "@mantine/core";

const ValueComponent = ({ value, onRemove }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>
            {file.name}
            <ActionIcon
              onClick={(e) => {
                e.stopPropagation(); // Evitar que se abra el selector
                onRemove(index);
              }}
              style={{ marginLeft: 8 }}
            >
              x
            </ActionIcon>
          </Pill>
        ))}
      </Pill.Group>
    );
  }

  return (
    <Pill>
      {value.name}
      <ActionIcon
        onClick={(e) => {
          e.stopPropagation(); // Evitar que se abra el selector
          onRemove(0);
        }}
        style={{ marginLeft: 8 }}
      >
        x
      </ActionIcon>
    </Pill>
  );
};

function ModalPdf({name}) {
  const [files, setFiles] = useState([]);
  
  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FileInput
      label="Upload files"
      placeholder="Upload files"
      multiple
      value={files}
      onChange={handleFileChange}
      valueComponent={({ value }) => (
        <ValueComponent value={value} onRemove={handleRemoveFile} />
      )}
    />
  );
}

export default ModalPdf;
