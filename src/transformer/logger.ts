enum LogLevel {
    debug = 1,
    info = 2,
    warning = 3,
    error = 4,
}

class Logger {
    debug(message: string) {
        console.log(message)
    }

    info(message: string) {
        console.log(message)
    }
}

const logger = new Logger();

export { logger }