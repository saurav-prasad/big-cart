import React from 'react'
import { Alert } from '@mui/material';
import './alrt.css'
function Alrt({ showAlert, text, type }) {
    return (
        <>
            {showAlert &&
                <div div className='alert' >
                    <Alert className='alertContent' severity={type}>{text}</Alert>
                </div>
            }
        </>
    )
}

export default Alrt