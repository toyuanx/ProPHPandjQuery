jQuery(function($){

	var processFile = "assets/inc/ajax.inc.php";

	var fx = {
		"initModal" : function(){
			if($(".modal-window").length == 0){
				//console.log("I am in")
				return $("<div>").hide().addClass("modal-window").appendTo("body");
			}else{
				return $(".modal-window");
			}
		},

		"boxin" : function(data, modal){
			$("<div>").hide().addClass('modal-overlay').click(function(event) {
				fx.boxout(event);
			}).appendTo('body');

			modal.hide().append(data).appendTo('body');

			$(".modal-window, .modal-overlay").fadeIn("slow");
		},

		"boxout" : function(event){
			if(event != undefined){
				event.preventDefault();
			}

			$("a").removeClass('active');

			$(".modal-window, .modal-overlay").fadeOut('slow', function() {
				$(this).remove();
			});
		},

		"addevent" : function(data, formData){

			var entry = fx.deserialize(formData),

			cal = new Date(NaN),

			event = new Date(NaN),

			cdata = $("h2").attr("id").split('-'),

			date = entry.event_start.split(' ')[0],

			edata = date.split('-');

			cal.setFullYear(cdata[1],cdata[2],1);

			event.setFullYear(edata[0],edata[1],edata[2]);

			//event.setMinutes(event.getTimezoneOffset());

			if(cal.getFullYear() == event.getFullYear() && cal.getMonth() == event.getMonth()){
				var day = String(event.getDate());
				day = day.length == 1 ? "0"+day : day;

				$("<a>")
					.hide()
					.attr("href","view.php?event_id="+data)
					.text(entry.event_title)
					.insertAfter($("strong:contains("+day+")"))
					.delay(1000)
					.fadeIn("slow");
			}
		},

		"deserialize" : function(str){
			var data = str.split("&"),

			pairs = [], entry= [], key, val;

			for(x in data){
				pairs = data[x].split("=");
				key = pairs[0];
				val = pairs[1];
				entry[key] = fx.urldecode(val);

			}
			return entry;
		},

		"urldecode" : function(str){
			var converted = str.replace(/\+/g, ' ');
			return decodeURIComponent(converted);
		}


	};



	$("li>a").live("click", function(event) {
		event.preventDefault();
		$(this).addClass("active");
		var data = $(this).attr("href").replace(/.+?\?(.*)$/, "$1"),
		modal = fx.initModal();

		$("<a>").attr("href","#").addClass('modal-close-btn').html("&times;").click(function(event) {
			fx.boxout(event);
		}).appendTo(modal);
		
		$.ajax({
			url: processFile,
			type: "POST",
			data: "action=event_view&" + data,
			success: function(data){
				fx.boxin(data,modal);
			},
			error: function(msg){
				modal.append(msg);
			}
		});	
	});

	$(".admin-options form, .admin").live("click",function(event){
		event.preventDefault();
		//console.log("add a new event button clicked");
		//var action = 'edit_event';
		var action = $(event.target).attr("name") || "edit_event",
		id = $(event.target).siblings('input[name=event_id]').val();
		id = (id!=undefined) ? "&event_id="+id : "";
		$.ajax({
			type: "POST",
			url: processFile,
			data: "action="+action+id,
			success: function(data){
				var form = $(data).hide(),
				//modal = fx.initModal();
				modal=fx.initModal().children(':not(.modal-close-btn)').remove().end();
				fx.boxin(null,modal);

				form.appendTo(modal).addClass('edit-form').fadeIn("slow");
			}

		});
	});

	$(".edit-form input[type=submit]").live("click",function(event){
		event.preventDefault();
		//console.log("Form submission triggered!");
		var formData = $(this).parents("form").serialize();
		//console.log(formData);
		$.ajax({
			type: "POST",
			url: processFile,
			data: formData,
			success: function(data){
				fx.boxout();
				if($("[name=event_id]").val().length==0)
				{
					fx.addevent(data,formData);
				}
			},
			error: function(msg){
				alert(msg);
			}
		});
	});

	$(".edit-form a:contains(cancel)").live("click",function(event){
		fx.boxout(event);
	});


});


