module.exports = {
	parameters: (req, populate) => {

		let {pagination} = params;

		console.log(req.query);
		let page = parseInt(req.query.page || pagination.page),
			limit = parseInt(req.query.limit || pagination.limit),
			sortBy = req.query.sortBy || pagination.sortBy,
			order = req.query.order,
			filters = req.query.filters,
			fields = req.query.fields;

		let options = limit === 'all' ? {} : {page, limit};

		order = order ? (order === 'ascend' ? 1 : -1) : pagination.order;

		options['sort'] = {};
		options['sort'][sortBy] = order;

		let query = {};

		filters && Object.entries(filters).forEach(([k, v]) => query[k] = new RegExp(v, 'i'));


		if (populate) {
			query && Object.entries(query).forEach(([k, v]) =>  {

				if (k.includes('.')) {
					let split = k.split('.');
					let path = split[0], select = split[1];
					let e = populate.findIndex(el => {
						return (el.path === path && (!el.select || el.select.includes(select)))
					});

					// if (e > -1) {
					//     let q = {};
					//     q[select] = new RegExp(v, "i");
					//     let match = populate[e]['match'];
					//     if (match) {
					//         populate[e]['match'] = {...match, ...q};
					//     }
					//     else {
					//         populate[e]['match'] = q;
					//     }
					// }

					let b = {};
					b[select] = {$in: v}

					query[path] = b;
					delete query[k];
				}
			});


			let sort = Object.keys(options.sort)[0];
			if (sort.includes('.')) {
				let split = sort.split('.');
				let path = split[0], select = split[1];
				let e = populate.findIndex(el => {
					return (el.path === path && (!el.select || el.select.includes(select)))
				});

				if (e > -1) {
					let q = {sort: {}};
					q['sort'][select]=order;
					populate[e]['options'] = q;
				}

				delete options['sort'];
			}

			options['populate'] = populate;
		}

		if (fields) {
			Object.entries(fields).forEach(([k, v]) =>  {query[k] = v});
		}

		return {query, options}
	}
};