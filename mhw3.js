
function onJson_Immagini(json){
    console.log(json);
    // Svuotiamo la libreria
    
    const library = document.querySelector('#artist_view');
    library.innerHTML = ''; 
    //vedo quanti risultati sono stati trovati
    let num_results=json.total;
    console.log("Sono stati trovati " + num_results + " immagini ");

    if(num_results===0){
      const errore= document.createElement('h1');
      const message= document.createTextNode('Nessun risultato trovato!');
      errore.appendChild(message);
      library.appendChild(errore);
    }
   //se non entra in quell'if allora vuol dire che ha trovato risultati
   //voglio visualizzare al massimo 14 risultati, dunque se ne ho trovati piu' di 14 impongo che num_results sia = a 14
   if(num_results>14){
       num_results=14;
   }
   
   //a questo punto andiamo a prendere e stampare i nostri risultati 
   for(let i=0; i<num_results;i++){
       const immagine=json.hits[i].largeImageURL;
        const vetrina=document.createElement('div');
        vetrina.classList.add('immaginipixa');
        const img=document.createElement('img');
        img.src=immagine;
        vetrina.appendChild(img);
        library.appendChild(vetrina); //aggiungiamo il div alla libreria 
   } 
}
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

function search(event){
    //tolgo il comportamento di default
   event.preventDefault(); 

   //leggo l'opzione scelta
   const artista=document.querySelector('#nome_artista').value; //value è = al nome dell'artista 
   console.log("Ricerco elementi dell'artista:" + artista);

     if(artista==="Sandro Botticelli"){
         
            //esegui Fetch per Pixabay
            pixabay_request= endpoint_pixabay + '?key=' + key_pixabay + '&q= ' + artista;
            console.log(pixabay_request);
            fetch(pixabay_request).then(onResponse).then(onJson_Immagini);
         
     }

     if(artista==="Sandro Botticelli"){
      
         //esegui Fetch per Pixabay
         pixabay_request= endpoint_pixabay + '?key=' + key_pixabay + '&q= ' + artista;
         console.log(pixabay_request);
         fetch(pixabay_request).then(onResponse).then(onJson_Immagini);
     
     }
     if(artista==="Leonardo da Vinci"){
         //esegui Fetch per Pixabay
         pixabay_request= endpoint_pixabay + '?key=' + key_pixabay + '&q= ' + artista;
         console.log(pixabay_request);
         fetch(pixabay_request).then(onResponse).then(onJson_Immagini);
      
     }
     if(artista==="Brunelleschi"){
         pixabay_request= endpoint_pixabay + '?key=' + key_pixabay + '&q= ' + artista;
         console.log(pixabay_request);
         fetch(pixabay_request).then(onResponse).then(onJson_Immagini);
     
     }
     if(artista==="Michelangelo"){
      
         //esegui Fetch per Pixabay
         pixabay_request= endpoint_pixabay + '?key=' + key_pixabay + '&q= ' + artista;
         console.log(pixabay_request);
         fetch(pixabay_request).then(onResponse).then(onJson_Immagini);
     
     }
     if(artista==="Beato Angelico"){
         //esegui Fetch per Pixabay
         pixabay_request= endpoint_pixabay + '?key=' + key_pixabay + '&q= ' + artista;
         console.log(pixabay_request);
         fetch(pixabay_request).then(onResponse).then(onJson_Immagini);
     }

}

function getToken(json)
{
	token = json.access_token;
	console.log(json);
}

function onTokenResponse(response){
    return response.json();
}


  function onJsonSpotify(json){
      console.log(json); //stampa cio' che ho richiesto in console

      //svuotiamo il contenitore
      const contenitore=document.querySelector('#album_view');
      contenitore.innerHTML='';

      let num_results=json.albums.total;
      console.log("Album trovati " + num_results);
     

      for(let i=0;i<num_results;i++){
          const album=json.albums.items[i];
          const vetrina2=document.createElement('div');
          vetrina2.classList.add('immaginispotify');
        const img=document.createElement('img');
        immagine=album.images[1].url;
        img.src=immagine;
        vetrina2.appendChild(img);
        contenitore.appendChild(vetrina2); 
      } 

  }
function search2(event){

    // Impedisci il submit del form
    event.preventDefault();

        //esegui il fetch per Spotify
        //link per prendere severals album
        fetch("https://api.spotify.com/v1/search?q=Emanuele%20Aloia&type=album&market=ES",
        {
           headers:{
            
            "Authorization": "Bearer " + token //attenzione, lasciare uno spazio tra Bearer e token se no non funziona!
           }
        }
        ).then(onResponse).then(onJsonSpotify);
    
}

//key e endpoint
const key_pixabay='26942672-43f8dd4105d5de279c89824e6';
const endpoint_pixabay='https://pixabay.com/api/';

//aggiungo event listener al form per effettuare la ricerca
const form=document.querySelector('#search_artist');
form.addEventListener('submit', search);

 //client id e client secret for SPOTIFY
 const client_id="2f8f4753de5840c8a2362e31e502f745";
 const client_secret="cd4ca979199c4c8bac3831b78bb1dc2a";

 let token;
 //chiediamo il token all'apertura della pagina
fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body:"grant_type=client_credentials",
    headers:{
      "Content-Type": 'application/x-www-form-urlencoded',
      "Authorization": 'Basic ' + btoa(client_id + ':' + client_secret)
    }
}
).then(onTokenResponse).then(getToken);


const form2=document.querySelector('#search_song');
form2.addEventListener('submit', search2); 



