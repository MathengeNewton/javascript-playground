// Written in OLOO Syntax

var Widget = {
	init: function(width, height) {
		this.width = width || 50,
		this.height = height || 50,
		this.$elem = null
	},
	render: function($where) {
		if (this.$elem) {
			this.$elem.css({
				width: this.width + "px",
				height: this.height + "px"
			}).appendTo($where);
		}
	}
};

var Button = Object.create(Widget);

Button.setup = function(width,height,label) {
	this.init(width,height);
	this.label = label || "Default";
	this.$elem = $("<button>").text(this.label);
};

Button.btnRender = function($where) {
	this.render($where);
	this.$elem.bind("click",this.onClick.bind(this));
}

Button.onClick = function(evt) {
	console.log("Button " + this.label + " clicked!");
}

$(document).ready(function(){
	var $body = $(document.body);
	var btn1 = Object.create(Button);
	var btn2 = Object.create(Button);

	btn1.setup(50,50,"button 1");
	btn2.setup(10,10,"button 2");

	btn1.btnRender($body);
	btn2.btnRender($body);
});
