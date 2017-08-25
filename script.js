$(document).ready(function(){

	$(this).searchRandomPage();

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

	$('#random').click(function(){
		$(document).searchRandomPage();
	});

});

$.fn.searchRandomPage = function () {
	let language = $('#language').val();
	if(language == undefined){
		language = "en";
	}

	$.getJSON("https://" + language + ".wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0",
	 function(data) {
        try{
        	var queryRandomPage = data.query.pages;
	        var queryRandomPageKey = Object.keys(queryRandomPage)[0];
	        var title = queryRandomPage[queryRandomPageKey]["title"];
             if(title != undefined){
	        	    $('#title').html(title);
	        	}
	        	else{
	        		$('#title').html("Nothing");
	        	}
        }
        catch (err) {
             $('#title').html(err.message);
        }
        
       $(document).searchPage(title);
   }); 
}

$.fn.searchPage = function (title) {
	let language = $('#language').val();

	if(language == undefined){
		language = "en";
	}
     $.getJSON("https://" + language + ".wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + title,
       function(data){
	        try{
	        	var queryPage = data.query.pages;
	       		var queryPagesKey = Object.keys(queryPage)[0];
	        	var wikiContent = queryPage[queryPagesKey]["extract"];
	        	if(wikiContent != undefined &&
	        	   wikiContent != "" &&
	        	   wikiContent.search('From other capitalisation') < 0 && 
	        	   wikiContent.search('may refer to') < 0 ){
	        	    $('#text').html(wikiContent);
	        	}
	        	else{
	        		$('#text').html("There is nothing. You have to choose another page!");
	        	}
	        }
	        catch (err) {
	        	$('#text').html("There is nothing. You have to choose another page!");
	            console.log(err.message);
	        }
	 	});
}


