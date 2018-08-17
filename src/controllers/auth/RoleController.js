const Controller = require(`${config.path.controller}/Controller`);
const Role = require(`${config.path.model}/Role`);

module.exports = new class RoleController extends Controller {
    index(req, res) {
        Role.find({}, (err, entities) => {
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

        Role({title, name}).save((err, entity) => {
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

        Role.findByIdAndUpdate(req.body._id, params, {new: true}, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            return res.json(entity);
        })
    }

    addPermission(req, res) {
        let _id = req.body._id, permission_id = req.body.permission_id;

        Role.findByIdAndUpdate(_id, {$addToSet: { permissions: permission_id }}, {new: true}, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            return res.json(entity);
        })
    }

    removePermission(req, res) {
        let _id = req.body._id, permission_id = req.body.permission_id;

        Role.findByIdAndUpdate(_id, {$pull: { permissions: permission_id }}, {new: true}, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            return res.json(entity);
        })
    }

    addAccess(req, res) {
        let _id = req.body._id, access_id = req.body.access_id;

        Role.findByIdAndUpdate(_id, {$addToSet: { accesses: access_id }}, {new: true}, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            return res.json(entity);
        })
    }

    removeAccess(req, res) {
        let _id = req.body._id, access_id = req.body.access_id;

        Role.findByIdAndUpdate(_id, {$pull: { accesses: access_id }}, {new: true}, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            return res.json(entity);
        })
    }

    delete(req, res) {
        let ids = req.body.ids;

        ids.map(id => {Role.findByIdAndRemove(id, () => {})})

        return res.json('Delete Success');

    }
}