$(document).on('ready', start); 

	var user = $('#usernameBox');
	var message = $('#messageBox');
	var url = 'https://agile-plateau-2979.herokuapp.com/chat/main';

	
function start(e) {

	$('#chatRoom').hide();
	

	$("#myModal button").on('click', function() {
		$('#main').hide();
		$('#chatRoom').show();
	
	});

	$('#message-text').on('submit', onButtonClick);
	// var $messageText = $('#messageBox');
	// var $username = $('#usernameBox');

	function onButtonClick(e) {
		e.preventDefault();
		$.post(url, {name: user.val(), text: message.val(), room: ''});
		
		message.val('');
	}

	function getMessages() {
		$.get(url, onMessagesReceived,'json');
	}

	function onMessagesReceived(messageList) {
		console.log('success');
		$('#chat').scrollTop($('#chat').prop('scrollHeight'));
		var htmlString = ''; 
		for(var i=0; i<messageList.length; i++) {
			var message = messageList[i];
			if(message.hasOwnProperty('name') && message.hasOwnProperty('text') && message.hasOwnProperty('created_at')) {
				htmlString += '<div><span>'+message.name+':</span> '+message.text+message.created_at+'</div>';
			}
			
		}
		$('#chat').html(htmlString);

	}

	// setInterval("$('#chat').scrollTop($('#chat').prop('scrollHeight'))", 100);

	setInterval(getMessages, 500);

	getMessages();
}




