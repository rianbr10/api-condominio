import winston from 'winston';
import { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const fileLogFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.Console({
            format: format.combine(
                winston.format.splat(),
                winston.format.cli(),
                winston.format.align(),
            ),
            level: 'info',
        }),
    ],
});

function addLogRotate(workspace: string): void {
    const logRotate = new DailyRotateFile({
        format: format.combine(winston.format.splat(), winston.format.timestamp(), winston.format.padLevels(), fileLogFormat),
        level: 'debug',
        filename: path.resolve(workspace, 'logs', 'modelo-api-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d',
    });

    logger.add(logRotate);
}

export { addLogRotate, logger };
