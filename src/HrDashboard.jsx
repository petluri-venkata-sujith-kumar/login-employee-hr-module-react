import React, { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Avatar, MenuItem, Menu, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, Outlet } from 'react-router-dom';

const HrDashboard = () => {
  // const location = useLocation();
  const userId=window.localStorage.getItem("userId")

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [batchesOpen, setBatchesOpen] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleBatchesToggle = () => {
    setBatchesOpen(!batchesOpen);
  };
  
  const handleLogout=()=>{
    window.localStorage.removeItem("userId")
    window.location.assign("/")
  }

  return (
  <div className='dashboard'>
    <div className='custom-modal-backdrop'>
      {/* ---------------------- */}
        <div position="static" >
          <Toolbar className='icons'>
            <IconButton edge="start" color="inherit" onClick={handleSidebarToggle}>
              <MenuIcon />
            </IconButton>
            <IconButton className='logout' color='inherit' onClick={handleLogout} style={{fontSize:"16px"}}>
              <ExitToAppIcon/>
            </IconButton>
          </Toolbar>
        </div>
      {/* --------------------   */}
          <Drawer variant="persistent" open={sidebarOpen} onClose={handleSidebarToggle} PaperProps={{
            style: {
            width: "16%", background: "#bdbdbd", backgroundImage: "url('https://cdn.wallpapersafari.com/67/61/AQ4KIj.png')", backgroundSize: "cover",
            backgroundRepeat: 'no-repeat'}
          }} >
          
          <List className='text-slate-300' >

             <ListItem >
              <img src='./alpha-logo-1.png' alt="Logo" style={{ width: '39px', height: '39px' }} className='mr-3' />
              <p className='font-black text-alpha-color font-auto'>ALPHA TEAM</p>
             </ListItem>
            <hr style={{ margin: '0px 20px', borderColor: 'rgb(30 30 30 / 22%)' }} />
            <div className='mt-4 '>
               <ListItem component={Link}  to={`/hrdashboard/myprofile/${userId}`}  className="profile-list-item"  style={{ position: 'relative' }}>
                <PermIdentityIcon className='mr-2' />
                <ListItemText primary="My Profile" className='profile' />
               </ListItem>
                <hr style={{ margin: '0px 20px', borderColor: '#ff760094' }} />
            </div>
               <ListItem  component={Link} to="/hrdashboard" sx={{ marginTop: 2 }} className="transition-transform transform hover:scale-105 hover:shadow-md gap-3">
                <DashboardSharpIcon />
                <ListItemText primary="Dashboard" className='' />
               </ListItem>

               <ListItem  onClick={handleBatchesToggle} className='gap-3 cursor-pointer'>
                <ArticleOutlinedIcon />
                <ListItemText primary="Batches" className='' />
                {batchesOpen ? <RemoveOutlinedIcon /> : <ExpandMoreIcon />}
               </ListItem>

                <Collapse in={batchesOpen} timeout="auto" unmountOnExit>
                   <List component="div" >
                      <div className="border-l-2 border-gray-300 ">
                       <ListItem component={Link} to="/hrdashboard/assignbatch" className="hover:scale-105 cursor-pointer">
                        <EditNoteOutlinedIcon />
                        <ListItemText primary="Assign Batches" />
                        <NavigateNextSharpIcon className='' />
                       </ListItem>
                       <ListItem className="hover:scale-105 cursor-pointer">
                        <QuizOutlinedIcon />
                        <ListItemText primary="Check Batches" />
                        <NavigateNextSharpIcon className='' />
                       </ListItem>
                      </div>
                   </List>
                </Collapse>

               <ListItem  component={Link}  to="/hrdashboard/empcard" className="transition-transform transform hover:scale-105 hover:shadow-md gap-3">
                <PeopleOutlinedIcon />
                <ListItemText primary="Employees" className='' />
                <NavigateNextSharpIcon className='' />
               </ListItem>
          </List>
          <IconButton edge="end" color="inherit" onClick={handleSidebarToggle} style={{ color: 'white', position: 'absolute', right: '12px' }}>
            <MoreVertIcon />
          </IconButton>
          
        </Drawer>
        <div className={sidebarOpen ? "outlet" : "out"}>
          <Outlet/>
        </div>
    </div >
  </div>
  );
};

export default HrDashboard; 
  