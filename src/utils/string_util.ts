export function format(fmt: string, ...args: string[]) {
    if (!fmt.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
        throw new Error('invalid format string.');
    }

    return fmt.replace(/((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g, 
        (_m , str: string, index: number) => {
            if (str) {
                return str.replace(/(?:{{)|(?:}})/g, m => m[0]);
            } else {
                if (index >= args.length) {
                    throw new Error('argument index is out of range in format');
                }
                return args[index];
            }
    });
}

export function print(fmt: string, ...args: string[]) {
    console.log(format(fmt, ...args));
}

/* Examples
print("Hello, {0}! The answer is {1}.", "World", 42);
print("{0} {1}", "{1}", 42);
print("{{0}} will be replaced with {0}", 42);
print("{0}} woops, throw!")
*/