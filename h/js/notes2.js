function createNewNote(title,text,id){

	var card = $('<div>')
	card.attr('id',id)
	card.addClass('card')
/*
    card.css({
    	'display':'inline-block'
    }) 
*/
    var maindiv   = $('<div>')
    var topdiv    = $('<div>')
    var middiv    = $('<div>')
    var bottomdiv = $('<div>')

   


    var titeldiv = $('<div>')
    titeldiv.addClass('title')
    titeldiv.css({'position': 'relative','padding': '5px'}) 
    var titleh4 = $('<h4>')
    titleh4.html("title")
    titeldiv.append(titleh4)


    var editoptiondiv = $('<div>')
	//editoptiondiv.addClass('edit-option')
	editoptiondiv.css({
		'position': 'absolute','right': '7px','top': '10px',
	
	})
	editoptiondiv.attr('data-toggle','tooltip')
	editoptiondiv.attr('title','edit')
	editImg = $('<img/>')
	editImg.addClass('editImg')
	editImg.attr('src','img/editico.png')
	editImg.css({'width':'18px'})
	editoptiondiv.append(editImg)

    topdiv.addClass('top')
	topdiv.append(titeldiv)
	topdiv.append(editoptiondiv)


	middiv.addClass('mid')
	middiv.css({

		'position':'relative',
		
		
		'padding-bottom':'5px'

	})
	var textdiv = $('<div>')
	textdiv.css({'position':'relative','left':'5px'})
	var ptext = $('<p>')
	ptext.css({
		'margin-right':'9px'
	})
	textdiv.append(ptext)
	middiv.append(textdiv)


	bottomdiv.addClass('bottom')
	bottomdiv.css({
		'position':'relative',
		//'display':'inline-block',
        'margin-top':'5px',
        'margin-bottom':'5px'
		
	})
	save_img = $('<img>')
	save_img.attr('src','img/saveico.png')
	save_img.attr('data-toggle','tooltip')
	save_img.attr('title','save note')
	save_img.addClass('hideOnSave')
	save_img.css({
		'position':'relative','padding':'0px','height':'18px'
	})

	add_img = $('<img>')
	add_img.attr('src','img/addimgico.png')
	add_img.attr('data-toggle','tooltip')
	add_img.attr('title','add image')
	add_img.addClass('hideOnSave')
	add_img.css({
		'position':'relative','padding':'0px','height':'23px'
	})

	dlt_img = $('<img>')
	dlt_img.attr('src','img/dltico.png')
	dlt_img.attr('data-toggle','tooltip')
	dlt_img.attr('title','delete')
	dlt_img.addClass('hideOnSave')
	dlt_img.css({
		'position':'relative',
		'padding':'0px',
		'height':'20px'

	}) 

	bottomdiv.append(save_img)
	bottomdiv.append(add_img)
	bottomdiv.append(dlt_img)







	$('[data-toogle="tooltip"]').tooltip()
	 
	 $('.editImg').hide()

	//bottomdiv.hide()
	//$('.hideOnSave').hide()
	//editImg.hide()
	
	editImg.on('click',()=>{
		bottomdiv.show()
	
		card.css({
			'transform':'scale(1)',
			//'display':'inline-block'

	    })
		titleh4.attr('contentEditable','true') 
		ptext.attr('contentEditable','true')
		titleh4.css({
			'background-color':'lightblue'
		})
		ptext.css({
			'background-color':'lightblue'
		})
	})

	save_img.on('click',()=>{
		card.css('transform','scale(0.95)')
		titleh4.attr('contentEditable','false') 
		ptext.attr('contentEditable','false')
		titleh4.css({
			'background-color':'white'
		})
		ptext.css({
			'background-color':'white'
		})
        
		bottomdiv.hide()
	})





	card.append(topdiv)
	card.append(middiv)
	card.append(bottomdiv)

	//card.append(maindiv)

	return card

}