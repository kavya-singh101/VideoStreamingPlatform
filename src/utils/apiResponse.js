class apiResponse{
    constructor(data, message, statusCode="success"){
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
        this.success = statusCode < 400
    }
}

export { apiResponse }