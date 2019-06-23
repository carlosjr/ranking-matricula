import HttpStatus from 'http-status'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
})

const errorResponse = (message, statusCode = 400) => defaultResponse({
    error: message,
}, statusCode)


class EnrollmentsController {
    constructor(Enrollments) {
        this.Enrollments = Enrollments;
    }

    getAll() {
        return this.Enrollments.findAll({}).then((result) => {
            return defaultResponse(result);
        }).catch((error) => { errorResponse(error.message) });
    }

    getById(params) {
        return this.Enrollments.findOne({ where: params }).then((result) => {
            return defaultResponse(result);
        }).catch((error) => { errorResponse(error.message) });
    }

    create(data) {
        return this.Enrollments.create(data).then((result) => {
            return defaultResponse(result, HttpStatus.CREATED);
        }).catch((error) => { 
            console.log(error);
            return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY) 
        });
    }

    update(data, params) {
        return this.Enrollments.update(data, { where: params }).then((result) => {
            return defaultResponse(result);
        }).catch((error) => { errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY) });
    }

    delete(params) {
        return this.Enrollments.destroy({ where: params }).then((result) => {
            return defaultResponse(result, HttpStatus.NO_CONTENT);
        }).catch((error) => { errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY) });
    }

    getRanking(UsersModel) {
        // this.Enrollments.hasMany(UsersModel);
        // UsersModel.hasMany(this.Enrollments);
        this.Enrollments.hasMany(UsersModel, { foreignKey: 'id' });

        // this.Enrollments.sequelize.query('SELECT Enrollments.*, Users.name FROM Enrollments INNER JOIN Users ON Users.id = Enrollments.id_user WHERE Enrollments.id = 1', 
        //    { type: sequelize.QueryTypes.SELECT})
        //    .then(users => {
        //        return users
        //        // We don't need spread here, since only the results will be returned for select queries
        //    })
        return this.Enrollments.findAll(
            {
                group: ['id_user'],
                attributes: ['id_user', [this.Enrollments.sequelize.fn('COUNT', 'id_user'), 'count_enroll']],
                include: [{
                    model: UsersModel,
                    attributes: ['id', 'name', 'role'],
                    on: { '$Enrollments.id_user$' : {$col: 'Users.id'}},
                    required: true
                }],
                order: [
                    [[this.Enrollments.sequelize.literal('count_enroll'), 'DESC']]
                ]
            })
            .then((result) => {
                console.log(result)
                return defaultResponse(result);
            }).catch(error => errorResponse(error.message));
    }
}

export default EnrollmentsController;
