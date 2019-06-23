import app from '../../app'

app.route('/teste').get((req, res) => {
    res.json({id: 1, nome: 'teste'})
})