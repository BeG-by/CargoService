import React, {useState} from "react"
import ActionToast from "./action-toast";

export default function useActionToast() {
    const [open, setOpen] = useState(false);
    const [onView, setOnView] = useState(null);
    const [text, setText] = useState("");

    const openActionToast = (text, onViewCLick) => {
        setOpen(true);
        setText(text);
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
            text={text}
            onClose={handleCLose}
            onViewClick={handleViewClick}
        />);

    return [ActionToastComponent, openActionToast];
}