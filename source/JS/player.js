$(function(){
	var token="";
	var perimeters = window.location.search;
	console.log(perimeters);
	perimeters = decodeURI(perimeters.split('?')[1]);
	var courseId_1 = perimeters.split('&')[0];
	var className_1 = perimeters.split('&')[2];
	var t = perimeters.split('&')[1];
	token = t.split('=')[1];
	var courseId = courseId_1.split('=')[1];
	var className = className_1.split('=')[1];
	console.log(className);
	$(".video_list").mCustomScrollbar();
	$.ajax({
		url:"http://47.101.128.196:8221/videocsplatform/course/buy",
		type:"POST",
		// headers:{"Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE3ODEwNjUsInVzZXJuYW1lIjoibHVjeSJ9.bjm6-MjbHx-AK4IQR6LxWt9wnWF1urWhVz8fl05Ihhc"},
		headers:{"Authorization":token},
				data:{
			"courseId":courseId
		},
		success:(res)=>{
			console.log(res,status);
					$.ajax({
						url:"http://47.101.128.196:8221/videocsplatform/course/course?courseId=2",
						type:"GET",
						// headers:{"Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE3ODEwNjUsInVzZXJuYW1lIjoibHVjeSJ9.bjm6-MjbHx-AK4IQR6LxWt9wnWF1urWhVz8fl05Ihhc"},
						headers:{"Authorization":token},
						success:(res)=>{
							console.log(res,status);
							let path = res.data.videoInfo["0"].path;
							$(".video_name span").html(className);
							$("#video_play>video").attr("src",path);
							window.currId = 0;
						    // console.log(path);
							let $videoList=$(".video_list ul");
							window.data = res.data.videoInfo;
							console.log(data);
							let p_amount = data.length;
							console.log(p_amount);
							$(".p_amount a").html(p_amount);
							$.each(data,function(index,ele){
								var $item = createVideoPItem(index,ele);
								$videoList.append($item);
								// console.log($item);
								$item.attr("data-url",ele.path);
								
							});
							$videoList.children(":first").css("color","deepskyblue");
							$videoList.children(":first").find("i").css("display","inline");
						}
					})
		}
	});
	$("body").delegate(".video_list ul>li","click",function(){
		console.log($(this));
		$(this).find("i").css("display","inline");
		$(this).siblings().find("i").css("display","none");
		$(this).find("a").css("color","deepskyblue");
		$(this).siblings().find("a").css("color","#252424");
		let path = $(this)["0"].dataset.url;
		$("#video_play>video").attr("src",path);
		window.currId = $(".video_list ul>li").index($(this));
	});
	function createVideoPItem(index,videoInfo){
		var $item = $("<li>\n"+
		                    "<a title=\"02-jQuery使用\">\n"+
								"<i class=\"iconfont icon-bofang1\" style=\"display: none;\"></i>\n"+
								"<span class=\"s1\">P"+videoInfo.courseP+"</span>"+videoInfo.vtitle+"\n"+
							"</a>\n"+
						"</li>")
						return $item;
	};
	var elevideo = document.getElementsByTagName("video")[0];
	    elevideo.addEventListener('ended', function () { //结束
	        console.log("播放结束");
			console.log(this);
			console.log(window.currId,window.data.length);
			if(window.currId<window.data.length-1){
				this.src = data[currId+1].path;
				window.currId = window.currId + 1;
				var $li = $(".video_list ul>li").eq(currId);
				$li.find("i").css("display","inline");
				$li.siblings().find("i").css("display","none");
				$li.find("a").css("color","deepskyblue");
				$li.siblings().find("a").css("color","#252424");
			}else{
				elevideo.pause();
			}
			
	    }, false);
	  // elevideo.addEventListener("play",function(){
		 //  console.log("播放开始");
		 //  
	  // })
})