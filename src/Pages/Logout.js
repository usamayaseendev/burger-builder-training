import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

const Logout = (props) => {
  const { user } = props;

  useEffect(() => {
    localStorage.clear();
    console.log("local storage cleared");
    window.location.href = "/ ";
  }, []);

  return <></>;
};

export default Logout;
