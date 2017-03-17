	$(function(){
		//换肤功能
		var mytheme = $.cookie('mytheme');
		if(mytheme!=null){
			$("link[title]").attr('disabled','disabled');
			$("link[title='"+mytheme+"']").removeAttr('disabled');
		}
		$(".theme a").on('click',function(e){
			var theme = $(this).prop('class');
			$("link[title]").attr('disabled','disabled');
			$("link[title='"+theme+"']").removeAttr('disabled');
			$.cookie('mytheme',theme,{expires:7});
		});
		//一级菜单的收缩功能
		$(".sBox .subNav").on('click',function(e){
			var menuBox = menuBox = $(this).parent().siblings();
			if($(this).find("span:first-Child").prop('class').indexOf('glyphicon-chevron-down')>=0){
				$(this).find("span:first-Child").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
				$(this).removeClass('sublist-down').addClass('sublist-up');
			}else{
				$(this).find("span:first-Child").removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
				$(this).removeClass('sublist-up').addClass('sublist-down');
			}
			$(this).next('.navContent').slideToggle(300);
			if($(this).prop('class').indexOf('sublist-down')>=0){
				menuBox.find('.subNav').each(function(index,el){
					if($(el).prop('class').indexOf('sublist-down')>=0){
						$(el).trigger('click');
					}
				});
			}				
		});

		//左边栏的大小切换功能
		$(".left-main .sidebar-fold").on('click',function(e){
			if($(this).parent().prop('class').indexOf('left-full')>=0){
				$(this).parent().removeClass('left-full').addClass('left-off');
				$(this).parent().next('.right-product').removeClass('right-full').addClass('right-off');
			}else{
				$(this).parent().removeClass('left-off').addClass('left-full');
				$(this).parent().next('.right-product').removeClass('right-off').addClass('right-full');
			}
		});

		//菜单的点击事件
		$(".left-main .subNavBox").delegate('.navContent li','click',function(e){
			var menuBox = $(this).parent().parent().siblings(),
			        name ='',
			        id = '';
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			menuBox.find("li.active").removeClass('active');
			menuBox.find('.subNav').each(function(index, el) {
				if($(el).prop('class').indexOf('sublist-down')>=0){
					$(el).trigger('click');
				}
			});
			name = $(this).find('a').text();
			id = $(this).find('a').attr('data-id');
			name = $.trim(name);
			showMenuIframe(id,name);
		});

		//菜单的鼠标移入提示功能
		$(".left-main .subNavBox").on('mouseenter','.navContent li',function(e){
			if($(this).find('span:last-child').css('display') == 'none'){
				$(this).find('div').show();
			}
		}).on('mouseleave','.navContent li',function(e){
			$(this).find('div').hide();
		});	

		//顶部菜单的点击事件
		$(".context-menu").on('click','a',function(e){
			var dataid = $(this).attr('data-id');
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$(".frames iframe").css('display','none');
			$(".frames iframe[src='"+dataid+"'").show();
		});

		//顶部菜单的关闭事件
		$(".context-menu").on('click','a span',function(e){
			e.stopPropagation();
			var index = $(this).parent().index(),
			       id = $(this).parent().attr('data-id'),
				  sum = $(".context-menu a").size();
			index = (index == sum -1)?(index-1):(sum-1);
		    $(".context-menu a:eq("+index+")").trigger('click');
		    $(this).parent().remove();
		    $(".frames iframe[src='"+id+"']").remove();
		});	

		//顶部菜单的批量操作
		$(".tabs-menu .close-group ul li a").on('click',function(e){
			var index = $(this).parent().index();
			var exclude = [];
			exclude.push($(".context-menu a:eq(0)").attr('data-id'));
			var href = $(".context-menu .active").attr('data-id');
			//关闭其他
			if(index == 0){
				exclude.push(href);
				$.unique(exclude);
				$(".context-menu a").each(function(i){
					if($.inArray($(this).attr('data-id'),exclude)<0){
						$(this).remove();
					}
				});
			}
			//关闭所有
			if(index == 2){
				$(".context-menu a").each(function(i){
					if($(this).index()>0){
						$(this).remove();
					}
				});
				$(".context-menu a:eq(0)").trigger('click');				
			}
			$(".frames iframe").each(function(i){
				if($.inArray($(this).attr('src'),exclude)<0){
					$(this).remove();
				}					
			});			
		});	

		//显示菜单对应的iframe
		function showMenuIframe(id,name){
			if(!id || !name){
				return ;
			}
			var meu = "<a href='javascript:;' data-id='{id}' class='active'>{name}<span class='glyphicon glyphicon-remove-circle'></span></a>";
			var iframe = "<iframe frameborder='0'  width='100%'' height='100%''  scrolling='auto' src='{src}'></iframe>";
			if($(".iframes iframe[src='"+id+"']").size()>0){
				$(".context-menu a[data-id='"+id+"']").trigger('click');	
			}else{
				meu = meu.replace(/{id}/g,id).replace(/{name}/g,name);
				iframe = iframe.replace(/{src}/g,id);
				$(".context-menu a").removeClass('active');
				$(".context-menu").append(meu);
				$(".frames iframe").hide();
				$(".frames").append(iframe);
			}
		}		


	});