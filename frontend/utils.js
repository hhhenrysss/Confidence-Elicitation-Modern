export const Time = {
    storedTime: 0,
    currentTime() {
        // performance.now() has varied availability and accuracy
        return Date.now();
    },
    setTime() {
        this.storedTime = this.currentTime();
    }
};
