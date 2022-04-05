import React from "react";

const editIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
  </svg>
);

const table2 = () => {
  const data = [
    {
      process: "Francine Holmes",
      modules: "Module 1",
      createdOn: "14/3/1965",
      status: "Active",
      action: "",
    },
    {
      process: "Vincent Pierce",
      modules: "Module 2",
      createdOn: "15/5/1984",
      status: "Active",
      action: "hai",
    },
    {
      process: "Francine Holmes",
      modules: "Module 3",
      createdOn: "14/3/1965",
      status: "Active",
      action: "hai",
    },
    {
      process: "Vincent Pierce",
      modules: "Module 4",
      createdOn: "15/5/1984",
      status: "Inactive",
      action: "hai",
    },
    {
      process: "Francine Holmes",
      modules: "Module 4",
      createdOn: "14/3/1965",
      status: "Active",
      action: "hai",
    },
    {
      process: "Vincent Pierce",
      modules: "Module 5",
      createdOn: "15/5/1984",
      status: "Active",
      action: "hai",
    },
    {
      process: "Francine Holmes",
      modules: "Module 5",
      createdOn: "14/3/1965",
      status: "Inactive",
      action: "hai",
    },
  ];
  return (
    <div>
      <table className="bg-[#ffffff] text-[#333333] text-sm w-100">
        <tr className="font-medium bg-[#ffffff] text-[#013453] text-base border-b-4 border-[#F6FAFB]">
          <th className="font-medium pl-5 py-3 border-[#F6FAFB] border-r-2">Process</th>
          <th className="font-medium pl-5 py-3 border-[#F6FAFB] border-r-2">Modules</th>
          <th className="font-medium pl-5 py-3 border-[#F6FAFB] border-r-2">Created on</th>
          <th className="font-medium pl-5 py-3 border-[#F6FAFB] border-r-2">Status</th>
          <th className="font-medium pl-5 py-3 border-[#F6FAFB] border-r-2">Action</th>
        </tr>
        {data.map((object) => (
          <tr className="font-medium bg-[#ffffff] text-[#3D3D3D] text-sm border-b-4 border-[#F6FAFB]">
            <td className="pl-5 py-2.5 border-[#F6FAFB] border-r-2">{object.process}</td>
            <td className="text-[#86A1A4] pl-5 py-2.5 border-[#F6FAFB] border-r-2">{object.modules}</td>
            <td className="text-[#86A1A4] pl-5 py-2.5 border-[#F6FAFB] border-r-2">{object.createdOn}</td>
            <td className={object.status === "Active" ? "text-[#74D1D8] pl-5 py-2.5 border-[#F6FAFB] border-r-2" : "border-[#F6FAFB] pl-5 py-2.5 border-r-2"}>{object.status}</td>
            <td className={object.status === "Active" ? "text-[#74D1D8] pl-5 py-2.5 border-[#F6FAFB] border-r-2" : "text-[#9193A2] pl-5 py-2.5 border-[#F6FAFB] border-r-2"}>
              {editIcon}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default table2;
