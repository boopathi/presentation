socket.on('change', function(data) {
	document.body.innerHTML="";
	document.documentElement.setAttribute('class', 'reset');
	document.body.setAttribute('class','reset');
	remark.create({
		source: data.markdown
	})
});

window.addEventListener('DOMContentLoaded', function() {
	remark.create({
		source: '# Hello world \n---\n # Second Slide'
	})
});