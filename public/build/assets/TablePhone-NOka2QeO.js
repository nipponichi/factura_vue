import{s as C,a as x}from"./toolbar.esm-B0TbK0bb.js";import{s as M,a as E,b as N}from"./column.esm-CUrjiXZs.js";import{j as S,k as h,o as c,e as m,a as s,b as n,w as r,t as d,l as b,v as P,c as v,m as T,x as U,f as y,g as k}from"./app-DWuN0MW6.js";import{_}from"./_plugin-vue_export-helper-DlAUqK2U.js";const I={data(){return{phones:null,phoneDialog:!1,deletePhoneDialog:!1,deletePhonesDialog:!1,myPhone:{id:"",phone:"",favourite:"",isMobile:0,companyID:window.location.pathname.split("/").pop()},selectedPhones:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:S.CONTAINS}}},mounted(){this.fetchPhones()},methods:{fetchPhones(){let e=window.location.pathname.split("/").pop();h.get("/phones/"+e).then(o=>{this.phones=o.data.phones}).catch(o=>{console.error("Error fetching phone data:",o)})},openNew(){this.myPhone={phone:"",companyID:window.location.pathname.split("/").pop()},this.submitted=!1,this.phoneDialog=!0},hideDialog(){this.phoneDialog=!1,this.submitted=!1},saveMyPhone(){console.log("companyId: "+this.myPhone.companyID),this.myPhone.favourite==null&&(this.myPhone.favourite=!1),this.myPhone.isMobile=0,this.myPhone.id?this.updateMyPhone():h.post("/phone",this.myPhone).then(e=>{this.fetchPhones(),this.phoneDialog=!1}).catch(e=>{console.error("Error saving phone data:",e.response),this.phoneDialog=!1})},editMyPhone(e){console.log("edit: "+e.favourite),this.myPhone.phone=e.phone,this.myPhone.id=e.id,this.myPhone.favourite=e.favourite,this.phoneDialog=!0},updateMyPhone(){console.log("Update: "+this.myPhone.favourite),h.put("/phone/"+this.myPhone.id,this.myPhone).then(e=>{this.fetchPhones(),this.phoneDialog=!1}).catch(e=>{console.error("Error al actualizar la compañía:",e),this.phoneDialog=!1})},makeFavourite(e){if(e.favourite)return alert("El telefono ya está seleccionado como favorito");h.put("/phones/"+e.id).then(o=>{this.phoneDialog=!1,this.fetchPhones()}).catch(o=>{console.error("Error al seleccionar un teléfono",o),this.phoneDialog=!1})},confirmDeletePhone(e){this.myPhone=e,this.deletePhoneDialog=!0},deleteMyPhone(){const e=this.myPhone.id;h.delete("/phone/"+this.myPhone.id).then(o=>{console.log(o),this.phones=this.phones.filter(u=>u.id!==e),this.myPhone={},this.deletePhoneDialog=!1}).catch(o=>{(o.response||o.response.status===400)&&(console.warn("Error 400: No se pudo eliminar el teléfono con ID:",e),this.deletePhoneDialog=!1)})},confirmDeleteSelected(){console.log("CONFIRM DELETE SELECTED"),this.deletePhonesDialog=!0},deleteSelectedPhones(){this.selectedPhones.forEach(e=>{h.delete("/phone/"+e.id).then(o=>{console.log("Compañía eliminada con ID:",e.id),this.phones=this.phones.filter(u=>u.id!==e.id)}).catch(o=>{(o.response||o.response.status===400)&&console.warn("Error 400: No se pudo eliminar la compañía con ID:",e.id)})}),this.selectedPhones=[],this.deletePhonesDialog=!1}}},R={class:"card"},L={class:"flex justify-between items-center mt-2"},$={class:"relative rounded-md shadow-sm w-1/4"},F=["placeholder"],V=s("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[s("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),B={class:"utility-button"},z={class:"grid gap-3 mb-6 md:grid-cols-1"},A={for:"phone",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},j=["placeholder"],O={key:0,class:"flex items-center"},Y={for:"link-checkbox",class:"ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"},q={class:"grid gap-3 md:grid-cols-1 justify-items-end"},K={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},G={class:"confirmation-content"},H=s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),J={key:0},Q={class:"confirmation-content"},W=s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),X={key:0};function Z(e,o,u,ee,t,i){const a=E,w=C,p=N,D=M,f=x;return c(),m("div",null,[s("div",R,[n(w,{class:"mb-4 border border-slate-200 ..."},{start:r(()=>[n(a,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:i.openNew},null,8,["label","onClick"]),n(a,{label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:i.confirmDeleteSelected,disabled:!t.selectedPhones||!t.selectedPhones.length},null,8,["label","onClick","disabled"])]),_:1}),n(D,{ref:"dt",value:t.phones,selection:t.selectedPhones,"onUpdate:selection":o[1]||(o[1]=l=>t.selectedPhones=l),dataKey:"id",onRowSelect:e.onRowSelect,paginator:!0,rows:10,filters:t.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("phones")}`},{header:r(()=>[s("div",L,[s("h4",null,d(e.$t("Manage Phones")),1),s("div",$,[b(s("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":o[0]||(o[0]=l=>t.filters.global.value=l),placeholder:e.$t("Search...")},null,8,F),[[P,t.filters.global.value]]),V])])]),default:r(()=>[n(p,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox w-16"}),n(p,{field:"phone",header:e.$t("Phone"),sortable:"",class:"dateTable"},null,8,["header"]),n(p,{exportable:!1,header:e.$t("Favourite"),class:"dateTable w-24 text-center"},{body:r(l=>[l.data.favourite?(c(),v(a,{key:0,icon:"pi pi-star-fill",class:"mr-2 info-button",onClick:g=>i.makeFavourite(l.data)},null,8,["onClick"])):(c(),v(a,{key:1,icon:"pi pi-star",class:"mr-2 info-button",onClick:g=>i.makeFavourite(l.data)},null,8,["onClick"]))]),_:1},8,["header"]),s("div",B,[n(p,{exportable:!1,header:e.$t("Utilities"),class:"headerUtil dateTable w-24"},{body:r(l=>[n(a,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:g=>i.editMyPhone(l.data)},null,8,["onClick"]),n(a,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:g=>i.confirmDeletePhone(l.data)},null,8,["onClick"])]),_:1},8,["header"])])]),_:1},8,["value","selection","onRowSelect","filters","currentPageReportTemplate"])]),s("template",null,[n(f,{visible:t.phoneDialog,"onUpdate:visible":o[6]||(o[6]=l=>t.phoneDialog=l),header:(t.myPhone.id,e.$t("Update phone")),id:"titlePhone",modal:!0,class:"p-fluid"},{default:r(()=>[s("form",{style:{width:"800px"},onSubmit:o[5]||(o[5]=T((...l)=>i.saveMyPhone&&i.saveMyPhone(...l),["prevent"]))},[s("div",z,[s("div",null,[s("label",A,d(e.$t("Phone")),1),b(s("input",{type:"tel",id:"phone","onUpdate:modelValue":o[2]||(o[2]=l=>t.myPhone.phone=l),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Update phone"),pattern:"^\\+\\d{1,3}\\s?\\d{1,14}$",required:""},null,8,j),[[P,t.myPhone.phone]])]),t.myPhone.id?y("",!0):(c(),m("div",O,[b(s("input",{id:"link-checkbox",type:"checkbox","onUpdate:modelValue":o[3]||(o[3]=l=>t.myPhone.favourite=l),class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"},null,512),[[U,t.myPhone.favourite]]),s("label",Y,d(e.$t("Mark this phone number as a favourite"))+".",1)]))]),s("div",q,[s("div",null,[s("button",{type:"button",class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:o[4]||(o[4]=(...l)=>i.hideDialog&&i.hideDialog(...l))},d(e.$t("Close")),1),s("button",K,d(t.myPhone.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"])]),n(f,{visible:t.deletePhoneDialog,"onUpdate:visible":o[8]||(o[8]=l=>t.deletePhoneDialog=l),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:r(()=>[n(a,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:o[7]||(o[7]=l=>t.deletePhoneDialog=!1)},null,8,["label"]),n(a,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:i.deleteMyPhone},null,8,["label","onClick"])]),default:r(()=>[s("div",G,[H,t.myPhone?(c(),m("span",J,[k(d(e.$t("Are you sure you want to delete")),1),s("b",null,d(t.myPhone.phone),1),k("?")])):y("",!0)])]),_:1},8,["visible","header"]),n(f,{visible:t.deletePhonesDialog,"onUpdate:visible":o[10]||(o[10]=l=>t.deletePhonesDialog=l),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:r(()=>[n(a,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:o[9]||(o[9]=l=>t.deletePhonesDialog=!1)},null,8,["label"]),n(a,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:i.deleteSelectedPhones},null,8,["label","onClick"])]),default:r(()=>[s("div",Q,[W,t.myPhone?(c(),m("span",X,d(e.$t("Are you sure you want to delete the selected phones?")),1)):y("",!0)])]),_:1},8,["visible","header"])])}const ne=_(I,[["render",Z]]);export{ne as default};