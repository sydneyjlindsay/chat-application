$(document).on('ready', start); 

	var user = $('#usernameBox');
	var message = $('#messageBox');
	var url = 'https://agile-plateau-2979.herokuapp.com/chat/main';

	
function start(e) {

	$('#chatRoom').hide();
	$('#leaderboard').hide();
	

	$("#myModal button").on('click', function() {
		$('#main').hide();
		$('#chatRoom').show();
	});

	$('#leaderboard-nav').on('click', function(){
		$('#main').hide();
		$('#chatRoom').hide();
		$('#leaderboard').show();
	});

	 $('.navbar-header a').on('click', function() {
	 	console.log('clickclicky');
	 	$('#main').hide();
		$('#chatRoom').show();
		$('#leaderboard').hide();
	
	 });


	$('#message-text').on('submit', onButtonClick);


	function onButtonClick(e) {
		e.preventDefault();
		$.post(url, {name: user.val(), text: message.val(), room: ''});
		
		message.val('');
	}

	function getMessages() {
		$.get(url, onMessagesReceived,'json');
	}

	function getTopUsers() {
		$.get(
			'https://agile-plateau-2979.herokuapp.com/stats/top_ten_users',
			onTopUsers,
			'json'
		);
	}

	function onMessagesReceived(messageList) {
		console.log('success');
		$('#chat').scrollTop($('#chat').prop('scrollHeight'));
		var htmlString = ''; 
		for(var i=0; i<messageList.length; i++) {
			var message = messageList[i];
			if(message.hasOwnProperty('name') && message.hasOwnProperty('text') && message.hasOwnProperty('created_at')) {
				htmlString += '<div><span>'+message.name+':</span> '+message.text+'</div><br>';
			}
			
		}
		$('#chat').html(htmlString);

	}

	function onTopUsers(leaderboardList) {
		var htmlString = '';
		for(var i=0; i<leaderboardList.length; i++) {
			var topUsers = leaderboardList[i];
			htmlString += '<div>'+'<h4>'+topUsers+'</h4>'+'</div>';	
		}

		$('#leader').html(htmlString);
	}	

	// setInterval("$('#chat').scrollTop($('#chat').prop('scrollHeight'))", 100);

	setInterval(getMessages, 500);

	getMessages();

	getTopUsers();
}




