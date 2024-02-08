const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const bgmusic = new Audio("./assets/audio/music.mp3");
const gameover = new Audio("./assets/audio/gameover.mp3");

bgmusic.volume = 0.5;
bgmusic.play();

let cross = true;
let score = 0;
let gameState = true;
enemy.classList.add("enemy-attack");

function doJump() {
	player.classList.add("jump-player");
	setTimeout(function () {
		player.classList.remove("jump-player");
	}, 1000);
}
function doRigh() {
	let playerX = parseInt(
		window.getComputedStyle(player, null).getPropertyValue("left")
	);
	if (window.innerWidth < 768) {
		if (playerX < 270) {
			player.style.left = playerX + 50 + "px";
		}
	} else {
		if (playerX < 1100) {
			player.style.left = playerX + 112 + "px";
		}
	}
}
function doLeft() {
	let playerX = parseInt(
		window.getComputedStyle(player, null).getPropertyValue("left")
	);
	if (playerX > 20) {
		if (window.innerWidth < 768) {
			player.style.left = playerX - 50 + "px";
		} else {
			player.style.left = playerX - 112 + "px";
		}
	}
}

const controlloer = () => {
	document.onkeydown = function (e) {
		console.log(e.key, e.code);
		if (
			(e.key === " " && e.code === "Space") ||
			(e.key === "w" && e.code === "KeyW") ||
			e.key === "ArrowUp"
		) {
			doJump();
		}

		if (e.key === "ArrowRight" || (e.key === "d" && e.code === "KeyD")) {
			doRigh();
		}

		if (e.key === "ArrowLeft" || (e.key === "a" && e.code === "KeyA")) {
			doLeft();
		}
	};
};

const userAgent = navigator.userAgent;

// /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     userAgent
// ) ||

if (window.innerWidth < 768) {
	// The user is on a mobile device.
	const left = document.getElementById("left");
	const right = document.getElementById("right");
	const jump = document.getElementById("jump");

	left.addEventListener("click", () => {
		doLeft();
	});
	right.addEventListener("click", () => {
		doRigh();
	});
	jump.addEventListener("click", () => {
		doJump();
	});
} else {
	// The user is on a desktop device.
	document.getElementById("control-for-mobile").style.display = "none";
	controlloer();
}

if (gameState) {
	setInterval(() => {
		const px = parseInt(
			window.getComputedStyle(player, null).getPropertyValue("left")
		);
		const py = parseInt(
			window.getComputedStyle(player, null).getPropertyValue("top")
		);

		const ex = parseInt(
			window.getComputedStyle(enemy, null).getPropertyValue("left")
		);
		const ey = parseInt(
			window.getComputedStyle(enemy, null).getPropertyValue("top")
		);

		const offsetX = Math.abs(px - ex);
		const offsetY = Math.abs(py - ey);
		let chackOFsetX;
		let chackOFsetY;
		if (window.innerWidth < 768) {
			chackOFsetX = 15;
			chackOFsetY = 10;
		} else {
			chackOFsetX = 73;
			chackOFsetY = 52;
		}

		if (offsetX < chackOFsetX && offsetY < chackOFsetY) {
			gameover.play();
			setTimeout(() => {
				gameover.pause();
			}, 800);
			enemy.classList.remove("enemy-attack");
			document.getElementById("game-over").innerHTML =
				"Game Over - Reload or press Space to Play Again";
			gameState = false;
			document.onkeydown = function (e) {
				if (e.key === " " && e.code === "Space") {
					window.location.reload();
				}
			};
		} else if (offsetX < chackOFsetX * 2 && cross) {
			score += 10;
			setTimeout(() => {
				updateScore(score);
			}, 100);
			cross = false;
			setTimeout(() => {
				cross = true;
			}, 1000);
			setTimeout(() => {
				let aniDur = parseFloat(
					window
						.getComputedStyle(enemy, null)
						.getPropertyValue("animation-duration")
				);
				let newDur = aniDur - 0.1;
				enemy.style.animationDuration = newDur + "s";
			}, 800);
		}
	}, 100);
}

const updateScore = (score) => {
	document.getElementById("score-value").innerText = score;
};
