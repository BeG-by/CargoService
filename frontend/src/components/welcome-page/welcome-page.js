import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Footer} from "../parts/footer";
import {Header} from "../parts/header";
import {DrawerMenu} from "../parts/drawer"
import {WelcomeBody} from "../parts/welcome-body";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1,
    },
}));

export default function WelcomePage() {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };
    const handleDrawerClose = () => {
        setOpenMenu(false);
    };
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div className={classes.grow}>
            <Header drawerWidth={drawerWidth}
                    openMenu={openMenu}
                    openDialog={openDialog}
                    handleDrawerOpen={handleDrawerOpen}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    />
            <DrawerMenu drawerWidth={drawerWidth}
                    openMenu={openMenu}
                    handleDrawerClose={handleDrawerClose}
            />
            <WelcomeBody drawerWidth={drawerWidth}
                         openMenu={openMenu}/>
            <CssBaseline />
            <Footer drawerWidth={drawerWidth}
                    openMenu={openMenu}
            />
        </div>
    );
}