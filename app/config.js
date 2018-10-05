const path = require('path');

module.exports = {
	port: 1414,
	secret: '5p[3$.]Ub#l%0VX#t.+*x_H1yjGC~M%@<4SY"!C{H$!rSRn"zPW=gHkq|$PJL4UzGDub5q83;jFCxb<o7A-~Lw{I{6*0kcNwsD#;qW^ViQWt5W<@D;0:g],#"6h|.',
	database: {
		host: '127.0.0.1',
		port: 27017,
		name: 'zhurrency'
	},
	path: {
		controller: path.resolve('./src/controllers'),
		model: path.resolve('./src/models'),
		middleware: path.resolve('./middlewares'),
		lib: path.resolve('./lib'),
		transform : path.resolve('./src/transforms')
	}
};