const Controller = require('../Controller');
const Entity = require(`${config.path.model}/Favorite`);

module.exports = new class CategoryController extends Controller {

    status(req, res) {
        let {product} = req.query, user = req.user._id;

        Entity.findOne({user, product}, (err, entity) => {
                if (err) {
                    return res.status(404).json('Error');
                }

                let result = {
                    status: !!entity,
                };

                return res.json(result);
            }
        );
    }

    toggle(req, res) {
        let {product} = req.query, user = req.user._id, result = {};

        Entity.findOne({user, product}, (err, entity) => {
            if (err)
                return res.status(404).json('Error');

            if (entity) {
                entity.remove();
                result = {status: false};

                return res.json(result);
            }

            Entity({user, product}).save((err, favorite) => {

                if (err) {
                    return res.status(404).json('Error');
                }

                result = {status: true};

                return res.json(result);
            })
        });
    }
}