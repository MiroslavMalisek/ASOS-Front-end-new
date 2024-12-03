import log from 'loglevel';

// Key for localStorage
const LOG_STORAGE_KEY = 'appLogs';

// Helper function to save logs to localStorage
/* const saveLogsToStorage = (logMessage: string) => {
  const existingLogs = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');
  existingLogs.push(logMessage);
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(existingLogs));
}; */

function addLog(message: string) {
    const logsKey = "appLogs"; // Key for storing logs in localStorage
    const newLog = {
        message,
        timestamp: new Date().toISOString()
    };

    // Retrieve existing logs or initialize an empty array
    const existingLogs = JSON.parse(localStorage.getItem(logsKey) || "[]");

    // Add the new log
    existingLogs.push(newLog);

    // Save the updated logs array back to localStorage
    localStorage.setItem(logsKey, JSON.stringify(existingLogs));
}


log.methodFactory = (methodName, level, loggerName) => {
  // Use the default method for logging if available, otherwise fallback to console
  const rawMethod = (log as any)[methodName] || console[methodName] || console.log;
  return (...args: unknown[]) => {
    const timestamp = `[${new Date().toISOString()}]`;
    const logLevel = methodName.toUpperCase();
    const message = `${timestamp} ${logLevel}: ${args.join(' ')}`;

    // save the log to memory
    addLog(message);

    // output the log locally
    rawMethod(message);
  };
};

// Apply the custom method factory
log.setLevel(log.getLevel());

// Set default log level based on environment
if (process.env.NODE_ENV === 'production') {
  log.setLevel('warn'); // Log only warnings and errors
} else {
  log.setLevel('debug'); // Log everything during development
}

export const logger = log;

// Helper function to retrieve logs from localStorage
export const getLogs = () => JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');

// Helper function to clear logs from localStorage
export const clearLogs = () => localStorage.removeItem(LOG_STORAGE_KEY);