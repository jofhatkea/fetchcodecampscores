class FetchStudent {
    constructor(student, challenges, callback){
        this.student=student;
        this.challenges = challenges;
        this.callback=callback;
        this.unique = this.guid();
        this.node = document.createElement('div');
        this.node.style.display="none";
        this.node.id=this.unique;
        this.scores = {};
        document.body.appendChild(this.node);
        
        fetch(`https://www.freecodecamp.com/${this.student.codecamphandle}`)
            .then(r=>r.text())
            .then(data=>this.parse(data))
    }
    parse(data){
        this.node.innerHTML=data;
        let topics = [...this.node.querySelectorAll('.col-xs-5.hidden-xs')];
        //console.log(topics)
        topics.forEach(top=>{
            //console.log(top.textContent)
            //Let's find the topic
            
            //let clone = JSON.parse(JSON.stringify(this.challenges));
            //console.log(clone)
            for (let key in this.challenges) {
                //console.log(this.challenges[key])
                if(this.challenges[key].indexOf(top.textContent)>-1){
                    if(!this.scores[key]){
                        this.scores[key]=0;
                    }
                    this.scores[key]++
                }
            }
        });
        document.body.removeChild(this.node);
        this.callback(this.student, this.scores)
    }
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return "s"+s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
    }
}