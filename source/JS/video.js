var videoList;
function videoGet(){
	//向后端发送请求，获取视频列表
	$.ajax({
		async:false,
		url:"http://47.101.128.196:8221/videocsplatform/course/all",
		type:"GET",
		success:(res,status)=>{
			console.log(res.data);
			videoList=res.data;
		}
						
	})
			//在前端展示视频
	var content1=document.getElementById("content1");
	var content2=document.getElementById("content2");
	var content3=document.getElementById("content3");
	for(var i=0;i<videoList.length;i++){
		//精品推荐
		$("#content1").append(" <div  class=\"video\" id=\" courseId" +videoList[i].id + "\" ><p class=\"videoP\" id=\"videoP"+videoList[i].id+"\"></p><div class=\"videoSpan\" id=\"videoSpan"+videoList[i].id+"\"></div></div>");
		document.getElementById('videoP'+videoList[i].id).innerHTML="【"+videoList[i].courseName+"】"+"["+videoList[i].courseType+"类]"+"<br>"+"&nbsp&nbsp"+videoList[i].courseDesc;
		document.getElementById('videoSpan'+videoList[i].id).innerHTML=videoList[i].coursePrice+"￥";
		
		
		//免费专区
		if(videoList[i].coursePrice==0){
			$("#content3").append(" <div  class=\"video\" id=\" courseId" +videoList[i].id + "\" ><p class=\"videoP\" id=\"videoP2"+videoList[i].id+"\"></p><div class=\"videoSpan\" id=\"videoSpan2"+videoList[i].id+"\"></div></div>");
			document.getElementById('videoP2'+videoList[i].id).innerHTML="【"+videoList[i].courseName+"】"+"["+videoList[i].courseType+"类]"+"<br>"+"&nbsp&nbsp"+videoList[i].courseDesc;
			console.log(document.getElementById('videoP2'+videoList[i].id));
			console.log(document.getElementById("videoSpan2"+videoList[i].id));
			document.getElementById('videoSpan2'+videoList[i].id).innerHTML=videoList[i].coursePrice+"￥";
		}
		//付费专区
		else{
			$("#content3").append(" <div  class=\"video\" id=\" courseId" +videoList[i].id + "\" ><p class=\"videoP\" id=\"videoP3"+videoList[i].id+"\"></p><div class=\"videoSpan\" id=\"videoSpan3"+videoList[i].id+"\"></div></div>");
			document.getElementById('videoP3'+videoList[i].id).innerHTML="【"+videoList[i].courseName+"】"+"["+videoList[i].courseType+"类]"+"<br>"+"&nbsp&nbsp"+videoList[i].courseDesc;
			console.log(document.getElementById('videoP3'+videoList[i].id));
			console.log(document.getElementById("videoSpan3"+videoList[i].id));
			document.getElementById('videoSpan3'+videoList[i].id).innerHTML=videoList[i].coursePrice+"￥";
		}
		
		
	} 
	
	
	//A();
	var token="";
		var resStatus;
		/* 进入登录界面 */
		document.getElementById("userLand2").onclick=function(){
			document.getElementById("mask").style.display="block";
			document.getElementById("loginBox").style.display="block";
		}
		
		/* 登录后返回主页面 */
		document.getElementById("l-enter").onclick=function(){
			/* 输入验证:用户名不能为空，密码不能为空*/
			if(document.getElementById("l-username").value==""){
				alert("用户名不能为空！");
			}
			else if(document.getElementById("l-password").value==""){
				alert("密码不能为空！");
			}
			else{
				/* 密码与用户信息是否匹配 */
				/* 获取用户输入的用户名和密码 */
				var lusername=document.getElementById("l-username").value;
				var lpassword=document.getElementById("l-password").value;
				/* 用户信息获取 */
				
				$.ajax({
					async:false,
							url:"http://47.101.128.196:8221/videocsplatform/user/login",
							//headers:{"Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE5MjQ1MzgsInVzZXJuYW1lIjoidXNlcjAxIn0.WFrNLJV9IyyzJodd3vN2fjyHf7yL8eFb8XikDJQc7tM"},
							type:"POST",
							data:{
								"password":lpassword,
								"username":lusername
							},
							
							success:(res,status)=>{
								token = res.data;
								resStatus=res.status;
								
								//验证通过,跳转页面
								if(res.status==200){
									
									/* 页面切换 */
									document.getElementById("mask").style.display="none";
									document.getElementById("userLand2").style.display="none";//登录成功，登录按钮userland2消失，露出下面的登录成功后的选择按钮
									//console.log(token);//登陆成功
									//已登录，则执行后续操作
									//个人中心页面跳转
									document.getElementById("userLand1").onclick=function(){
										if(document.getElementById("landchoose").style.display=="none"){
											//跳出选项卡
											document.getElementById("landchoose").style.display="block";
											//选择退出登录，userland2覆盖掉userland1，使userland1状态失效
											document.getElementById("landchoose2").onclick=function(){
												document.getElementById("userLand2").style.display="block";
												document.getElementById("landchoose").style.display="none";
												//视频付费观看
												$(".video").bind("click",function(){
													alert("您未登录，请登录后再观看！");
												});
											}
											//选择个人中心，跳转页面
											document.getElementById("landchoose1").onclick=function(){
												document.getElementById("landchoose").style.display="none";
												window.open('../HTML/personal.html?token='+token);
											}
										}
										else{
											document.getElementById("landchoose").style.display="none";
										}
									}
									
									//视频观看
									$(".video").bind("click",function(){
										console.log($(this).attr("id"));
										//遍历视频，查找id为当前点击视频的视频，看它是否为付费视频
										for(var i=0;i<videoList.length;i++){
											if(videoList[i].id==this.id.split('courseId')[1]){
												var price=videoList[i].coursePrice;
												var className=videoList[i].courseName;
												console.log("price="+price);
												console.log(className);
											}
										}
										// var courseId=this.id.split('courseId')[1];
										//免费视频,直接观看
										if(price==0){
											window.open('../HTML/player.html?courseid=' + $(this).attr("id").split('courseId')[1]);
										}
										//付费视频，给钱再看
										else{
											$.ajax({
												async:false,
												url:"http://47.101.128.196:8221/videocsplatform/course/buy",
												type:"POST",
												headers:{
													"Authorization":token
												},
												data:{
												// "Authorization":token,
												"courseId":$(this).attr("id").split('courseId')[1]
												},
												success:(res,status)=>{
													console.log(res.data);
													videoList=res.data;
												}
																
											})
											window.open('../HTML/player.html?courseid=' + $(this).attr("id").split('courseId')[1]+"&token="+token+"&courseName="+className);
										}
										//window.open('new_file.html?courseid=' + this.id );
									});
								}
							}
							
						});
			}
		console.log(token+"1");//登陆成功
		/* 用户不存在时跳转注册页面 */
		if(resStatus==401){
			/* 页面切换 */
			document.getElementById("loginBox").style.display="none";
			document.getElementById("registerBox").style.display="block";
		}
		
	}
	/* 取消登录后返回登录页面 */
	document.getElementById("l-esc").onclick=function(){
		document.getElementById("mask").style.display="none";
	}
	/* Login页面点击“注册”跳转到注册页面 */
	document.getElementById("register").onclick=function(){
		document.getElementById("registerBox").style.display="block";
		document.getElementById("loginBox").style.display="none";
	};
	/*取消注册之后回到登录页面*/
	document.getElementById("r-esc").onclick=function(){
		document.getElementById("registerBox").style.display="none";
		document.getElementById("loginBox").style.display="block";
	}
	
	/* 注册成功后自动登录返回登录页面 */
	document.getElementById("r-enter").onclick=function(){
		/* 输入验证:用户名不能为空，密码不能为空*/
		if(document.getElementById("r-username").value==""){
			alert("用户名不能为空！");
		}
		else if(document.getElementById("r-password1").value==""){
			alert("密码不能为空！");
		}
		else if(document.getElementById("r-password1").value!=document.getElementById("r-password2").value){
			alert("前后密码不一致");
		}
		else{
			//获取用户输入的密码和用户名
			var rusername=document.getElementById("r-username").value;
			var rpassword=document.getElementById("r-password1").value;
			//向后端发送请求，完成用户信息的写入
			$.ajax({
						url:"http://47.101.128.196:8221/videocsplatform/user/reg?email=1053514819@qq.com",
						// headers:{"Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE5MjQ1MzgsInVzZXJuYW1lIjoidXNlcjAxIn0.WFrNLJV9IyyzJodd3vN2fjyHf7yL8eFb8XikDJQc7tM"},
						type:"PUT",
						data:{
							"username":rusername,
							"password":rpassword
						},
						success:(res,status)=>{
							if(res.status==100){
								//console.log(res.data);
								/* 页面切换 */
								document.getElementById("registerBox").style.display="none";
								document.getElementById("loginBox").style.display="block";
							}
						}
					})
			}
		}
		

}
videoGet();