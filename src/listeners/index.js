export function createListener(event, socket) {
    return (dispatch) => {
        
        if(socket && typeof socket.on === 'function') socket.on(event, ({ type, payload }) => {
            dispatch({ type, payload });
        });
    }

}