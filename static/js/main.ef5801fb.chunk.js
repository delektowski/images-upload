(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{116:function(e,t,a){},118:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(52),r=a.n(o),c=(a(65),a(53)),i=a(57),l=a(54),u=a(55),p=a(58),d=a(56),f=a(59),h=a(4),m=a.n(h),g=(a(51),a(50),a(116),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(s)))).state={userName:"Marcin",picturesPaths:[],picturesTitles:[],selectedfiles:null,inputValue:""},a.selectImageHandler=function(e){a.setState({selectedfiles:e.target.files})},a.uploadHandler=function(){var e=a.state.selectedfiles,t={contentType:"image/jpeg"},n=m.a.storage().ref(),s=Object(i.a)(e);console.log(s),s.forEach(function(e,s){var o=n.child("images/"+e.name).put(e,t);o.on(m.a.storage.TaskEvent.STATE_CHANGED,function(e){var t=e.bytesTransferred/e.totalBytes*100;console.log("Upload ("+s+") is: "+Math.round(t)+"%")},function(e){switch(e.code){case"storage/unauthorized":console.log("No permission");break;case"storage/canceled":console.log("Stopped upload");break;case"storage/unknown":console.log("Unknown error")}},function(){var e=o.snapshot.ref.name.replace(".jpg","");console.log(e),o.snapshot.ref.getDownloadURL().then(function(t){m.a.database().ref(a.state.userName+"/").child(e).set({path:t,selectYes:!1,selectMaybe:!1,selectNot:!1})})})})},a.setDataHandler=function(e){a.setState({inputValue:e.target.value})},a.sendDataHandler=function(){m.a.database().ref("marcin/").child(a.state.inputValue).set({path:"link to picture",selectYes:!1,selectMaybe:!1,selectNot:!1})},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=m.a.database().ref().child(this.state.userName),a=m.a.database().ref().child("fik");console.log("db",a),t.on("value",function(t){var a=Object.keys(t.val()),n=[];for(var s in t.val()){var o=t.val()[s].path;n.push(o)}e.setState({picturesTitles:a,picturesPaths:n})})}},{key:"render",value:function(){var e=this.state.picturesPaths,t=this.state.picturesTitles.reduce(function(t,a){var n=e.filter(function(e){return new RegExp(a,"g").test(e)});return t.concat(Object(c.a)({},a,n[0]))},[]).map(function(e){return s.a.createElement("figure",{key:Object.keys(e)},s.a.createElement("img",{style:{width:"200px",margin:"20px"},src:Object.values(e),alt:"pic"}),s.a.createElement("figcaption",null,Object.keys(e)))});return s.a.createElement("div",{className:"App"},s.a.createElement("h1",null,this.state.userName),s.a.createElement("input",{type:"text",value:this.state.inputValue,onChange:this.setDataHandler}),s.a.createElement("button",{onClick:this.sendDataHandler},"Send data"),s.a.createElement("input",{type:"file",multiple:!0,onChange:this.selectImageHandler}),s.a.createElement("button",{onClick:this.uploadHandler},"Upload"),s.a.createElement("div",{style:{width:"90%",display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}},t))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));m.a.initializeApp({apiKey:"AIzaSyB05MIkrZq52LQIiRrC1nFsUp7hkBG3odc",authDomain:"upload-images-69afc.firebaseapp.com",databaseURL:"https://upload-images-69afc.firebaseio.com",projectId:"upload-images-69afc",storageBucket:"upload-images-69afc.appspot.com",messagingSenderId:"419462563824"}),r.a.render(s.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},60:function(e,t,a){e.exports=a(118)},65:function(e,t,a){}},[[60,2,1]]]);
//# sourceMappingURL=main.ef5801fb.chunk.js.map