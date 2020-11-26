import React from "react";
import { Spinner } from "reactstrap";

export default function Loading() {
  return (
    <div
      className="loading-spinner my-4"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Spinner type="grow" color="info" size="sm" />
      <Spinner className="mx-3" type="grow" color="info" />
      <Spinner type="grow" color="info" size="sm" />
    </div>
  );
}
