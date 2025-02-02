class OrderedPromise {
    tasks = [];

    set(fun) {
        return new Promise((resolve, reject) => {
            this.tasks.push(async (...args) => {
                try {
                    const result = await fun(...args);
                    resolve(result);
                    return result;
                }
                catch (e) {
                    reject(e);
                    throw e;
                }
            });
        });
    }
    
    resolve(...args) {
        if (this.tasks.length === 0) return;
        return this.tasks.shift()(...args);
    }
}
