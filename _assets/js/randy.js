function Randy() {
	
}
Randy.characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890_-"
Randy.generate = function(){
	var id = [];
	for (var i = 22 - 1; i >= 0; i--) {
		var randomIndex = Math.floor(Math.random() * Randy.characters.length);
		id.push(Randy.characters[randomIndex])
	}
	return id.join("");
}