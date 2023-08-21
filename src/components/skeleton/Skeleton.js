import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Skeletonn() {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <div className='card'>
                <Skeleton variant="rectangular" width="100%" height={280} />
                <Skeleton height={30} width="95%" />
                <Skeleton height={30} width="90%" />
                <Skeleton width="60%" />
            </div >
        </Box>
    );
}
