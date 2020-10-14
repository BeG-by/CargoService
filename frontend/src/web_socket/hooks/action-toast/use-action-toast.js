import React, {useState} from "react"
import ActionToast from "./action-toast";

export default function useActionToast() {
    const [open, setOpen] = useState(false);
    const [onView, setOnView] = useState(null);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const openActionToast = (toastTitle, toastText, onViewCLick) => {
        setOpen(true);
        setText(toastText);
        setTitle(toastTitle);
        setOnView(() => () => onViewCLick())
    };

    const handleCLose = () => {
        setOpen(false);
        setOnView(null);
    }

    const handleViewClick = () => {
        if (onView !== null && onView !== undefined)
            onView();
    }

    const ActionToastComponent = (
        <ActionToast
            open={open}
            title={title}
            text={text}
            onClose={handleCLose}
            onViewClick={handleViewClick}
        />);

    return [ActionToastComponent, openActionToast];
}