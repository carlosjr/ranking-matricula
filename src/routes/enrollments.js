import EnrollmentsController from '../controllers/enrollments';

export default (app) => {
    const enrollmentsController = new EnrollmentsController(app.datasource.models.Enrollments);

    app.route('/enrollments').all(app.auth.authenticate()).get((req, res) => {
        enrollmentsController.getAll().then((response) => {
            res.status(response.statusCode);
            res.json(response.data);
        })
    }).post((req, res) => {
        enrollmentsController.create(req.body).then((response) => {
            res.status(response.statusCode).json(response.data)
        }).catch(() => res.status(412));
    })

    app.route('/enrollments/:id').all(app.auth.authenticate()).get((req, res) => {
        enrollmentsController.getById(req.params).then((response) => {
            res.status(response.statusCode)
            res.json(response.data)
        }).catch(() => res.status(412));
    }).put((req, res) => {
        enrollmentsController.update(req.body, req.params).then((response) => {
            res.status(response.statusCode)
            res.json(response.data)
        }).catch(() => res.status(412));
    }).delete((req, res) => {
        enrollmentsController.delete(req.params).then((response) => {
            res.sendStatus(response.statusCode)
        }).catch(() => res.status(412));
    })

    app.route('/enrollments-ranking').all(app.auth.authenticate()).get((req, res) => {
        enrollmentsController.getRanking(app.datasource.models.Users).then((response) => {
            res.json(response.data);
        })
    })
}
