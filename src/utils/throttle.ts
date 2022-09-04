const throttle = (callback: (params: any) => any, limit: number = 100) => {
    var wait = false;                  // Initially, we're not waiting
    return function (...args: any[]) {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call(null, ...args);           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

export default throttle;