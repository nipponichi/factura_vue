import{s as $}from"./dialog.esm-CFBtU7hN.js";import{a as C,c as x,s as M}from"./column.esm-U4vAboxO.js";import{s as S}from"./toolbar.esm-Er0_rhX7.js";import{i as N,j as h,o as r,e as g,a,b as o,w as m,c,f as d,t as u,k as b,v,m as T,x as F,g as k}from"./app-B1ErcoGi.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";const R={data(){return{emails:null,emailDialog:!1,deleteEmailDialog:!1,deleteEmailsDialog:!1,myEmail:{id:"",email:"",favourite:"",companyID:window.location.pathname.split("/").pop()},originalEmail:{},selectedEmails:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:N.CONTAINS}}},mounted(){this.fetchEmails()},methods:{fetchEmails(){let e=window.location.pathname.split("/").pop();return h.get("/emails/"+e).then(t=>{this.emails=t.data.emails}).catch(t=>{throw this.$toast(this.$t("Error connecting to the server"),"error"),t})},openNew(){this.myEmail={email:"",companyID:window.location.pathname.split("/").pop()},this.submitted=!1,this.emailDialog=!0},hideDialog(){this.emailDialog=!1,this.submitted=!1},async saveMyEmail(){this.myEmail.favourite==null&&(this.myEmail.favourite=!1);try{if(this.myEmail.id)await this.updateMyEmail();else{const e=await h.post("/email",this.myEmail);this.$toast(this.$t(e.data.message),e.data.type)}await this.fetchEmails(),this.emailDialog=!1,this.updateFields()}catch{this.$toast(this.$t("Error connecting to the server"),"error"),this.emailDialog=!1}},editMyEmail(e){this.originalEmail={...e},this.myEmail.email=e.email,this.myEmail.id=e.id,this.myEmail.favourite=e.favourite,this.emailDialog=!0},updateMyEmail(){if(this.originalEmail.companyID=this.myEmail.companyID,JSON.stringify(this.originalEmail)===JSON.stringify(this.myEmail)){this.$toast(this.$t("Successfully updated."),"success"),this.emailDialog=!1;return}h.put("/email/"+this.myEmail.id,this.myEmail).then(async e=>{this.$toast(this.$t(e.data.message),e.data.type),await this.fetchEmails(),this.emailDialog=!1,this.updateFields()}).catch(e=>{this.$toast(this.$t("Error connecting to the server"),"error"),this.emailDialog=!1})},async makeFavourite(e){if(e.favourite)return this.$toast(this.$t("Already selected as a favorite."),"warning");try{const t=await h.put("/emails/"+e.id);await this.fetchEmails(),this.$toast(this.$t(t.data.message),t.data.type),this.emailDialog=!1,this.updateFields()}catch{this.$toast(this.$t("Error connecting to the server"),"error"),this.emailDialog=!1}},confirmDeleteEmail(e){this.myEmail=e,this.deleteEmailDialog=!0},deleteMyEmail(){h.delete("/email/"+this.myEmail.id).then(e=>{e.data.type==="success"&&(this.emails=this.emails.filter(t=>t.id!==this.myEmail.id)),this.$toast(this.$t(e.data.message),e.data.type)}).catch(e=>{this.$toast(this.$t(e.response.message),e.response.type),this.emailDialog=!1})},confirmDeleteSelected(){console.log("CONFIRM DELETE SELECTED"),this.deleteEmailsDialog=!0},deleteSelectedEmails(){this.selectedEmails.forEach(e=>{h.delete("/email/"+e.id).then(t=>{t.data.type==="success"&&(this.emails=this.emails.filter(E=>E.id!==e.id)),this.$toast(this.$t(t.data.message),t.data.type)}).catch(t=>{(t.response||t.response.status===400)&&this.$toast(this.$t(t.response.message),t.response.type)})}),this.deleteEmailsDialog=!1},updateFields(){this.emails.forEach(e=>{e.favourite&&this.$emit("updateEmail",e.email)})}}},L={class:"card"},_={class:"flex justify-between items-center mt-2"},I={class:"relative rounded-md shadow-sm w-1/4"},V=["placeholder"],B=a("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[a("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[a("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),P={class:"utility-button"},A={class:"grid gap-3 mb-6 md:grid-cols-1"},O={for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},z={key:0,class:"flex items-center"},j={for:"link-checkbox",class:"ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"},J={class:"grid gap-3 md:grid-cols-1 justify-items-end"},Y={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},q={class:"confirmation-content"},K=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),G={key:0},H={class:"confirmation-content"},Q=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),W={key:0};function X(e,t,E,Z,i,s){const n=x,w=S,p=M,D=C,f=$;return r(),g("div",null,[a("div",L,[o(w,{class:"mb-4 border border-slate-200 ..."},{start:m(()=>[e.$page.props.user.permissions.includes("create email")?(r(),c(n,{key:0,label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:s.openNew},null,8,["label","onClick"])):d("",!0),e.$page.props.user.permissions.includes("delete email")?(r(),c(n,{key:1,label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:s.confirmDeleteSelected,disabled:!i.selectedEmails||!i.selectedEmails.length},null,8,["label","onClick","disabled"])):d("",!0)]),_:1}),o(D,{ref:"dt",value:i.emails,selection:i.selectedEmails,"onUpdate:selection":t[1]||(t[1]=l=>i.selectedEmails=l),dataKey:"id",onRowSelect:e.onRowSelect,paginator:!0,rows:10,filters:i.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("emails")}`},{header:m(()=>[a("div",_,[a("h4",null,u(e.$t("Manage Emails")),1),a("div",I,[b(a("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":t[0]||(t[0]=l=>i.filters.global.value=l),placeholder:e.$t("Search...")},null,8,V),[[v,i.filters.global.value]]),B])])]),default:m(()=>[o(p,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox w-16"}),o(p,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),e.$page.props.user.permissions.includes("update email")?(r(),c(p,{key:0,exportable:!1,header:e.$t("Favourite"),class:"dateTable w-24 text-center"},{body:m(l=>[l.data.favourite?(r(),c(n,{key:0,icon:"pi pi-star-fill",class:"mr-2 fav-button",onClick:y=>s.makeFavourite(l.data)},null,8,["onClick"])):(r(),c(n,{key:1,icon:"pi pi-star",class:"mr-2 fav-button",onClick:y=>s.makeFavourite(l.data)},null,8,["onClick"]))]),_:1},8,["header"])):d("",!0),a("div",P,[o(p,{exportable:!1,header:e.$t("Utilities"),class:"headerUtil dateTable w-24"},{body:m(l=>[e.$page.props.user.permissions.includes("update email")?(r(),c(n,{key:0,icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:y=>s.editMyEmail(l.data)},null,8,["onClick"])):d("",!0),e.$page.props.user.permissions.includes("delete email")?(r(),c(n,{key:1,icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:y=>s.confirmDeleteEmail(l.data)},null,8,["onClick"])):d("",!0)]),_:1},8,["header"])])]),_:1},8,["value","selection","onRowSelect","filters","currentPageReportTemplate"])]),a("template",null,[o(f,{visible:i.emailDialog,"onUpdate:visible":t[6]||(t[6]=l=>i.emailDialog=l),header:i.myEmail.id?e.$t("Update email"):e.$t("Create email"),id:"titleEmail",modal:!0,class:"p-fluid"},{default:m(()=>[a("form",{style:{width:"800px"},onSubmit:t[5]||(t[5]=T((...l)=>s.saveMyEmail&&s.saveMyEmail(...l),["prevent"]))},[a("div",A,[a("div",null,[a("label",O,u(e.$t("Email")),1),b(a("input",{type:"email",id:"email","onUpdate:modelValue":t[2]||(t[2]=l=>i.myEmail.email=l),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"info@mycompany.com",required:""},null,512),[[v,i.myEmail.email]])]),i.myEmail.id?d("",!0):(r(),g("div",z,[b(a("input",{id:"link-checkbox",type:"checkbox","onUpdate:modelValue":t[3]||(t[3]=l=>i.myEmail.favourite=l),class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"},null,512),[[F,i.myEmail.favourite]]),a("label",j,u(e.$t("Mark this email as a favourite"))+".",1)]))]),a("div",J,[a("div",null,[a("button",{type:"button",class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:t[4]||(t[4]=(...l)=>s.hideDialog&&s.hideDialog(...l))},u(e.$t("Close")),1),a("button",Y,u(i.myEmail.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"])]),o(f,{visible:i.deleteEmailDialog,"onUpdate:visible":t[8]||(t[8]=l=>i.deleteEmailDialog=l),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:m(()=>[o(n,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[7]||(t[7]=l=>i.deleteEmailDialog=!1)},null,8,["label"]),o(n,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:s.deleteMyEmail},null,8,["label","onClick"])]),default:m(()=>[a("div",q,[K,i.myEmail?(r(),g("span",G,[k(u(e.$t("Are you sure you want to delete"))+" ",1),a("b",null,u(i.emails.email),1),k("?")])):d("",!0)])]),_:1},8,["visible","header"]),o(f,{visible:i.deleteEmailsDialog,"onUpdate:visible":t[10]||(t[10]=l=>i.deleteEmailsDialog=l),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:m(()=>[o(n,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[9]||(t[9]=l=>i.deleteEmailsDialog=!1)},null,8,["label"]),o(n,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:s.deleteSelectedEmails},null,8,["label","onClick"])]),default:m(()=>[a("div",H,[Q,i.myEmail?(r(),g("span",W,u(e.$t("Are you sure you want to delete the selected emails?")),1)):d("",!0)])]),_:1},8,["visible","header"])])}const se=U(R,[["render",X]]);export{se as default};
