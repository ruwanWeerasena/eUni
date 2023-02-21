
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

const Footer = () => {
    return (
        <div>
        <Box
          sx={{
            height: 60,
            position: "fixed",
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
        </Box>
      </div>
    );
}

export default Footer;