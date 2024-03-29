$(function() {
	var check = function(board) {
		for(var y = 0; y < 3; ++y) {
			var first = board[y][0];
			if(first) {
				var same = true;
				for(var x = 1; x < 3; ++x) {
					if(first != board[y][x]) {
						same = false;
						break;
					}
				}
				if(same) return first;
			}
		}

		for(var x = 0; x < 3; ++x) {
			var first = board[0][x];
			if(first) {
				var same = true;
				for(var y = 1; y < 3; ++y) {
					if(first != board[y][x]) {
						same = false;
						break;
					}
				}
				if(same) return first;
			}
		}

		if(board[1][1] &&
			(board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
			(board[0][2] == board[1][1] && board[1][1] == board[2][0]))
				return board[1][1];

		var tie = true;
		for(var y = 0; y < 3; ++y) {
			for(var x = 0; x < 3; ++x) {
				if(!board[y][x]) {
					tie = false;
					break;
				}
			}
		}
		if(tie) return "tie";

		return false;
	};

	var clear = function(board) {
		$("#board").addClass("animated wiggle");
		for(var y = 0; y < 3; ++y) {
			for(var x = 0; x < 3; ++x) {
				board[y][x] = false;
			}
		}
	}

	var update = function(data) {
		$("#x").text(data.score.x);
		$("#o").text(data.score.o);
		for(var y = 0; y < 3; ++y) {
			for(var x = 0; x < 3; ++x) {
				var element = $("#" + y + x);
				var value = data.board[y][x];
				if(value) element.text(value);
				else element.text("");
			}
		}
		localStorage.setItem("data", JSON.stringify(data));
	}

	var initial = function() {
		return {
			"turn": "x",
			"score": {"x": 0, "o": 0},
			"board": [
				[false, false, false],
				[false, false, false],
				[false, false, false]
			]
		};
	}

	var data = localStorage.getItem("data");
	if(!data) data = initial();
	else data = JSON.parse(data);
	update(data);

	$("#board div").click(function(event) {
		window.getSelection().removeAllRanges();
		event.preventDefault();
		event.stopPropagation();
		$("#board").removeClass();
		$(event.target).addClass("animated wiggle");
		var id = event.target.id;
		var y = parseInt(id[0]);
		var x = parseInt(id[1]);
		if(!data.board[y][x]) {
			data.board[y][x] = data.turn;
			if(data.turn == "x") data.turn = "o";
			else data.turn = "x";
			var result = check(data.board);
			if(result) {
				if(result == "x") ++data.score.x;
				else if(result == "o") ++data.score.o;
				clear(data.board);
				$("#board div").removeClass("animated wiggle");
			}
			update(data);
		}
	});

	$("#reset").click(function(event) {
		event.preventDefault();
		data = initial();
		update(data);
	});
});
