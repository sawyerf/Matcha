export const isOnline = (uid) => {
    const isOnline = global.io.sockets.adapter.rooms.get(uid);
    if (isOnline === undefined) {
        return false;
    } else {
        console.log(isOnline);
        return true;
    }
}