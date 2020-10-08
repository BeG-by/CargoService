import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConfirmDeletingDialog(props) {
    const {id, onDelete, text , toolTitle} = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Tooltip title={toolTitle}
                     arrow>
                <Button
                    className="menu-table-btn"
                    color={"primary"}
                    startIcon={<DeleteIcon/>}
                    onClick={(e) => {
                        e.stopPropagation()
                        handleClickOpen();
                    }}
                />
            </Tooltip>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{text}</DialogTitle>
                <DialogActions>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                        onDelete(id);
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