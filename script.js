$(document).ready(function(){
	$(document).searchRandomPage();

	$("#search").keydown(function(event){
		if(event.which == 13){
			$('#submit').click();
		}
	})

	$('#submit').click(function(){
		let title = $('#search').val();
		$('#title').html(title);
		$(document).searchPage(title);
	});
});

$.fn.searchRandomPage = function () {
	$.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0",
	 function(data) {
        try{
        	var queryRandomPage = data.query.pages;
	        var queryRandomPageKey = Object.keys(queryRandomPage)[0];
	        var title = queryRandomPage[queryRandomPageKey]["title"];
             $('#title').html(title);
        }
        catch (err) {
             $('#title').html(err.message);
        }
        
       $(document).searchPage(title);
   }); 
}

$.fn.searchPage = function (title) {
      $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + title,
       function(data){
	        try{
	        	var queryPage = data.query.pages;
	       		var queryPagesKey = Object.keys(queryPage)[0];
	        	var wikiContent = queryPage[queryPagesKey]["extract"];
	        	console.log(wikiContent);
	        	if(wikiContent != undefined){
	        	    $('#text').html(wikiContent);
	        	}
	        	else{
	        		$('#text').html("Nothing");
	        	}
	        }
	        catch (err) {
	            $('#text').html(err.message);
	        }
	 	});
}


