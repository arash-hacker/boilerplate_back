const Controller = require(`${config.path.controller}/Controller`);
const Access = require(`${config.path.model}/Access`);

module.exports = new class AccessController extends Controller {
    index(req, res) {
        Access.find({}, (err, entities) => {
            if (err)
                return res.status(404).json('Error');

            if (entities) {
                return res.json(entities);
            }
        });
    }

    create(req, res) {
        let title = req.body.title, name = req.body.name;

        if (req.user._id) {
            params.user = req.user;
        }

        Access({title, name}).save((err, entity) => {
            if (err) {
                if (err.code == 11000) {
                    return res.status(409).json('Duplicated')
                } else {
                    return res.status(404).json('Error');
                }
            }

            return res.json(entity);
        })
    }

    update(req, res) {

        let params = req.body;

        Access.findByIdAndUpdate(req.body._id, params, {new: true}, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            return res.json(entity);
        })
    }

    delete(req, res) {
        let ids = req.body.ids;

        ids.map(id => {Access.findByIdAndRemove(id, () => {})})

        return res.json('Delete Success');
    }
}