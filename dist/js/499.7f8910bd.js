"use strict";(self["webpackChunkfood_delivery_app_front"]=self["webpackChunkfood_delivery_app_front"]||[]).push([[499],{499:function(t,e,a){a.r(e),a.d(e,{default:function(){return u}});var i=function(){var t=this,e=t._self._c;return e("section",[e("div",{staticClass:"container"},[e("div",{staticClass:"deals__list"},t._l(t.dealsList,(function(t,a){return e("DealCard",{key:`dealCard__${a}`,attrs:{variant:t.variant,title:t.title,offer:t.offer,tag:t.tag}})})),1),t.isLoading?e("div",{staticClass:"products__list"},t._l(Array.from({length:6}).fill(0),(function(t,a){return e("ProductCardSkeleton",{key:`productSkeleton__${a}`})})),1):t._e(),t.isLoading?t._e():e("div",{staticClass:"products__list"},t._l(t.productList,(function(t){return e("ProductCard",{key:`productCard__${t.id}`,attrs:{image:t.image,featured:t.featured,title:t.name,minTime:t.deliveryTime,minSum:t.minimalOrder,tags:t.tags}})})),1)])])},s=[];const r=[{title:"All deserts",offer:"20% OFF",tag:"Deserty"},{title:"Big Burgers",offer:"50% OFF",tag:"Fooddies",variant:"secondary"}];var d=r,l={name:"IndexPage",data(){return{isLoading:!1,dealsList:d,categoryList:[],productList:[],selectedCategory:null}},methods:{loadData(){this.isLoading=!0;const t=client.get("/api/products").then((t=>{this.productList=t.data.data})),e=client.get("/api/categories").then((({data:{data:t=[]}={}})=>{this.categoryList=t}));Promise.all([t,e]).finally((()=>{this.isLoading=!1}))},clickCategory(t){const{id:e}=t;this.selectedCategory===e?this.selectedCategory=null:this.selectedCategory=e}},mounted(){this.loadData()}},n=l,o=a(1001),c=(0,o.Z)(n,i,s,!1,null,null,null),u=c.exports}}]);
//# sourceMappingURL=499.7f8910bd.js.map