$(function(){
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
				console.log("jin");
				console.log(res,status);
			}
		})
	})
	$(".class").click(()=>{
		$.ajax({
			url:"http://47.101.128.196:8221/videocsplatform/course/all",
			// headers:{"Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE5MjQ1MzgsInVzZXJuYW1lIjoidXNlcjAxIn0.WFrNLJV9IyyzJodd3vN2fjyHf7yL8eFb8XikDJQc7tM"},
			type:"GET",
			success:(res,status)=>{
				console.log(res.data,status);
			}
		})
	})
})