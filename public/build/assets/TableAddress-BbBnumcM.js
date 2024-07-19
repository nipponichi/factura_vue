import{s as $}from"./dialog.esm-Cd7IUNvF.js";import{a as x,c as C,s as T}from"./column.esm-BoZgGRTr.js";import{s as _}from"./toolbar.esm-DWLXbUPk.js";import{i as M,j as c,o as p,e as f,a as t,b as l,w as n,t as a,k as h,v as m,c as k,m as S,g as v,f as A}from"./app-D0CrsufA.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";const U={data(){return{addresses:null,addressDialog:!1,deleteAddressDialog:!1,deleteAddressesDialog:!1,myAddress:{id:"",address:"",country:"",province:"",town:"",post_code:"",favourite:"",companyID:window.location.pathname.split("/").pop()},originalAddresses:{},selectedAddresses:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:M.CONTAINS}}},mounted(){this.fetchAddresses()},methods:{fetchAddresses(){let e=window.location.pathname.split("/").pop();return c.get("/addresses/"+e).then(s=>{this.addresses=s.data.addresses}).catch(s=>{this.$toast(this.$t("Error connecting to the server"),"error")})},openNew(){this.myAddress={address:"",companyID:window.location.pathname.split("/").pop()},this.submitted=!1,this.addressDialog=!0},hideDialog(){this.addressDialog=!1,this.submitted=!1},async saveMyAddress(){this.myAddress.favourite==null&&(this.myAddress.favourite=!1);try{if(this.myAddress.id)await this.updateMyAddress();else{const e=await c.post("/address",this.myAddress);this.$toast(this.$t(e.data.message),e.data.type)}await this.fetchAddresses(),this.addressDialog=!1,this.updateFields()}catch{this.$toast(this.$t("Error connecting to the server"),"error"),this.addressDialog=!1}},editMyAddress(e){this.originalAddresses={...e},this.myAddress.id=e.id,this.myAddress.address=e.address,this.myAddress.town=e.town,this.myAddress.post_code=e.post_code,this.myAddress.country=e.country,this.myAddress.province=e.province,this.myAddress.favourite=e.favourite,this.addressDialog=!0},async updateMyAddress(){if(this.originalAddresses.companyID=this.myAddress.companyID,JSON.stringify(this.originalAddresses)===JSON.stringify(this.myAddress)){this.$toast(this.$t("Successfully updated."),"success"),this.addressDialog=!1;return}c.put("/address/"+this.myAddress.id,this.myAddress).then(async e=>{this.$toast(this.$t(e.data.message),e.data.type),this.addressDialog=!1,await this.fetchAddresses(),this.updateFields()}).catch(e=>{this.$toast(this.$t("Error connecting to the server"),"error"),this.addressDialog=!1})},async makeFavourite(e){if(e.favourite)return this.$toast(this.$t("Already selected as a favorite."),"warning");try{const s=await c.put("/addresses/"+e.id);this.$toast(this.$t(s.data.message),s.data.type),this.addressDialog=!1,await this.fetchAddresses(),this.updateFields()}catch{this.$toast(this.$t("Error connecting to the server"),"error"),this.addressDialog=!1}},confirmDeleteAddress(e){this.myAddress.address=e.address,this.myAddress.id=e.id,this.deleteAddressDialog=!0},deleteMyAddress(){c.delete("/address/"+this.myAddress.id).then(e=>{e.data.type==="success"&&(this.addresses=this.addresses.filter(s=>s.id!==this.myAddress.id)),this.$toast(this.$t(e.data.message),e.data.type)}).catch(e=>{(e.response||e.response.status===400)&&this.$toast(this.$t(e.response.message),e.response.type)}),this.deleteAddressDialog=!1},confirmDeleteSelected(){this.deleteAddressesDialog=!0},deleteSelectedAddresses(){this.selectedAddresses.forEach(e=>{c.delete("/address/"+e.id).then(s=>{s.data.type==="success"&&(this.addresses=this.addresses.filter(y=>y.id!==e.id)),this.$toast(this.$t(s.data.message),s.data.type)}).catch(s=>{(s.response||s.response.status===400)&&this.$toast(this.$t(s.response.message),s.response.type)})}),this.deleteAddressesDialog=!1},updateFields(){this.addresses.forEach(e=>{e.favourite&&this.$emit("updateAddress",e)})}}},F={class:"card"},V={class:"flex justify-between items-center mt-2"},P={class:"relative rounded-md shadow-sm w-1/4"},R=["placeholder"],E=t("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),B={class:"utility-button"},I={class:"mb-6"},L={for:"address",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},q=["placeholder"],z={class:"grid gap-3 mb-6 md:grid-cols-2"},O={for:"town",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},j=["placeholder"],J={for:"province",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},Y=["placeholder"],K={for:"post_code",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},G=["placeholder"],H={for:"country",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},Q=["placeholder"],W={class:"grid gap-3 md:grid-cols-1 justify-items-end"},X={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},Z={class:"confirmation-content"},ee=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),se={key:0},te={class:"confirmation-content"},de=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),re={key:0};function le(e,s,y,ie,r,i){const o=C,w=_,u=T,D=x,g=$;return p(),f("div",null,[t("div",F,[l(w,{class:"mb-4 border border-slate-200 ..."},{start:n(()=>[l(o,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:i.openNew},null,8,["label","onClick"]),l(o,{label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:i.confirmDeleteSelected,disabled:!r.selectedAddresses||!r.selectedAddresses.length},null,8,["label","onClick","disabled"])]),_:1}),l(D,{ref:"dt",value:r.addresses,selection:r.selectedAddresses,"onUpdate:selection":s[1]||(s[1]=d=>r.selectedAddresses=d),dataKey:"id",onRowSelect:e.onRowSelect,paginator:!0,rows:10,filters:r.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("addresses")}`},{header:n(()=>[t("div",V,[t("h4",null,a(e.$t("Manage Addresses")),1),t("div",P,[h(t("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":s[0]||(s[0]=d=>r.filters.global.value=d),placeholder:e.$t("Search...")},null,8,R),[[m,r.filters.global.value]]),E])])]),default:n(()=>[l(u,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox"}),l(u,{field:"post_code",header:e.$t("Post code"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"town",header:e.$t("Town"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"address",header:e.$t("Address"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"province",header:e.$t("Province"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"country",header:e.$t("Country"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{exportable:!1,header:e.$t("Favourite"),class:"dateTable w-24 text-center"},{body:n(d=>[d.data.favourite?(p(),k(o,{key:0,icon:"pi pi-star-fill",class:"mr-2 fav-button",onClick:b=>i.makeFavourite(d.data)},null,8,["onClick"])):(p(),k(o,{key:1,icon:"pi pi-star",class:"mr-2 fav-button",onClick:b=>i.makeFavourite(d.data)},null,8,["onClick"]))]),_:1},8,["header"]),t("div",B,[l(u,{exportable:!1,header:e.$t("Utilities"),class:"headerUtil dateTable w-24"},{body:n(d=>[l(o,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:b=>i.editMyAddress(d.data)},null,8,["onClick"]),l(o,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:b=>i.confirmDeleteAddress(d.data)},null,8,["onClick"])]),_:1},8,["header"])])]),_:1},8,["value","selection","onRowSelect","filters","currentPageReportTemplate"])]),t("template",null,[l(g,{visible:r.addressDialog,"onUpdate:visible":s[9]||(s[9]=d=>r.addressDialog=d),header:r.myAddress.id?e.$t("Update address"):e.$t("Create address"),id:"titleAddress",modal:!0,class:"p-fluid"},{default:n(()=>[t("form",{style:{width:"800px"},onSubmit:s[8]||(s[8]=S((...d)=>i.saveMyAddress&&i.saveMyAddress(...d),["prevent"]))},[t("div",I,[t("div",null,[t("label",L,a(e.$t("Address")),1),h(t("input",{type:"text",id:"address","onUpdate:modelValue":s[2]||(s[2]=d=>r.myAddress.address=d),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Address"),required:""},null,8,q),[[m,r.myAddress.address]])])]),t("div",z,[t("div",null,[t("label",O,a(e.$t("Town")),1),h(t("input",{type:"text",id:"town","onUpdate:modelValue":s[3]||(s[3]=d=>r.myAddress.town=d),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Town"),required:""},null,8,j),[[m,r.myAddress.town]])]),t("div",null,[t("label",J,a(e.$t("Province")),1),h(t("input",{type:"text",id:"province","onUpdate:modelValue":s[4]||(s[4]=d=>r.myAddress.province=d),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Province"),required:""},null,8,Y),[[m,r.myAddress.province]])]),t("div",null,[t("label",K,a(e.$t("Post code")),1),h(t("input",{type:"text",id:"post_code","onUpdate:modelValue":s[5]||(s[5]=d=>r.myAddress.post_code=d),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Post code"),pattern:"^\\d+$",required:""},null,8,G),[[m,r.myAddress.post_code]])]),t("div",null,[t("label",H,a(e.$t("Country")),1),h(t("input",{type:"text",id:"country","onUpdate:modelValue":s[6]||(s[6]=d=>r.myAddress.country=d),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Country"),required:""},null,8,Q),[[m,r.myAddress.country]])])]),t("div",W,[t("div",null,[t("button",{type:"button",class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:s[7]||(s[7]=(...d)=>i.hideDialog&&i.hideDialog(...d))},a(e.$t("Close")),1),t("button",X,a(r.myAddress.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"])]),l(g,{visible:r.deleteAddressDialog,"onUpdate:visible":s[11]||(s[11]=d=>r.deleteAddressDialog=d),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:n(()=>[l(o,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:s[10]||(s[10]=d=>r.deleteAddressDialog=!1)},null,8,["label"]),l(o,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:i.deleteMyAddress},null,8,["label","onClick"])]),default:n(()=>[t("div",Z,[ee,r.myAddress?(p(),f("span",se,[v(a(e.$t("Are you sure you want to delete")),1),t("b",null,a(r.myAddress.address),1),v("?")])):A("",!0)])]),_:1},8,["visible","header"]),l(g,{visible:r.deleteAddressesDialog,"onUpdate:visible":s[13]||(s[13]=d=>r.deleteAddressesDialog=d),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:n(()=>[l(o,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:s[12]||(s[12]=d=>r.deleteAddressesDialog=!1)},null,8,["label"]),l(o,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:i.deleteSelectedAddresses},null,8,["label","onClick"])]),default:n(()=>[t("div",te,[de,r.myAddress?(p(),f("span",re,a(e.$t("Are you sure you want to delete the selected addresses?")),1)):A("",!0)])]),_:1},8,["visible","header"])])}const he=N(U,[["render",le]]);export{he as default};
