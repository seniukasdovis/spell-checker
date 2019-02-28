const fs = require('fs')
const functions = require('./functions.js') //ADDITIONAL FUNCTIONALITY

//COMMAND LINE ARGUMENTS STORED IN AN ARRAY
const args = process.argv

//BASED ON ARGS LENGTH WHICH ARGUMENT IS WHICH
const DICTIONARY = (args.length === 4) ? args[2] : 'Dictionary/dict.txt'
const TEXT       = (args.length === 4) ? args[3] : args[2]

if(args.length !== 3 && args.length !== 4 ) {
	console.log("Usage: node speller [dictionary] text-file")
	return
}

fs.readFile(DICTIONARY, 'utf8', (err, dictionary) => {

	const WORDS = new Set(dictionary.split('\n').map(x => x.toLowerCase()))

	//MAP OBJECT TO DETERMINE MOST COMMONLY USED WORD IN THE TEXT
	const wordsFrequency = new Map()

	fs.readFile(TEXT, 'utf8', (err, data) => {

		//ANYTHING THAT IS NOT DIGIT, LETTER, WHITESPACE REGEX
		const reg = /[^\w\s]/g

		//STRIPPING OFF PUNCTUATION AND SPLITTING INTO AN ARRAY TEXT THAT WAS PASSED AS A COMMAND LINE ARG
		const textWords = data.replace(reg, '').replace(/\n/g, ' ').split(' ')

		//COUNT OF MISSPELLED WORDS
		let count = 0
		const misspelledWords = []

		textWords
			.filter(functions.isCheckable)
			.forEach( (word) => {
			const fixedWord = word.trim().toLowerCase()

			if(!wordsFrequency.has(fixedWord)) {
				wordsFrequency.set(fixedWord, 1)
			} else {
				wordsFrequency.set(fixedWord, wordsFrequency.get(fixedWord) + 1)
			}

			//IF A WORD DOES NOT APPEAR IN A DICTIONARY, LET'S SAY IT IS MISSPELLED :)
			if(!WORDS.has(fixedWord)) {
				count = count + 1
				misspelledWords.push(fixedWord)
			}
		})

		console.log('\t*************************************************************\n')
		console.log(`\tMisspelled words amount: ${count}`)
		console.log(`\tMisspelled words: ${misspelledWords}`)
		console.log(`\tMost frequently used word[s]: ${functions.frequency(wordsFrequency)}`)
		console.log(`\tTotal characters in a text file: ${data.length}`)
		console.log(`\tTotal words in a text file: ${textWords.length}`)
		console.log(`\tWords in a dictionary: ${WORDS.size}\n`)
		console.log('\t*************************************************************')
	})
})
