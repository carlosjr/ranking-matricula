import HttpStatus from 'http-status';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';

export default (app) => {
    const config = app.config;
    const Users = app.datasource.models.Users;

    const isPassword = (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword)
    }

    app.post('/token', (req, res) => {
        if(req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;

            Users.findOne({where: {email}})
                .then((user) => {
                    if(isPassword(user.password, password)) {
                        const playload = {id: user.id};
                        res.json({
                            token: jwt.encode(playload, config.jwtSecret),
                            id_user: user.id,
                            role: user.role
                        })
                    } else {
                        res.sendStatus(HttpStatus.UNAUTHORIZED)
                    }
                })
                .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED))
        } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED)
        }
    })

}
