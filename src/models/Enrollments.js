export default (sequelize, DataType) => {
    const Enrollments = sequelize.define('Enrollments', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        cpf: {
            type: DataType.STRING,
        },
        email: {
            type: DataType.STRING,
        },
        dt_birth: {
            type: DataType.DATE,
        },
        level: {
            type: DataType.STRING,
        },
        value_paid: {
            type: DataType.DECIMAL,
        }

    })

    // Enrollments.sync({force: true})

    return Enrollments;
}
