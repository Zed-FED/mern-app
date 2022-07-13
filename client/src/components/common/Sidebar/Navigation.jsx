import {useState} from 'react'
import menuItem from "./menuItems";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Navigation = () => {
	return (
	  <div className="nav">
	  	<ul>
            {menuItem.map((menu, index) => {
              return (
                <li key={index}>
                  <MenuItem menu={menu} />
                </li>
              );
            })}
          </ul>
	  </div>	
	)

	
}

const MenuItem = ({ menu }) => {
	  const [dropDown, setDropDown] = useState(false);
	  return (
	    <>
	      {/* {!menu.subMenu && (<a href="#">{menu.menuName}</a>)} */}
	      <div onClick={() => menu.subMenu ? setDropDown(!dropDown) : null} className={menu.subMenu ? "has-dropdown" : null}>
	      	
	      	{menu.subMenu ? menu.menuName : <Link to={menu.link}>{menu.menuName}</Link>}
	      	{menu.subMenu ? <KeyboardArrowDownIcon className="dd-icon" /> : null}

	      </div>
	      {/* {menu.subMenu && dropDown ? (
	        <SubMenu dropdown={menu.subMenu} />
	      ) : (
	        <button>{menu.menuName}</button>
	      )} */}
	      {menu.subMenu && dropDown && <SubMenu dropdown={menu.subMenu} />}
	    </>
	  );
	};

	const SubMenu = ({ dropdown }) => {
	  return (
	    <div className="dropdown">
	      <ul>
	        {dropdown.map((item, index) => {
	          return <li key={index}><Link to={item.link}>{item.menuName}</Link></li>;
	        })}
	      </ul>
	    </div>
	  );
	};

export default Navigation;