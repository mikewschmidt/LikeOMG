

//Variables and Objects
var checkOptions = {
	id: "",
	checkedGlyph: "glyphicon-check",
	unCheckedGlyph: "glyphicon-unchecked",
	checkedBtnClass: "btn-success",
	unCheckedBtnClass: "btn-default"

};

/*
var genreHTMLText = "<label class=\"btn btn-default btn-sm tagButtons\"> \
                  <i class=\"glyphicon glyphicon-unchecked\"></i> \
                    <input type=\"checkbox\" \/> ";

                    <label class="btn btn-default btn-sm tagButtons">
	                  <i class="glyphicon glyphicon-unchecked"></i>
	                    <input type="checkbox" /> Pop 
	                </label>
*/

var genreHTMLText = $("#genreTags").html();
$("#demoTag").detach();


var genreListSmall = [
	"Pop","Rap","Rock","EDM",
    "Country", "Indie", "R&B", "Classical",
	"Jazz", "Raggae", "Latin", "Samba"
];

var queryList = [];
var playlistIndex = 0;

// This is the code for the check box tags
$(document).ready(function () {
	for (var i=0; i < genreListSmall.length; i += 1) {
		//console.log(genreHTMLText + genreListSmall[i] + "</label>");
		console.log(genreHTMLText);
		//var hText = genreHTMLText + genreListSmall[i] + "</label>";

		$("#genreTags").append(genreHTMLText);
		$("#demoTag").attr("id", genreListSmall[i])
		.find("span").text(genreListSmall[i]);
		//$("#"+genreListSmall[i]).text(genreListSmall[i]);
	};

	$("[type='checkbox']").on('change', function() {
		if ($(this).prop('checked')) {
			setChecked($(this));
            addQueryItem($(this).parent().text().trim());
		} else {
			setUnChecked($(this));
            removeQueryItem($(this).parent().text().trim());
		}
        
        //console.log(queryList.join("|"));
        search(queryList);
	});
    
    function addQueryItem(keyword) {
        queryList.push(keyword);
    }
    
    function removeQueryItem(keyword) {
        var i = queryList.indexOf(keyword);
        if (i != -1) {
            queryList.splice(i,1);
        }
    }
    
	

	//If the checkbox is already checked, then add the glyphicon-check class
	$("input:checked").prev().removeClass(checkOptions.unCheckedGlyph)
	.addClass(checkOptions.checkedGlyph);
	$("input:checked").parent().addClass('active');
	$("input:checked").parent().removeClass(checkOptions.unCheckedBtnClass)
	.addClass(checkOptions.checkedBtnClass);


});

// Code for the RATING BUTTONS
$(document).ready(function(){
   $("#sucks").on("click", function() {  
       nextVideo();
   });
    
    $("#cool").on("click", function() {
        nextVideo();
    });
    
    $("#awesome").on("click", function() {
        nextVideo();
    });
    
    $("#omg").on("click", function() {
        nextVideo();
    });
    
    $("#searchButton").on("click", function() {
        search();
    });
    
});

function setChecked(ctl) {
	$(ctl).prev().removeClass(checkOptions.unCheckedGlyph)
	.addClass(checkOptions.checkedGlyph);
	$(ctl).parent().removeClass(checkOptions.unCheckedBtnClass)
	.addClass(checkOptions.checkedBtnClass);
}

function setUnChecked(ctl) {
	$(ctl).prev().removeClass(checkOptions.checkedGlyph)
	.addClass(checkOptions.unCheckedGlyph);
	$(ctl).parent().removeClass(checkOptions.checkedBtnClass)
	.addClass(checkOptions.unCheckedBtnClass);
}

//////////////////////////////////////////////////////////
///////////  YOUTUBE SCRIPT //////////////////////////////
//////////////////////////////////////////////////////////
//  

///// Code from codecademy YouTube API course /////
// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
var playlistId = [];
var playlist = [];

function showResponse(response) {
    playlist, playlistId = []; //reset the playlist arrays
    playlistIndex = 0; //reset the index for the playlist
    for (var i in response.items) {
        if (response.items[i].id.videoId){
            o = {};
            playlist.push(o[response.items[i].id.videoId] = response.items[i].snippet.title);
            playlistId.push(response.items[i].id.videoId);
            console.log(o);
        }
        
    }
    
    // Here is a test
    var responseString = JSON.stringify(response.items, '', 2);
    //$('#search-container').html('<pre>' + responseString + '</pre>');
    for (i in playlistId) {
        $('#search-container').append(playlist[i] + '<br />');
    }
    
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyAPwlNg10JKuvBYPyr5sQBrzy_-xiDO-2Y');

    console.log("ApiKey Loaded");
}

function search(q) {
    //var q = $('#query').val();
    console.log(q.join("|"));
    if (q) {
        // Use the JavaScript client library to create a search.list() API call.
        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            q: q.join("|"), //can use NOT (-) and OR (|) operators. example: boating|sailing. NOT example: boating|sailing -fishing
            fields: "items(id, snippet(title))",
            topicID: "/m/04rlf",
            maxResults: 10,
            order: "viewCount",
            regionCode: "US",
            type: "video",
            videoEmbeddable: "true",
            relevanceLanguage: "en",
            videoCategoryId: "10"
        });
        
        // Send the request to the API server,
        // and invoke onSearchRepsonse() with the response.
        request.execute(onSearchResponse);    
    }
    
    
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}
///// Code from codecademy YouTube API course /////



// My api Key for my account
//var apiKey = 'AIzaSyAPwlNg10JKuvBYPyr5sQBrzy_-xiDO-2Y';






var customPlaylist = ["QdvLw2A00Bk", "gCYcHz2k5x0","oC-GflRB0y4","1y6smkh6c-0",
                   "KrVC5dm5fFc","p-Z3YrHJ1sU","9vMh9f41pqE"];


// New Test //
// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'QdvLw2A00Bk',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        //event.target.playVideo();
            //event.target.cuePlaylist(EDMplaylist,0,30);
            event.target.loadVideoById("QdvLw2A00Bk", 45);
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for 30 seconds and then stop.
      var done = false;
      var timeoutHandle;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.BUFFERING)  {
            clearTimeout(timeoutHandle)
        }
        if (event.data == YT.PlayerState.PLAYING && !done) {
            timeoutHandle = setTimeout(stopVideo, 30000);
            done = true;
            
        }
      }

      function stopVideo() {
        player.stopVideo();
      }
  
    // Increments the playlistIndex and plays the next YouTube video. 
    // if no more videos, a popup asks to restart the browser.
    // FUTURE: On the last video make another call for more videos
    function nextVideo() {
        done = false;
        if (playlistIndex <= playlistId.length-1){
            player.loadVideoById(playlistId[playlistIndex], 45);
            playlistIndex += 1;
        } else {
            $("#myModal").modal()
        }
        
    }

    // NOT IN USE. 
    function prevVideo() {
        player.previousVideo(); //This is for a playlist. I don't use playlists.
    }


function playVideo() {
      done = false;
      nextVideo();

}







///////////  OLD TEST //////////////////////////////////////////

/*
// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'xLP9r6JeNzk',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
*/

/*
	function loadNewList (event) {
		console.log("Inside of the loadNewList");
			player.loadPlaylist({
				list: "funny cats",
				listType: "search",
				index: 0,
				startSeconds: 0,
				suggestedQuality: "default"
			});
			done = false;
			event.target.playVideo();
	}
	*/
