function createNewNote(title,text,id,images){



   /*

    // todo 
    <div class="top">
          <div class='title'> 
             <h4> title</h4>
          </div>
          <div clas='editImg'>
               <img src='.../>
          </div>
    </div>

   <div class='mid'>

   </div>

   <div class='bottom'>


   </div>

   */
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

    title = title.replace(/(@dq!)/g,"\"").replace(/(@sq!)/g,"\'")

    titleh4.html(title)

    titeldiv.append(titleh4)


    var editoptiondiv = $('<div>')
    editoptiondiv.addClass('editoptiondiv')
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
	textdiv.addClass('textdiv')
	textdiv.css({
		'position':'relative',
		'left':'5px',
        'padding-bottom':'11px'
	})
	var ptext = $('<p>')
	ptext.css({
		'margin-right':'9px'
	})

	text = text.replace(/(@dq!)/g,"\"").replace(/(@sq!)/g,"\'")

	ptext.html(text)

	textdiv.append(ptext)
	middiv.append(textdiv)



	let midimgdiv = $('<div>')
    midimgdiv.addClass('mid-img-div')
    midimgdiv.css({
	    'position':'relative',
		'bottom':'16px'	,
		'padding-left':'9px'
    })
	let imgdiv = $('<div>')
	imgdiv.addClass('img-div')
	//imgdiv
    //todo
    for (let i3 = 0 ; i3< images.length ;i3++){

         let timg  = $('<img>')
         timg.attr('src',images[i3].link)
         timg.attr('name',images[i3].name)
		 timg.attr('class','card-attached-img')
	     timg.attr('data-toggle','tooltip')
         timg.css({
	         'display':'inline-block',
	    	 'height':'75px',
	    	 'padding':'1px'
	     })
	     imgdiv.append(timg)

    }
    

	let imgup = $('<div>')
	imgup.addClass('imgup')

	midimgdiv.append(imgdiv)
	midimgdiv.append(imgup)

	middiv.append(midimgdiv)

	/// ------------end of mid --------------//


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
	save_img.addClass('save_img')
	save_img.css({
		'position':'relative','padding':'0px','height':'18px'
	})

	add_img = $('<img>')
	add_img.attr('src','img/addimgico.png')
	add_img.attr('data-toggle','tooltip')
	add_img.attr('title','add image')
	add_img.addClass('add_img')
	add_img.css({
		'position':'relative','padding':'0px','height':'23px'
	})

	dlt_img = $('<img>')
	dlt_img.attr('src','img/dltico.png')
	dlt_img.attr('data-toggle','tooltip')
	dlt_img.attr('title','delete')
	dlt_img.addClass('dlt_img')
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

	bottomdiv.hide()
	//$('.hideOnSave').hide()
	editImg.hide()
	
/*	editImg.on('click',()=>{
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
	})*/
/*
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
*/

   



	card.append(topdiv)
	card.append(middiv)
	card.append(bottomdiv)


	//card.append(maindiv)

	 if (id == 'dash'){ // newly created card not saved yet 
/*    	 $('.card').css({
    	 	'transform':'scale(0.95)'
    	 })
    	 $('h4').attr('contentEditable','false')
    	 $('h4').css({
    	 	'background-color':'white'
    	 })
    	 $('p').attr('contentEditable','false')
    	 $('p').css({
    	 	'background-color':'white'
    	 })
    	 card.css({
    	 	'transform' :'scale(1)'
    	 })
    	 titleh4.attr('contentEditable','true')
    	 titleh4.css({
    	 	'background-color':'lightblue'
    	 })
    	 ptext.attr('contentEditable','true')
    	 ptext.css({
    	 	'background-color':'lightblue'
    	 })
    	 bottomdiv.show()*/

	   // let editImg   = card.children('.top').children('.editoptiondiv').children('.editImg') ; 
	    //let bottomdiv = //card.children('.bottom') 
	    let title = titleh4 //card.children('.top').children('.title').children('h4');
	    let text  = ptext //card.children('.mid').children('.textdiv').children('p') ;

    	let AllCards = $('.card')
	    let AllCardsbttomDiv = $('.card').children('.bottom')
	    let Alltitel = $('.card').children('.top').children('.title').children('h4')
	    let Alltext = $('.card').children('.mid').children('.textdiv').children('p') 
        

	    let saveImg  = save_img // card.children('.bottom').children('.save_img');
	    let dltImg  = dlt_img //card.children('.bottom').children('.dlt_img'); 
	    let addImg  = add_img //card.children('.bottom').children('.add_img')
	    	

    	Alltitel.attr('contentEditable','false')
    	Alltitel.css({
    		'background-color':'white'
    	})
    	title.attr('contentEditable','true')
    	title.css({
    		'background-color':'lightblue'
    	})



        Alltext.attr('contentEditable','false')
        Alltext.css({
        	'background-color':'white'
        })
    	text.attr('contentEditable','true')
    	text.css({
    		'background-color':'lightblue'
    	})


    	bottomdiv.show()


    	AllCards.css({
    		'transform':'scale(0.95)'
    	})
    	card.css({
    		'transform':'scale(1)'
    	})


    	saveImg.on('click',function(){
    		console.log('save clicked')
    		card.css({
    			'transform':'scale(0.95)'
    		})
    		title.attr('contentEditable','false')
    		title.css({
    			'background-color':'white'
    		})
    		text.attr('contentEditable','false')
    		title.css({
    			'background-color':'white'
    		})
    		bottomdiv.hide()
            data = {}
            data.title = titleh4.html();
	        data.title = data.title.replace(/(')/g,"@sq!").replace(/(")/g,"@dq!")
           
            data.text  = ptext.html()
            data.text  = data.text.replace(/(')/g,"@sq!").replace(/(")/g,"@dq!")
      

            imgs = []
            /*
              img ={}
              img.name = 'demoimage'
              img.link = 'https://firebasestorage.googleapis.com/v0/b/notes-5c195.appspot.com/o/1544768780269-Person%20Of%20Interest%20S02%20Season%202%20Complete%20720p%20HDTV%20x264%20AAC%20-%20TheKing.png?alt=media&token=d158a301-2e9a-401d-9236-0c20f61c62d2'*/
           /* imgs.push(img) */
            data.imgs=imgs

            
            if (card.attr('id') == 'dash'){
	    		$.post(addUrl,{token:getCookie('token'),data:JSON.stringify(data)},function(data){
	                  card.attr('id',data)
	    		})
            	
            }else{
            	data.id = card.attr('id')
            	$.post(updateUrl,{token:getCookie('token'),data:JSON.stringify(data)},function(data){
                     console.log('save data : ' + data)
                     g_arr = data 
            	})
            }

    	})

    	dltImg.on('click',function(){
    		card.remove()
    	})

    	addImg.on('click',function(){
    		console.log('adding image ')
    	})


     }


	return card

}