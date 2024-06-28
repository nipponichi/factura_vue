import{s as D,a as $}from"./toolbar.esm-Bub9y0Hp.js";import{s as C,a as M,b as T}from"./column.esm-Cd8T-z-4.js";import{j as S,k,o as m,e as f,a,b as s,w as c,t as i,l as b,v as h,c as w,m as U,x as N,f as B,g as x}from"./app-HkpKnArr.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V={data(){return{banks:null,bankDialog:!1,deleteBankDialog:!1,deleteBanksDialog:!1,myBank:{id:"",iban:"",entity:"",office:"",control_digit:"",account_number:"",bank_name:"",country:"",swift:"",currency:"",favourite:"",complete_bank_account:"",companyID:window.location.pathname.split("/").pop()},selectedBanks:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:S.CONTAINS}}},mounted(){this.fetchBanks()},methods:{fetchBanks(){let e=window.location.pathname.split("/").pop();k.get("/banks/"+e).then(t=>{this.banks=t.data.accounts}).catch(t=>{this.$toast(this.$t("Error connecting to the server"),"error")})},openNew(){this.myBank={bank:"",companyID:window.location.pathname.split("/").pop()},this.submitted=!1,this.bankDialog=!0},hideDialog(){this.bankDialog=!1,this.submitted=!1},saveMyBank(){this.myBank.favourite==null&&(this.myBank.favourite=!1);let e=this.myBank.complete_bank_account.replace(/\s+/g,"");if(e.length==24){let d=e.substring(0,2).toUpperCase(),v=e.substring(2,4),l=d+v,r=e.substring(4,8),o=e.substring(8,12),g=e.substring(12,14),u=e.substring(14,24);this.myBank.iban=l,this.myBank.entity=r,this.myBank.office=o,this.myBank.control_digit=g,this.myBank.account_number=u,this.myBank.complete_bank_account=l+" "+r+" "+o+" "+g+" "+u}let t=e.length;switch(!0){case t>24:this.$toast(this.$t("The account number entered is too long."),"warning");break;case t<24:this.$toast(this.$t("The account number entered is too short."),"warning");break;case t==24:this.myBank.id?this.updateMyBank():k.post("/bank",this.myBank).then(d=>{this.$toast(this.$t(d.data.message),d.data.type),this.fetchBanks(),this.bankDialog=!1}).catch(d=>{this.$toast(this.$t("Error connecting to the server"),"error"),this.bankDialog=!1});break}},editMyBank(e){this.myBank.id=e.id,this.myBank.complete_bank_account=e.complete_bank_account,this.myBank.bank_name=e.bank_name,this.myBank.country=e.country,this.myBank.swift=e.swift,this.myBank.currency=e.currency,this.myBank.favourite=e.favourite,this.bankDialog=!0},updateMyBank(){k.put("/bank/"+this.myBank.id,this.myBank).then(e=>{this.$toast(this.$t(e.data.message),e.data.type),this.fetchBanks(),this.bankDialog=!1}).catch(e=>{this.$toast(this.$t("Error connecting to the server"),"error"),this.bankDialog=!1})},makeFavourite(e){if(e.favourite)return this.$toast(this.$t("Already selected as a favorite."),"warning");k.put("/banks/"+e.id).then(t=>{this.$toast(this.$t(t.data.message),t.data.type),this.bankDialog=!1,this.fetchBanks()}).catch(t=>{this.$toast(this.$t("Error connecting to the server"),"error"),this.bankDialog=!1})},confirmDeleteBank(e){this.myBank=e,this.deleteBankDialog=!0},deleteMyBank(){const e=this.myBank.id;k.delete("/bank/"+this.myBank.id).then(t=>{t.data.type==="success"&&(this.banks=this.banks.filter(d=>d.id!==e)),this.$toast(this.$t(t.data.message),t.data.type)}).catch(t=>{this.$toast(this.$t(t.response.message),t.response.type)}),this.deleteBankDialog=!1},confirmDeleteSelected(){this.deleteBanksDialog=!0},deleteSelectedBanks(){this.selectedBanks.forEach(e=>{k.delete("/bank/"+e.id).then(t=>{t.data.type==="success"&&(this.banks=this.banks.filter(d=>d.id!==e.id)),this.$toast(this.$t(t.data.message),t.data.type)}).catch(t=>{(t.response||t.response.status===400)&&this.$toast(this.$t(t.response.message),t.response.type)})}),this.deleteBanksDialog=!1}}},I={class:"card"},F={class:"flex justify-between items-center mt-2"},A={class:"relative rounded-md shadow-sm w-1/4"},R=["placeholder"],L=a("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[a("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[a("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),q={class:"utility-button"},z={class:"grid gap-3 mb-6 md:grid-cols-1"},j={for:"iban",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},P=["placeholder"],W={for:"bank_name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},O=["placeholder"],Y={for:"country",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},K=["placeholder"],Z={for:"swift",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},G=["placeholder"],H={for:"currency",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},J=["placeholder"],Q={key:0,class:"flex items-center"},X={for:"favourite-checkbox",class:"ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"},ee={class:"grid gap-3 md:grid-cols-1 justify-items-end"},te={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},ae={class:"confirmation-content"},le=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),ne={key:0},se={class:"confirmation-content"},re=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),oe={key:0};function ie(e,t,d,v,l,r){const o=M,g=D,u=T,_=C,y=$;return m(),f("div",null,[a("div",I,[s(g,{class:"mb-4 border border-slate-200 ..."},{start:c(()=>[s(o,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:r.openNew},null,8,["label","onClick"]),s(o,{label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:r.confirmDeleteSelected,disabled:!l.selectedBanks||!l.selectedBanks.length},null,8,["label","onClick","disabled"])]),_:1}),s(_,{ref:"dt",value:l.banks,selection:l.selectedBanks,"onUpdate:selection":t[1]||(t[1]=n=>l.selectedBanks=n),dataKey:"id",onRowSelect:e.onRowSelect,paginator:!0,rows:10,filters:l.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("Banks accounts")}`},{header:c(()=>[a("div",F,[a("h4",null,i(e.$t("Manage Bank account")),1),a("div",A,[b(a("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":t[0]||(t[0]=n=>l.filters.global.value=n),placeholder:e.$t("Search...")},null,8,R),[[h,l.filters.global.value]]),L])])]),default:c(()=>[s(u,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox w-16"}),s(u,{field:"complete_bank_account",header:e.$t("Bank account"),sortable:"",class:"dateTable"},null,8,["header"]),s(u,{field:"bank_name",header:e.$t("Bank name"),sortable:"",class:"dateTable"},null,8,["header"]),s(u,{field:"swift",header:e.$t("SWIFT"),sortable:"",class:"dateTable"},null,8,["header"]),s(u,{field:"currency",header:e.$t("Currency"),sortable:"",class:"dateTable"},null,8,["header"]),s(u,{exportable:!1,header:e.$t("Favourite"),class:"dateTable w-24 text-center"},{body:c(n=>[n.data.favourite?(m(),w(o,{key:0,icon:"pi pi-star-fill",class:"mr-2 fav-button",onClick:p=>r.makeFavourite(n.data)},null,8,["onClick"])):(m(),w(o,{key:1,icon:"pi pi-star",class:"mr-2 fav-button",onClick:p=>r.makeFavourite(n.data)},null,8,["onClick"]))]),_:1},8,["header"]),a("div",q,[s(u,{exportable:!1,header:e.$t("Utilities"),class:"headerUtil dateTable w-24"},{body:c(n=>[s(o,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:p=>r.editMyBank(n.data)},null,8,["onClick"]),s(o,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:p=>r.confirmDeleteBank(n.data)},null,8,["onClick"])]),_:1},8,["header"])])]),_:1},8,["value","selection","onRowSelect","filters","currentPageReportTemplate"])]),a("template",null,[s(y,{visible:l.bankDialog,"onUpdate:visible":t[10]||(t[10]=n=>l.bankDialog=n),header:l.myBank.id?e.$t("Update bank"):e.$t("Add bank"),id:"titleBank",modal:!0,class:"p-fluid"},{default:c(()=>[a("form",{style:{width:"800px"},onSubmit:t[9]||(t[9]=U((...n)=>r.saveMyBank&&r.saveMyBank(...n),["prevent"]))},[a("div",z,[a("div",null,[a("label",j,i(e.$t("IBAN")),1),b(a("input",{type:"text",id:"complete_bank_account","onUpdate:modelValue":t[2]||(t[2]=n=>l.myBank.complete_bank_account=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("ES12 3456 7890 90 1234567890"),pattern:"[A-Za-z]{2}[0-9\\s]*",required:""},null,8,P),[[h,l.myBank.complete_bank_account]])]),a("div",null,[a("label",W,i(e.$t("Bank Name")),1),b(a("input",{type:"text",id:"bank_name","onUpdate:modelValue":t[3]||(t[3]=n=>l.myBank.bank_name=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Enter bank name"),required:""},null,8,O),[[h,l.myBank.bank_name]])]),a("div",null,[a("label",Y,i(e.$t("Country")),1),b(a("input",{type:"text",id:"country","onUpdate:modelValue":t[4]||(t[4]=n=>l.myBank.country=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Enter country"),required:""},null,8,K),[[h,l.myBank.country]])]),a("div",null,[a("label",Z,i(e.$t("SWIFT")),1),b(a("input",{type:"text",id:"swift","onUpdate:modelValue":t[5]||(t[5]=n=>l.myBank.swift=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Enter SWIFT"),required:""},null,8,G),[[h,l.myBank.swift]])]),a("div",null,[a("label",H,i(e.$t("Currency")),1),b(a("input",{type:"text",id:"currency","onUpdate:modelValue":t[6]||(t[6]=n=>l.myBank.currency=n),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Enter currency"),required:""},null,8,J),[[h,l.myBank.currency]])]),l.myBank.id?B("",!0):(m(),f("div",Q,[b(a("input",{id:"favourite-checkbox",type:"checkbox","onUpdate:modelValue":t[7]||(t[7]=n=>l.myBank.favourite=n),class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"},null,512),[[N,l.myBank.favourite]]),a("label",X,i(e.$t("Mark this bank account as a favourite"))+".",1)]))]),a("div",ee,[a("div",null,[a("button",{type:"button",class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",onClick:t[8]||(t[8]=(...n)=>r.hideDialog&&r.hideDialog(...n))},i(e.$t("Close")),1),a("button",te,i(l.myBank.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"])]),s(y,{visible:l.deleteBankDialog,"onUpdate:visible":t[12]||(t[12]=n=>l.deleteBankDialog=n),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:c(()=>[s(o,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[11]||(t[11]=n=>l.deleteBankDialog=!1)},null,8,["label"]),s(o,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:r.deleteMyBank},null,8,["label","onClick"])]),default:c(()=>[a("div",ae,[le,l.myBank?(m(),f("span",ne,[x(i(e.$t("Are you sure you want to delete")),1),a("b",null,i(l.myBank.complete_bank_account),1),x("?")])):B("",!0)])]),_:1},8,["visible","header"]),s(y,{visible:l.deleteBanksDialog,"onUpdate:visible":t[14]||(t[14]=n=>l.deleteBanksDialog=n),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:c(()=>[s(o,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[13]||(t[13]=n=>l.deleteBanksDialog=!1)},null,8,["label"]),s(o,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:r.deleteSelectedBanks},null,8,["label","onClick"])]),default:c(()=>[a("div",se,[re,l.myBank?(m(),f("span",oe,i(e.$t("Are you sure you want to delete the selected banks?")),1)):B("",!0)])]),_:1},8,["visible","header"])])}const ke=E(V,[["render",ie]]);export{ke as default};
