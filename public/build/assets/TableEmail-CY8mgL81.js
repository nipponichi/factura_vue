import{s as C,a as x}from"./toolbar.esm-CNTPIwdm.js";import{s as M,a as N,b as S}from"./column.esm-RItjM3vu.js";import{j as T,k as d,o as c,e as f,a,b as s,w as n,t as m,l as g,v as E,c as v,m as _,x as U,f as b,g as k}from"./app-CM9nMGr0.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";const R={data(){return{emails:null,emailDialog:!1,deleteEmailDialog:!1,deleteEmailsDialog:!1,myEmail:{id:"",email:"",favourite:"",companyID:window.location.pathname.split("/").pop()},selectedEmails:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:T.CONTAINS}}},mounted(){this.fetchEmails()},methods:{fetchEmails(){let e=window.location.pathname.split("/").pop();d.get("/emails/"+e).then(l=>{this.emails=l.data.emails}).catch(l=>{console.error("Error fetching emails data:",l)})},openNew(){this.myEmail={email:"",companyID:window.location.pathname.split("/").pop()},this.submitted=!1,this.emailDialog=!0},hideDialog(){this.emailDialog=!1,this.submitted=!1},saveMyEmail(){console.log("companyId: "+this.myEmail.companyID),this.myEmail.favourite==null&&(this.myEmail.favourite=!1),this.myEmail.isMobile=0,this.myEmail.id?this.updateMyEmail():d.post("/email",this.myEmail).then(e=>{this.fetchEmails(),this.emailDialog=!1}).catch(e=>{console.error("Error saving email data:",e.response),this.emailDialog=!1})},editMyEmail(e){console.log("edit: "+e.favourite),this.myEmail.email=e.email,this.myEmail.id=e.id,this.myEmail.favourite=e.favourite,this.emailDialog=!0},updateMyEmail(){console.log("Update: "+this.myEmail.favourite),d.put("/email/"+this.myEmail.id,this.myEmail).then(e=>{this.fetchEmails(),this.emailDialog=!1}).catch(e=>{console.error("Error al actualizar la compañía:",e),this.emailDialog=!1})},makeFavourite(e){if(e.favourite)return alert("El correo electrónico ya está seleccionado como favorito");d.put("/emails/"+e.id).then(l=>{this.emailDialog=!1,this.fetchEmails()}).catch(l=>{console.error("Error al seleccionar un email",l),this.emailDialog=!1})},confirmDeleteEmail(e){this.myEmail=e,this.deleteEmailDialog=!0},deleteMyEmail(){d.delete("/email/"+this.myEmail.id).then(e=>{console.log(e),this.emails=this.emails.filter(l=>l.id!==this.myEmail.id),this.myEmail={},this.deleteEmailDialog=!1}).catch(e=>{(e.response||e.response.status===400)&&(console.warn("Error 400: No se pudo eliminar el email con ID:",emailId),this.deleteEmailDialog=!1)})},confirmDeleteSelected(){console.log("CONFIRM DELETE SELECTED"),this.deleteEmailsDialog=!0},deleteSelectedEmails(){this.selectedEmails.forEach(e=>{d.delete("/email/"+e.id).then(l=>{console.log("Compañía eliminada con ID:",e.id),this.emails=this.emails.filter(y=>y.id!==e.id)}).catch(l=>{(l.response||l.response.status===400)&&console.warn("Error 400: No se pudo eliminar la compañía con ID:",e.id)})}),this.selectedEmails=[],this.deleteEmailsDialog=!1}}},L={class:"card"},F={class:"flex justify-between items-center mt-2"},V={class:"relative rounded-md shadow-sm w-1/4"},B=["placeholder"],P=a("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[a("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[a("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),z={class:"utility-button"},$={class:"grid gap-3 mb-6 md:grid-cols-1"},A={for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},j={key:0,class:"flex items-center"},O={for:"link-checkbox",class:"ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"},Y={class:"grid gap-3 md:grid-cols-1 justify-items-end"},q={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},K={class:"confirmation-content"},G=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),H={key:0},J={class:"confirmation-content"},Q=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),W={key:0};function X(e,l,y,Z,i,o){const r=N,w=C,u=S,D=M,p=x;return c(),f("div",null,[a("div",L,[s(w,{class:"mb-4 border border-slate-200 ..."},{start:n(()=>[s(r,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:o.openNew},null,8,["label","onClick"]),s(r,{label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:o.confirmDeleteSelected,disabled:!i.selectedEmails||!i.selectedEmails.length},null,8,["label","onClick","disabled"])]),_:1}),s(D,{ref:"dt",value:i.emails,selection:i.selectedEmails,"onUpdate:selection":l[1]||(l[1]=t=>i.selectedEmails=t),dataKey:"id",onRowSelect:e.onRowSelect,paginator:!0,rows:10,filters:i.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("emails")}`},{header:n(()=>[a("div",F,[a("h4",null,m(e.$t("Manage Emails")),1),a("div",V,[g(a("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":l[0]||(l[0]=t=>i.filters.global.value=t),placeholder:e.$t("Search...")},null,8,B),[[E,i.filters.global.value]]),P])])]),default:n(()=>[s(u,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox w-16"}),s(u,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),s(u,{exportable:!1,header:e.$t("Favourite"),class:"dateTable w-24 text-center"},{body:n(t=>[t.data.favourite?(c(),v(r,{key:0,icon:"pi pi-star-fill",class:"mr-2 info-button",onClick:h=>o.makeFavourite(t.data)},null,8,["onClick"])):(c(),v(r,{key:1,icon:"pi pi-star",class:"mr-2 info-button",onClick:h=>o.makeFavourite(t.data)},null,8,["onClick"]))]),_:1},8,["header"]),a("div",z,[s(u,{exportable:!1,header:e.$t("Utilities"),class:"headerUtil dateTable w-24"},{body:n(t=>[s(r,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:h=>o.editMyEmail(t.data)},null,8,["onClick"]),s(r,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:h=>o.confirmDeleteEmail(t.data)},null,8,["onClick"])]),_:1},8,["header"])])]),_:1},8,["value","selection","onRowSelect","filters","currentPageReportTemplate"])]),a("template",null,[s(p,{visible:i.emailDialog,"onUpdate:visible":l[6]||(l[6]=t=>i.emailDialog=t),header:i.myEmail.id?e.$t("Update email"):e.$t("Create email"),id:"titleEmail",modal:!0,class:"p-fluid"},{default:n(()=>[a("form",{style:{width:"800px"},onSubmit:l[5]||(l[5]=_((...t)=>o.saveMyEmail&&o.saveMyEmail(...t),["prevent"]))},[a("div",$,[a("div",null,[a("label",A,m(e.$t("Email")),1),g(a("input",{type:"email",id:"email","onUpdate:modelValue":l[2]||(l[2]=t=>i.myEmail.email=t),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"info@mycompany.com",required:""},null,512),[[E,i.myEmail.email]])]),i.myEmail.id?b("",!0):(c(),f("div",j,[g(a("input",{id:"link-checkbox",type:"checkbox","onUpdate:modelValue":l[3]||(l[3]=t=>i.myEmail.favourite=t),class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"},null,512),[[U,i.myEmail.favourite]]),a("label",O,m(e.$t("Mark this email as a favourite"))+".",1)]))]),a("div",Y,[a("div",null,[a("button",{type:"button",class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:l[4]||(l[4]=(...t)=>o.hideDialog&&o.hideDialog(...t))},m(e.$t("Close")),1),a("button",q,m(i.myEmail.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"])]),s(p,{visible:i.deleteEmailDialog,"onUpdate:visible":l[8]||(l[8]=t=>i.deleteEmailDialog=t),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:n(()=>[s(r,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:l[7]||(l[7]=t=>i.deleteEmailDialog=!1)},null,8,["label"]),s(r,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:o.deleteMyEmail},null,8,["label","onClick"])]),default:n(()=>[a("div",K,[G,i.myEmail?(c(),f("span",H,[k(m(e.$t("Are you sure you want to delete"))+" ",1),a("b",null,m(i.myEmail.email),1),k("?")])):b("",!0)])]),_:1},8,["visible","header"]),s(p,{visible:i.deleteEmailsDialog,"onUpdate:visible":l[10]||(l[10]=t=>i.deleteEmailsDialog=t),style:{width:"450px"},header:"Confirm",modal:!0},{footer:n(()=>[s(r,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:l[9]||(l[9]=t=>i.deleteEmailsDialog=!1)},null,8,["label"]),s(r,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:o.deleteSelectedEmails},null,8,["label","onClick"])]),default:n(()=>[a("div",J,[Q,i.myEmail?(c(),f("span",W,m(e.$t("Are you sure you want to delete the selected emails?")),1)):b("",!0)])]),_:1},8,["visible"])])}const ae=I(R,[["render",X]]);export{ae as default};
