$(function(){
	var token="";
	$(".video_list").mCustomScrollbar();
	$(".register").click(function(){
		$.ajax({
			url:"http://47.101.128.196:8221/videocsplatform/user/reg?email=1053514819@qq.com&password=992993zy&username=lucy",
			// headers:{"Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE5MjQ1MzgsInVzZXJuYW1lIjoidXNlcjAxIn0.WFrNLJV9IyyzJodd3vN2fjyHf7yL8eFb8XikDJQc7tM"},
			type:"PUT",
			success:(res,status)=>{
				console.log(res,status);
			}
		})
	})
	$(".login").click(()=>{
		$.ajax({
			url:"http://47.101.128.196:8221/videocsplatform/user/login",
			// headers:{"Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE5MjQ1MzgsInVzZXJuYW1lIjoidXNlcjAxIn0.WFrNLJV9IyyzJodd3vN2fjyHf7yL8eFb8XikDJQc7tM"},
			type:"POST",
			data:{
				"username":"lucy",
				"password":"992993zy"
			},
			success:(res,status)=>{
				console.log(res,status);
				token = res.data;
			}
		})
	})
	$(".class").click(()=>{
         $.ajax({
         	url:"http://47.101.128.196:8221/videocsplatform/course/buy",
         	type:"POST",
         	// headers:{"Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE3ODEwNjUsInVzZXJuYW1lIjoibHVjeSJ9.bjm6-MjbHx-AK4IQR6LxWt9wnWF1urWhVz8fl05Ihhc"},
         	headers:{"Authorization":token},
			data:{
         		"courseId":2
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
						$("#video_play>video").attr("src",path);
					    // console.log(path);
						let $videoList=$(".video_list ul");
						let data = res.data.videoInfo;
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
         })		
	})
	$("body").delegate(".video_list ul>li","click",function(){
		// console.log($(this));
		$(this).find("i").css("display","inline");
		$(this).siblings().find("i").css("display","none");
		$(this).find("a").css("color","deepskyblue");
		$(this).siblings().find("a").css("color","#252424");
		let path = $(this)["0"].dataset.url;
		$("#video_play>video").attr("src",path);
	})
	
	function createVideoPItem(index,videoInfo){
		var $item = $("<li>\n"+
		                    "<a title=\"02-jQuery使用\">\n"+
								"<i class=\"iconfont icon-bofang1\" style=\"display: none;\"></i>\n"+
								"<span class=\"s1\">P"+videoInfo.courseP+"</span>"+videoInfo.vtitle+"\n"+
							"</a>\n"+
						"</li>")
						return $item;
	}
})