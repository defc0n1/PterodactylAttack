
Ptero.Crater.3d_view = (function() {

	var topPane, frontPane, rightPane;

	function init() {
		var w = Ptero.screen.getPaneWidth();
		var h = Ptero.screen.getPaneHeight();

		var frustum = Ptero.screen.getFrustum();

		// TODO: to compute units per pixel and left,top pane coords.
		//		1. get scale of a fitted bounding box in w,h screen box

		var topCoords = new Ptero.Crater.PaneCoords(
			w,h,
			['x','z'],
			[1,-1],
			// ...
		);
		var frontCoords = new Ptero.Crater.PaneCoords(
			w,h,
			['x','y'],
			[1,-1],
			// ...
		);
		var rightCoords = new Ptero.Crater.PaneCoords(
			w,h,
			['z','y'],
			[1,-1],
			// ...
		);
	};

	function draw(ctx) {
	};

	function update(dt) {
	};

	return {
		init: init,
		draw: draw,
		update: update,
	};
})();