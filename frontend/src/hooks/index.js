import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { NotificationContext } from "../context/NotificationProvider";

export const useTheme = () => useContext(ThemeContext);
export const useNotification = () => useContext(NotificationContext);
