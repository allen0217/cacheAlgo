class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.keysObj = {};
        this.keysQueue = [];
    }

    put(key, value) {
        const {keysQueue, keysObj, capacity} = this;

        // Check void(0) instead of undefined because it's safer (in case undefined was tampered with).
        // Use this method instead of hasOwnProperty because it's significantly faster.
        if (keysObj[key] === void(0)) {
            keysQueue.push(key);
            keysObj[key] = value;

            if (keysQueue.length > capacity) {
                const lruKey = keysQueue[0];
                if (Object.keys(keysObj).length > capacity) 
                    delete keysObj[lruKey];

                keysQueue.shift();
            }

            return null;
        }

        const index = keysQueue.indexOf(key);
        keysQueue.splice(index, 1);
        keysQueue.push(key);
        if (keysObj[key] !== value)
            keysObj[key] = value;

        return null;
    }

    get(key) {
        const {keysQueue, keysObj, capacity} = this;

        // See comments in put() about this condition
        if (keysObj[key] === void(0))
            return -1;

        const index = keysQueue.indexOf(key);
        keysQueue.splice(index, 1);
        keysQueue.push(key);

        return keysObj[key];
    }
}