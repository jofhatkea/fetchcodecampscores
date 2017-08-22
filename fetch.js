class App {
	constructor(id, callback){
		this.students=[];
    this.count=null;
    this.done=0;
    this.callback = callback;
    fetch("https://spreadsheets.google.com/feeds/list/"+id+"/od6/public/values?alt=json")
      .then(e=>e.json())
      .then(data=>{
        console.log("Got data from google")
        this.parseSheet(data);
      }
    );
	}

  parseSheet(data){
    this.count=data.feed.entry.length;
      data.feed.entry.forEach(s=>{
        let student = {
          handle: s.gsx$codecamphandle["$t"],
          fullName: s.gsx$fullname["$t"]
        };
        this.fetchStudent(student);
    });
  }

	fetchStudent(s){
    let re = /\[ (\d+) \]/ig;
    fetch(`https://www.freecodecamp.com/${s.handle}`)
      .then(e=>e.text())
      .then(data=>{
        console.log("got data from fcc", this)
        s.score=parseInt(re.exec(data)[1]);
        let students = this.students.slice();
        students.push(s);
        students.sort((a,b)=>b.score-a.score);
        this.students=students;
        this.done++;
        console.log(this.done, this.count)
        if(this.done===this.count){
          this.callback(this.students);
        }
      }
    ).catch(e=>{
      this.done++;
      console.log("CATCH", this.done, this.count)
      if(this.done===this.count){
        this.callback(this.students);
      }
    })
	}
}
