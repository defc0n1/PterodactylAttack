
Ptero.audio = (function() {
	var titleSong,scoreSong;
	var shoot,explode,hurt;
	var select;

	function init() {
		shoot = new Audio("audio/shoot04.wav");
		explode = new Audio("audio/explode04.wav");
		hurt = new Audio("audio/hurt.wav");
		select = new Audio("audio/select04.wav");

		titleSong = new Ptero.Song("audio/theme3.mp3");

		scoreSong = new Ptero.Song("audio/score.mp3");
	}

	function update(dt) {
		titleSong.update(dt);
	}

	return {
		init: init,
		update: update,
		playSelect: function() { select.play(); },
		playShoot: function() { shoot.play(); },
		playExplode: function() { explode.play(); },
		playHurt: function() { hurt.play(); },
		getTitleSong: function() { return titleSong; },
		getScoreSong: function() { return scoreSong; },
	};
})();

Ptero.Song = function(filepath) {
	this.filepath = filepath;
	this.audio = new Audio();
	this.audio.src = this.filepath;
};

Ptero.Song.prototype = {
	setLoop: function() {
		// from: http://stackoverflow.com/a/6452884/142317
		if (typeof this.audio.loop == 'boolean')
		{
			this.audio.loop = true;
		}
		else
		{
			this.audio.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
		}
	},
	update: function(dt) {
		if (this.volumeFader) {
			this.volumeFader.update(dt);
		}
	},
	stop: function() {
		this.pause();
	},
	pause: function() {
		//this.audio.src = this.filepath;
		this.audio.pause();
	},
	getVolume: function() {
		return this.audio.volume;
	},
	setVolume: function(vol) {
		this.audio.volume = vol;
	},
	fadeOut: function(t) {
		var that = this;
		this.volumeFader = {
			time: 0,
			interp: Ptero.makeInterp('linear', [this.getVolume(), 0], [0, t]),
			update: function(dt) {
				this.time += dt;
				var vol = this.interp(this.time);
				if (vol == null) {
					that.volumeFader = null;
					that.stop();
				}
				else {
					that.setVolume(vol);
				}
			},
		};
	},
	play: function() {
		this.audio.src = this.filepath;
		this.setVolume(1);
		this.audio.play();
	},
};
