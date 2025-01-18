class OrderedPromise {
    tasks = [];

    set(fun) {
        return new Promise((resolve, reject) => {
            this.tasks.push((...args) => {
                try {
                    resolve(fun(...args));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    
    resolve(...args) {
        if (this.tasks.length === 0) return;
        return this.tasks.shift()(...args);
    }
}
