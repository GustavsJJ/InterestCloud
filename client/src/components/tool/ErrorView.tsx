import React from "react";

export default function ErrorView(
  firstLine: string,
  secoundLine?: string,
  description?: string
) {
  return (
    <div className="m-5">
      <h1>{firstLine}</h1>
      {secoundLine && <h1>{secoundLine}</h1>}
      {description && <p style={{ textAlign: "justify" }}>{description}</p>}
    </div>
  );
}
