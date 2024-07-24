import{s as $}from"./dialog.esm-_y174XLm.js";import{c as C,s as D,a as P}from"./column.esm-MDmOvNN_.js";import{s as S}from"./toolbar.esm-B8g17VSN.js";import{o as m,c as U,w as d,i as M,j as g,a as t,t as a,b as l,k as n,v as h,m as w,e as p,f as c,q as y}from"./app-tfnQKRrZ.js";import{_ as T}from"./AppLayout-C5WGXR6B.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const A={class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"},N={class:"card"},R={class:"flex justify-between items-center mt-2"},V={class:"relative rounded-md shadow-sm w-1/4"},E=["placeholder"],L=t("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),z={class:"grid gap-3 mb-6 md:grid-cols-2"},j={for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},B={for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},q={class:"grid gap-3 mb-6 md:grid-cols-2"},O={key:0},I={for:"password",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},F={key:1},Y={for:"confirmPassword",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},J={class:"flex justify-between items-center mt-2"},K={class:"relative rounded-md shadow-sm w-1/4"},G=["placeholder"],H=t("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),Q={class:"grid gap-3 mb-6 md:grid-cols-2"},W={class:"mt-4"},X={for:"role_type",class:"block font-medium text-gray-700"},Z={class:"mt-2 ml-12 flex justify-center"},x={class:"inline-flex items-center"},_={class:"ml-2"},ee={class:"inline-flex items-center ml-6"},se={class:"ml-2"},te={class:"inline-flex items-center ml-6"},re={class:"ml-2"},ie={class:"inline-flex items-center ml-6"},le={class:"ml-2"},ae={class:"grid gap-3 md:grid-cols-1 justify-items-end"},oe={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},de={class:"grid gap-3 mb-6 md:grid-cols-2"},ne={key:0},ue={for:"password",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},me={key:1},ge={for:"confirmPassword",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},he={class:"grid gap-3 md:grid-cols-1 justify-items-end"},pe={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},ce={class:"confirmation-content"},fe=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),be={key:0},ye={class:"confirmation-content"},Ue=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),ke={key:0},we={class:"confirmation-content"},ve=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),$e={key:0},Ce={class:"confirmation-content"},De=t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),Pe={key:0},Se={data(){return{users:null,companies:null,userDialog:!1,changeUserDialog:!1,changeUsersDialog:!1,deleteUserDialog:!1,deleteUsersDialog:!1,resetPassDialog:!1,myUser:{id:"",name:"",email:"",password:"",confirmPassword:"",role_type:"",selectedCompany:[]},originalUser:{},selectedCompany:[],selectedUsers:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:M.CONTAINS}}},async mounted(){this.users=this.$page.props.users},methods:{async fetchCompanies(){try{const i=await g.get("/companies-invoice");this.companies=i.data.companies,this.companies.length===1&&(this.selectedCompany=this.companies[0],this.companyId=this.selectedCompany.id)}catch{this.$toast(this.$t("Error connecting to the server"),"error")}},async openNew(){this.selectedCompany=[],this.myUser={},await this.fetchCompanies(),this.submitted=!1,this.userDialog=!0},hideDialog(){this.userDialog=!1,this.submitted=!1,this.resetPassDialog=!1},saveUser(){this.myUser.id?this.updateMyUser():(this.myUser.selectedCompany=this.selectedCompany,g.post("/users",this.myUser).then(i=>{i.data.type==="success"&&(this.myUser=i.data.user,console.log(this.myUser),this.users.push(this.myUser),this.userDialog=!1),this.$toast(this.$t(i.data.message),i.data.type)}).catch(i=>{this.$toast(this.$t("Error connecting to the server"),"error")}))},async markAssignedCompanies(i){await this.fetchCompanies();for(let e=0;e<i.length;e++){let s=this.companies.find(o=>o.id===i[e]);s&&this.selectedCompany.push(s)}},async editMyUser(i){this.selectedCompany=[],this.originalUser={...i},this.myUser=i,await this.markAssignedCompanies(this.myUser.company_ID),this.userDialog=!0},updateMyUser(){if(JSON.stringify(this.originalUser)===JSON.stringify(this.myUser)){this.$toast(this.$t("Successfully updated."),"success"),this.userDialog=!1;return}this.myUser.selectedCompany=this.selectedCompany,g.put("/users/"+this.myUser.id,this.myUser).then(i=>{if(i.data.type==="success"){let e=this.users.find(s=>s.id===this.myUser.id);e.company_ID=[];for(let s=0;s<this.myUser.selectedCompany.length;s++)e.company_ID[s]=this.myUser.selectedCompany[s].id}this.$toast(this.$t(i.data.message),i.data.type),this.userDialog=!1}).catch(i=>{this.$toast(this.$t("Error connecting to the server"),"error")})},editPass(i){this.myUser.password="",this.myUser.confirmPassword="",this.myUser.id=i.id,this.myUser.name=i.name,this.resetPassDialog=!0},resetPassUser(){this.checkPassword()?g.put("/users-pass/"+this.myUser.id,this.myUser).then(i=>{this.$toast(this.$t(i.data.message),i.data.type),this.resetPassDialog=!1}).catch(i=>{this.$toast(this.$t("Error connecting to the server"),"error")}):this.$toast(this.$t("Passwords do not match"),"warning")},changeUserState(i){this.myUser=i,this.changeUserDialog=!0},confirmChangeState(){g.put("/user-active/"+this.myUser.id).then(i=>{if(i.data.type==="success"){let e=this.users.find(s=>s.id===this.myUser.id);e.isActive=e.isActive===1?0:1}this.$toast(this.$t(i.data.message),i.data.type),this.changeUserDialog=!1}).catch(i=>{this.$toast(this.$t("Error connecting to the server"),"error")})},confirmChangeSelected(){this.changeUsersDialog=!0},changeSelectedUsers(){this.selectedUsers.forEach(i=>{g.put("/user-active/"+i.id).then(e=>{if(e.data.type==="success"){let s=this.users.find(o=>o.id===i.id);s&&(s.isActive=s.isActive===1?0:1)}this.$toast(this.$t(e.data.message),e.data.type),this.selectedUsers=[],this.changeUsersDialog=!1}).catch(e=>{this.$toast(this.$t("Error connecting to the server"),"error")})})},confirmDeleteUser(i){this.myUser=i,this.deleteUserDialog=!0},deleteMyUser(){g.delete("/users/"+this.myUser.id).then(i=>{i.data.type==="success"&&(this.users=this.users.filter(e=>e.id!==this.myUser.id)),this.$toast(this.$t(i.data.message),i.data.type)}).catch(i=>{this.$toast(this.$t("Error connecting to the server"),"error")}),this.deleteUserDialog=!1},confirmDeleteSelected(){this.deleteUsersDialog=!0},deleteSelectedUsers(){this.selectedUsers.forEach(i=>{g.delete("/users/"+i.id).then(e=>{e.data.type==="success"&&(this.users=this.users.filter(s=>s.id!==i.id)),this.$toast(this.$t(e.data.message),e.data.type)}).catch(e=>{this.$toast(this.$t("Error connecting to the server"),"error")})}),this.deleteUsersDialog=!1},checkPassword(){return this.myUser.password==this.myUser.confirmPassword}}},Ee=Object.assign(Se,{__name:"TableUser",setup(i){return(e,s)=>{const o=C,v=S,u=D,k=P,f=$;return m(),U(T,{title:"Profile"},{header:d(()=>[t("h2",A,a(e.$t("Users")),1)]),default:d(()=>[t("div",null,[t("div",N,[l(v,{class:"mb-4 border border-slate-200 ..."},{start:d(()=>[l(o,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:e.openNew},null,8,["label","onClick"]),l(o,{label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"mr-2 danger-button",onClick:e.confirmDeleteSelected,disabled:!e.selectedUsers||!e.selectedUsers.length},null,8,["label","onClick","disabled"]),l(o,{label:e.$t("Change status"),icon:"pi pi-cog",class:"status-button",onClick:e.confirmChangeSelected,disabled:!e.selectedUsers||!e.selectedUsers.length},null,8,["label","onClick","disabled"])]),_:1}),l(k,{ref:"dt",value:e.users,selection:e.selectedUsers,"onUpdate:selection":s[1]||(s[1]=r=>e.selectedUsers=r),dataKey:"id",paginator:!0,rows:10,filters:e.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("users")}`},{header:d(()=>[t("div",R,[t("h4",null,a(e.$t("Manage users")),1),t("div",V,[n(t("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":s[0]||(s[0]=r=>e.filters.global.value=r),placeholder:e.$t("Search...")},null,8,E),[[h,e.filters.global.value]]),L])])]),default:d(()=>[l(u,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox"}),l(u,{field:"name",header:e.$t("Username"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"role_type",header:e.$t("Role"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"isActive",header:e.$t("Active"),sortable:"",class:"dateTable"},{body:d(r=>[r.data.isActive===1?(m(),U(o,{key:0,icon:"pi pi-check",outlined:"",rounded:"",class:"mr-2 info-active",severity:"danger",onClick:b=>e.changeUserState(r.data)},null,8,["onClick"])):(m(),U(o,{key:1,icon:"pi pi-times",outlined:"",rounded:"",class:"mr-2 info-disable",severity:"danger",onClick:b=>e.changeUserState(r.data)},null,8,["onClick"]))]),_:1},8,["header"]),l(u,{field:"user_who_created",header:e.$t("Created by"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"user_who_modified",header:e.$t("Modified by"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{exportable:!1,header:e.$t("Utility"),class:"dateTable"},{body:d(r=>[l(o,{icon:"pi pi-key",outlined:"",rounded:"",class:"mr-2 pass-button",onClick:b=>e.editPass(r.data)},null,8,["onClick"]),l(o,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:b=>e.editMyUser(r.data)},null,8,["onClick"]),l(o,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:b=>e.confirmDeleteUser(r.data)},null,8,["onClick"])]),_:1},8,["header"])]),_:1},8,["value","selection","filters","currentPageReportTemplate"])]),l(f,{visible:e.userDialog,"onUpdate:visible":s[14]||(s[14]=r=>e.userDialog=r),header:e.myUser.id?e.$t("Modify user"):e.$t("Create user"),id:"titleCompany",modal:!0,class:"p-fluid"},{default:d(()=>[t("form",{style:{width:"800px"},onSubmit:s[13]||(s[13]=w((...r)=>e.saveUser&&e.saveUser(...r),["prevent"]))},[t("div",z,[t("div",null,[t("label",j,a(e.$t("Username")),1),n(t("input",{type:"text",id:"name","onUpdate:modelValue":s[2]||(s[2]=r=>e.myUser.name=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Username",required:""},null,512),[[h,e.myUser.name]])]),t("div",null,[t("label",B,a(e.$t("Email")),1),n(t("input",{type:"email",id:"email","onUpdate:modelValue":s[3]||(s[3]=r=>e.myUser.email=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"info@user.com",required:""},null,512),[[h,e.myUser.email]])])]),t("div",q,[e.myUser.id?c("",!0):(m(),p("div",O,[t("label",I,a(e.$t("Password")),1),n(t("input",{type:"password",id:"password","onUpdate:modelValue":s[4]||(s[4]=r=>e.myUser.password=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"password",required:""},null,512),[[h,e.myUser.password]])])),e.myUser.id?c("",!0):(m(),p("div",F,[t("label",Y,a(e.$t("Confirm password")),1),n(t("input",{type:"password",id:"confirmPassword","onUpdate:modelValue":s[5]||(s[5]=r=>e.myUser.confirmPassword=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"password",required:""},null,512),[[h,e.myUser.confirmPassword]])]))]),l(k,{ref:"dt",value:e.companies,selection:e.selectedCompany,"onUpdate:selection":s[7]||(s[7]=r=>e.selectedCompany=r),dataKey:"id",onRowSelect:e.onRowSelect,paginator:!0,rows:10,filters:e.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("companies")}`},{header:d(()=>[t("div",J,[t("h4",null,a(e.$t("Assigns a company")),1),t("div",K,[n(t("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":s[6]||(s[6]=r=>e.filters.global.value=r),placeholder:e.$t("Search...")},null,8,G),[[h,e.filters.global.value]]),H])])]),default:d(()=>[l(u,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox w-16"}),l(u,{field:"name",header:e.$t("Name"),sortable:"",class:"dateTable"},null,8,["header"]),l(u,{field:"tax_number",header:e.$t("Tax number"),sortable:"",class:"dateTable"},null,8,["header"])]),_:1},8,["value","selection","onRowSelect","filters","currentPageReportTemplate"]),t("div",Q,[t("div",W,[t("label",X,a(e.$t("Define the role")),1),t("div",Z,[t("label",x,[n(t("input",{type:"radio",id:"sole_proprietorship","onUpdate:modelValue":s[8]||(s[8]=r=>e.myUser.role_type=r),value:"freelancer",class:"form-radio text-indigo-600",required:""},null,512),[[y,e.myUser.role_type]]),t("span",_,a(e.$t("Freelance")),1)]),t("label",ee,[n(t("input",{type:"radio",id:"partnership","onUpdate:modelValue":s[9]||(s[9]=r=>e.myUser.role_type=r),value:"company",class:"form-radio text-indigo-600"},null,512),[[y,e.myUser.role_type]]),t("span",se,a(e.$t("Company")),1)]),t("label",te,[n(t("input",{type:"radio",id:"corporation","onUpdate:modelValue":s[10]||(s[10]=r=>e.myUser.role_type=r),value:"consulting",class:"form-radio text-indigo-600"},null,512),[[y,e.myUser.role_type]]),t("span",re,a(e.$t("Consulting")),1)]),t("label",ie,[n(t("input",{type:"radio",id:"corporation","onUpdate:modelValue":s[11]||(s[11]=r=>e.myUser.role_type=r),value:"admin",class:"form-radio text-indigo-600"},null,512),[[y,e.myUser.role_type]]),t("span",le,a(e.$t("Admin")),1)])])])]),t("div",ae,[t("div",null,[t("button",{class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",text:"",onClick:s[12]||(s[12]=(...r)=>e.hideDialog&&e.hideDialog(...r))},a(e.$t("Close")),1),t("button",oe,a(e.myUser.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"]),l(f,{visible:e.resetPassDialog,"onUpdate:visible":s[19]||(s[19]=r=>e.resetPassDialog=r),header:e.$t("Reset password")+": "+e.myUser.name,id:"titleCompany",modal:!0,class:"p-fluid"},{default:d(()=>[t("form",{style:{width:"800px"},onSubmit:s[18]||(s[18]=w((...r)=>e.resetPassUser&&e.resetPassUser(...r),["prevent"]))},[t("div",de,[e.myUser.id?(m(),p("div",ne,[t("label",ue,a(e.$t("Password")),1),n(t("input",{type:"password",id:"password","onUpdate:modelValue":s[15]||(s[15]=r=>e.myUser.password=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"password"},null,512),[[h,e.myUser.password]])])):c("",!0),e.myUser.id?(m(),p("div",me,[t("label",ge,a(e.$t("Confirm password")),1),n(t("input",{type:"password",id:"confirmPassword","onUpdate:modelValue":s[16]||(s[16]=r=>e.myUser.confirmPassword=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"password"},null,512),[[h,e.myUser.confirmPassword]])])):c("",!0)]),t("div",he,[t("div",null,[t("button",{class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",text:"",onClick:s[17]||(s[17]=(...r)=>e.hideDialog&&e.hideDialog(...r))},a(e.$t("Close")),1),t("button",pe,a(e.myUser.id?e.$t("Reset"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"]),l(f,{visible:e.changeUserDialog,"onUpdate:visible":s[21]||(s[21]=r=>e.changeUserDialog=r),style:{width:"450px"},header:"Confirm",modal:!0},{footer:d(()=>[l(o,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:s[20]||(s[20]=r=>e.deleteUserDialog=!1)},null,8,["label"]),l(o,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:e.confirmChangeState},null,8,["label","onClick"])]),default:d(()=>[t("div",ce,[fe,e.users?(m(),p("span",be,a(e.$t("Are you sure you want to disable the user"))+" "+a(e.myUser.name)+"?",1)):c("",!0)])]),_:1},8,["visible"]),l(f,{visible:e.changeUsersDialog,"onUpdate:visible":s[23]||(s[23]=r=>e.changeUsersDialog=r),style:{width:"450px"},header:"Confirm",modal:!0},{footer:d(()=>[l(o,{label:"No",icon:"pi pi-times",text:"",onClick:s[22]||(s[22]=r=>e.changeUsersDialog=!1)}),l(o,{label:"Yes",icon:"pi pi-check",text:"",onClick:e.changeSelectedUsers},null,8,["onClick"])]),default:d(()=>[t("div",ye,[Ue,e.myUser?(m(),p("span",ke,a(e.$t("Are you sure you want to disable selected users?")),1)):c("",!0)])]),_:1},8,["visible"]),l(f,{visible:e.deleteUserDialog,"onUpdate:visible":s[25]||(s[25]=r=>e.deleteUserDialog=r),style:{width:"450px"},header:"Confirm",modal:!0},{footer:d(()=>[l(o,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:s[24]||(s[24]=r=>e.deleteUserDialog=!1)},null,8,["label"]),l(o,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:e.deleteMyUser},null,8,["label","onClick"])]),default:d(()=>[t("div",we,[ve,e.users?(m(),p("span",$e,a(e.$t("Are you sure you want to delete"))+" "+a(e.myUser.name)+"?",1)):c("",!0)])]),_:1},8,["visible"]),l(f,{visible:e.deleteUsersDialog,"onUpdate:visible":s[27]||(s[27]=r=>e.deleteUsersDialog=r),style:{width:"450px"},header:"Confirm",modal:!0},{footer:d(()=>[l(o,{label:"No",icon:"pi pi-times",text:"",onClick:s[26]||(s[26]=r=>e.deleteUsersDialog=!1)}),l(o,{label:"Yes",icon:"pi pi-check",text:"",onClick:e.deleteSelectedUsers},null,8,["onClick"])]),default:d(()=>[t("div",Ce,[De,e.myUser?(m(),p("span",Pe,a(e.$t("Are you sure you want to delete selected users?")),1)):c("",!0)])]),_:1},8,["visible"])])]),_:1})}}});export{Ee as default};