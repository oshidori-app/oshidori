import { environment } from './environments/environment';

export enum LogLevel {
  Error,
  Warning,
  Info,
}
export class Logger {

  /**
   * Same as info
   */
  static debug(...objects: any[]) {
    this.log(console.info, LogLevel.Info, objects);
  }

  /**
   * Logs messages or objects  with the info level.
   * Works the same as console.info().
   */
  static info(...objects: any[]) {
    this.log(console.info, LogLevel.Info, objects);
  }

  /**
   * Logs messages or objects  with the warning level.
   * Works the same as console.warn().
   */
  static warn(...objects: any[]) {
    this.log(console.warn, LogLevel.Warning, objects);
  }

  /**
   * Logs messages or objects  with the error level.
   * Works the same as console.error().
   */
  static error(...objects: any[]) {
    this.log(console.error, LogLevel.Error, objects);
  }

  private static log(func: Function, level: LogLevel, objects: any[]) {
    if (!environment.production || (environment.production && level === LogLevel.Error)) {
      func.apply(console, objects);
    }
  }
}
