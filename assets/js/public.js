jQuery(function(){

$(".headSel").hover(function(){$(this).find(".headOption").stop(false,true).fadeIn(200)},function(){$(this).find(".headOption").stop(false,true).fadeOut(200)});

$(".headOption a").click(function(){$(".headNm").html($(this).text());$(".headOption").fadeOut(200)});
$(".nav_a:first").css("width",119);

jQuery(".hm_mes").slide({mainCell:".hm_mScroll ul",autoPlay:true,effect:"leftMarquee",interTime:50});

jQuery(".mc1L").slide({mainCell:".bd ul",effect:"fold"});
jQuery(".mc2Box").slide({mainCell:".mc2_itms ul",autoPage:true,effect:"left",vis:5});
jQuery(".mc3Box").slide({effect:"fold"});

$(".m2fm_int3").click(function(){
	$(this).parents("li").find(".m2fm_selBox").show();
	$(this).parents("li").css("z-index",10);
});
	
$(".m2fm_selBox dd").click(function(){
	$(this).parents("li").find(".m2fm_int3").val($(this).text());
	$(this).parents("li").css("z-index",0);
	$(this).parents("li").find(".m2fm_selBox").hide();
	});
	
$(".m2fm li").hover(function(){return false},function(){$(".m2fm li").css("z-index",0);$(".m2fm_selBox").hide();});


$(".m2fm_int3").click(function(){
	$(this).parents(".m2fm_selContent").find(".m2fm_selBox").show();
	$(this).parents(".m2fm_selContent").css("z-index",10);
});
	
$(".m2fm_selBox dd").click(function(){
	$(this).parents(".m2fm_selContent").find(".m2fm_int3").val($(this).text());
	$(this).parents(".m2fm_selContent").css("z-index",0);
	$(this).parents(".m2fm_selContent").find(".m2fm_selBox").hide();
	});
	
$(".m2fm_selContent").hover(function(){return false},function(){$(".m2fm_selContent").css("z-index",0);$(".m2fm_selBox").hide();});
	

})
//屏蔽页面错误
jQuery(window).error(function(){
  return true;
});
jQuery("img").error(function(){
  $(this).hide();
});