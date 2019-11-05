const express = require('express');

const app = express();
const path = require('path');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


let message;
const pageArray = ['/'];
dotenv.config();

function production() {
	message = '\n\nserver started in production mode on port 80';

	const appRoot = require('app-root-path');
	const expressStaticGzip = require('express-static-gzip');

	app.use(['/'], expressStaticGzip(`${appRoot}/dist`, {
		enableBrotli: true,
		orderPreference: ['br']
	}));

	app.use(['/'], express.static(`${appRoot}/dist`));

	/*= =======================Setup^^^====================================== */
	app.get(pageArray, (req, res) => {
		res.sendFile(path.join(`${appRoot}/dist/index.html`), (err) => {
			if (err) {
				res.status(500).send(err);
			}
		});
	});
}

function development() {
	message = '\n\nserver started in development mode on port 80';
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpack = require('webpack');
	const config = require('../webpack.config.js');
	const compiler = webpack(config);


	app.use(
		webpackDevMiddleware(compiler, {
			hot: true,
			filename: 'bundle.js',
			publicPath: '/',
			stats: {
				colors: true,
			},
			historyApiFallback: true,
		}),
	);

	app.use(
		webpackHotMiddleware(compiler, {
			log: console.log,
			path: '/__webpack_hmr',
			heartbeat: 10 * 1000,
		}),
	);

	/*= =======================Setup^^^====================================== */
	app.use(pageArray, (req, res, next) => {
		const filename = path.join(compiler.outputPath, 'index.html');
		compiler.outputFileSystem.readFile(filename, (err, result) => {
			if (err) {
				return next(err);
			}
			res.set('content-type', 'text/html');
			res.send(result);
			res.end();
		});
	});
}



	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));




	let route = 'http://www.dnd5eapi.co/api/monsters/'
	const axios = require('axios');

	let easy = [2, 31, 26, 33, 38, 36, 28, 49, 50, 54, 52, 56, 59, 78, 46, 57, 75, 61, 71, 87, 42, 91, 80,
		76, 35, 70, 79, 72, 94, 96, 89, 93, 95, 131, 144, 129, 135, 148, 164, 158, 177, 174, 193, 183, 230,
		115, 84, 73, 127, 109, 120, 176, 170, 189, 100, 130, 82, 139, 132, 149, 153, 150, 159, 163, 186, 190,
		137, 197, 107, 118, 128, 142, 126, 210, 143, 124, 122, 134, 188, 169, 192, 199, 204, 228, 108, 81, 133,
		141, 117, 140, 180, 168, 220, 226, 212, 236, 233, 245, 232, 247, 235, 251, 257, 264, 216, 238, 218, 249,
		253, 265, 275, 254, 272, 294, 283, 298, 310, 259, 250, 261, 274, 300, 281, 297, 311, 267, 241, 279, 278,
		280, 296, 262, 266, 286, 284, 277, 325, 273];

	let medium = [41, 48, 51, 86, 43, 66, 74, 99, 155, 165, 209, 136, 151, 205, 103, 182, 237, 114, 185, 181, 219, 195, 222, 202, 309, 293, 304, 302, 271, 305, 307];

	let hard = [14, 58, 65, 40, 90, 123, 104, 138, 152, 194, 191, 162, 198, 106, 147, 167, 208, 97, 178, 217, 255, 314, 243, 288, 312, 317, 290, 287, 292, 301, 324, 299, 248, 295, 313];



	app.get("/getMonsters", (req, res) => {
		console.log("react contacted server");
		let easyObj = [
			easy[Math.floor(Math.random() * easy.length)],
			easy[Math.floor(Math.random() * easy.length)],
			easy[Math.floor(Math.random() * easy.length)],
		]



		let mediumObj = [
			medium[Math.floor(Math.random() * medium.length)],
			medium[Math.floor(Math.random() * medium.length)],
			medium[Math.floor(Math.random() * medium.length)],
		]

		let hardObj = [
			hard[Math.floor(Math.random() * hard.length)],
			hard[Math.floor(Math.random() * hard.length)],
			hard[Math.floor(Math.random() * hard.length)],
		]

		let easyRoutes = [], mediumRoutes = [], hardRoutes = [];

		let easyMonsters = []

		let mediumMonsters = []

		let hardMonsters = []

		function makeRoutes(indexes, monsters, calls) {
			let i = 0;
			while (i < 3) {
				let target = route + indexes[i]
				calls.push(
					axios.get(target)
						.then(response => {

							monsters.push(response.data)
						})
				);
				i++;
			}

		}

		makeRoutes(easyObj, easyMonsters, easyRoutes);
		makeRoutes(mediumObj, mediumMonsters, mediumRoutes);
		makeRoutes(hardObj, hardMonsters, hardRoutes);

		let mainRoutes = [...easyRoutes, ...mediumRoutes, ...hardRoutes]

		Promise.all(mainRoutes)
			.then((allResults) => {

				let randomMonsters = {
					easyMonsters,
					mediumMonsters,
					hardMonsters
				}
				console.log(randomMonsters);
				res.send(JSON.stringify(randomMonsters));

			})

	})


	if (process.env.NODE_ENV == 'production') {
		production();
	} else {
		development();
	}



	app.listen(process.env.PORT || 3000, () => {
		console.log("Started server")
	})
