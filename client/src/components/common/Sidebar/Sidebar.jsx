import Navigation from './Navigation';
import Box from '@mui/material/Box';

const SideBar = () => {
	return (
	  <Box component="aside" className="sidebar-container" bgcolor="primary.main" color="white.main">
	  	<div style={{
	  		height: '64px',
	  		display: 'flex',
	  		alignItems: 'center',
	  		justifyContent: 'center',
	  		fontSize: '2rem',
	  		borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
	  	}}>
	  		Logo
	  	</div>
	  	<Navigation />
	  </Box>	
	)

	
}

export default SideBar;