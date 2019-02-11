$(document).ready(() => {


    newUserBtn = $('<button>new User</button>')
    newUserBtn.attr('id', 'new_user')

    $('body').append(newUserBtn)

    // todo: accessing database reference 
    console.log('ready')




    //todo: creating new user
    $('#login').on('click', () => {

/*         email = getCookie('name')
         password = getCookie('pas')*/

   /*     email = 'arifulislam.istiak@gmail.com'
        password = '01121994ar'*/
        
              email    = 'rudroiit@gmail.com'
              password = '01121994ar'
        /*
              firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log('errorCode : ' + errorCode )
          console.log('errorMessage : ' + errorMessage)

          // ...
        });*/




        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('errorCode : ' + errorCode)
            console.log('errorMessage : ' + errorMessage)
            // ...
        });
    })

    $('#new_user').on('click', () => {
        console.log('adding new user ')
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log('errorCode : ' + errorCode)
            console.log('errorMessage : ' + errorMessage)
        })
    })

    $('#logout').on('click', () => {
        console.log('logout pressed ')

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    })



    $('#add').on('click', () => {

        console.log('add is pressed')
        var fireRef = firebase.database().ref()

        fireRef.child('data').set('this is new data ')
    })

    $('#is').on('click', () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log('user is signed in ')
            } else {
                // No user is signed in.
                console.log('no user hear')
            }
        })
    })



    $('#up').on('click', () => {
       
       

        console.log('uploading...')

        // Create a root reference
        var ref = firebase.storage().ref();

        const file = $('#img').get(0).files[0]
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


        

    })

    //end

    $('#delimg').on('click', () => {

        var ref = firebase.storage().ref()
        var imgref = ref.child('1540534851765-WIN_20171121_23_44_26_Pro.jpg')
        imgref.delete().then(function() {
            console.log('deleting....')
        }).catch(function(error) {
            console.log('err : ' + error)
        })


    })




})