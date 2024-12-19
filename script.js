const main = document.getElementById('container')

for (let i = 0; i < 6; i++) {
	let boxContainer = document.createElement('div')
	boxContainer.classList.add('boxContainer')
	main.appendChild(boxContainer)

	for (let j = 0; j < 6; j++) {
		let box = document.createElement('div')
		box.classList.add('box')
		box.id = `${i}-${j}`
		boxContainer.appendChild(box)
	}
}

const letters = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
]

let currentWord = []

let currentRow = 0

let checking = false

let winningWord = 'nigger' // tak to jest hasło do zgadniecia dokladnie ale na chuj patrzysz w pliki

let czterypierwszeslowa = ['really', 'naives', 'nugget', 'nagger']

let normalMode = false;

let won = false;

document.addEventListener('keydown', e => {
	if (currentRow < 6 && !won) {
		if (letters.includes(e.key.toLocaleLowerCase()) && currentWord.length < 6) {
            if (normalMode || currentRow > 3) {
                currentWord.push(e.key)
            } else {
                currentWord.push(czterypierwszeslowa[currentRow][currentWord.length])
            }
			updateBoard()
		} else if (e.key === 'Backspace' && currentWord.length > 0) {
			currentWord.pop()
			updateBoard(true)
		} else if (e.key === 'Enter' && currentWord.length === 6 && !checking) {
			checkWord()
			checking = true
		}
	}
})

const updateBoard = deleting => {
	if (!deleting) {
		const box = document.getElementById(`${currentRow}-${currentWord.length - 1}`)
		box.innerHTML = currentWord[currentWord.length - 1]
		box.classList.toggle('haveletter')
		box.classList.toggle('pop')
	} else {
		const box = document.getElementById(`${currentRow}-${currentWord.length}`)
		box.innerHTML = ''
		box.classList.toggle('haveletter')
		box.classList.toggle('pop')
	}
}

async function checkWord() {
	let temp = [...winningWord]
	for (let i = 0; i < 6; i++) {
		let box = document.getElementById(`${currentRow}-${i}`)
		box.classList.toggle('pop')
		box.classList.toggle('rotate')
		if (currentWord[i] === winningWord[i]) {
			box.classList.toggle('correct')
		} else if (temp.includes(currentWord[i])) {
			let j = 0
			while (j < temp.length) {
				if (temp[j] == currentWord[i]) {
					temp.splice(j, 1)
					break
				}
				j++
			}
			box.classList.add('almost')
		} else {
			box.classList.add('wrong')
		}
		await new Promise(r => setTimeout(r, 300))
		box.classList.toggle('rotate')
	}

    console.log(currentWord.join(""), winningWord)
    if (currentWord.join("") == winningWord) {
        won = true
    }

    if (!normalMode && currentRow == 3) {
        playTheThing()
    }

	currentWord = []
	currentRow++
	checking = false
}

async function dekupopdemnem () {
    const goldscar = document.createElement("div")
    goldscar.classList.add("goldscar")
    document.body.appendChild(goldscar)

    goldscar.classList.toggle("pop")
    await new Promise(r => setTimeout(r, 3000))
    goldscar.classList.toggle("pop")

    document.body.removeChild(goldscar)
}

async function playTheThing() {
    const music = new Audio();
    music.src = 'iwastheknightinshiningarmorinyourmovie.mp3'
    music.volume = 0.2;
    music.play()


    await new Promise(r => setTimeout(r, 3000))
    dekupopdemnem()
    await new Promise(r => setTimeout(r, 3000))
    while (!won) {
        await new Promise(r => setTimeout(r, 3000))
        dekupopdemnem()
    }
    music.pause();
    music.currentTime = 0;
    showWon()
}

function showWon () {
    document.querySelector(".goldscar")?.remove()
    let win = document.getElementById("win")
    win.style.opacity = 1;
    let win2 = document.getElementById("win2")
    win2.style.top = 0;

    let vid = document.getElementById("goldscarvid")
    vid.play()
}

document.getElementById("close").addEventListener("click", () => {
    let win = document.getElementById("win")
    win.style.opacity = 0;
    let win2 = document.getElementById("win2")
    win2.style.top = 1;
    let vid = document.getElementById("goldscarvid")
    vid.pause()
})