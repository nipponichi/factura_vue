import{s as D,a as _}from"./toolbar.esm-CNTPIwdm.js";import{s as T,a as P,b as $}from"./column.esm-RItjM3vu.js";import{j as E,k as p,o as g,e as y,a as o,b as a,w as c,t as s,l as i,v as d,f,m as N,g as C}from"./app-CM9nMGr0.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V={data(){return{companies:null,companyDialog:!1,deleteCompanyDialog:!1,deleteCompaniesDialog:!1,company:{id:"",name:"",tax_number:"",email:"",phone:"",address:"",post_code:"",town:"",province:"",country:""},selectedCompanies:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:E.CONTAINS}}},mounted(){this.fetchCustomers()},methods:{fetchCustomers(){let e=window.location.pathname.split("/").pop();console.log("id: "+e),p.get("/customers/"+e).then(t=>{this.companies=t.data.customers,console.log(this.companies),this.companies.forEach((b,k)=>{console.log(`Company ${k+1}:`,b)})}).catch(t=>{console.error("Error al obtener los datos de los clientes:",t)})},openNew(){this.company={companyID:window.location.pathname.split("/").pop()},this.submitted=!1,this.companyDialog=!0},hideDialog(){console.log("HIDE"),this.companyDialog=!1,this.submitted=!1},saveCompany(){this.company.id?this.updateCompany():p.post("/customer",this.company).then(e=>{this.companyDialog=!1,this.fetchCustomers()}).catch(e=>{console.log(e.response),this.companyDialog=!1})},editCompany(e){this.company.id=e.id,this.company.name=e.name,this.company.tax_number=e.tax_number,this.companyDialog=!0},updateCompany(){p.put("/customer/"+this.company.id,this.company).then(e=>{this.fetchCustomers(),this.companyDialog=!1}).catch(e=>{console.error("Error al actualizar la compañía:",e),this.companyDialog=!1})},confirmDeleteCompany(e){this.company=e,this.deleteCompanyDialog=!0},deleteCompany(){p.delete("/customer/"+this.company.id).then(e=>{this.companies=this.companies.filter(t=>t.id!==this.company.id),this.company={},this.deleteCompanyDialog=!1}).catch(e=>{console.log(e.response),this.deleteCompanyDialog=!1})},confirmDeleteSelected(){console.log("CONFIRM DELETE SELECTED"),this.deleteCompaniesDialog=!0},deleteSelectedCompanies(){this.selectedCompanies.forEach(e=>{p.delete("/customer/"+e.id).then(t=>{console.log("Compañía eliminada con ID:",e.id),this.companies=this.companies.filter(b=>b.id!==e.id)}).catch(t=>{console.error("Error al eliminar la compañia:",t)})}),this.selectedCompanies=[],this.deleteCompaniesDialog=!1},handleInfoButtonClick(e){let t=window.location.pathname.split("/").pop();this.$inertia.get(`/companies/${t}/customer/${e}`)}}},M={class:"card"},S={class:"flex justify-between items-center mt-2"},q={class:"relative rounded-md shadow-sm w-1/4"},I=["placeholder"],L=o("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[o("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[o("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),B={class:"grid gap-3 mb-6 md:grid-cols-2"},A={for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},R=["placeholder"],z={for:"tax_number",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},j=["placeholder"],F={key:0},O={class:"mb-6"},Y={for:"address",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},H=["placeholder"],K={class:"grid gap-3 mb-6 md:grid-cols-2"},G={for:"town",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},J=["placeholder"],Q={for:"province",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},W=["placeholder"],X={for:"post_code",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},Z=["placeholder"],ee={for:"country",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},oe=["placeholder"],te={for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},le=["placeholder"],re={for:"phone",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},ae=["placeholder"],se={class:"grid gap-3 md:grid-cols-1 justify-items-end"},ne={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},ie={class:"confirmation-content"},de=o("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),ue={key:0},ce={class:"confirmation-content"},me=o("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),pe={key:0};function be(e,t,b,k,l,n){const u=P,v=D,m=$,x=T,h=_;return g(),y("div",null,[o("div",M,[a(v,{class:"mb-4 border border-slate-200 ..."},{start:c(()=>[a(u,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:n.openNew},null,8,["label","onClick"]),a(u,{label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:n.confirmDeleteSelected,disabled:!l.selectedCompanies||!l.selectedCompanies.length},null,8,["label","onClick","disabled"])]),_:1}),a(x,{ref:"dt",value:l.companies,selection:l.selectedCompanies,"onUpdate:selection":t[1]||(t[1]=r=>l.selectedCompanies=r),dataKey:"id",paginator:!0,rows:10,filters:l.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("customers")}`},{header:c(()=>[o("div",S,[o("h4",null,s(e.$t("Manage customers")),1),o("div",q,[i(o("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":t[0]||(t[0]=r=>l.filters.global.value=r),placeholder:e.$t("Search...")},null,8,I),[[d,l.filters.global.value]]),L])])]),default:c(()=>[a(m,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox"}),a(m,{field:"name",header:e.$t("Name"),sortable:"",class:"dateTable"},null,8,["header"]),a(m,{field:"tax_number",header:e.$t("Tax Number"),sortable:"",class:"dateTable"},null,8,["header"]),a(m,{field:"phone",header:e.$t("Phone"),sortable:"",class:"dateTable"},null,8,["header"]),a(m,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),a(m,{field:"town",header:e.$t("Town"),sortable:"",class:"dateTable"},null,8,["header"]),a(m,{exportable:!1,class:"dateTable"},{body:c(r=>[a(u,{icon:"pi pi-eye",outlined:"",rounded:"",class:"mr-2 info-button",onClick:w=>n.handleInfoButtonClick(r.data.id)},null,8,["onClick"]),a(u,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:w=>n.editCompany(r.data)},null,8,["onClick"]),a(u,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:w=>n.confirmDeleteCompany(r.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters","currentPageReportTemplate"])]),a(h,{visible:l.companyDialog,"onUpdate:visible":t[13]||(t[13]=r=>l.companyDialog=r),header:l.company.id?e.$t("Modify company"):e.$t("Create company"),id:"titleCompany",modal:!0,class:"p-fluid"},{default:c(()=>[o("form",{style:{width:"800px"},onSubmit:t[12]||(t[12]=N((...r)=>n.saveCompany&&n.saveCompany(...r),["prevent"]))},[o("div",B,[o("div",null,[o("label",A,s(e.$t("Company name")),1),i(o("input",{type:"text",id:"name","onUpdate:modelValue":t[2]||(t[2]=r=>l.company.name=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Company name"),required:""},null,8,R),[[d,l.company.name]])]),o("div",null,[o("label",z,s(e.$t("Tax number")),1),i(o("input",{type:"text",id:"tax_number","onUpdate:modelValue":t[3]||(t[3]=r=>l.company.tax_number=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Tax number"),required:""},null,8,j),[[d,l.company.tax_number]])])]),this.company.id?f("",!0):(g(),y("div",F,[o("div",O,[o("div",null,[o("label",Y,s(e.$t("Address")),1),i(o("input",{type:"text",id:"address1","onUpdate:modelValue":t[4]||(t[4]=r=>l.company.address=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Address"),required:""},null,8,H),[[d,l.company.address]])])]),o("div",K,[o("div",null,[o("label",G,s(e.$t("Town")),1),i(o("input",{type:"text",id:"town","onUpdate:modelValue":t[5]||(t[5]=r=>l.company.town=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Town"),required:""},null,8,J),[[d,l.company.town]])]),o("div",null,[o("label",Q,s(e.$t("Province")),1),i(o("input",{type:"text",id:"province","onUpdate:modelValue":t[6]||(t[6]=r=>l.company.province=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Province"),required:""},null,8,W),[[d,l.company.province]])]),o("div",null,[o("label",X,s(e.$t("Post code")),1),i(o("input",{type:"text",id:"post_code","onUpdate:modelValue":t[7]||(t[7]=r=>l.company.post_code=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Post code"),pattern:"^\\d+$",required:""},null,8,Z),[[d,l.company.post_code]])]),o("div",null,[o("label",ee,s(e.$t("Country")),1),i(o("input",{type:"text",id:"country","onUpdate:modelValue":t[8]||(t[8]=r=>l.company.country=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Country"),required:""},null,8,oe),[[d,l.company.country]])]),o("div",null,[o("label",te,s(e.$t("Email")),1),i(o("input",{type:"email",id:"email","onUpdate:modelValue":t[9]||(t[9]=r=>l.company.email=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("info@mycompany.com"),required:""},null,8,le),[[d,l.company.email]])]),o("div",null,[o("label",re,s(e.$t("Phone")),1),i(o("input",{type:"tel",id:"phone","onUpdate:modelValue":t[10]||(t[10]=r=>l.company.phone=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Phone"),pattern:"^\\+\\d{1,3}\\s?\\d{1,14}$",required:""},null,8,ae),[[d,l.company.phone]])])])])),o("div",se,[o("div",null,[o("button",{class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",text:"",onClick:t[11]||(t[11]=(...r)=>n.hideDialog&&n.hideDialog(...r))},s(e.$t("Close")),1),o("button",ne,s(l.company.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"]),a(h,{visible:l.deleteCompanyDialog,"onUpdate:visible":t[15]||(t[15]=r=>l.deleteCompanyDialog=r),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:c(()=>[a(u,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[14]||(t[14]=r=>l.deleteCompanyDialog=!1)},null,8,["label"]),a(u,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:n.deleteCompany},null,8,["label","onClick"])]),default:c(()=>[o("div",ie,[de,l.company?(g(),y("span",ue,[C(s(e.$t("Are you sure you want to delete")),1),o("b",null,s(l.company.name),1),C("?")])):f("",!0)])]),_:1},8,["visible","header"]),a(h,{visible:l.deleteCompaniesDialog,"onUpdate:visible":t[17]||(t[17]=r=>l.deleteCompaniesDialog=r),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:c(()=>[a(u,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[16]||(t[16]=r=>l.deleteCompaniesDialog=!1)},null,8,["label"]),a(u,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:n.deleteSelectedCompanies},null,8,["label","onClick"])]),default:c(()=>[o("div",ce,[me,l.company?(g(),y("span",pe,s(e.$t("Are you sure you want to delete the selected customers?")),1)):f("",!0)])]),_:1},8,["visible","header"])])}const ke=U(V,[["render",be]]);export{ke as default};
