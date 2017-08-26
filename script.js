$(document).ready(function(){

	$('#submit').prop('disabled', true);
    $('#search').on("keyup focus mousedown", function(){
        $('#submit').prop('disabled', this.value == "" ? true : false);     

        if(event.which == 13 &&
		   !$('#submit').attr('disabled')){
				$('#submit').click();
		}
    });

	$(this).searchRandomPage();

	$('#submit').click(function(){
		let title = $('#search').val();
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
        	let queryRandomPage = data.query.pages;
	        let queryRandomPageKey = Object.keys(queryRandomPage)[0];
	        var title = queryRandomPage[queryRandomPageKey]["title"];
             if(title == undefined){
	        		$('#title').html("Nothing");
	        }
        }
        catch (err) {
              console.log(err.message);
        }
        
        let random = true;
        $(document).searchPage(title, random);
   }); 
}

$.fn.searchPage = function (title, random=false) {
	let language = $('#language').val();

	if(language == undefined){
		language = "en";
	}
     $.getJSON("https://"+language+".wikipedia.org/w/api.php?format=json&action=query&prop=extracts&limit=1&exintro=&explaintext=&titles="+title,
       function(data){
	        try{
	        	let queryPage = data.query.pages;
	       		let queryPagesKey = Object.keys(queryPage)[0];
	        	let wikiContent = queryPage[queryPagesKey]["extract"];
	        	if(wikiContent != undefined &&
	        	   wikiContent != "" &&
	        	   wikiContent.search('From other capitalisation') < 0 && 
	        	   wikiContent.search('From a miscapitalisation') < 0 && 
	        	   wikiContent.search('may refer to') < 0 ){
	        	   	   $('#title').html(title);
	        	       $('#text').html(wikiContent);
	        	}
	        	else if(random){
	        	    $('#random').click();
	        	}
	        	else{
	        		$("#content").emptyPageOccurring();
	        	}
	        }
	        catch (err) {
	        	$("#content").emptyPageOccurring();
	            console.log(err.message);
	        }
	 	});



     $('#search').val("").focus().takingImage(title,language);
}

$.fn.emptyPageOccurring = function(){
	$('#title').html("Nothing");
	$('#text').html("There is nothing. You have to choose another page!");
	$('#text').append("<button class='random'>Random Page</button>");
	$('.random').click(function(){
			$(document).searchRandomPage();
	});
}

$.fn.takingImage = function(title, language){
	 $.getJSON("https://"+language+".wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=80&format=json&titles="+title,
	 	function(data){
	 		try{
		 		let queryPage = data.query.pages;
		       	let queryPagesKey = Object.keys(queryPage)[0];
		        let thumbnail = Object.keys(queryPage[queryPagesKey])[3];
		        let source = Object.keys(queryPage[queryPagesKey][thumbnail])[0];
		        let image = queryPage[queryPagesKey][thumbnail][source];
		        $('#image').css("display", "block");
	    		$("#image").attr("src", image);
	   		 }
	   		 catch(err){
	   		 	$('#image').css("display", "none");
	   		 }
	 	});
}