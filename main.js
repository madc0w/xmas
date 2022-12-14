const goodImages = [
	'jesus1 small.jpg',
	'jesus2 small.jpg',
	'Jesus3 small.jpg',
	'jesus on a dino small.webp',
	'jesus on a dino 2 small.png',
];
const badImages = [
	'santa small.jpg',
	'xmas presents 1 small.jpg',
	'xmas tree 1 small.png',
	'seasons greetings small.jpg',
	'happy holidays small.webp',
	'jingle-bells small.jpg',
	'snowflake small.jpg',
	'st nic small.png',
];
const sounds = {
	gameOver: new Audio('sounds/xmas at ground zero.mp3'),
	nuke: new Audio('sounds/nuke.mp3'),
	badClick: new Audio('sounds/naughty naughty.mp3'),
};

const goodRatio = 0.2;
const numCells = 6 * 6;
const maxScore = 12;

let score = 0;
let mainLoopIntervalId;

function load() {
	document.body.addEventListener('keyup', (e) => {
		if (e.code == 'Escape') {
			closeModals();
		}
	});

	showScore();
	document.getElementById('max-score').innerText = maxScore;
	const grid = document.querySelector('#grid');
	for (let i = 0; i < numCells; i++) {
		const div = document.createElement('div');
		div.id = `cell-${i}`;
		// div.style.backgroundSize = '100px 100px';
		grid.appendChild(div);
		div.addEventListener('mousedown', () => {
			// console.log(div.style.backgroundImage);
			const img = div.firstChild;
			if (img) {
				const imgSrc = img.getAttribute('src');
				div.innerHTML = null;
				div.style.cursor = null;
				const img2 = new Image();
				if (goodImages.includes(imgSrc.substring('img/'.length))) {
					play('nuke');
					score++;
					img2.src = 'img/mushroom-cloud.gif';
					// img2.style.position = 'relative';
					let sizeFactor = 1;
					let opacity = 100;
					const intervalId = setInterval(() => {
						img2.style.opacity = `${opacity}%`;
						img2.style.width = `${72 * sizeFactor}px`;
						img2.style.height = `${72 * sizeFactor}px`;
						img2.style.marginTop = `-${36 * (sizeFactor - 1)}px`;
						img2.style.marginLeft = `-${36 * (sizeFactor - 1)}px`;
						opacity -= 1;
						sizeFactor *= 1.008;
						if (opacity < 40) {
							clearInterval(intervalId);
						}
					}, 20);

					if (score >= maxScore) {
						clearInterval(mainLoopIntervalId);
						play('gameOver');
						document
							.getElementById('game-over-modal')
							.classList.remove('hidden');
					}
				} else {
					play('badClick');
					score = Math.max(0, score - 1);
					img2.src = 'img/Sad-Santa small.jpg';
				}
				div.appendChild(img2);
				setTimeout(() => {
					div.innerHTML = null;
				}, 1800);
				showScore();
			}
		});
	}

	mainLoopIntervalId = setInterval(showImage, 400);
}

function showImage() {
	const cellIndex = Math.floor(Math.random() * numCells);
	const div = document.getElementById(`cell-${cellIndex}`);
	if (div.firstChild) {
		return showImage();
	}

	const images = Math.random() < goodRatio ? goodImages : badImages;
	const imageIndex = Math.floor(Math.random() * images.length);
	const image = images[imageIndex];

	const img = new Image();
	img.src = `img/${image}`;
	let opacity = 20;
	img.style.opacity = `${opacity}%`;
	const intervalId = setInterval(() => {
		img.style.opacity = `${opacity}%`;
		opacity += 4;
		if (opacity >= 100) {
			clearInterval(intervalId);
		}
	}, 20);
	// div.style.backgroundImage = `url(img/${image})`;
	// console.log('div.style', div.style);
	div.appendChild(img);

	// div.style.cursor = 'url("img/x.ico"), pointer';
	div.style.cursor = 'pointer';
	setTimeout(() => {
		if (
			!['img/Sad-Santa small.jpg', 'img/mushroom-cloud.gif'].includes(
				div.firstChild?.getAttribute('src')
			)
		) {
			div.style.cursor = null;
			div.innerHTML = null;
		}
	}, 1200);
}

function closeModals() {
	const modals = document.getElementsByClassName('modal');
	for (const modal of modals) {
		modal.classList.add('hidden');
	}
}

function showScore() {
	for (const el of document.getElementsByClassName('score')) {
		el.innerText = score;
	}
}

function play(soundName) {
	for (const key in sounds) {
		sounds[key].pause();
		sounds[key].currentTime = 0;
	}
	sounds[soundName].play();
}

function playAgain() {
	location.href = location.href;
}
