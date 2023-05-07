import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data } = useFetch(
    `${path === "flights" ? "http://localhost:8080/api/flights" : "/" + path}`
  );

  useEffect(() => {
    if (path === "flights") {
      const newData = data.map((item) => {
        return {
          ...item,
          _id: item.flight_number,
        };
      });
      console.log(newData);
      setList(newData);
    } else {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) {
      return;
    }

    try {
      if (path === "flights") {
        await axios.delete(`http://localhost:8080/api/flights/delete/${id}`);
        console.log("Flight deleted");
      } else {
        await axios.delete(`/${path}/${id}`);
        console.log(`${path} Flight deleted`);
      }

      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}> */}
            <div className="viewButton">View</div>
            {/* </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div style={{ fontWeight: "700", marginLeft: "1rem" }}>
          {path.toUpperCase()}
        </div>
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list ? list : []}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
