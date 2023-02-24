
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {

    return (
        <div>
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