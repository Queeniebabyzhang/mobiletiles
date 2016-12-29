window.onload=function(){
	var setButton = document.getElementById('setimg');
	var firstDiv = document.getElementById('firstDiv');
	var secondDiv = document.getElementById('secondDiv');
	var doneButton = document.getElementById('doneButton');
	setButton.onclick = function(){
		firstDiv.style.display = "none";
		secondDiv.style.display = "block";
		document.body.style.background = "#E0E0E0";
		document.body.style.transition = "ease-in 0.5s";
	}
	
	var $newsListDiv = $('#newsListDiv');
	$newsListDiv.sortable({ 
        opacity: 0.8,   
        cursor: 'move',  
        handle: '.stackimg2', 
    }); 
	
	$.ajaxSetup({
		async:false
	});
	
	var captionList = new Array();
	var urlList = new Array();
    var oDiv = document.getElementsByClassName("checkimg");
	var caption;
	var url;
	var index;
	$.getJSON("json/tiles.json", function(data){
		for(var i=0;i<32;i++){
			caption = data["Tiles"][i]["Caption"];
			url = data["Tiles"][i]["TileProperties"]["HomeURL"];
			captionList.push(caption);
			urlList.push(url);
			oDiv[i].urlattribute = url;
		 }
	});
	
    $.ajaxSetup({
		async:true
	});
	
	for(var i=0;i<32;i++){
		var captionid = "caption" + (i+1);
		var tmp = document.getElementById(captionid);
		tmp.innerHTML = captionList[i];
		tmp.style.color = "white";
		tmp.style.backgroundImage = "url(" + urlList[i] +")";
		
		var capid = "cap" + (i+1);
		var cap = document.getElementById(capid);
		var $cap = $(cap);
		$cap.text(captionList[i]);
		$cap.css("color","black");
		$cap.css("fontSize","23px");
	}
	
	doneButton.onclick = function(){
		firstDiv.style.display = "block";
		secondDiv.style.display = "none";
		document.body.style.background = "#336666";
		document.body.style.transition = "ease-in 0.5s";
		var list = document.getElementsByClassName("newsDiv");
		var oDiv = document.getElementsByClassName("checkimg");
		var changedList = new Array();
		
		for(var i=0;i<32;i++){
			var captionid = "caption" + (i+1);
		    var tmp = document.getElementById(captionid);
			if(tmp.style.display != "none"){
				changedList.push(tmp);
			}
		}
		
		 var i=0;
		 var j=0;
		 var end1= changedList.length-1;
         var end2=31;
		 while(i<=end1||j<=end2){
		    if(oDiv[j].checked!=false){
			    changedList[i].innerHTML = list[j].textContent;
			    changedList[i].style.background = "url(" + oDiv[j].urlattribute +")";
			    i++;
		    }
		    j++;	
		 }
		 
	}
	
	var checkarr = document.getElementsByClassName("checkimg");
	var imagebox = document.getElementsByClassName("imgDiv");
	
	for(var i=0;i<checkarr.length;i++){
		checkarr[i].checked=true;
	}
	
	for(var i=0;i<checkarr.length;i++){
		checkarr[i].index=i;
		checkarr[i].onclick=function(){
           if(this.checked){
			   this.style.backgroundImage='url("images/icons/empty.png")';
			   this.checked=false;
			   imagebox[this.index].style.display="none";
		   }else{
			   this.style.backgroundImage='url("images/icons/check.png")';
			   this.checked=true;
			   imagebox[this.index].style.display="block";
		   }
		}
	}
}   