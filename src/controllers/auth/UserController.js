const Controller = require('../Controller');
const UserTransform = require(`${config.path.transform}/UserTransform`);
const User = require(`${config.path.model}/User`);

module.exports = new class UserController extends Controller {
    index(req, res) {
        User.find({}, (err, entities) => {
            if (err)
                return res.status(404).json('Error');

            if (entities) {
                // return res.json(entities);
                return res.json(new UserTransform().transformCollection(entities));
            }
        });
    }

    get(req, res) {
        User.findById(req.params._id, (err, entity) => {
            if (err)
                return res.status(404).json('Error');

            if (entity) {
                return res.json(entity);
            }
        });
    }

    create(req, res) {
        User(req.body).save((err, user) => {
            if (err) {
                if (err.code == 11000) {
                    return res.status(409).json({
                        message: 'ایمیل و موبایل نمی تواند تکراری باشد',
                        success: false
                    })
                } else {
                    return res.status(404).json('Error');
                }
            }

            return res.json(new UserTransform().transform(user));
        })
    }

    update(req, res) {

        let {name, email, phone, status, roles, password} = req.body;

        User.findById(req.body._id, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            entity.set('name', name);
            entity.set('email', email);
            entity.set('phone', phone);
            entity.set('status', status);
            entity.set('roles', roles);

            if (password) entity.set('password', password);

            entity.save();
            return res.json(entity);
        })
    }

    addPermission(req, res) {
        let _id = req.body._id, permission_id = req.body.permission_id;

        User.findByIdAndUpdate(_id, {$addToSet: { permissions: permission_id }}, {new: true}, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            return res.json(entity);
        })
    }

    removePermission(req, res) {
        let _id = req.body._id, permission_id = req.body.permission_id;

        User.findByIdAndUpdate(_id, {$pull: { permissions: permission_id }}, {new: true}, (err, entity) => {
            if (err) {
                return res.status(404).json('Error');
            }

            return res.json(entity);
        })
    }

    delete(req, res) {
        let ids = req.body.ids;

        ids.map(id => {User.findByIdAndRemove(id, () => {})})

        return res.json('Delete Success');

    }
}