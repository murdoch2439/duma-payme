import React from 'react'
import {Typography, Grid} from '@material-ui/core'
import NoticeDialog from './legalNoticePopups/noticeDialog';


const  Copyright = () => {
  const currentYear =  new Date().getFullYear();

  return (

    <Grid style={{textAlign:'center',}}>
        <Typography variant="caption">{`©Copyright-${currentYear}`}</Typography>
        <Typography>

          {/* ᛫ */}

        <NoticeDialog separator="&nbsp;|" />
        </Typography>
    </Grid>
  );
}


export default Copyright
