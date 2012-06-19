var turn = 'x';
var x_score = 0;
var o_score = 0;
var board = null;

var check = function() {
	for(var y = 0; y < 3; ++y) {
		var first = board[y][0].text();
		if(first.length) {
			var same = true;
			for(var x = 1; x < 3; ++x) {
				if(first != board[y][x].text()) {
					same = false;
					break;
				}
			}
			if(same) return first;
		}
	}
	for(var x = 0; x < 3; ++x) {
		var first = board[0][x].text();
		if(first.length) {
			var same = true;
			for(var y = 1; y < 3; ++y) {
				if(first != board[y][x].text()) {
					same = false;
					break;
				}
			}
			if(same) return first;
		}
	}
	if(board[1][1].text().length && (board[0][0].text() == board[1][1].text() && board[1][1].text() == board[2][2].text()) || (board[0][2].text() == board[1][1].text() && board[1][1].text() == board[2][0].text())) return board[1][1].text();
	return false;
};

var clear = function() {
	for(var y = 0; y < 3; ++y) {
		for(var x = 0; x < 3; ++x) {
			board[y][x].text('');
		}
	}
}

var update_score = function(x_score, o_score) {
	$("#cross").text(x_score);
	$("#zero").text(o_score);
}

$(function() {
	board = [
		[$("#tl"), $("#tc"), $("#tr")],
		[$("#cl"), $("#cc"), $("#cr")],
		[$("#bl"), $("#bc"), $("#br")]
	];

	$("#board a").click(function(event) {
		event.preventDefault();
		var target = $(event.target);
		if(!target.text().length) {
			target.text(turn);
			if(turn == 'x') turn = 'o';
			else turn = 'x';
			var result = check();
			if(result) {
				if(result == 'x') ++x_score;
				else ++o_score;
				clear();
				update_score(x_score, o_score);
			}
		}
	});
});
