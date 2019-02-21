$(document).ready(function(){

        $(".container").highlight(["alu"])
		var input = $("#controllerInput")
        input.on("input",function(){
        	console.log("input changed")
        	// hide the regular note lis
        	// if input field clear show again
                 g_arr.forEach(function(element){
                 	 $("#"+element.id).show()
                 	//element.show()
                 })
            if(input.val() == ""){
                 
            }else{
            	 //$(".main-bottom").hide()
            	 // search for the keywords in notes

            	 var keyword = input.val()
            	 var key_match_buffer = []
            	 g_arr.forEach(function(element){
                     // if there is a mtch push to buffer array
                     if(element.title.includes(keyword) || element.text.includes(keyword)){
                           //console.log(element)
   /*                        key_match_buffer.push(element)

                           // show the cards containing the keywords 
                           var temp_cards_view = $("<div>")
                           temp_cards_view.attr("id","temp_cards_view")

                           $(".main-bottom").append(temp_cards_view)
                           key_match_buffer.forEach(function(element){
                           			addCard()
                           }) */     
                           
                     }else{
                     	$("#"+element.id).hide()
                     	//element.hide()
                     }
            	 })
/*                 var keyword = input.val()
            	 console.log($(".card"))
            	 for (var i = 0 ; i< $(".card").length ; i++){
                      var element = $(".card")
                      //console.log(element.child)
            	 }*/

            }
        })

});