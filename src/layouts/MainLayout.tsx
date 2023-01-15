import axios from "axios";
import React, { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

export default function MainLayout(props: Props) {
  const { children } = props;
  const handleCookie = async () => {
    await axios.get("/api/cookie");
  };

  useEffect(() => {
    handleCookie();
  }, []);
  return (
    <div className="grid grid-cols-11 h-screen">
      <Sidebar />

      {children}
    </div>
  );
}
