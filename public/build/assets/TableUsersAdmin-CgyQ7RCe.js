import{s as D}from"./dialog.esm-Cd7IUNvF.js";import{a as C,c as _,s as P}from"./column.esm-BoZgGRTr.js";import{s as S}from"./toolbar.esm-DWLXbUPk.js";import{i as T,j as p,o as m,e as g,a as s,b as o,w as d,t as i,k as n,v as b,c as U,f,p as y,m as w}from"./app-D0CrsufA.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";const A={data(){return{users:null,userDialog:!1,deleteUserDialog:!1,deleteUsersDialog:!1,resetPassDialog:!1,myUser:{name:"",email:"",password:"",confirmPassword:"",role_type:""},selectedAdminUsers:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:T.CONTAINS}}},mounted(){this.users=this.$page.props.users},methods:{fecthUsers(){p.get("/admin-reload-users").then(e=>{this.users=e.data.users}).catch(e=>{console.error("Error fetching phone data:",e)})},openNew(){this.myUser={},this.submitted=!1,this.userDialog=!0},hideDialog(){this.userDialog=!1,this.submitted=!1,this.resetPassDialog=!1},saveUser(){this.checkPassword()?this.myUser.id?this.updateUser():p.post("/admin-users",this.myUser).then(e=>{this.userDialog=!1,this.fecthUsers()}).catch(e=>{console.log(e.response)}):alert("Fulfill the form")},editUser(e){this.myUser.name=e.name,this.myUser.email=e.email,this.myUser.role_type=e.role_type,this.myUser.id=e.id,this.userDialog=!0},updateUser(){p.put("/admin-users/"+this.myUser.id,this.myUser).then(e=>{this.userDialog=!1,this.fecthUsers()}).catch(e=>{console.error("Error al actualizar el usuario",e),this.userDialog=!1})},editPass(e){this.myUser.password="",this.myUser.confirmPassword="",this.myUser.id=e.id,this.myUser.name=e.name,this.resetPassDialog=!0},resetPassUser(){this.checkPassword()?p.put("/admin-users-pass/"+this.myUser.id,this.myUser).then(e=>{this.resetPassDialog=!1,this.fecthUsers()}).catch(e=>{console.error("Error al actualizar la contraseña del usuario ",e),this.resetPassDialog=!1}):alert("Passwords do not match")},changeUserState(e){this.myUser=e,this.deleteUserDialog=!0},confirmChangeState(){p.delete("/admin-users/"+this.myUser.id).then(e=>{this.fecthUsers(),this.deleteUserDialog=!1}).catch(e=>{e.response&&(console.warn("Error: No se pudo eliminar el usuario con ID:",this.myUser.id),this.deleteUserDialog=!1)})},confirmDeleteSelected(){this.deleteUsersDialog=!0},deleteSelectedUsers(){this.selectedAdminUsers.forEach(e=>{p.delete("/admin-users/"+e.id).then(l=>{}).catch(l=>{console.error("Error al eliminar el producto:",l),this.deleteUsersDialog=!1})}),this.fecthUsers(),this.deleteUsersDialog=!1},handleInfoButtonClick(e){this.$inertia.get("/"+this.$page.props.type+"/"+e)},checkPassword(){return this.myUser.password==this.myUser.confirmPassword}}},N={class:"card"},M={class:"flex justify-between items-center mt-2"},E={class:"relative rounded-md shadow-sm w-1/4"},R=["placeholder"],B=s("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[s("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),z={class:"grid gap-3 mb-6 md:grid-cols-2"},L={for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},j={for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},q={class:"grid gap-3 mb-6 md:grid-cols-2"},F={key:0},I={for:"password",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},O={key:1},Y={for:"confirmPassword",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},K={class:"grid gap-3 mb-6 md:grid-cols-2"},G={class:"mt-4"},H={for:"role_type",class:"block font-medium text-gray-700"},J={class:"mt-2 ml-12 flex justify-center"},Q={class:"inline-flex items-center"},W={class:"ml-2"},X={class:"inline-flex items-center ml-6"},Z={class:"ml-2"},$={class:"inline-flex items-center ml-6"},ee={class:"ml-2"},se={class:"inline-flex items-center ml-6"},re={class:"ml-2"},te={class:"grid gap-3 md:grid-cols-1 justify-items-end"},le={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},oe={class:"grid gap-3 mb-6 md:grid-cols-2"},ie={key:0},ae={for:"password",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},de={key:1},ne={for:"confirmPassword",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},ue={class:"grid gap-3 md:grid-cols-1 justify-items-end"},me={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},ce={class:"confirmation-content"},ge=s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),be={key:0},pe={class:"confirmation-content"},fe=s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),he={key:0};function ye(e,l,ke,Ue,r,a){const u=_,v=S,c=P,x=C,h=D;return m(),g("div",null,[s("div",N,[o(v,{class:"mb-4 border border-slate-200 ..."},{start:d(()=>[o(u,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:a.openNew},null,8,["label","onClick"]),o(u,{label:e.$t("Change status"),icon:"pi pi-cog",class:"status-button",onClick:a.confirmDeleteSelected,disabled:!r.selectedAdminUsers||!r.selectedAdminUsers.length},null,8,["label","onClick","disabled"])]),_:1}),o(x,{ref:"dt",value:r.users,selection:r.selectedAdminUsers,"onUpdate:selection":l[1]||(l[1]=t=>r.selectedAdminUsers=t),dataKey:"id",paginator:!0,rows:10,filters:r.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("users")}`},{header:d(()=>[s("div",M,[s("h4",null,i(e.$t("Manage users")),1),s("div",E,[n(s("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":l[0]||(l[0]=t=>r.filters.global.value=t),placeholder:e.$t("Search...")},null,8,R),[[b,r.filters.global.value]]),B])])]),default:d(()=>[o(c,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox"}),o(c,{field:"id",header:"ID",sortable:"",class:"dateTable"}),o(c,{field:"name",header:e.$t("Username"),sortable:"",class:"dateTable"},null,8,["header"]),o(c,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),o(c,{field:"role_type",header:e.$t("Role"),sortable:"",class:"dateTable"},null,8,["header"]),o(c,{field:"active",header:e.$t("Active"),sortable:"",class:"dateTable"},{body:d(t=>[t.data.active===null?(m(),U(u,{key:0,icon:"pi pi-check",outlined:"",rounded:"",class:"mr-2 info-active",severity:"danger",onClick:k=>a.changeUserState(t.data)},null,8,["onClick"])):(m(),U(u,{key:1,icon:"pi pi-times",outlined:"",rounded:"",class:"mr-2 info-disable",severity:"danger",onClick:k=>a.changeUserState(t.data)},null,8,["onClick"]))]),_:1},8,["header"]),o(c,{exportable:!1,header:e.$t("Utility"),class:"dateTable"},{body:d(t=>[o(u,{icon:"pi pi-key",outlined:"",rounded:"",class:"mr-2 pass-button",onClick:k=>a.editPass(t.data)},null,8,["onClick"]),o(u,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:k=>a.editUser(t.data)},null,8,["onClick"])]),_:1},8,["header"])]),_:1},8,["value","selection","filters","currentPageReportTemplate"])]),o(h,{visible:r.userDialog,"onUpdate:visible":l[12]||(l[12]=t=>r.userDialog=t),header:r.myUser.id?e.$t("Modify user"):e.$t("Create user"),id:"titleCompany",modal:!0,class:"p-fluid"},{default:d(()=>[s("form",{style:{width:"800px"},onSubmit:l[11]||(l[11]=w((...t)=>a.saveUser&&a.saveUser(...t),["prevent"]))},[s("div",z,[s("div",null,[s("label",L,i(e.$t("Username")),1),n(s("input",{type:"text",id:"name","onUpdate:modelValue":l[2]||(l[2]=t=>r.myUser.name=t),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Username",required:""},null,512),[[b,r.myUser.name]])]),s("div",null,[s("label",j,i(e.$t("Email")),1),n(s("input",{type:"email",id:"email","onUpdate:modelValue":l[3]||(l[3]=t=>r.myUser.email=t),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"info@user.com",required:""},null,512),[[b,r.myUser.email]])])]),s("div",q,[r.myUser.id?f("",!0):(m(),g("div",F,[s("label",I,i(e.$t("Password")),1),n(s("input",{type:"password",id:"password","onUpdate:modelValue":l[4]||(l[4]=t=>r.myUser.password=t),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"password",required:""},null,512),[[b,r.myUser.password]])])),r.myUser.id?f("",!0):(m(),g("div",O,[s("label",Y,i(e.$t("Confirm password")),1),n(s("input",{type:"password",id:"confirmPassword","onUpdate:modelValue":l[5]||(l[5]=t=>r.myUser.confirmPassword=t),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"password",required:""},null,512),[[b,r.myUser.confirmPassword]])]))]),s("div",K,[s("div",G,[s("label",H,i(e.$t("Define the role")),1),s("div",J,[s("label",Q,[n(s("input",{type:"radio",id:"sole_proprietorship","onUpdate:modelValue":l[6]||(l[6]=t=>r.myUser.role_type=t),value:"freelancer",class:"form-radio text-indigo-600",required:""},null,512),[[y,r.myUser.role_type]]),s("span",W,i(e.$t("Freelance")),1)]),s("label",X,[n(s("input",{type:"radio",id:"partnership","onUpdate:modelValue":l[7]||(l[7]=t=>r.myUser.role_type=t),value:"company",class:"form-radio text-indigo-600"},null,512),[[y,r.myUser.role_type]]),s("span",Z,i(e.$t("Company")),1)]),s("label",$,[n(s("input",{type:"radio",id:"corporation","onUpdate:modelValue":l[8]||(l[8]=t=>r.myUser.role_type=t),value:"consulting",class:"form-radio text-indigo-600"},null,512),[[y,r.myUser.role_type]]),s("span",ee,i(e.$t("Consulting")),1)]),s("label",se,[n(s("input",{type:"radio",id:"corporation","onUpdate:modelValue":l[9]||(l[9]=t=>r.myUser.role_type=t),value:"admin",class:"form-radio text-indigo-600"},null,512),[[y,r.myUser.role_type]]),s("span",re,i(e.$t("Admin")),1)])])])]),s("div",te,[s("div",null,[s("button",{class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",text:"",onClick:l[10]||(l[10]=(...t)=>a.hideDialog&&a.hideDialog(...t))},i(e.$t("Close")),1),s("button",le,i(r.myUser.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"]),o(h,{visible:r.resetPassDialog,"onUpdate:visible":l[17]||(l[17]=t=>r.resetPassDialog=t),header:e.$t("Reset password")+": "+r.myUser.name,id:"titleCompany",modal:!0,class:"p-fluid"},{default:d(()=>[s("form",{style:{width:"800px"},onSubmit:l[16]||(l[16]=w((...t)=>a.resetPassUser&&a.resetPassUser(...t),["prevent"]))},[s("div",oe,[r.myUser.id?(m(),g("div",ie,[s("label",ae,i(e.$t("Password")),1),n(s("input",{type:"password",id:"password","onUpdate:modelValue":l[13]||(l[13]=t=>r.myUser.password=t),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"password"},null,512),[[b,r.myUser.password]])])):f("",!0),r.myUser.id?(m(),g("div",de,[s("label",ne,i(e.$t("Confirm password")),1),n(s("input",{type:"password",id:"confirmPassword","onUpdate:modelValue":l[14]||(l[14]=t=>r.myUser.confirmPassword=t),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"password"},null,512),[[b,r.myUser.confirmPassword]])])):f("",!0)]),s("div",ue,[s("div",null,[s("button",{class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",text:"",onClick:l[15]||(l[15]=(...t)=>a.hideDialog&&a.hideDialog(...t))},i(e.$t("Close")),1),s("button",me,i(r.myUser.id?e.$t("Reset"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"]),o(h,{visible:r.deleteUserDialog,"onUpdate:visible":l[19]||(l[19]=t=>r.deleteUserDialog=t),style:{width:"450px"},header:"Confirm",modal:!0},{footer:d(()=>[o(u,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:l[18]||(l[18]=t=>r.deleteUserDialog=!1)},null,8,["label"]),o(u,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:a.confirmChangeState},null,8,["label","onClick"])]),default:d(()=>[s("div",ce,[ge,r.users?(m(),g("span",be,i(e.$t("Are you sure you want to disable the user? "))+" "+i(r.users.name),1)):f("",!0)])]),_:1},8,["visible"]),o(h,{visible:r.deleteUsersDialog,"onUpdate:visible":l[21]||(l[21]=t=>r.deleteUsersDialog=t),style:{width:"450px"},header:"Confirm",modal:!0},{footer:d(()=>[o(u,{label:"No",icon:"pi pi-times",text:"",onClick:l[20]||(l[20]=t=>r.deleteUsersDialog=!1)}),o(u,{label:"Yes",icon:"pi pi-check",text:"",onClick:a.deleteSelectedUsers},null,8,["onClick"])]),default:d(()=>[s("div",pe,[fe,r.myUser?(m(),g("span",he,i(e.$t("Are you sure you want to disable selected users?")),1)):f("",!0)])]),_:1},8,["visible"])])}const _e=V(A,[["render",ye]]);export{_e as default};
