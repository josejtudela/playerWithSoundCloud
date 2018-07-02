// alert();
// function OnDragStart(ev){
//     ev.dataTransfer.setData("targetId",ev.target.id)
//     console.log("DragStart: ",ev.target);
// }

// let miOnDragEnd = () => {
//     console.log("OnDragEnd: ",event.target);
// }

// let onDragOver = (ev) => {
//     ev.preventDefault();
//     console.log("onDragOver");
// } 

// let onDrop = (ev) => {
//     ev.preventDefault();
//     let data = ev.dataTransfer.getData("targetId");
//     ev.target.appendChild(document.getElementById(data));
//     console.log("onDrop: ", data);
// } 

// SC.initialize({
//     client_id: 'unnFdubicpq7RVFFsQucZzduDPQTaCYy'
// })

// SC.get('/tracks',{
//     q: 'u2'
// }).then((tracks)=>{
//     console.log(tracks);
    
// })

// SC.stream('/tracks/88295642').then((player)=>{
//     player.play();
// }).catch(error=>console.error('No ha funcionado'))

SC.initialize({
    client_id: 'unnFdubicpq7RVFFsQucZzduDPQTaCYy'
})

document.addEventListener("submit",(event)=>{
    event.preventDefault();
    const busqueda = event.target[0].value;

    SC.get('/tracks',{
        q: busqueda
    }).then((tracks)=>{
        let divTrackList = document.getElementById("trackList");

        if(divTrackList.childNodes.length > 0){
            divTrackList.innerHTML =  '';
        }

        let trackList = tracks.map(track=>{
            let img = document.createElement("img");

            if (track.artwork_url === null) {
                img.src = 'https://source.unsplash.com/random/100x100'
            } else{
                img.src = track.artwork_url;
            }
            img.draggable = true;
            img.id = track.id;
            img.className = 'track';
            return img;
        })
        
        for(let child of trackList){
            divTrackList.appendChild(child);
        }
    })
});

document.addEventListener("dragstart",(event)=>{
    event.dataTransfer.setData("targetId",event.target.id);
    console.log("star")
})

let onDrop = (ev) => {
    
    ev.preventDefault();

    let data = ev.dataTransfer.getData("targetId");
    ev.target.innerHTML = '';
    ev.target.appendChild(document.getElementById(data));

    
    SC.stream(`/tracks/${data}`).then((player)=>{
        player.play();
        
        let stateTrack = document.createElement("span");
        stateTrack.id = "stateTrack"
        
        player.on('state-change',(event)=>{
            stateTrack.innerHTML = '';
            stateTrack.innerHTML = event;
            ev.target.appendChild(stateTrack);
            if(event === 'ended'){
                ev.target.innerHTML = '';
            }
        })
    }).catch(error=>console.error('No ha funcionado: ',error))
} 

let onDragOver = (ev) => {
    ev.preventDefault();
}

