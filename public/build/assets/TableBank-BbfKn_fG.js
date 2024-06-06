import{s as C,a as _}from"./toolbar.esm-CNTPIwdm.js";import{s as N,a as E,b as I}from"./column.esm-RItjM3vu.js";import{j as M,k,o as m,e as g,a,b as o,w as u,t as d,l as b,v as f,c as v,m as T,x as S,f as p,g as w}from"./app-CM9nMGr0.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";const $={data(){return{banks:null,bankDialog:!1,deleteBankDialog:!1,deleteBanksDialog:!1,ibanComplete:[],myBank:{id:"",iban:"",entity:"",office:"",control_digit:"",account_number:"",bank_name:"",country:"",swift:"",currency:"",favourite:"",companyID:window.location.pathname.split("/").pop()},selectedBanks:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:M.CONTAINS}}},mounted(){this.fetchBanks()},methods:{fetchBanks(){let e=window.location.pathname.split("/").pop();k.get("/banks/"+e).then(t=>{this.banks=t.data.accounts,this.banks.forEach(r=>{r.ibanComplete=`${r.iban}${r.entity}${r.office}${r.control_digit}${r.account_number}`})}).catch(t=>{console.error("Error fetching bank data:",t)})},openNew(){this.myBank={bank:"",companyID:window.location.pathname.split("/").pop()},this.submitted=!1,this.bankDialog=!0},hideDialog(){this.bankDialog=!1,this.submitted=!1},processIBAN(){let e=this.myBank.iban.substring(0,2).toUpperCase(),t=this.myBank.iban.substring(2,4),r=e+t,B=this.myBank.iban.substring(4,8),l=this.myBank.iban.substring(8,12),s=this.myBank.iban.substring(12,14),i=this.myBank.iban.substring(14,24);this.myBank.iban=r,this.myBank.entity=B,this.myBank.office=l,this.myBank.control_digit=s,this.myBank.account_number=i},saveMyBank(){if(this.myBank.favourite==null&&(this.myBank.favourite=!1),this.processIBAN(),this.myBank.iban.length!=24){window.alert("Ingresa un IBAN que sea correcto");return}this.myBank.id?this.updateMyBank():k.post("/bank",this.myBank).then(e=>{this.fetchBanks(),this.bankDialog=!1}).catch(e=>{console.error("Error saving bank data:",e.response),this.bankDialog=!1})},editMyBank(e){this.myBank.iban=e.ibanComplete,this.myBank.bank_name=e.bank_name,this.myBank.country=e.country,this.myBank.swift=e.swift,this.myBank.currency=e.currency,this.bankDialog=!0},updateMyBank(){if(this.processIBAN(),ibanInput.length!=24){window.alert("Ingresa un IBAN que sea correcto");return}k.put("/bank/"+this.myBank.id,this.myBank).then(e=>{this.fetchBanks(),this.bankDialog=!1}).catch(e=>{console.error("Error al actualizar la cuenta bancaria:",e),this.bankDialog=!1})},makeFavourite(e){if(e.favourite)return alert("El telefono ya está seleccionado como favorito");k.put("/banks/"+e.id).then(t=>{this.bankDialog=!1,this.fetchBanks()}).catch(t=>{console.error("Error al seleccionar un teléfono",t),this.bankDialog=!1})},confirmDeleteBank(e){this.myBank=e,this.deleteBankDialog=!0},deleteMyBank(){const e=this.myBank.id;k.delete("/bank/"+this.myBank.id).then(t=>{console.log(t),this.banks=this.banks.filter(r=>r.id!==e),this.myBank={},this.deleteBankDialog=!1}).catch(t=>{(t.response||t.response.status===400)&&(console.warn("Error 400: No se pudo eliminar el teléfono con ID:",e),this.deleteBankDialog=!1)})},confirmDeleteSelected(){console.log("CONFIRM DELETE SELECTED"),this.deleteBanksDialog=!0},deleteSelectedBanks(){this.selectedBanks.forEach(e=>{k.delete("/bank/"+e.id).then(t=>{console.log("Compañía eliminada con ID:",e.id),this.banks=this.banks.filter(r=>r.id!==e.id)}).catch(t=>{(t.response||t.response.status===400)&&console.warn("Error 400: No se pudo eliminar la compañía con ID:",e.id)})}),this.selectedBanks=[],this.deleteBanksDialog=!1}}},A={class:"card"},V={class:"flex justify-between items-center mt-2"},F={class:"relative rounded-md shadow-sm w-1/4"},R=["placeholder"],L=a("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[a("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[a("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),q={class:"utility-button"},z={class:"grid gap-3 mb-6 md:grid-cols-1"},P={for:"iban",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},j=["placeholder"],O={for:"bank_name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},W=["placeholder"],Y={for:"country",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},K=["placeholder"],Z={for:"swift",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},G=["placeholder"],H={for:"currency",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},J=["placeholder"],Q={key:0,class:"flex items-center"},X={for:"favourite-checkbox",class:"ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"},ee={class:"grid gap-3 md:grid-cols-1 justify-items-end"},te={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},ae={class:"confirmation-content"},le=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),ne={key:0},oe={class:"confirmation-content"},se=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),re={key:0};function ie(e,t,r,B,l,s){const i=E,D=C,c=I,x=N,h=_;return m(),g("div",null,[a("div",A,[o(D,{class:"mb-4 border border-slate-200 ..."},{start:u(()=>[o(i,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:s.openNew},null,8,["label","onClick"]),o(i,{label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:s.confirmDeleteSelected,disabled:!l.selectedBanks||!l.selectedBanks.length},null,8,["label","onClick","disabled"])]),_:1}),o(x,{ref:"dt",value:l.banks,selection:l.selectedBanks,"onUpdate:selection":t[1]||(t[1]=n=>l.selectedBanks=n),dataKey:"id",onRowSelect:e.onRowSelect,paginator:!0,rows:10,filters:l.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("Banks accounts")}`},{header:u(()=>[a("div",V,[a("h4",null,d(e.$t("Manage Bank account")),1),a("div",F,[b(a("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":t[0]||(t[0]=n=>l.filters.global.value=n),placeholder:e.$t("Search...")},null,8,R),[[f,l.filters.global.value]]),L])])]),default:u(()=>[o(c,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox w-16"}),o(c,{field:"ibanComplete",header:e.$t("Bank account"),sortable:"",class:"dateTable"},null,8,["header"]),o(c,{field:"bank_name",header:e.$t("Bank Name"),sortable:"",class:"dateTable"},null,8,["header"]),o(c,{field:"swift",header:e.$t("SWIFT"),sortable:"",class:"dateTable"},null,8,["header"]),o(c,{field:"currency",header:e.$t("Currency"),sortable:"",class:"dateTable"},null,8,["header"]),o(c,{exportable:!1,header:e.$t("Favourite"),class:"dateTable w-24 text-center"},{body:u(n=>[n.data.favourite?(m(),v(i,{key:0,icon:"pi pi-star-fill",class:"mr-2 info-button",onClick:y=>s.makeFavourite(n.data)},null,8,["onClick"])):(m(),v(i,{key:1,icon:"pi pi-star",class:"mr-2 info-button",onClick:y=>s.makeFavourite(n.data)},null,8,["onClick"]))]),_:1},8,["header"]),a("div",q,[o(c,{exportable:!1,header:e.$t("Utilities"),class:"headerUtil dateTable w-24"},{body:u(n=>[o(i,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:y=>s.editMyBank(n.data)},null,8,["onClick"]),o(i,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:y=>s.confirmDeleteBank(n.data)},null,8,["onClick"])]),_:1},8,["header"])])]),_:1},8,["value","selection","onRowSelect","filters","currentPageReportTemplate"])]),a("template",null,[o(h,{visible:l.bankDialog,"onUpdate:visible":t[10]||(t[10]=n=>l.bankDialog=n),header:l.myBank.id?e.$t("Update bank"):e.$t("Add bank"),id:"titleBank",modal:!0,class:"p-fluid"},{default:u(()=>[a("form",{style:{width:"800px"},onSubmit:t[9]||(t[9]=T((...n)=>s.saveMyBank&&s.saveMyBank(...n),["prevent"]))},[a("div",z,[a("div",null,[a("label",P,d(e.$t("IBAN")),1),b(a("input",{type:"text",id:"ibanComplete","onUpdate:modelValue":t[2]||(t[2]=n=>l.myBank.iban=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("ES12 3456 7890 90 1234567890"),pattern:"[A-Za-z]{2}[0-9\\s]*",required:""},null,8,j),[[f,l.myBank.iban]])]),a("div",null,[a("label",O,d(e.$t("Bank Name")),1),b(a("input",{type:"text",id:"bank_name","onUpdate:modelValue":t[3]||(t[3]=n=>l.myBank.bank_name=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Enter bank name"),required:""},null,8,W),[[f,l.myBank.bank_name]])]),a("div",null,[a("label",Y,d(e.$t("Country")),1),b(a("input",{type:"text",id:"country","onUpdate:modelValue":t[4]||(t[4]=n=>l.myBank.country=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Enter country"),required:""},null,8,K),[[f,l.myBank.country]])]),a("div",null,[a("label",Z,d(e.$t("SWIFT")),1),b(a("input",{type:"text",id:"swift","onUpdate:modelValue":t[5]||(t[5]=n=>l.myBank.swift=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Enter SWIFT"),required:""},null,8,G),[[f,l.myBank.swift]])]),a("div",null,[a("label",H,d(e.$t("Currency")),1),b(a("input",{type:"text",id:"currency","onUpdate:modelValue":t[6]||(t[6]=n=>l.myBank.currency=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Enter currency"),required:""},null,8,J),[[f,l.myBank.currency]])]),l.myBank.id?p("",!0):(m(),g("div",Q,[b(a("input",{id:"favourite-checkbox",type:"checkbox","onUpdate:modelValue":t[7]||(t[7]=n=>l.myBank.favourite=n),class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"},null,512),[[S,l.myBank.favourite]]),a("label",X,d(e.$t("Mark this bank account as a favourite"))+".",1)]))]),a("div",ee,[a("div",null,[a("button",{type:"button",class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:t[8]||(t[8]=(...n)=>s.hideDialog&&s.hideDialog(...n))},d(e.$t("Close")),1),a("button",te,d(l.myBank.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"])]),o(h,{visible:l.deleteBankDialog,"onUpdate:visible":t[12]||(t[12]=n=>l.deleteBankDialog=n),style:{width:"450px"},header:"Confirm",modal:!0},{footer:u(()=>[o(i,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[11]||(t[11]=n=>l.deleteBankDialog=!1)},null,8,["label"]),o(i,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:s.deleteMyBank},null,8,["label","onClick"])]),default:u(()=>[a("div",ae,[le,l.myBank?(m(),g("span",ne,[w(d(e.$t("Are you sure you want to delete")),1),a("b",null,d(l.myBank.bank),1),w("?")])):p("",!0)])]),_:1},8,["visible"]),o(h,{visible:l.deleteBanksDialog,"onUpdate:visible":t[14]||(t[14]=n=>l.deleteBanksDialog=n),style:{width:"450px"},header:"Confirm",modal:!0},{footer:u(()=>[o(i,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[13]||(t[13]=n=>l.deleteBanksDialog=!1)},null,8,["label"]),o(i,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:s.deleteSelectedBanks},null,8,["label","onClick"])]),default:u(()=>[a("div",oe,[se,l.myBank?(m(),g("span",re,d(e.$t("Are you sure you want to delete the selected banks?")),1)):p("",!0)])]),_:1},8,["visible"])])}const ke=U($,[["render",ie]]);export{ke as default};
