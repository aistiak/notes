$(document).ready(function(){

	

	

	url = 'http://127.0.0.1:8000/api/'
	addUrl = 'http://127.0.0.1:8000/api/add';
	updateUrl = 'http://127.0.0.1:8000/api/update'
	dltUrl  = 'http://127.0.0.1:8000/api/del'


	name = getCookie('name')//"isti";
	pas  = getCookie('pas')//"123";
	console.log(name)
	console.log(pas)

	var obj = {}
	var data = {}

	data.title = 'home work'
	data.text  = 'softwear engg 10th chapter diagrams'
	data.img_link = ''

	var str = JSON.stringify(data)


 
	notes() // will work with token 
	/*in case tha data does not load first time*/
	//notes(name,pas)


   


/*
	$.get(addUrl,{name:qwe,pas:asd,data:str},function(data,status){
		if (status === "success"){
		
			console.log(data)
			
		}else{
			console.log(status)
		}

	})*/
})


function addNote(){

	
/*
     card = createNewNote()
     title = card
     text 
     img_link 
     */


    /*
       hear data is 
       
       title   :
       text    :
       img_link:

       */



       /*check if first childs id is null , if so then dlt it*/

        console.log( $('.list').children('#dash'))
        $('.list').children('#dash').remove()
       /**/

       card = createNewNote("Title","..","dash")
       card.children('.edit-option').click()
       card.children('.content').children('p.editable').focus()
    /*   val = card.children('.content').children('p.editable')
       val.html($('#controllerInput').val())*/

       $('#controllerInput').val('')
        /* t = card.children('.content').children('p.editable').html()
        console.log(t)*/
        data = {}
        /*first time save */
        card.children('.save-btn').children('#save').click(function(){
        	
        	data.title = card.children('.content').children('.editable').children().html()
        	data.text  = card.children('.content').children('p.editable').html()
            
        	data.img_link = ""


        	$.post(addUrl,{token:getCookie("token"),data:JSON.stringify(data)},function(data,status){
        		
        		if(status === "success"){
        			card.attr('id',data)
        		}
        	})

        })

        
    }

    function delNote(name,pas,id){
	//var dltUrl  = 'http://127.0.0.1:8000/api/del'
	$.post(dltUrl,{token:getCookie("token"),id:id},function(data){
		
		
	
	})

}

function updateNote(card){

    // if a NOTE is new or save not benn saved even once it would have id 'dash'
   
    id = card.attr('id')
    data = {}
    data.title=  card.children('.content').children('.editable').children().html()
    data.text =  card.children('.content').children('p.editable').html()
    data.img_link =""
    data.id = card.attr('id')
    

    console.log(id)
    console.log(data)
  
    updateUrl = 'http://127.0.0.1:8000/api/update'
    $.post(updateUrl,{token:getCookie("token"),id:id,data:JSON.stringify(data)},function(data,status){
 
            console.log('data :' + data)

    })


   

 //{"title": "56", "text": "..", "img_link": "", "id": "14644"}

} 

function notes(){
	
    
    // loads the notes for the user 
    $.post(url,{token:getCookie("token")},function(data){
   
         console.log(data) 
         /*$('.list').empty() */
    	

    		arr = JSON.parse(data) 
    		
    		for (i = 0 ; i<arr.length ;i++){
    			r = arr[i]
    			//addCard(arr[i].title,arr[i].text,arr[i].id)
                createNewNote(arr[i].title,arr[i].text,arr[i].id)	
    		}
    	
    })



    
}