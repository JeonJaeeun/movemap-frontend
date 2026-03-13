let logoutHandler = null;

export const registerLogoutHandler = (fn) => {
    logoutHandler = fn;
};

export const triggerLogout = () => {
    if (logoutHandler) {
        postLogout();
    }
};
