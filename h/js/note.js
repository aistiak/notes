function createNewNote(title,text,id){
    console.log('new note')

	var card = $('<div>')
	card.attr('id',id)
	card.addClass('card')
	card.css('text-align','left')

	var editOption = $('<div></div>')
	editOption.addClass('edit-option')
	editOption.css({"position":"absolute","right": "5px","top":"0px", "text-align":"right","margin-top":"13px"})

	edit_img = $('<img/>')
	edit_img.attr('src','img/editico.png')
	edit_img.attr('width','20px')
	edit_img.attr('data-toggle','tooltip')
	edit_img.attr('title','edit')
	editOption.append(edit_img)
	card.append(editOption)


    /*title */
	th4 = $('<h4></h4>')
	th4.css('font-weight','bold')
	th4.addClass('editable')
	
    tp = $('<p>')
    card.append(tp)

	tb = $('<b></b>')
	tb.html(title)/*title*/
	th4.append(tb)
	
	tp = $('<p></p>')
	td = $('<div></div>')
	td.addClass('content')
	
	td.append(th4)
	card.append(td)

	td = $('<div>')
	td.addClass('content')
	tp = $('<p>')
	tp.addClass('editable')
	tp.html(text) /*text*/
	td.append(tp)
	card.append(td)


	td = $('<div>')
	td.addClass('save-btn')
	im1 = $('<img/>')
	im1.attr('src','img/saveico.png')
	im1.attr('id','save')
    im1.attr('width','30px')
    im1.attr('data-toggle','tooltip')
    im1.attr('title','save')
	im1.css({'position': 'relative', 'bottom': '5px'}) 
	td.append(im1)
	im2 = $('<img/>')
	im2.attr('src','img/addimgico.png')
	im2.attr('id','addImage')
    im2.attr('width','25px')
    im2.attr('data-toggle','tooltip')
    im2.attr('title','add image')
	im2.css({'position': 'absolute', 'bottom': '3px'}) 
    td.append(im2)


    /*im3 dlt image*/
    im3 = $('<img/>')
    im3.attr({
    	src:'img/dltico.png',
    	width:'20px' ,
    	id : 'dlt' ,
    	'data-toggle' : 'tooltip',
    	title : 'delete'
    })
    im3.css({
    	position: 'absolute',
    	left : '55px',
         bottom : '5px'
    })
    td.append(im3)
    card.append(td)


	var list = $('.list')
	list.prepend(card)


	$('[data-toggle="tooltip"]').tooltip();
	/*have to add listeners */
	$('.save-btn').hide();
	$('.edit-option').hide()
	$('.card').hover(function(){
		$(this).children('.edit-option').show()
		/*$('.edit-option').show()*/
	},function(){
		$(this).children('.edit-option').hide()
		/*$('.edit-option').hide()*/
	})



		$('.edit-option').click(function(){
		var el = $(this).parent()
	
	    /*making other cards out of focus */
		$('.card').css('transform','scale(0.95)')
		$('.editable').css('background-color','white')
		$('.editable').attr('contentEditable','false')
		
		el.css('transform','scale(1)')
		
		var editable = el.children('.content').children('.editable')
		editable.attr('contentEditable','true')
		editable.css('background-color','lightblue')
		
		var btn = el.children('.save-btn')
		btn.show()
		
		btn.children('#save').click(function(){
			btn.hide()
			$('.card').css('transform','scale(0.95)')
			$('.editable').attr('contentEditable','false')
			editable.css('background-color','white')
			updateNote(el)

			// perform update hear 
			// need note id and data 


		})
		btn.children('#dlt').click(function(){
			
			/*perform api delete*/
			//todo
			try{
               delNote('isti','123',$(this).parent('.save-btn').parent().attr('id'))
			   $(this).parent('.save-btn').parent().remove()
			   
			}catch(e){
				console.log('err : ' + e)
			}
			
		})

		btn.children('#addImage').click(function(){
			try{
				console.log($(this).parent().parent())
				div = $('<div>')
				div.css({
					'position':'relative',
					 'padding':'2px'
				})
				img = $('<input>')
				div.append(img)
				img.attr('type','file')
				$(this).parent().parent().append(div)

			}catch(e){
				console.log('err : ' + e)
			}
		})
	})


	

     return card ;
	
	
}

