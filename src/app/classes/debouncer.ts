export class Debouncer {
    debounce = () => {
        let timeout = null;
        return (fn, delay) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                fn();
            }, delay);
        };
    }
}
