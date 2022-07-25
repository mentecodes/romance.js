//So to start, write a function that accepts a string and returns an array of the words in the string, uniformly formatted with no numbers or punctuation.

let song = "No es vida de rico Pero se pasa bien rico Y si en la casa no alcanza Pa'l aire, te pongo abanico Yo no tengo pa' darte ni un peso Pero sí puedo darte mis besos Pa' sacarte yo tengo poquito Pero es gratis bailar pega'ito' Yo no tengo pa' abrirte champaña Pero sí cervecita en la playa Aunque es poco lo que yo te ofrezco, con orgullo Todo lo que tengo es tuyo";
let numberOfLines = 16; //standardizing for every user 
let lengthOfWords = 6; //standardizing for every user 

function chooseRandomWord(array){
    let index = Math.floor(array.length * Math.random());
	return array[index];
}

function parseSong(song){
	return song.toLowerCase().replace(/[^a-z-'\s]/ig, "").split(' ');
}

//@@@Now we need to write a function that uses that array of words to generate a Markov Chain. Remember, for our project the Markov Chain will be a dictionary of all the unique words in our corpus, and an array of all the words that follow it.

function generateLyrics(parsedSong){
	let lyrics = [];
	for (let i = 0; i < parsedSong.length - 1; i++){
		let key = parsedSong[i]; //where we are
		let value = parsedSong[i + 1]; //next word we want to add
        lyrics[key] = [value]; 
	}
	return lyrics;
};



//Create a function writeLine that takes a Markov Chain (object) and a length of words n and returns a line of poetry.
//writeLine will need a helper function that takes a word and randomly chooses a word from its Markov Chain array. The JS methods Math.random() and Math.floor() will be quite helpful here. When a word has no entries in it's Markov Chain, the program should choose a new word and continue the line until it meets the word count.

function writeLine(lyrics){
	let verse = "";
	let word = chooseRandomWord(Object.keys(lyrics));
	for (let i = 0; i < lengthOfWords; i++){
        word = chooseRandomWord(lyrics[word]); //choosing from the array
        verse += word + ' '; //adding verse to a string
		if (!lyrics[word]) //this is helping to push another word should the last word just end
			word = chooseRandomWord(Object.keys(lyrics));
	}
	return verse;
};




//With our writeLine function, we can now write our broader generatePoem function

function generatePoem(song, numberOfLines){
	let parsedSong = parseSong(song); 
	let lyrics = generateLyrics(parsedSong);
	let pushedLyrics = "";
	for (let i = 0; i < numberOfLines; i++){
		pushedLyrics += finalPush(writeLine(lyrics)) + '\n';
		if (i % 4 === 3)
        pushedLyrics += '\n';
	};
	console.log(pushedLyrics);
}


function finalPush(verse){
	return verse[0].toUpperCase() + verse.slice(1);
}

generatePoem(song, numberOfLines);