import React from "react";
import { Spinner } from "reactstrap";

/**
 * Creates loading component with three cyan dots
 */
export default function Loading() {
  return (
    <div
      className="loading-spinner my-4"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner type="grow" color="info" size="sm" />
      <Spinner className="mx-3" type="grow" color="info" />
      <Spinner type="grow" color="info" size="sm" />
    </div>
  );
}
