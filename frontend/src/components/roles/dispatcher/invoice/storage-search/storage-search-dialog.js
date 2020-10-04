import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import StorageSearch from "./storage-search";

export default function StorageSearchDialog(props) {
    const open = props.open;
    const storages = props.storages;
    const onSelect = props.onSelect;
    const onClose = props.onClose;
    const title = props.title;
    const prevStorage = props.prevStorage;

    const handleClose = () => {
        onClose();
    };

    const handleSelect = (storage) => {
        onSelect(storage);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"sm"}

        >
            <DialogTitle id="form-dialog-title">
                <span id="form-title">{title}</span>
                <IconButton aria-label="close"
                            onClick={handleClose}
                            className="close-user-dialog-btn"
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent style={{marginBottom: 25}}>
                <StorageSearch
                    storages={storages}
                    prevStorage={prevStorage}
                    onStorageSelect={handleSelect}
                />
            </DialogContent>
        </Dialog>
    );
}