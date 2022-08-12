import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ListIcon from "@mui/icons-material/List";
import CategoryIcon from "@mui/icons-material/Category";
let menuItem = [
  {
    menuName: "Dashboard",
    link: "/home",
    icon: <DashboardIcon />,
  },
  {
    menuName: "Employee",
    icon: <PersonIcon />,
    subMenu: [
      {
        menuName: "Employee List",
        link: "employee-list",
        icon: <ListIcon />,
      },
    ],
  },
  {
    menuName: "Departments",
    link: "/departments",
    icon: <CategoryIcon />,
  },
];

export default menuItem;
