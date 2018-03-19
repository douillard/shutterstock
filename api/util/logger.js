const level = process.env.LOG_LEVEL || 'debug';
import winston from "winston";

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta'
    }
};

export default winston.createLogger({
    levels: config.levels,
    format: winston.format.combine(
        winston.format.colorize({all:true}),
        winston.format.simple()
    ),
    transports: new winston.transports.Console({
        handleExceptions: true
    }) 
});
