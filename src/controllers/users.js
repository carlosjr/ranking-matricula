/* eslint-disable no-param-reassign */
import HttpStatus from 'http-status'
import bcrypt from 'bcrypt';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
})

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message,
}, statusCode)

class UsersController {
    constructor(Users) {
        this.Users = Users;
    }

    getAll() {
        return this.Users.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message))
    }

    getById(params) {
        return this.Users.findOne({ where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message))
    }

    create(data) {
        return this.Users.create(data)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    update(data, params) {
        console.log('######entrou', params);
        if (data && data.password) {
            const salt = bcrypt.genSaltSync();
            data.password = bcrypt.hashSync(data.password, salt);
        }

        return this.Users.update(data, { where: params }).then((result) => {
            return defaultResponse(result);
        }).catch((error) => { errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY) });
    }

    delete(params) {
        return this.Users.destroy({ where: params }).then((result) => {
            return defaultResponse(result, HttpStatus.NO_CONTENT);
        }).catch((error) => { errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY) });
    };
}

export default UsersController;
