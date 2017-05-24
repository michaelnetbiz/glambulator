// @flow
import React from "react";

const NullMessage = (params: Object) => {
  return (
    <div
      children={`No ${params.value}.`}
      className="messages"
    />
  );
};

export default NullMessage;
