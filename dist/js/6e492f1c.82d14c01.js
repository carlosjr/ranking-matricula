(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["6e492f1c"],{"00ad":function(t,e,s){t.exports=s.p+"img/logo-buritis.d94bcdba.jpeg"},"3e7e":function(t,e,s){"use strict";var a=s("e216"),i=s.n(a);i.a},"74db":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{staticClass:"bg-blue-10"},[a("div",{staticClass:"row justify-center"},[a("img",{staticStyle:{width:"250px",height:"250px"},attrs:{alt:"Wizards logo",src:s("8b45")}})]),a("div",{staticClass:"row justify-center",staticStyle:{"min-width":"200px"}},[a("q-card",{staticClass:"text-blue col-8 col-sm-4 col-xs-4"},[a("q-card-section",[a("div",{staticClass:"text-h6 text-blue-10"},[t._v("Login")])]),a("q-card-section",[a("div",{staticClass:"q-gutter-sm"},[a("q-input",{attrs:{rounded:"",filled:"",label:"Email"},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}}),a("q-input",{attrs:{type:"password",square:"",filled:"",label:"Senha"},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password",e)},expression:"user.password"}})],1)]),a("q-card-actions",[a("q-btn",{staticClass:"text-blue-10",attrs:{flat:""},on:{click:t.authenticate}},[t._v("ENTRAR")])],1)],1),a("div")],1),a("div",{staticClass:"row justify-center bg-blue-10"},[a("img",{staticClass:"q-pa-sm",staticStyle:{width:"160px",height:"150px"},attrs:{alt:"Wizards logo",src:s("00ad")}}),a("img",{staticClass:"q-pa-sm",staticStyle:{width:"160px",height:"150px"},attrs:{alt:"Wizards logo",src:s("b111")}}),a("img",{staticClass:"q-pa-sm",staticStyle:{width:"160px",height:"150px"},attrs:{alt:"Wizards logo",src:s("7ad3")}})])])},i=[],o=s("758b"),l={name:"MyLayout",data:function(){return{user:{}}},mounted:function(){},methods:{authenticate:function(){var t=this;o["a"].post("token",this.user).then((function(e){console.log(e),t.data=e.data,localStorage.setItem("user-token",e.data.token),localStorage.setItem("user-login",t.user.email),localStorage.setItem("user-id",e.data.id_user),localStorage.setItem("user-role",e.data.role),t.$router.push("/view")})).catch((function(t){console.log(t)}))}}},r=l,c=(s("3e7e"),s("2877")),n=Object(c["a"])(r,a,i,!1,null,null,null);e["default"]=n.exports},"7ad3":function(t,e,s){t.exports=s.p+"img/logo-vila.e453aa5e.jpeg"},"8b45":function(t,e,s){t.exports=s.p+"img/logo-wizards2.81cce8a8.png"},b111:function(t,e,s){t.exports=s.p+"img/logo-orlando.19f6521e.jpeg"},e216:function(t,e,s){}}]);