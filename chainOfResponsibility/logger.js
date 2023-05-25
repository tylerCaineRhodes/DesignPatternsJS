class AbstractLogger {
  static INFO = 1;
  static WARNING = 2;
  static ERROR = 3;

  constructor(level) {
    this.level = level;
    this.nextLogger = null;
  }

  setNextLogger(nextLogger) {
    this.nextLogger = nextLogger;
  }

  logMessage(level, message) {
    if (this.level <= level) {
      this.write(message);
    }
    if (this.nextLogger != null) {
      this.nextLogger.logMessage(level, message);
    }
  }

  write(message) {}
}

class ConsoleLogger extends AbstractLogger {
  constructor(level) {
    super(level);
  }

  write(message) {
    console.log('Standard Console::Logger: ' + message);
  }
}

class ErrorLogger extends AbstractLogger {
  constructor(level) {
    super(level);
  }

  write(message) {
    console.log('Error Console::Logger: ' + message);
  }
}

class FileLogger extends AbstractLogger {
  constructor(level) {
    super(level);
  }

  write(message) {
    console.log('File::Logger: ' + message);
  }
}

function createLoggerChain() {
  const errorLogger = new ErrorLogger(AbstractLogger.ERROR);
  const fileLogger = new FileLogger(AbstractLogger.WARNING);
  const consoleLogger = new ConsoleLogger(AbstractLogger.INFO);

  errorLogger.setNextLogger(fileLogger);
  fileLogger.setNextLogger(consoleLogger);

  return errorLogger;
}

const loggerChain = createLoggerChain();

loggerChain.logMessage(
  AbstractLogger.INFO,
  'This is an informational message.'
);
loggerChain.logMessage(
  AbstractLogger.WARNING,
  'This is a warning level message.'
);
loggerChain.logMessage(AbstractLogger.ERROR, 'This is an error level message.');
