import React, { useState } from "react";
import { ToastNotification } from "./toast-notification";

export default () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [severity, setSeverity] = useState("success");

  const openNotificationToast = (text, severity) => {
    setOpen(true);
    setText(text);
    setSeverity(severity);
  };

  const component = (
    <ToastNotification
      text={text}
      severity={severity}
      open={open}
      onClose={() => setOpen(false)}
    />
  );

  return [component, openNotificationToast];
};
