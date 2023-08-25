"use strict";(self["webpackChunkfood_delivery_app_front"]=self["webpackChunkfood_delivery_app_front"]||[]).push([[496],{4496:function(t,a,s){s.r(a),s.d(a,{default:function(){return c}});var e=function(){var t=this,a=t._self._c;return a("div",[a("h3",{staticClass:"profile__name"},[t._v("Address")]),a("div",{staticClass:"account__info"},[a("h2",{staticClass:"account__title"},[t._v("shipping address")]),a("div",{staticClass:"account__action"},[t.isEditing?a("BaseButton",{staticClass:"account__btns-discardBtn",on:{onClick:t.cancelEditing}},[t._v(" Cancel ")]):a("BaseButton",{attrs:{variant:"primary-outline"},on:{onClick:function(a){t.isEditing=!0}}},[t._v(" Change ")])],1),a("div",{staticClass:"account__input"},[a("BaseInput",{attrs:{label:"address",placeholder:"7 rue saint-lazare",value:t.formData.address,error:t.errors.address,disabled:!t.isEditing||t.isLoading},on:{onInput:a=>t.changeField("address",a)}}),a("BaseInput",{attrs:{label:"Ville",placeholder:"Paris",value:t.formData.Ville,error:t.errors.Ville,disabled:!t.isEditing||t.isLoading},on:{onInput:a=>t.changeField("Ville",a)}}),a("BaseInput",{attrs:{label:"complement of address",placeholder:"deuxiéme étage porte B",value:t.formData.complement,error:t.errors.complement,disabled:!t.isEditing||t.isLoading},on:{onInput:a=>t.changeField("complement",a)}}),a("BaseInput",{attrs:{label:"Postal Code",placeholder:"75000",value:t.formData.postal,error:t.errors.postal,disabled:!t.isEditing||t.isLoading},on:{onInput:a=>t.changeField("postal",a)}})],1),a("div",{staticClass:"profile-form-divider"}),a("div",{staticClass:"account__btns"},[a("BaseButton",{staticClass:"account__btns-dangerBtn",attrs:{variant:"danger-outline"},on:{onClick:t.logout}},[t._v("Log out")]),a("div",[t.isEditing?a("BaseButton",{staticClass:"SaveBtn",attrs:{loading:t.isLoading},on:{onClick:t.saveChangeClick}},[t._v("Save changes")]):t._e()],1)],1)])])},i=[],n=(s(7658),s(408)),o={name:"AddressPage",data(){return{isEditing:!1,isLoading:!1,formData:{address:"",Ville:"",complement:"",postal:""},errors:{address:"",Ville:"",complement:"",postal:""}}},computed:{...(0,n.Se)({userData:"user/userData"})},mounted(){this.initPage()},methods:{...(0,n.OI)({logoutUser:"auth/logout"}),initPage(){this.formData.address=this.userData.address,this.formData.Ville=this.userData.Ville,this.formData.complement=this.userData.complement,this.formData.postal=this.userData.postal},cancelEditing(){this.isEditing=!1,this.initPage()},changeField(t,a){""!==this.errors[t]&&(this.errors[t]=""),this.formData[t]=a,this.formData.emailNotifications[t]=a},saveChangeClick(){this.isLoading=!0,setTimeout((()=>{this.isLoading=!1,this.isEditing=!1}),2500)},logout(){this.logoutUser(),this.$router.push("/")}}},r=o,l=s(1001),d=(0,l.Z)(r,e,i,!1,null,null,null),c=d.exports}}]);
//# sourceMappingURL=496.70b1eb44.js.map