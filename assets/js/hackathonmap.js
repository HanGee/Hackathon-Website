$(function() {
	var listUrl = 'https://spreadsheets.google.com/feeds/list/1wt8JVUmTEmwBPRqPI_ZjMxjjNNDNpcLUGwxhCXzJlHY/otnjarj/public/values?alt=json&orderby=startdate';
	$.getJSON(listUrl, function(data) {
		for (var index in data.feed.entry) {
			var event = data.feed.entry[index];

			var $item = $('<li class="list-item">');
			var $content = $('<div>');
			var $startdate = $('<span>');
			var $name = $('<span>');
			var $register = $('<span>');
			var $registerLink = $('<a>');
			var $link = $('<a>');

			$startdate.addClass('label label-success').text(event['gsx$startdate'].$t.split(' ')[0]);

			$name.text(event['gsx$name'].$t);
			var link =  event['gsx$website'].$t;

			if (link)
				$link.attr('href', event['gsx$website'].$t);
			else
				$link.attr('href', event['gsx$registration'].$t);

			$link.append($name);

			$register.addClass('label label-default').text('線上報名');
			$registerLink
				.attr('href', event['gsx$registration'].$t)
				.append($register);

			$content
				.append($startdate)
				.append(' ')
				.append($link)
				.append(' ')
				.append($registerLink);

			$item.append($content);
			$('#hackathon-list').append($item);
		}
	});
});
