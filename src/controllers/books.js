import HttpStatus from 'http-status'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
})

const errorResponse = (message, statusCode = 400) => defaultResponse({
    error: message,
}, statusCode)

class BooksController {
    constructor(Books) {
        this.Books = Books;
    }

    getAll() {
        return this.Books.findAll({}).then((result) => {
            return defaultResponse(result);
        }).catch((error) => { errorResponse(error.message) });
    }

    getById(params) {
        return this.Books.findOne({ where: params }).then((result) => {
            return defaultResponse(result);
        }).catch((error) => { errorResponse(error.message) });
    };

    create(data) {
        return this.Books.create(data).then((result) => {
            return defaultResponse(result, HttpStatus.CREATED);
        }).catch((error) => { errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY) });
    };

    update(data, params) {
        return this.Books.update(data, { where: params }).then((result) => {
            return defaultResponse(result);
        }).catch((error) => { errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY) });
    };

    delete(params) {
        return this.Books.destroy({ where: params }).then((result) => {
            return defaultResponse(result, HttpStatus.NO_CONTENT);
        }).catch((error) => { errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY) });
    };
}

export default BooksController;
