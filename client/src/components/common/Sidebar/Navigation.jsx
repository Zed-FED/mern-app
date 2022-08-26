import { useState } from "react";
import menuItem from "./menuItems";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const Navigation = ({ resetToggle }) => {
  return (
    <div className="nav">
      <ul>
        {menuItem.map((menu, index) => {
          return (
            <li key={index}>
              <MenuItem menu={menu} resetToggle={resetToggle} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const MenuItem = ({ menu, resetToggle }) => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <>
      <div
        onClick={() => (menu.subMenu ? setDropDown(!dropDown) : null)}
        className={menu.subMenu ? "has-dropdown" : null}
      >
        {menu.subMenu ? (
          <>
            <span className="icon">{menu.icon}</span>
            {menu.menuName}
          </>
        ) : (
          <Link to={menu.link} onClick={resetToggle}>
            <span className="icon">{menu.icon}</span>
            {menu.menuName}
          </Link>
        )}
        {menu.subMenu ? <KeyboardArrowDownIcon className="dd-icon" /> : null}
      </div>
      {menu.subMenu && dropDown && (
        <SubMenu dropdown={menu.subMenu} resetToggle={resetToggle} />
      )}
    </>
  );
};

const SubMenu = ({ dropdown, resetToggle }) => {
  return (
    <div className="dropdown">
      <ul>
        {dropdown.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.link} onClick={resetToggle}>
                <span className="icon">{item.icon}</span>
                {item.menuName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
