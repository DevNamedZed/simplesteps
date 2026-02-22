export enum LogLevel {
  Silent = 0,
  Error = 1,
  Warn = 2,
  Info = 3,
  Debug = 4,
}

export class Logger {
  constructor(private level: LogLevel = LogLevel.Info) {}

  error(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.Error) {
      console.error(`[simplesteps] ERROR: ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.Warn) {
      console.warn(`[simplesteps] WARN: ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.Info) {
      console.log(`[simplesteps] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.Debug) {
      console.log(`[simplesteps] DEBUG: ${message}`, ...args);
    }
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }
}
