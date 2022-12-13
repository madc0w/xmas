const goodImages = ['jesus1 small.jpg', 'jesus2 small.jpg'];
const badImages = [
	'santa small.jpg',
	'xmas presents 1 small.jpg',
	'xmas tree 1 small.png',
];
const numCells = 6 * 6;
let score = 0;

function load() {
	const grid = document.querySelector('#grid');
	for (let i = 0; i < numCells; i++) {
		const div = document.createElement('div');
		div.id = `cell-${i}`;
		// div.style.backgroundSize = '100px 100px';
		grid.appendChild(div);
		div.addEventListener('click', () => {
			// console.log(div.style.backgroundImage);
			const img = div.firstChild;
			if (img) {
				const imgSrc = img.getAttribute('src');
				if (goodImages.includes(imgSrc.substring('img/'.length))) {
					score++;
				} else {
					score--;
					score = Math.max(0, score);
				}
				document.getElementById('score').innerText = score;
				div.innerHTML = null;
				div.style.cursor = null;
			}
		});
	}

	setInterval(showImage, 400);
}

function showImage() {
	const cellIndex = Math.floor(Math.random() * numCells);
	const div = document.getElementById(`cell-${cellIndex}`);
	if (div.firstChild) {
		return showImage();
	}

	const images = Math.random() < 0.2 ? goodImages : badImages;
	const imageIndex = Math.floor(Math.random() * images.length);
	const image = images[imageIndex];

	const img = new Image();
	img.src = `img/${image}`;
	// div.style.backgroundImage = `url(img/${image})`;
	// console.log('div.style', div.style);
	div.appendChild(img);
	div.style.cursor = 'pointer';
	setTimeout(() => {
		div.style.cursor = null;
		div.innerHTML = null;
	}, 1200);
}
