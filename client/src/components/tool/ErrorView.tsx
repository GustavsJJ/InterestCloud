import React from "react";

/**
 * Creates Error View
 * @param firstLine String for first line of the error view
 * @param secoundLine String for secound line of the error view
 * @param description String for further description of the error
 */
export default function ErrorView(
  firstLine: string,
  secoundLine?: string,
  description?: string
) {
  return (
    <div
      className="m-5"
      style={{ color: "white", textAlign: "center", alignItems: "center" }}
    >
      <h1>{firstLine}</h1>
      {secoundLine && <h1>{secoundLine}</h1>}
      {description && <p style={{ textAlign: "justify" }}>{description}</p>}
    </div>
  );
}
