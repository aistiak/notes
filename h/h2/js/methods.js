
function addCard(title,text,id,images){

    // will add a new cad to the 'cards' div  

    let card = createNewNote(title,text,id,images);
    let x = $(this)//card.children('top')//.children('.editoptiondiv').children('.editImg')
    //console.log('x = ' + x) ;
    x.click()
	$(".cards").prepend(card)

}

function manageCard(card){

    console.log(card)
    card.children('.editImg').show()    
}
