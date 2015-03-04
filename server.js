var fs = require('fs');
var path = require('path');
var http = require('http');
var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var staticDir = require('koa-static');
var use_ejs = require('koa-ejs');

var port = process.env.PORT || 4242;
var app = koa();

var dbfile = __dirname + '/db.json';

app.use(logger());
use_ejs(app, {
	root: path.join(__dirname, 'views'),
	layout: false,
	viewExt: 'ejs',
	cache: false,
	debug: true,
});
app.use(route.get('/', SlideView));
app.use(route.get('/controller', Controller));
app.use(staticDir(path.join(__dirname, 'static')))

var server = http.createServer(app.callback());
var io = require('socket.io')(server);
server.listen(port, function() {
	console.log('Server started');
});

// Handlers
function *SlideView() {
	yield this.render('SlideView', {
		title: 'Slides'
	});
}

function *Controller() {
	var data = {
		title: 'Slide Controller',
		slides: '[]'
	};
	if(fs.existsSync(dbfile)) {
		try {
			var state = JSON.parse(fs.readFileSync(dbfile));
			data.slides = JSON.stringify(state.slides);
		} catch(e) {
			console.log(e);
		}
	}
	yield this.render('Controller', data);
}

// Socket IO stuff
io.on('connection', function(socket) {
	socket.on('change_slide', function(md) {
		io.sockets.emit('change', {
			markdown: md
		});
	});
	socket.on('save', function(slides) {
		var data = {
			slides: slides
		};
		fs.writeFileSync(dbfile, JSON.stringify(data));
		io.sockets.emit('saved', {});
	});
});

