import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from "@material-ui/icons/Delete";

const title = "Do you want to remove user ?";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConfirmDeletingDialog(props) {
    const {userId, deleteUser} = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button
                className="user-table-btn"
                color={"primary"}
                startIcon={<DeleteIcon/>}
                onClick={(e) => {
                    e.stopPropagation()
                    handleClickOpen();
                }}
            />

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
                <DialogActions>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                        deleteUser(userId);
                    }} color="primary">
                        Yes
                    </Button>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        handleClose()
                    }} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}