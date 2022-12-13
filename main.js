const goodImages = ['jesus1 small.jpg', 'jesus2 small.jpg'];
const badImages = [
	'santa small.jpg',
	'xmas presents 1 small.jpg',
	'xmas tree 1 small.png',
];
const numCells = 6 * 6;
let score = 0;

function load() {
	document.getElementById('score').innerText = score;
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
				div.innerHTML = null;
				div.style.cursor = null;
				const img2 = new Image();
				if (goodImages.includes(imgSrc.substring('img/'.length))) {
					score++;
					img2.src = 'img/mushroom-cloud.gif';
				} else {
					score = Math.max(0, score - 1);
					img2.src = 'img/Sad-Santa small.jpg';
				}
				div.appendChild(img2);
				setTimeout(() => {
					div.innerHTML = null;
				}, 1800);
				document.getElementById('score').innerText = score;
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
