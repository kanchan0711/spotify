async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    console.log(response) 
    console.log("hey")
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    console.log(as);
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mpeg")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs;
}

const playMusic=(track)=>{
    let audio = new Audio("/songs/" +  track)
    audio.play();
}

async function main(){
    let songs = await getSongs();
    console.log(songs)

    let songUl = document.querySelector('.playlist').getElementsByTagName('ul')[0]
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + ` <li>
        <div class="play-info">
          <img class="invert" src="playmusic.svg" alt="">
          <div>
            <div>${song.replaceAll("%20", " ")}</div>
            
            <div>song artist</div>
          </div>
        </div>
       
        <div class="play-now">
          <span>Play Now</span>
          <img class="invert" src="play.svg" alt=""></div>
      </li>`
    }


    var audio = new Audio(songs[0]);
    // audio.play();
    audio.addEventListener("loadeddata", () =>{
        let duration = audio.duration;
        console.log(duration);
    })

    // Array.from(document.querySelector(".playlist").getElementsByTagName("li")).forEach(e =>{
    //     e.addEventListener("click", element =>{
    //         console.log(e.querySelector(".play-info").firstElementChild.innerHTML)
    //         // playMusic(e.querySelector(".play-info").firstElementChild.innerHTML.trim)
        
    //         // let songName = e.querySelector(".play-info > div > div:first-child").innerText.trim();
    //         // let songUrl = songs.find(s => decodeURIComponent(s.split("/songs/")[1]) === songName);
    //         // playMusic(songUrl);
    //     })
    //   })


    Array.from(document.querySelector(".playlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element =>{
            playMusic(e.querySelector(".play-info > div").firstElementChild.innerHTML.trim())
        })
        console.log(e.querySelector(".play-info > div").firstElementChild.innerHTML)
    })

}
main();