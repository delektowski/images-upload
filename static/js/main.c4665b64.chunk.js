(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{124:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(61),i=a.n(o),c=(a(69),a(12)),s=a(13),l=a(16),u=a(14),p=a(17),d=a(63),m=a(62),_=a(30),g=a.n(_),b=a(46),f=a.n(b),C=function(e){return r.a.createElement("button",{onClick:e.clicked,className:[f.a.Button,f.a[e.buttonColor]].join(" ")},e.buttonText)},h=a(23),k=a.n(h),v=function(e){return r.a.createElement("div",{className:[k.a.ImageContainer,"green"===e.containerColor?k.a.ImageContainer__green:null,"blue"===e.containerColor?k.a.ImageContainer__blue:null,"red"===e.containerColor?k.a.ImageContainer__red:null].join(" ")},e.children)},j=a(2),I=a.n(j),B=(a(45),function(e,t,a,n){return{containerColor:e,isClickedGreen:t,isClickedBlue:a,isClickedRed:n}}),O=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={containerColor:"",isClickedGreen:!1,isClickedBlue:!1,isClickedRed:!1},a.buttonClickHandler=function(e){switch(e){case"green":a.setState(function(e){var t="green";return!0===e.isClickedGreen&&(t=""),I.a.database().ref("".concat(a.props.userName,"/").concat(a.props.caption[0])).update(B(t,!e.isClickedGreen,!1,!1)),B(t,!e.isClickedGreen,!1,!1)});break;case"blue":a.setState(function(e){var t="blue";return!0===e.isClickedBlue&&(t=""),I.a.database().ref("".concat(a.props.userName,"/").concat(a.props.caption[0])).update(B(t,!1,!e.isClickedBlue,!1)),B(t,!1,!e.isClickedBlue,!1)});break;case"red":a.setState(function(e){var t="red";return!0===e.isClickedRed&&(t=""),I.a.database().ref("".concat(a.props.userName,"/").concat(a.props.caption[0])).update(B(t,!1,!1,!e.isClickedRed)),B(t,!1,!1,!e.isClickedRed)})}},a.componentDidUpdate=function(){},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){for(var e in this.props.picturesDataObj)if(e===this.props.caption[0]){var t="";this.props.picturesDataObj[e].isClickedGreen&&(t="green"),this.props.picturesDataObj[e].isClickedBlue&&(t="blue"),this.props.picturesDataObj[e].isClickedRed&&(t="red"),this.setState(B(t,this.props.picturesDataObj[e].isClickedGreen,this.props.picturesDataObj[e].isClickedBlue,this.props.picturesDataObj[e].isClickedRed))}}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{containerColor:this.state.containerColor},r.a.createElement("figure",null,r.a.createElement("img",{className:g.a.Image,src:this.props.src,alt:this.props.caption[0]}),r.a.createElement("figcaption",{className:g.a.Image__title},this.props.caption[0])),r.a.createElement("div",{className:g.a.Image__selectionButtons},r.a.createElement(C,{clicked:function(){return e.buttonClickHandler("green")},buttonText:"Tak",buttonColor:"Button__green"}),r.a.createElement(C,{clicked:function(){return e.buttonClickHandler("blue")},buttonText:"Mo\u017ce",buttonColor:"Button__blue"}),r.a.createElement(C,{clicked:function(){return e.buttonClickHandler("red")},buttonText:"Nie",buttonColor:"Button__red"}))))}}]),t}(n.Component),E=function(e){var t=e.images,a=e.titles,n=e.picturesDataObj,o=a.reduce(function(e,a){var n=t.filter(function(e){return new RegExp(a,"g").test(e)});return e.concat(Object(m.a)({},a,n[0]))},[]).map(function(t){return r.a.createElement(O,{key:Object.keys(t),src:Object.values(t),caption:Object.keys(t),picturesDataObj:n,userName:e.userName})});return r.a.createElement(r.a.Fragment,null,o)},N=(a(60),a(47)),y=a.n(N),w=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={userName:"Marcin",picturesPaths:[],picturesTitles:[],pictureDataObj:null,selectedfiles:null,inputValue:""},a.selectImageHandler=function(e){a.setState({selectedfiles:e.target.files})},a.uploadHandler=function(){var e=a.state.selectedfiles,t={contentType:"image/jpeg"},n=I.a.storage().ref();Object(d.a)(e).forEach(function(e,r){var o=n.child("images/"+e.name).put(e,t);o.on(I.a.storage.TaskEvent.STATE_CHANGED,function(e){var t=e.bytesTransferred/e.totalBytes*100;console.log("Upload ("+r+") is: "+Math.round(t)+"%")},function(e){switch(e.code){case"storage/unauthorized":console.log("No permission");break;case"storage/canceled":console.log("Stopped upload");break;case"storage/unknown":console.log("Unknown error")}},function(){var e=o.snapshot.ref.name.replace(".jpg","");o.snapshot.ref.getDownloadURL().then(function(t){I.a.database().ref(a.state.userName+"/").child(e).set({containerColor:"",path:t,isClickedGreen:!1,isClickedBlue:!1,isClickedRed:!1})})})})},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;I.a.database().ref().child(this.state.userName).on("value",function(t){if(null!==t.val()){var a=Object.keys(t.val()),n=[],r=t.val();for(var o in t.val()){var i=t.val()[o].path;n.push(i)}e.setState({picturesTitles:a,picturesPaths:n,picturesDataObj:r})}})}},{key:"render",value:function(){return r.a.createElement("div",{className:y.a.Uploader},r.a.createElement("h1",null,this.state.userName),r.a.createElement("input",{type:"file",multiple:!0,onChange:this.selectImageHandler}),r.a.createElement("button",{onClick:this.uploadHandler},"Upload"),r.a.createElement("div",{className:y.a.Uploader__imagesContainer},r.a.createElement(E,{images:this.state.picturesPaths,titles:this.state.picturesTitles,picturesDataObj:this.state.picturesDataObj,userName:this.state.userName})))}}]),t}(n.Component),D=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(w,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));I.a.initializeApp({apiKey:"AIzaSyB05MIkrZq52LQIiRrC1nFsUp7hkBG3odc",authDomain:"upload-images-69afc.firebaseapp.com",databaseURL:"https://upload-images-69afc.firebaseio.com",projectId:"upload-images-69afc",storageBucket:"upload-images-69afc.appspot.com",messagingSenderId:"419462563824"}),i.a.render(r.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},23:function(e,t,a){e.exports={ImageContainer:"ImageContainer_ImageContainer__3h35j",ImageContainer__green:"ImageContainer_ImageContainer__green__3X58B",ImageContainer__blue:"ImageContainer_ImageContainer__blue__3NS-X",ImageContainer__red:"ImageContainer_ImageContainer__red__27ku3"}},30:function(e,t,a){e.exports={Image:"Image_Image__32NJ5",Image__title:"Image_Image__title__mJyad",Image__selectionButtons:"Image_Image__selectionButtons__34cpW"}},46:function(e,t,a){e.exports={Button:"Button_Button__chNl1",Button__green:"Button_Button__green__2BtT-",Button__blue:"Button_Button__blue__1SR39",Button__red:"Button_Button__red__2b8Pk"}},47:function(e,t,a){e.exports={Uploader:"Uploader_Uploader__39k2Q",Uploader__imagesContainer:"Uploader_Uploader__imagesContainer__2bLa3"}},64:function(e,t,a){e.exports=a(124)},69:function(e,t,a){}},[[64,2,1]]]);
//# sourceMappingURL=main.c4665b64.chunk.js.map