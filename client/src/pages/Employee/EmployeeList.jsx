import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../redux/actions/userActions";
import { useEffect } from "react";
import Loader from "../../components/loader/loader";
// import Modal from "./modal";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

const EmployeeList = ({ userList }) => {
  const [isModal, setIsModal] = useState(false);
  const [rowId, setRowId] = useState({
    name: "",
    id: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewUser = (id) => {
    navigate(`/${id}`);
  };

  const editUser = (id) => {
    navigate(`/edit/${id}`);
  };

  const deleteSingleUser = (id) => {
    // setModal(true)
    dispatch(deleteUser(id));
    window.location.reload();
  };
  const columns = [
    { field: "_id", headerName: "ID", hide: true },
    {
      field: "pic",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <Avatar alt={params.row.name} src={params.row.pic} />
          </div>
        );
      },
    },
    { field: "name", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "joiningDate", headerName: "Joining Date", width: 330 },
    {
      field: "actions",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="delete"
                onClick={() => viewUser(params.id)}
              >
                <RemoveRedEyeIcon />
              </IconButton>
              <IconButton aria-label="Edit" onClick={() => editUser(params.id)}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setRowId({
                    name: params.row.name,
                    id: params.id,
                  });
                  setIsModal(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </div>
        );
      },
    },
  ];
  const { loading, users } = userList;

  const filteredUser =
    users &&
    users.filter((user) => {
      return user.isAdmin !== true;
    });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      <div className="d-flex justify-content-between align-items-center px-15px">
        <h3>Users</h3>
        <Button
          component={Link}
          to="/add"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add User
        </Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        {users && (
          <DataGrid
            rows={filteredUser}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
          />
        )}
      </div>
      {isModal && (
        <Dialog open={isModal}>
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By clicking on the Confirm button, You will remove the user{" "}
              <span style={{ color: "purple" }}>{rowId.name}</span> from the
              database.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsModal(false)}>cancel</Button>
            <Button onClick={() => deleteSingleUser(rowId.id)} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.getUsers,
  };
};

export default connect(mapStateToProps)(EmployeeList);
