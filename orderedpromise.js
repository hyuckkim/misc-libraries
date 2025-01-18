class OrderedPromise {
    current = undefined;

    set(fun) {
        return new Promise((resolve, reject) => {
            this.current = (...args) => {
                try {
                    resolve(fun(...args));
                }
                catch (e) {
                    reject(e);
                }
            };
        });
    }
    
    resolve(...args) {
        if (!this.current) return;
        const result = this.current(...args);

        this.current = undefined;
        return result;
    }
}
