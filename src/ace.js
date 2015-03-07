//
// Original Source:
//     https://github.com/securingsincity/react-ace
//
// Copied so as to remove unused themes and modes
//

var ace = require('brace');
var React = require('react');

module.exports = React.createClass({
  propTypes: {
    mode  : React.PropTypes.string,
    theme : React.PropTypes.string,
    name : React.PropTypes.string,
    height : React.PropTypes.string,
    width : React.PropTypes.string,
    fontSize : React.PropTypes.number,
    showGutter : React.PropTypes.bool,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    onLoad: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      name   : 'brace-editor',
      mode   : 'markdown',
      theme  : 'github',
      height : '500px',
      width  : '500px',
      fontSize  : 12,
      value: '',
      showGutter : true,
      onChange : null,
      onLoad : null
    };
  },
  onChange: function() {
    var value = this.editor.getValue();
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },
  componentDidMount: function() {
    var self = this;
    this.editor = ace.edit(this.props.name);
    this.editor.getSession().setMode('ace/mode/'+this.props.mode);
    this.editor.setTheme('ace/theme/'+this.props.theme);
    this.editor.setFontSize(this.props.fontSize);
    this.editor.on('change', this.onChange);
    this.editor.setValue(this.props.value);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.editor = ace.edit(nextProps.name);
    this.editor.getSession().setMode('ace/mode/'+nextProps.mode);
    this.editor.setTheme('ace/theme/'+nextProps.theme);
    this.editor.setFontSize(nextProps.fontSize);
    this.editor.setValue(nextProps.value);
    this.editor.renderer.setShowGutter(nextProps.showGutter);
    if (nextProps.onLoad) {
      nextProps.onLoad();
    }
  },

  render: function() {
    var divStyle = {
      width: this.props.width,
      height: this.props.height
    };
    return (<div id={this.props.name} onChange={this.onChange} style={divStyle}></div>);
  }
});
