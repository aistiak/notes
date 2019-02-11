$(document).ready(function(){

    

     console.log('on loader')

/*    url = 'http://127.0.0.1:8000/api/'
    addUrl = 'http://127.0.0.1:8000/api/add';
    updateUrl = 'http://127.0.0.1:8000/api/update'
    dltUrl  = 'http://127.0.0.1:8000/api/del'*/


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




function notes(){
    
    console.log('on notes') 
    // loads the notes for the user 
    $.post(url,{token:getCookie("token")},function(data){
   
         //console.log( 'data : ' + data) 
         /*$('.list').empty() */
        

            g_arr = JSON.parse(data) 
            //console.log('g_arr len : ' + g_arr.length)
            //console.log(g_arr)
            len = g_arr.length
            for (let i = 0 ; i < len ;i++){
                //r = g_arr[i]
                //console.log(r)
                addCard(g_arr[i].title,g_arr[i].text,g_arr[i].id,g_arr[i].imgs)
                //createNewNote(arr[i].title,arr[i].text,arr[i].id) 
            }
        
    })



    
}