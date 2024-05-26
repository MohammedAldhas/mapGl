import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '382px',
    height: '161px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px'
};

export default function BasicModal({handleClose, open, signOut}) {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ border: '0' }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                        Confirm sign out
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '16px' }}>
                        Are you sure you want to logout the system?
                    </Typography>

                    <Box sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Button
                            onClick={handleClose}
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{
                                mt: 4,
                                mb: 2,
                                backgroundColor: '#fff',
                                color: '#240A63',
                                borderColor: '#240A63',
                                padding: '10px',
                                borderRadius: '8px',
                                marginRight: '10px'
                            }}
                        >
                            {"Cancel"}
                        </Button>
                        <Button
                            onClick={signOut}
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 4,
                                mb: 2,
                                padding: '10px',
                                borderRadius: '8px',
                                color: '#fff',
                                backgroundColor: '#F04438',
                                marginLeft: '10px'
                            }}
                        >
                            {"Sign out"}
                        </Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}
