import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class LoggerHelper extends Logger {
  private logStream: fs.WriteStream;

  constructor(name: string) {
    super();

    const logDirectory = path.join(__dirname, "./data");
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    const logFilePath = path.join(logDirectory, "log.txt");
    this.logStream = fs.createWriteStream(logFilePath, { flags: "a" });
  }

  log(message: string) {
    super.log(message);
    this.writeToFile(`[INFO] ${message}`);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
    this.writeToFile(`[ERROR] ${message} - ${trace}`);
  }

  warn(message: string) {
    super.warn(message);
    this.writeToFile(`[WARN] ${message}`);
  }

  private writeToFile(message: string) {
    const timestamp = new Date().toISOString();
    this.logStream.write(`[${timestamp}] ${message}\n`);
  }
}
