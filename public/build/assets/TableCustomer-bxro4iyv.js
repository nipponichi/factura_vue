import{s as $}from"./dialog.esm-BSV8BAis.js";import{a as D,c as _,s as T}from"./column.esm-kB5OSM7O.js";import{s as P}from"./toolbar.esm-CmyO6oHg.js";import{i as U,j as b,o as u,e as h,a as o,b as s,w as p,c as g,f as c,t as a,k as n,v as d,m as N,g as w}from"./app-CitTDTgB.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S={data(){return{companies:null,companyDialog:!1,deleteCompanyDialog:!1,deleteCompaniesDialog:!1,myCompany:{id:"",name:"",tax_number:"",email:"",phone:"",address:"",post_code:"",town:"",province:"",country:""},originalCompany:[],selectedCompanies:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:U.CONTAINS}}},mounted(){this.fetchCustomers()},methods:{fetchCustomers(){let e=window.location.pathname.split("/").pop();b.get("/customers/"+e).then(t=>{this.companies=t.data.customers}).catch(t=>{this.$toast(this.$t("Error connecting to the server"),"error")})},openNew(){this.myCompany={companyID:window.location.pathname.split("/").pop()},this.submitted=!1,this.companyDialog=!0},hideDialog(){this.companyDialog=!1,this.submitted=!1},saveCompany(){this.myCompany.id?this.updateCompany():b.post("/customer",this.myCompany).then(e=>{this.$toast(this.$t(e.data.message),e.data.type),this.companyDialog=!1,this.fetchCustomers()}).catch(e=>{this.$toast(this.$t("Error connecting to the server"),"error"),this.companyDialog=!1})},editCompany(e){this.originalCompany={tax_number:e.tax_number,name:e.name},this.myCompany.id=e.id,this.myCompany.name=e.name,this.myCompany.tax_number=e.tax_number,this.companyDialog=!0},updateCompany(){if(this.originalCompany.tax_number===this.myCompany.tax_number&&this.originalCompany.name===this.myCompany.name){this.$toast(this.$t("Successfully updated."),"success"),this.companyDialog=!1;return}b.put("/customer/"+this.myCompany.id,this.myCompany).then(e=>{this.$toast(this.$t(e.data.message),e.data.type),this.fetchCustomers(),this.companyDialog=!1}).catch(e=>{this.$toast(this.$t("Error connecting to the server"),"error"),this.companyDialog=!1})},confirmDeleteCompany(e){this.myCompany=e,this.deleteCompanyDialog=!0},deleteCompany(){b.delete("/customer/"+this.myCompany.id).then(e=>{e.data.type==="success"&&(this.companies=this.companies.filter(t=>t.id!==this.myCompany.id)),this.$toast(this.$t(e.data.message),e.data.type),this.updateFields()}).catch(e=>{this.$toast(this.$t(e.response.message),e.response.type)}),this.deleteCompanyDialog=!1},confirmDeleteSelected(){this.deleteCompaniesDialog=!0},deleteSelectedCompanies(){this.selectedCompanies.forEach(e=>{b.delete("/customer/"+e.id).then(t=>{t.data.type==="success"&&(this.companies=this.companies.filter(k=>k.id!==e.id)),this.$toast(this.$t(t.data.message),t.data.type),this.updateFields()}).catch(t=>{(t.response||t.response.status===400)&&this.$toast(this.$t(t.response.message),t.response.type)})}),this.deleteCompaniesDialog=!1},handleInfoButtonClick(e){let t=window.location.pathname.split("/").pop();this.$inertia.get(`/companies/${t}/customer/${e}`)},updateFields(){this.$emit("updateCustomer",1)}}},M={class:"card"},q={class:"flex justify-between items-center mt-2"},B={class:"relative rounded-md shadow-sm w-1/4"},E=["placeholder"],A=o("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[o("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[o("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),I={class:"grid gap-3 mb-6 md:grid-cols-2"},L={for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},F=["placeholder"],R={for:"tax_number",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},z=["placeholder"],j={key:0},O={class:"mb-6"},Y={for:"address",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},K=["placeholder"],G={class:"grid gap-3 mb-6 md:grid-cols-2"},H={for:"town",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},J=["placeholder"],Q={for:"province",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},W=["placeholder"],X={for:"post_code",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},Z=["placeholder"],ee={for:"country",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},te=["placeholder"],oe={for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},le=["placeholder"],re={for:"phone",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},se=["placeholder"],ae={class:"grid gap-3 md:grid-cols-1 justify-items-end"},ie={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},ne={class:"confirmation-content"},de=o("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),me={key:0},ue={class:"confirmation-content"},pe=o("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),ce={key:0};function ye(e,t,k,be,l,i){const m=_,v=P,y=T,x=D,f=$;return u(),h("div",null,[o("div",M,[s(v,{class:"mb-4 border border-slate-200 ..."},{start:p(()=>[e.$page.props.user.permissions.includes("create customer")?(u(),g(m,{key:0,label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:i.openNew},null,8,["label","onClick"])):c("",!0),e.$page.props.user.permissions.includes("delete customer")?(u(),g(m,{key:1,label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:i.confirmDeleteSelected,disabled:!l.selectedCompanies||!l.selectedCompanies.length},null,8,["label","onClick","disabled"])):c("",!0)]),_:1}),s(x,{ref:"dt",value:l.companies,selection:l.selectedCompanies,"onUpdate:selection":t[1]||(t[1]=r=>l.selectedCompanies=r),dataKey:"id",paginator:!0,rows:10,filters:l.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("customers")}`},{header:p(()=>[o("div",q,[o("h4",null,a(e.$t("Manage customers")),1),o("div",B,[n(o("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":t[0]||(t[0]=r=>l.filters.global.value=r),placeholder:e.$t("Search...")},null,8,E),[[d,l.filters.global.value]]),A])])]),default:p(()=>[s(y,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox"}),s(y,{field:"name",header:e.$t("Name"),sortable:"",class:"dateTable"},null,8,["header"]),s(y,{field:"tax_number",header:e.$t("Tax Number"),sortable:"",class:"dateTable"},null,8,["header"]),s(y,{field:"phone",header:e.$t("Phone"),sortable:"",class:"dateTable"},null,8,["header"]),s(y,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),s(y,{field:"town",header:e.$t("Town"),sortable:"",class:"dateTable"},null,8,["header"]),s(y,{exportable:!1,class:"dateTable"},{body:p(r=>[e.$page.props.user.permissions.includes("read customer")?(u(),g(m,{key:0,icon:"pi pi-eye",outlined:"",rounded:"",class:"mr-2 view-button",onClick:C=>i.handleInfoButtonClick(r.data.id)},null,8,["onClick"])):c("",!0),e.$page.props.user.permissions.includes("update customer")?(u(),g(m,{key:1,icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:C=>i.editCompany(r.data)},null,8,["onClick"])):c("",!0),e.$page.props.user.permissions.includes("delete customer")?(u(),g(m,{key:2,icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:C=>i.confirmDeleteCompany(r.data)},null,8,["onClick"])):c("",!0)]),_:1})]),_:1},8,["value","selection","filters","currentPageReportTemplate"])]),s(f,{visible:l.companyDialog,"onUpdate:visible":t[13]||(t[13]=r=>l.companyDialog=r),header:l.myCompany.id?e.$t("Modify myCompany"):e.$t("Create myCompany"),id:"titleCompany",modal:!0,class:"p-fluid"},{default:p(()=>[o("form",{style:{width:"800px"},onSubmit:t[12]||(t[12]=N((...r)=>i.saveCompany&&i.saveCompany(...r),["prevent"]))},[o("div",I,[o("div",null,[o("label",L,a(e.$t("Company name")),1),n(o("input",{type:"text",id:"name","onUpdate:modelValue":t[2]||(t[2]=r=>l.myCompany.name=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Company name"),required:""},null,8,F),[[d,l.myCompany.name]])]),o("div",null,[o("label",R,a(e.$t("Tax number")),1),n(o("input",{type:"text",id:"tax_number","onUpdate:modelValue":t[3]||(t[3]=r=>l.myCompany.tax_number=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Tax number"),required:""},null,8,z),[[d,l.myCompany.tax_number]])])]),this.myCompany.id?c("",!0):(u(),h("div",j,[o("div",O,[o("div",null,[o("label",Y,a(e.$t("Address")),1),n(o("input",{type:"text",id:"address1","onUpdate:modelValue":t[4]||(t[4]=r=>l.myCompany.address=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Address"),required:""},null,8,K),[[d,l.myCompany.address]])])]),o("div",G,[o("div",null,[o("label",H,a(e.$t("Town")),1),n(o("input",{type:"text",id:"town","onUpdate:modelValue":t[5]||(t[5]=r=>l.myCompany.town=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Town"),required:""},null,8,J),[[d,l.myCompany.town]])]),o("div",null,[o("label",Q,a(e.$t("Province")),1),n(o("input",{type:"text",id:"province","onUpdate:modelValue":t[6]||(t[6]=r=>l.myCompany.province=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Province"),required:""},null,8,W),[[d,l.myCompany.province]])]),o("div",null,[o("label",X,a(e.$t("Post code")),1),n(o("input",{type:"text",id:"post_code","onUpdate:modelValue":t[7]||(t[7]=r=>l.myCompany.post_code=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Post code"),pattern:"^(?:0[1-9]|[1-4]\\d|5[0-2])\\d{3}$",required:""},null,8,Z),[[d,l.myCompany.post_code]])]),o("div",null,[o("label",ee,a(e.$t("Country")),1),n(o("input",{type:"text",id:"country","onUpdate:modelValue":t[8]||(t[8]=r=>l.myCompany.country=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Country"),required:""},null,8,te),[[d,l.myCompany.country]])]),o("div",null,[o("label",oe,a(e.$t("Email")),1),n(o("input",{type:"email",id:"email","onUpdate:modelValue":t[9]||(t[9]=r=>l.myCompany.email=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("info@mycompany.com"),required:""},null,8,le),[[d,l.myCompany.email]])]),o("div",null,[o("label",re,a(e.$t("Phone")),1),n(o("input",{type:"tel",id:"phone","onUpdate:modelValue":t[10]||(t[10]=r=>l.myCompany.phone=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Phone"),pattern:"(\\+34\\s?)?(\\d{9})",required:""},null,8,se),[[d,l.myCompany.phone]])])])])),o("div",ae,[o("div",null,[o("button",{type:"button",class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:t[11]||(t[11]=(...r)=>i.hideDialog&&i.hideDialog(...r))},a(e.$t("Close")),1),o("button",ie,a(l.myCompany.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"]),s(f,{visible:l.deleteCompanyDialog,"onUpdate:visible":t[15]||(t[15]=r=>l.deleteCompanyDialog=r),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:p(()=>[s(m,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[14]||(t[14]=r=>l.deleteCompanyDialog=!1)},null,8,["label"]),s(m,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:i.deleteCompany},null,8,["label","onClick"])]),default:p(()=>[o("div",ne,[de,l.myCompany?(u(),h("span",me,[w(a(e.$t("Are you sure you want to delete")),1),o("b",null,a(l.myCompany.name),1),w("?")])):c("",!0)])]),_:1},8,["visible","header"]),s(f,{visible:l.deleteCompaniesDialog,"onUpdate:visible":t[17]||(t[17]=r=>l.deleteCompaniesDialog=r),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:p(()=>[s(m,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[16]||(t[16]=r=>l.deleteCompaniesDialog=!1)},null,8,["label"]),s(m,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:i.deleteSelectedCompanies},null,8,["label","onClick"])]),default:p(()=>[o("div",ue,[pe,l.myCompany?(u(),h("span",ce,a(e.$t("Are you sure you want to delete the selected customers?")),1)):c("",!0)])]),_:1},8,["visible","header"])])}const we=V(S,[["render",ye]]);export{we as default};