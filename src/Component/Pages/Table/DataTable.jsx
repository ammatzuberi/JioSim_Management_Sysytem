import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SearchTable } from "./Search/Search";
import { Button, Grid, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "./DataTable.module.css";
import AddIcon from "@mui/icons-material/Add";
import { MDBDataTable } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export default function DataTable(props) {
  const [simData, setSimData] = React.useState([]);
  const getSimData = async () => {
    const url = "http://localhost:5000/ene/sim/All/";

    try {
      const response = await axios.get(url);

      setSimData(response.data);
    } catch (error) {
      console.log("Error While Fetching Data", error);
    }
  };

  React.useEffect(() => {
    getSimData();
  }, []);

  const navigate = useNavigate();
  // const { sim } = props.getSim;
  // console.log(sim);

  var columns = [
    {
      label: "Company Name",
      field: "companyName",
    },
    {
      label: "Client Name",
      field: "clientName",
    },

    {
      label: "ICCID",
      field: "ICCID",
    },
    {
      label: "IMSI",
      field: "IMSI",
    },
    {
      label: "Location",
      field: "location",
    },

    {
      label: "Edit",
      field: "Edit",
    },
    {
      label: "Delete",
      field: "Delete",
    },
  ];
  // console.log(sim);

  // console.log(proRef.current.map((item)=>));

  React.useEffect(() => {}, [props]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:3000/ene/sim/remove/${id}`;
        axios
          .delete(url)
          .then((response) => {
            console.log("Delete successful", response.data);
          })
          .catch((error) => {
            console.log("error", error);
          });

        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          () => {
            navigate("/");
          }
        );
      }
    });
  };
  console.log(simData);
  const { sim } = simData;
  var rows =
    sim?.map((row) => ({
      clientName: row?.clientName,
      companyName: row?.companyName,

      IMSI: row?.IMSI,
      ICCID: row?.ICCID,
      location: row?.location,
      Edit: (
        <Link to={"/Edit/" + row.idsim} style={{ color: "#6366f1" }}>
          <EditIcon />
        </Link>
      ),
      Delete: (
        <button
          onClick={() => handleDelete(row.idsim)}
          style={{ border: "none" }}
        >
          <DeleteForeverIcon style={{ color: "red" }} />
        </button>
      ),
    })) || [];
  const tableData = {
    columns,
    rows,
  };

  return (
    <>
      <Grid container justifyContent="space-between" marginBottom="1rem">
        <Grid item>
          <Typography
            sx={{
              color: "#111927",
              fontWeight: 800,
              fontSize: 30,
              fontFamily: " Plus Jakarta Sans sans-serif",
              marginLeft: ".5rem",
            }}
          >
            Sim Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/form">
            <button className={classes.button}>
              <AddIcon />
              Add
            </button>
          </Link>
        </Grid>
      </Grid>

      {/* <SearchTable /> */}
      <div
        className={classes.tableContainer}
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        {/* <DataGrid
          getRowId={(row) => row.idsim}
          columns={columns}
          editMode="row"
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          // checkboxSelection
        /> */}
        <MDBDataTable
          data={tableData}
          noBottomColumns
          striped
          borderless
          fontFamil
          sortable
          scrollX
          scrollY
        />
      </div>
    </>
  );
}
