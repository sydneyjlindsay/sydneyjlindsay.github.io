$(document).on('ready', start); 

	var user = $('#usernameBox');
	var message = $('#messageBox');
	var room = $('#roomnameBox').val();
	var url = 'https://agile-plateau-2979.herokuapp.com/chat/main';
	

	
function start(e) {

	$('.navbar-right a').hide();
	$('#chatRoom').hide();
	$('#leaderboard').hide();
	
	$("#myModal button").on('click', function() {
		$('#main').hide();
		$('#chatRoom').show();
		$('.room-one').hide(); 
		$('.room-two').hide(); 
		$('.navbar-right a').show();
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
		$('.room-one').hide(); 
		$('.room-two').hide(); 
	 });

	 $('.navbar-right a').on('click', function() {
	 	$('#main').show();
		$('#chatRoom').hide();
		$('#leaderboard').hide();
		$('.room-one').hide(); 
		$('.room-two').hide(); 
	 });

	 // $('#change-room').on('click', function() {
	 // 	$('#change-room li').addClass('active');
	 // 	if($target = $(this)) {
	 // 		room = $('#change-room').id();
	 // 	}
	 // 	console.log(room);
	 // 	$('#change-room li').removeClass('active')
	 // });



	$('#message-text').on('submit', onButtonClick);

	function onButtonClick(e) {
		e.preventDefault();
		$.post(url, {name: user.val(), text: message.val()});
		
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

	function getRecentUsers() {
		$.get(
			'https://agile-plateau-2979.herokuapp.com/stats/recent_users',
			onRecentUsers,
			'json'
		);
	}

	function getTopRooms() {
		$.get(
			'https://agile-plateau-2979.herokuapp.com/stats/top_ten_rooms',
			onTopRooms,
			'json'
		);
	}

	function onMessagesReceived(messageList) {
		console.log('success');
		$('#chat').scrollTop($('#chat').prop('scrollHeight'));
		var htmlString = ''; 
		for(var i=0; i<messageList.length; i++) {
			var message = messageList[i];
			if(message.name !== ('') && message.text !== ('') && message.hasOwnProperty('name') && message.hasOwnProperty('text')) {
				htmlString += '<div>'+message.text+'<p>'+'     '+message.name+', ' + moment(message.created_at).startOf('minute').fromNow()+'</p></div>';
			}
			
		}
		$('#chat').html(htmlString);

	}

	function onTopUsers(leaderboardList) {
		var htmlString = '';
		for(var i=0; i<leaderboardList.length; i++) {
			var topUsers = leaderboardList[i];
			htmlString += '<div>'+'<h4>'+topUsers.name+'</h4>'+' '+'<div class="badge">'+topUsers.count+'</div>'+'</div>';
		}

		$('#leaders').html(htmlString);
	}	

	function onRecentUsers(leaderboardList) {
		var htmlString = '';
		for(var i=0; i<leaderboardList.length; i++) {
			var recentUsers = leaderboardList[i];
			htmlString += '<div>'+'<h4>'+recentUsers.name+'</h4></div>';
		}

		$('#recent-users').html(htmlString);
	}	

	function onTopRooms(leaderboardList) {
		var htmlString = '';
		for(var i=0; i<leaderboardList.length; i++) {
			var topRooms = leaderboardList[i];
			htmlString += '<div>'+'<h4>'+topRooms.room+'</h4>'+'</div>';	
		}

		$('#room-leader').html(htmlString);
	}	

	// setInterval("$('#chat').scrollTop($('#chat').prop('scrollHeight'))", 100);

	setInterval(getMessages, 500);

	getMessages();

	getTopUsers();

	getTopRooms();

	getRecentUsers();
}




