class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Object.defineProperty(this, 'message', { value: message, enumerable: true });
        this.errors = errors;
    }
}

export default ApiError;