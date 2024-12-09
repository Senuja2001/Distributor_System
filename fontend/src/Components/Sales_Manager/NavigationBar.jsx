import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesReportTemplate from "./SalesReportTemplate";

export const NavigationBar = () => {
  return (
    <div className="fixed w-full text-white">
      <nav
        className="p-4 flex justify-between items-center"
        style={{ backgroundColor: "#092143" }}
      >
        <div>
          <h1 className="text-lg font-bold">Distributor Management System</h1>
        </div>
        <div className="text-right">
          <p>Welcome W A A A U WIJESINGHE</p>
          <p>Last login 15/07/2024 13:58:22</p>
        </div>
      </nav>
    </div>
  );
};
