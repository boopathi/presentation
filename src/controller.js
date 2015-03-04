var React = require('react/addons');
var Ace = require('react-ace');
var css = require('./controller.scss');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var cx = React.addons.classSet;

var Controls = React.createClass({
	saveSlides: function() {
		this.props.saveToDB();
	},
	editMode: function() {
		this.props.mode('edit');
	},
	presentMode: function() {
		this.props.mode('present');
	},
	render: function() {
		return <div className='controls'>
			<div className='c edit' onClick={this.editMode}>Edit</div>
			<div className='c present' onClick={this.presentMode}>Present</div>
			<div className='c save' onClick={this.saveSlides}>Save</div>
		</div>;
	}
});

var Editor = React.createClass({
	keyHandler: function(e) {
		if(e.which === 13 && e.metaKey === true) {
			this.props.saveSlide(this.props.n, this.refs['ace-editor'].editor.getSession().getValue());
		} else if(e.which === 27) {
			this.props.cancelEdit(this.props.n);
		}
	},
	componentDidMount: function() {
		document.addEventListener('keydown', this.keyHandler);
		document.addEventListener('keyup', this.keyHandler);
		this.refs['ace-editor'].editor.focus();
	},
	componentWillUnmount: function() {
		document.removeEventListener('keydown', this.keyHandler);
		document.removeEventListener('keyup', this.keyHandler);
	},
	handleClick: function(e) {
		this.props.saveSlide(this.props.n, this.refs['ace-editor'].editor.getSession().getValue());
	},
	cancel: function(e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.cancelEdit(this.props.n);
	},
	stopPropogation: function(e) {
		e.stopPropagation();
	},
	render: function() {
		return <div key={this.props.n} className='editor-float' onClick={this.cancel}>
			<div className='editor' onClick={this.stopPropogation}>
				<Ace
					ref='ace-editor'
					mode='markdown'
					theme='github'
					width='100%'
					height='100%'
					value={this.props.content}
					name='Editor' />
				<div className='actions'>
					<span style={{color: 'rgba(0,0,0,0.3)'}}>(Meta + Enter) </span>
					<div onClick={this.handleClick} className='button'>
						Save
					</div>
				</div>
			</div>
		</div>;
	}
});

var Slide = React.createClass({
	handleClick: function(e) {
		if(e.altKey) {
			this.props.removeSlide(this.props.n);
		} else {
			this.props.editSlide(this.props.n);
		}
	},
	render: function() {
		return <div className='slide' onClick={this.handleClick} key={this.props.n}>
			{this.props.excerpt}
		</div>
	}
});

var Adder = React.createClass({
	handleClick: function(e) {
		this.props.addSlide();
	},
	render: function() {
		return <div className='slide adder' onClick={this.handleClick} key='adder-slide'>
			+
		</div>;
	}
});

var Present = React.createClass({
	handleClick: function(e) {
		this.props.activate(this.props.n);
	},
	render: function() {
		var classes = cx({
			slide: true,
			active: this.props.active
		});
		return <div className={classes} onClick={this.handleClick} key={this.props.n}>
			{this.props.excerpt}
		</div>
	}
});

var Page = React.createClass({
	getInitialState: function() {
		return {
			currentEdit: null,
			slides: slides,
			present: false,
			active: 0,
		}
	},
	changeMode: function(mode) {
		if(mode === 'present') {
			this.setState({
				present: true
			});
			socket.emit('change_slide', this.state.slides[this.state.active]);
		} else {
			this.setState({
				present: false
			});
		}
	},
	addSlide: function() {
		var content = '# Slide ' + this.state.slides.length;
		var slides = this.state.slides.concat(content);
		this.setState({slides: slides});
	},
	removeSlide: function(i) {
		var slides = this.state.slides;
		slides.splice(i, 1);
		this.setState({slides: slides});
	},
	editSlide: function(n) {
		this.setState({currentEdit: n});
	},
	cancelEdit: function(n) {
		this.setState({currentEdit: null});
	},
	saveSlide: function(n, content) {
		var slides = this.state.slides;
		slides[n] = content;
		this.setState({
			slides: slides,
			currentEdit: null,
		});
	},
	saveToDB: function() {
		socket.emit('save',this.state.slides);
	},
	activate: function(n) {
		this.setState({
			active: n
		});
		socket.emit('change_slide', this.state.slides[n]);
	},
	componentWillUnmount: function() {
	},
	componentDidMount: function() {
		socket.on('saved', function() {
			console.log('Slides saved');
		});
	},
	render: function() {
		var slides = this.state.slides.map(function(s,i) {
			var excerpt = this.state.slides[i].substr(0,10);
			if(this.state.present) {
				return <Present
					active={this.state.active===i}
					excerpt={excerpt}
					activate={this.activate}
					n={i} />
			}
			return <Slide
				active={this.state.active===i}
				n={i}
				excerpt={excerpt}
				editSlide={this.editSlide}
				removeSlide={this.removeSlide} />;
		}.bind(this));
		return <div>
			<div>
				<Controls mode={this.changeMode} saveToDB={this.saveToDB} />
			</div>
			<ReactCSSTransitionGroup transitionName='slide' className='slides'>
				{slides}
				<Adder addSlide={this.addSlide} />
			</ReactCSSTransitionGroup>
			<div>
				{this.state.currentEdit !== null ? <Editor
					n={this.state.currentEdit}
					content={this.state.slides[this.state.currentEdit]}
					saveSlide={this.saveSlide}
					cancelEdit={this.cancelEdit} /> : null}
			</div>
		</div>;
	}
});

React.render(<Page/>, document.getElementById('react'));