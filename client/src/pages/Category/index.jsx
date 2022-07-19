import { Button, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Loader from "../../components/loader/loader";
import {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
const Category = ({ categoryList }) => {
  const [isModal, setIsModal] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [depInfo, setDepInfo] = useState({
    name: "",
    id: "",
  });
  const [department, setDepartment] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const { loading, categories } = categoryList;

  const addCategoryModal = () => {
    setIsModal(true);
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDepartment({ ...department, [name]: value });
  };

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();
    dispatch(addCategory(department.name));
    alert("Department successfully added");
    window.location.reload();
    // navigate("/home");
    setIsModal(false);
  };

  const editCategoryItem = async (id) => {
    setIsModal(true);
    setEditToggle(true);
    const { data } = await axios.get(`/categories/${id}`);
    setDepartment({
      name: data.data.name,
    });
    setDepInfo({
      name: data.data.name,
      id: data.data._id,
    });
  };

  const updateCategory = (e) => {
    e.preventDefault();
    setIsModal(false);
    setEditToggle(false);
    dispatch(editCategory(depInfo.id, department));
    window.location.reload();
  };

  const deleteSingleCategory = (id) => {
    setDeleteModal(true);
    dispatch(deleteCategory(id));
    window.location.reload();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 270 },
    { field: "name", headerName: "Department Name", width: 270 },
    {
      field: "actions",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Edit"
                onClick={() => editCategoryItem(params.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                onClick={() => {
                  setDeleteModal(true);
                  setDepInfo({
                    name: params.row.name,
                    id: params.id,
                  });
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

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Departments</h1>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addCategoryModal}
        >
          Add Department
        </Button>
      </div>
      {loading && <Loader />}

      <div style={{ height: 450, width: "100%" }}>
        {categories && (
          <DataGrid
            rows={categories}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            getRowId={(row) => row._id}
          />
        )}
      </div>

      {isModal && (
        <Dialog open={isModal}>
          <form onSubmit={onSubmitFormHandler} style={{ padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <input
                type="text"
                value={department.name}
                onChange={inputChangeHandler}
                name="name"
                placeholder="Enter department name"
              />
            </div>
            <DialogActions>
              <Button onClick={() => setIsModal(false)}>Cancel</Button>
              {editToggle ? (
                <Button type="button" onClick={updateCategory}>
                  Update
                </Button>
              ) : (
                <Button type="submit">Add</Button>
              )}
            </DialogActions>
          </form>
        </Dialog>
      )}

      {deleteModal && (
        <Dialog open={deleteModal}>
          <h2>
            Are you sure you want to delete{" "}
            <span style={{ color: "purple" }}>{depInfo.name}</span>?
          </h2>
          <DialogActions>
            <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
            <Button onClick={() => deleteSingleCategory(depInfo.id)}>
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
    categoryList: state.getCategories,
  };
};

export default connect(mapStateToProps)(Category);
