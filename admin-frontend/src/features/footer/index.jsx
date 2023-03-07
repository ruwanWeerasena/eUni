
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {

    return (
        
        <Box  sx={{ backgroundColor:'primary.dark',top: 'auto', bottom: 0 ,position:"sticky",width:1}}>
        <Typography variant="body2" component="div" color='white' sx={{paddingTop:1, paddingBottom:1}}>
            e University @ 2023
          </Typography>
        </Box>
      
    );
}

export default Footer;