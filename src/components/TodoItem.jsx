import React, { useState } from "react";
import styled from "@emotion/styled";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  padding: 16,
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

export const TodoItem = ({
  id,
  label,
  checked = false,
  createdAt = "NAN",
  completedAt = "NAN",
  onChange,
  setTodos,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsHovered(false);
        }
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ background: "white", marginBottom: 8, width: "80%" }}>
        <Wrapper>
          <Checkbox
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <Label checked={checked}>{label}</Label>
        </Wrapper>
        <p
          style={{
            padding: "5px 16px",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        >
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <span>Created at</span>
            <span>:</span>
            <span>{createdAt}</span>
          </span>
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Completed at</span>
            <span>:</span>
            <span>{completedAt}</span>
          </span>
        </p>
      </div>
      {isHovered && (
        <button
          style={{
            padding: "7px",
            fontSize: "16px",
            border: "none",
            background: "white",
            color: "red",
            cursor: "pointer",
          }}
          onMouseOver={(e) => e.stopPropagation()}
          onMouseOut={(e) => e.stopPropagation()}
          onClick={() => {
            setTodos((todos) => todos.filter((todo) => todo.id !== id));
          }}
        >
          X
        </button>
      )}
    </div>
  );
};
