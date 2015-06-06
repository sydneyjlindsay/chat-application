$(document).on('ready', start); 

function start(e) {

	$('#myModal').modal('show');

	$('#input-form').on('submit', onButtonClick);
	var $messageText = $('#messageBox');
	var $username = $('#usernameBox');

	function onButtonClick(e) {
		e.preventDefault();

		$.post(
			'https://agile-plateau-2979.herokuapp.com/main', 
			{name: $username.val(), text: $messageText.val()}
		);
		$messageText.val('');
		
	}

	function getMessages() {
		$.get('https://agile-plateau-2979.herokuapp.com/main', 
			onMessagesReceived, 
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
				htmlString += '<div><span>'+message.name+':</span> '+message.text+message.created_at+'</div>';
			}
			
		}
		$('#chat').html(htmlString);

	}

	// setInterval("$('#chat').scrollTop($('#chat').prop('scrollHeight'))", 100);

	setInterval(getMessages, 500);

	getMessages();
}



