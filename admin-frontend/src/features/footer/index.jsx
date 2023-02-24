
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

const Footer = () => {

    return (
        <div>
        {/* <Box
          sx={{
            height: 60,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Typography variant="body2" component="div" color={grey[50]} sx={{mt:2}}>
            e University
          </Typography>
          <Typography variant="body2"  color={grey[50]}>
            @2023
          </Typography>
          ;
        </Box> */}
        <Box sx={{ position:'sticky',top:'100%',backgroundColor:'primary.dark'}}>
        <Typography variant="body2" component="div" color='white' sx={{paddingTop:4}}>
            e University
          </Typography>
          <Typography variant="body2"  color='white'>
            @2023
          </Typography>
        </Box>
      </div>
    );
}

export default Footer;