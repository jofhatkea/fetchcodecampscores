/**
 * Created by holbech on 03/09/2017.
 */
window.addEventListener('load', function(){
    "use strict";
    let fgd = new FetchGoogleJSON("1zPuyzZbgp8ANT0XEu4wrzF5HiZ0SXzYN9wstTs5dmF8", listLoaded);
    let timer=null;
    let students = [];
    let template = document.querySelector("#student").content;

    function listLoaded(data){
        data.forEach(student=>{
            new FetchStudent(student, challenges, showStudent);
        });
    }

    function showStudent(student, scores){
        let clone = template.cloneNode(true);
        let studentElem = clone.querySelector(".student");
        studentElem.dataset.fullname=student.fullname;

        clone.querySelector("h1").textContent=student.fullname + " @"+student.codecamphandle;
        let total = 0;
        for(let k in scores){
            total+=scores[k];
            let li = document.createElement("li");
            li.textContent = k + ": " + scores[k];
            let plain = k.replace(/ /gi, '').toLowerCase();
            studentElem.dataset[plain] = scores[k];
            clone.querySelector('.stats').appendChild(li);
            let b = document.querySelector('button[data-sort="'+plain+'"]');
            if(!b){
                let button = document.createElement("button");
                button.textContent=k;
                button.dataset.sort=plain;
                button.dataset.sorttype="number";
                document.querySelector("#sorting").appendChild(button);
            }
        }
        clone.querySelector("h2 span").textContent = total;
        studentElem.dataset.total = total;
        //clone.querySelector("button").addEventListener("click",(e)=>e.target.nextElementSibling.classList.toggle('hidden'))
        students.push(studentElem);
        clearTimeout(timer);
        timer = setTimeout(sort, 2000);
    }

    function sort(){
        document.querySelector("#loader").classList.add("hidden");
        document.querySelector(".borrowed").classList.add("hidden");
        students.sort(sortNames);
        setupListeners();
        students.forEach(s=>{
            document.querySelector("#app").appendChild(s);
        });
    }
    function sortNames(a,b){
        let nameA = a.dataset.fullname.toUpperCase();
        let nameB = b.dataset.fullname.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }
    function setupListeners(){
        let app = document.querySelector("#app");
        document.querySelectorAll('button[data-sort]').forEach(b=>{
            b.addEventListener('click', (e)=>{
                let sort = e.target.dataset.sort;
                let sorttype = e.target.dataset.sorttype;
                let all = [...document.querySelectorAll('.student')];
                if(sorttype==="number"){
                    all.sort((a,b)=>{
                        let res = b.dataset[sort] - a.dataset[sort];
                        if(!isNaN(res)){
                            return res;
                        }
                        if(!a.dataset[sort] && !b.dataset[sort]){
                            return 0;
                        } else if(!a.dataset[sort]){
                            return 1;
                        }
                        return -1;
                    });
                } else {
                    all.sort(sortNames);
                }
                let columns = window.getComputedStyle(app).gridTemplateColumns.split(" ").length;
                console.log(columns)
                all.forEach((s,i)=>{
                    let row = Math.floor(i/columns);
                    let remainder = i % columns;
                    let mod = window.innerWidth / columns;//and again, tap into mediaquery
                    let x = TweenMax.to(s, 1.5, {x:remainder * mod + 10 - s.offsetLeft, y: row*210+29-s.offsetTop});
                });
                setTimeout(()=>{
                    all.forEach(a=>{
                        a.style="";
                        app.appendChild(a);
                    })
                }, 1600);
            });
        });
    }
});