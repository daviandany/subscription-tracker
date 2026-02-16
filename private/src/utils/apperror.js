export class AppError extends Error{
    constructor(message, code = 400){
        super(message),
        this.code = code
        this.isOperational = true
    }
}