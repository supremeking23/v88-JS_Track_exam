class Shape {
	constructor(y, x, shapeColor) {
		this._y = y;
		this._x = x;
		this._shapeColor = shapeColor;
	}

	generateRandomRadius = function (min, max) {
		return Math.abs(Math.floor(Math.random() * (min - max) + min));
	};

	display() {
		return `<div class="shapes" style="position:absolute; top: ${this._y - 40}px; left: ${
			this._x - 80
		}px;  width: 200px; height: 200px; border-radius:50%; background-color: ${
			this._shapeColor
		};color:#000"><p style="position: absolute;right: 80px;top: 90px;">Mavis</p></div>`;
	}
}
