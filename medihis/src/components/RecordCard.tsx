import { useState } from "react";

import type { ClinicalRecord } from "../models/ClinicalRecord";

export function RecordListItem({
  record,
  onClick,
}: {
  record: ClinicalRecord;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const date = new Date(record.date);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        background: hovered ? "var(--teal-light)" : "#fff",
        border: `1.5px solid ${hovered ? "var(--teal)" : "var(--border)"}`,
        borderRadius: 10,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        fontFamily: "inherit",
        width: "100%",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          background: "var(--teal-light)",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 700, color: "var(--teal)", lineHeight: 1 }}>
          {isNaN(date.getDate()) ? "--" : date.getDate()}
        </span>
        <span style={{ fontSize: 10, color: "var(--teal)", fontWeight: 600 }}>
          {isNaN(date.getDate()) ? "" : date.toLocaleString("es-CO", { month: "short" }).toUpperCase()}
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 2 }}>
          {record.patientName}
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>
          Doc: {record.patientDocument}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--navy)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {record.chiefComplaint}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>
          {record.createdByName}
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}
