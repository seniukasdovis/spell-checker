
module.exports = {

	frequency: function(iterable) {

		let max = 0
		const arr = []

		for(let value of iterable.values()) {
			if(value > max){
				max = value
			}
		}

		for(let [key, value] of iterable) {
			if(value === max) {
				arr.push(key)
			}
		}

		return `${arr} --- (${max} occurences each)`
	},

	isCheckable: function(word) {
		return word.length !== 0
		       && !word.includes(' ')
		       && isNaN(word)
	}

}
