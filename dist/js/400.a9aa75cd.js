"use strict";(self["webpackChunkfood_delivery_app_front"]=self["webpackChunkfood_delivery_app_front"]||[]).push([[400],{6400:function(s,r,a){a.r(r),a.d(r,{default:function(){return c}});var e=function(){var s=this,r=s._self._c;return r("div",{staticClass:"login"},[s._m(0),s.serverError?r("BaseAlert",{staticClass:"login__alert",attrs:{variant:"danger",message:s.serverError}}):s._e(),s.serverSuccess?r("BaseAlert",{staticClass:"login__alert",attrs:{variant:"success",message:s.serverSuccess}}):s._e(),r("BaseInput",{attrs:{label:"Email",type:"email",placeholder:"name@example.com",value:s.formData.email,error:s.errors.email},on:{onInput:r=>s.changeField("email",r)}}),r("BaseInput",{staticClass:"login__baseInput",attrs:{label:"Password",type:"password",placeholder:"min.8 characters",value:s.formData.password,showPassword:s.showPassword,error:s.errors.password},on:{onPasswordToggle:s.showPasswordClick,onInput:r=>s.changeField("password",r)}}),r("BaseButton",{staticClass:"login__baseBtn",attrs:{variant:"primary",loading:s.isLoading},on:{onClick:s.login}},[s._v(" Login ")])],1)},t=[function(){var s=this,r=s._self._c;return r("h1",{staticClass:"signUp__name",staticStyle:{display:"flex"}},[s._v("Login As "),r("span",{staticStyle:{color:"blue","margin-left":"15px"}},[s._v(" Admin ")])])}],o=(a(7658),a(408)),i={name:"AdminPage",data(){return{isLoading:!1,showPassword:!1,serverError:"",serverSuccess:"",formData:{email:"",password:""},errors:{email:"",password:""},selectedOption:"Client"}},methods:{...(0,o.nv)({loginAction:"auth/admin"}),showPasswordClick(){this.showPassword=!this.showPassword},changeField(s,r){""!==this.errors[s]&&(this.errors[s]=""),this.formData[s]=r},login(){this.isLoading=!0,this.loginAction(this.formData).then((s=>{this.serverError="",this.serverSuccess=s.data.message,this.formData.email="",this.formData.password="",localStorage.setItem("foodDeliveryAppToken",s.data.token),this.$router.push("/")})).catch((s=>{const r=s.response.data;this.serverError=r.message,r.errors.email&&(this.errors.email=r.errors.email),r.errors.password&&(this.errors.password=r.errors.password)})).finally((()=>{this.isLoading=!1}))}}},n=i,l=a(1001),d=(0,l.Z)(n,e,t,!1,null,null,null),c=d.exports}}]);
//# sourceMappingURL=400.a9aa75cd.js.map