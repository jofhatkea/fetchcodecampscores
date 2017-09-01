window.addEventListener('load', start);
//16gLcoH7n58y9X9afCWzeB84VURmTznS6PByJwwS4BJE
let historydata=window.localStorage['fcchistory'];
function start(){

  if(!historydata){
    historydata=[];
    let stringified = JSON.stringify(historydata);
    localStorage.setItem('fcchistory', stringified);
  } else {
    let p = localStorage.getItem('fcchistory');
    historydata = JSON.parse(p);

  }
  updateHistory();
  document.querySelector('#inputbutton').addEventListener('click', e=>{
    let id = document.querySelector('#input').value;
    if(historydata.indexOf(id)==-1){
      historydata.push(document.querySelector('#input').value);
      updateHistory();
    }
    load(id);
  })
  document.querySelector('#history').addEventListener('change', e=>{
    load(document.querySelector('#history').value)
  })
}
function updateHistory(){
  let stringified = JSON.stringify(historydata);
  localStorage.setItem('fcchistory', stringified);
  document.querySelector('#history').innerHTML="";
  historydata.forEach(d=>{
    let i = document.createElement('option');
    i.textContent=d;
    document.querySelector('#history').appendChild(i);
  })
}
function load(link){
  let app = new App(link, showScores);
}
function showScores(data){
  console.log("showScores", data)
  let highest = data[0].score;
  let lowest = data[data.length-1].score;
  
  let factor = highest/500;
  //let draw = SVG('mysvg');
  //let lastX=50;
  //let lastY=50;
  //let padding=5;

    data.forEach(d=>{
        let thisWidth=d.score/factor;
        console.log(d.score, factor)
        let h2 = document.createElement('h2');
        h2.textContent=d.fullName + "@"+d.handle + " " + d.score;
        document.querySelector('#app').appendChild(h2);
        let div = document.createElement('div');
        div.style.backgroundColor="red";
        div.style.width=(d.score/factor)+"px";
        div.style.height="20px";
        document.querySelector('#app').appendChild(div);
  })
    
    
  /*data.forEach(d=>{
    let thisWidth=d.score/factor;
    console.log(d.score, factor)
    let rect = draw.circle(thisWidth).attr(
      {
        fill: 'blue',
        cx:lastX,
        cy:lastY
      });
      lastX+=thisWidth
  })*/
    TweenMax.staggerFrom('h2, div', 1, {
        x: -1000,
        y: -100,
        ease: Elastic.easeOut.config(1, 0.3)
    }, 0.1)
}
