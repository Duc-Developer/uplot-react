
const DEFAULT_LIMIT = 100;
const throttle = (callback: (...args: any[]) => void, limit?: number) => {
    var wait = false;
    const throttled = (...args: any[]) => {
        if (!wait) {
            callback.call(callback, ...args);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit ?? DEFAULT_LIMIT);
        }
    }
    return throttled;
};

export default throttle;