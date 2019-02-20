

$(document).ready(()=>{


	url = 'http://127.0.0.1:8000/api/'
	addUrl = 'http://127.0.0.1:8000/api/add'
	updateUrl = 'http://127.0.0.1:8000/api/update'
	dltUrl  = 'http://127.0.0.1:8000/api/del'
	logoutUrl = 'http://127.0.0.1:8000/api/logout'
    updateGarray()
// add a new card to screen 
$("#newcard").on('click',()=>{
	console.log('click')
    imgarg = {}
	addCard('title','...','dash',imgarg)




})

function updateGarray(){
		$.post(url,{token:getCookie('token')},function(data){
	    g_arr = JSON.parse(data)
	    //console.log('from update g aarray : ' + g_arr)
	   ///console.log('logout : ' + data)
	})
}

/// firebase authentications 

// upload imege
function uploadImage(fileName){
	       // Create a root reference
	       var ref = firebase.storage().ref();

	       const file = fileName.get(0).files[0]
	       const name = (+new Date()) + '-' + file.name
	       const metadata = {
	       	contentType: file.type
	       }
	       const task = ref.child(name).put(file, metadata)

	       var image_url = '';
	       task
	       .then(snapshot => snapshot.ref.getDownloadURL())
	       .then(url => {

	       	image_url = url ;
	       	console.log('image name : ' + name)
	       	console.log('image url : ' + image_url );
	       	$('#showimg').attr('src',image_url)
	       })


	   }
// dlt image 
function dltImage(imageName){
	var ref = firebase.storage().ref()
	var imgref = ref.child(imageName)
	imgref.delete().then(function() {
		console.log('deleting....')
	}).catch(function(error) {
		console.log('err : ' + error)
	})


}

// logout handeller 
$('#logoutbtn').on('click',function(){
	$.post(logoutUrl,{token:getCookie('token')},function(data){
		console.log('logout : ' + data)


	})
		document.cookie = 'token='+';'
		//document.cookie = 'pas='+password+';'  

		console.log(getCookie("token"));

		window.location.href ="/login.html"
	})

// will monitor card hover and pass to HandelCards


// will handel 
// edit , save , addImage , dlt button
// mouse on a specif card
$(document).on('mouseenter','.card',function() {			




	let card = $(this)
	let editImg   = card.children('.top').children('.editoptiondiv').children('.editImg') ; 
	let bottomdiv = card.children('.bottom') 
	let title = card.children('.top').children('.title').children('h4');
	let text  = card.children('.mid').children('.textdiv').children('p') ;
	let AllCards = $('.card')
	let AllCardsbttomDiv = $('.card').children('.bottom')
	let Alltitel = $('.card').children('.top').children('.title').children('h4')
	let Alltext = $('.card').children('.mid').children('.textdiv').children('p')
	let saveImg  = card.children('.bottom').children('.save_img');
	let dltImg  = card.children('.bottom').children('.dlt_img'); 
	let addImg  = card.children('.bottom').children('.add_img')
	//let thisImgDiv = card.children('.mid').children()



	let midimgdiv = card.children('.mid').children('.mid-img-div')
	let imgdiv    = midimgdiv.children('.img-div')
	let imgup     = midimgdiv.children('.imgup') 


    editImg.show() // showing edit option 
    editImg.on('click',function(){
    	
    	console.log('edit img has been clicked')
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
    		'transform':'scale(1)',

    	})


/*
    	midimgdiv.css({
    		'position': 'relative',
    		'top': '19px',
    		'left':' 7px'
    	})
*/
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



                     
	    		// update card 
   
	    		data = {}
	    		data.title = title.html()
	    		data.title = data.title.replace(/[']/g,"$sq$").replace(/["]/g,"$dq$")


	    		data.text  = text.html()
	    		data.text = data.text.replace(/[']/g,"$sq$").replace(/["]/g,"$dq$")
	    		

	    		data.id    = card.attr('id')
	    		imgs = []
	    		data.imgs = imgs
	    	
	    		console.log(g_arr)
                console.log('g_arr len : ' + g_arr.length)
	    		for (let i4 = 0 ; i4<g_arr.length ; i4++){       // syncronizing between local card array g_arr and database
                     console.log(card.attr('id') + '==='+g_arr[i4].id)
                     if(card.attr('id') === g_arr[i4].id){  // or in update action the image urls will be lost
                        data.imgs = g_arr[i4].imgs
                        break 
                     }                  
	    		}
	    		


	    	/*	imgs = []
	    		img = {}
	    		img.name = "test.name"
	    		img.link = "test.link"
	    		imgs.push(img)

	    		data.imgs = imgs*/


	    		$.post(updateUrl,{token:getCookie('token'),id:card.attr('id'),data:JSON.stringify(data)},function(data){
                        console.log('save data : ' + data)
                        updateGarray()

                        //g_arr = JSON.parse(data)// <-- using this causes problems 
                        //console.log('203  : ' + g_arr)
	    		})

                
                /* get new id and add to local array */
/*                data.id = card.attr('id')
                g_arr.push(data)*/


	    	})

    	dltImg.on('click',function(){ 
    		card.remove()

    		$.post(dltUrl,{token:getCookie('token'),id:card.attr('id')},function(data){
    			console.log(card.attr('id'))
    			console.log('from dlt : ' + data)
    		    
                for (let i5 = 0 ; i5<g_arr.length;i5++){
                	if(card.attr('id') === g_arr[i5].id){
                        let imgs = g_arr[i5].imgs
                        for(let i6 = 0 ; i6 <imgs.length ; i6++){
                              dltImage(imgs[i6].name)
                        }
                		break 
                	}
                }
                

    		    updateGarray()   //g_arr = data //JSON.parse(data)
    			//console.log('dlt g_arr : ' + g_arr)

               

    		})

    		// have to delete all the images from firebase too

    	})

    	addImg.on('click',function(){
    		console.log('adding image ')
    		console.log('x : ' +imgup.children.length)



    		let inp = $('<input>')
    		inp.attr('type','file')
    		imgup.empty()
	    		let btn = $('<button>') // upload button 
	    		btn.css({
	    			'position':'relative',
	    			'left':'208px',
	    			'top':'-24px',
	    			'transform':'scale(0.95)'
	    		})
	    		btn.html('upload')
	    		imgup.append(inp)
	    		imgup.append(btn)

                 // on upload press 
	    		btn.on('click',function(){


	    		    imgup.empty()
	    	
			        // upload selected image to firebase 
			        console.log('uploading...')

			        // Create a root reference
			        var ref = firebase.storage().ref();

			        const file = inp.get(0).files[0]//$('#img').get(0).files[0]
			        const name = (+new Date()) + '-' + file.name
			        const metadata = {
			        	contentType: file.type
			        }
			        const task = ref.child(name).put(file, metadata)

			        var image_url = '';
			        task
			        .then(snapshot => snapshot.ref.getDownloadURL())
			        .then(url => {

			        	image_url = url ;
			        	console.log('image name : ' + name)
			        	console.log('image url : ' + image_url );
			        	// save to django db after firebase upload is done
			            data = {}
			    		data.title = title.html()
			    		data.text  = text.html()
			    		data.id    = card.attr('id')

                        console.log(g_arr) 

 			    		imgs = []
			    		timg = {}
			    		timg.name = name
			    		timg.link = image_url
			    		local_flag = 0 
 			    		for (let i2 = 0 ; i2<g_arr.length ; i2++){
                            if(card.attr('id') == g_arr[i2].id){
 			    			console.log('found....')
                                g_arr[i2].imgs.push(timg)
                                console.log(g_arr)
                            	imgs = g_arr[i2].imgs
                            	local_flag = 1
                            	break 
                            }
 			    		}
	                    
			    	    if(local_flag == 0) imgs.push(timg) // for newly created cards for the id is not found so have to add image externally s
			    		data.imgs = imgs

                        console.log('s data : ' + data.imgs)
			    		$.post(updateUrl,{token:getCookie('token'),id:card.attr('id'),data:JSON.stringify(data)},function(data){
                            
                            console.log('xx : ' + data)
                            try{//todo now
                              updateGarray() //g_arr = data
                              //console.log('just check : ' + g_arr)
                            }catch(e){
                            	console.log('err : ' + e)
                            }
                           
					    	let img = $('<img>')
			    		    //console.log('path : ' + inp.val().replace(/C:\\fakepath\\/i,''))
			    		    img.attr('src',image_url)
			    		    img.attr('name',name)
			    		    img.attr('class','card-attached-img')
			    		    img.attr('data-toggle','tooltip')
			    		    img.attr('title','click to see better')
			    		    img.css({
			    		    	'display':'inline-block',
			    		    	'height':'75px',
			    		    	'padding':'1px'
			    		    })


			   
			    		    imgdiv.append(img)
			    		})




 

			        })


	    		})


	    	})


    })
    		$.contextMenu({
			selector: ".card-attached-img",
			build: function(element, event) {
				return {
					callback: function () {},
					items: {
						foo: {
							name: "view",
							callback: function(){
								 console.log($(this));
								 var win = window.open($(this).attr('src'), '_blank');
									if (win) {
									    //Browser has allowed it to be opened
									    win.focus();
									} else {
									    //Browser has blocked it
									    alert('Please allow popups for this website');
									}

																	 
							}
							
						},
						bar: {
							name: "delete",
							callback:function(){
        
                                try{
	                                console.log('dlt img name : ' + $(this).attr('name'))
	                                dltImage($(this).attr('name')) // dlt from firebase
	                                dlt_img = {}
	                                dlt_img.name = $(this).attr('name')
	                                dlt_img.link = $(this).attr('src')
	                                // hove to dlt img from dajngo db 
                                    data = {}
                                    imgs = []
                                    data.title = title.html()
                                    data.text  = text.html()
                                    data.id    = card.attr('id')

                                    for (let i8 = 0 ; i8<g_arr.length ; i8++){
                                    	if( card.attr('id') === g_arr[i8].id){
                                           imgs = g_arr[i8].imgs

                                           for (let i9=0;i9<imgs.length;i9++){
                                           	    console.log(imgs[i9])
                                           	    console.log(dlt_img)
                                                console.log(imgs[i9].name == dlt_img.name)

                                           	    if(dlt_img.name === imgs[i9].name){
                                           	    	imgs.splice(i9,1)//imgs.remove(i9)
                                           	    	console.log(imgs)
                                           	    	console.log('removing......')
                                           	    	break
                                           	    }
                                           }
                                           break 
                                    	}
                                    }
                                    

                                    data.imgs  = imgs 


						    		$.post(updateUrl,{token:getCookie('token'),id:card.attr('id'),data:JSON.stringify(data)},function(data){
					                        console.log('save data : ' + data)
					                        
                                            updateGarray()
					                        //g_arr = JSON.parse(data)// <-- using this causes problems 
					                        //console.log('203  : ' + g_arr)
						    		})
                                   
                                    
	                                $(this).remove()

                                }catch(e){
                                	console.log('e : ' + e)
                                }
                                // api function to view 
                                return 
							}

						}
					}
				}
			}
		});

}) 

// handeling image option events

/*		$.contextMenu({
			selector: ".card-attached-img",
			build: function(element, event) {
				return {
					callback: function () {},
					items: {
						foo: {
							name: "view",
							callback: function(){
								 console.log($(this));

								 
							}
							
						},
						bar: {
							name: "delete",
							callback:function(){
        
                                try{
	                                console.log('dlt img name : ' + $(this).attr('name'))
	                                dltImage($(this).attr('name')) // dlt from firebase
	                                dlt_img = {}
	                                dlt_img.name = $(this).attr('name')
	                                dlt_img.link = $(this).attr('src')
	                                // hove to dlt img from dajngo db 
                                    data = {}
                                    imgs = []
                                    data.title = ''//title.html()
                                    data.text  = text.html()
                                    data.id    = card.attr('id')

                                    for (let i8 = 0 ; i8<g_arr.length ; i8++){
                                    	if( card.attr('id') === g_arr[i8].id){
                                           imgs = g_arr[i8].imgs

                                           for (let i9=0;i9<imgs.length;i9++){
                                           	    if(dlt_img === imgs[i9]){
                                           	    	imgs.remove(i9)
                                           	    	break
                                           	    }
                                           }
                                           break 
                                    	}
                                    }
                                    

                                    data.imgs  = imgs 

                                    $.post(updateUrl,{token:getCookie('token')},function(data){

                                    })
                                    updateGarray()
                                    
	                                $(this).remove()

                                }catch(e){
                                	console.log('e : ' + e)
                                }
                                // api function to view 
                                return 
							}

						}
					}
				}
			}
		});*/


// mouse removed from a specific card 
$(document).on('mouseleave','.card',function(){
	let AlleditImg = $('.editImg')
	AlleditImg.hide()
	//console.log($('.editImg'))
})


})


