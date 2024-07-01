import{s as _,a as w}from"./toolbar.esm-HT0xLOxV.js";import{s as C,a as $,b as T}from"./column.esm-IEgrWFql.js";import{j as P,k as m,o as h,e as f,a,b as o,w as c,t as u,l as S,v as E,g as y,f as b}from"./app-Dz46uSI6.js";import{_ as I}from"./_plugin-vue_export-helper-DlAUqK2U.js";const M={data(){return{documents:null,deleteDocumentDialog:!1,deleteDocumentsDialog:!1,serie:"",date:"",myDocument:{id:"",number:"",company_id_company:"",company_id_customer:"",documents_type_id:"",documents_series_id:"",date:"",subTotal:"",totalTax:"",amount:"",paid:"",customer_name:"",invoiced:""},selectedDocuments:[],filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:P.CONTAINS}};const e=new Date,t=e.getFullYear(),n=(e.getMonth()+1).toString().padStart(2,"0"),p=e.getDate().toString().padStart(2,"0");this.fecha=`${t}-${n}-${p}`},mounted(){this.fetchDocuments()},methods:{fetchDocuments(){let e=window.location.pathname.split("/").pop();console.log("ID company "+e),m.get("/documents-serie/"+e).then(t=>{this.documents=t.data.documents}).catch(t=>{console.error("Error fetching documents data:",t)})},confirmDeleteProduct(e){console.log("Confirm deletee"),this.document=e,this.deleteDocumentDialog=!0},deleteProduct(){console.log("DELETE"),this.deleteDocumentDialog=!1,m.delete("/documents/"+this.document.id).then(e=>{e.data.type==="success"&&(this.documents=this.documents.filter(t=>t.id!==this.document.id)),this.$toast(this.$t(e.data.message),e.data.type)}).catch(e=>{this.$toast(this.$t(e.response.message),e.response.type)}),this.deleteDocumentDialog=!1},confirmDeleteSelected(){console.log("CONFIRM DELETE SELECTED"),this.deleteDocumentsDialog=!0},deleteSelectedProducts(){this.selectedDocuments.forEach(e=>{m.delete("/documents/"+e.id).then(t=>{t.data.type==="success"&&(this.documents=this.documents.filter(n=>n.id!==e.id)),this.$toast(this.$t(t.data.message),t.data.type)}).catch(t=>{(t.response||t.response.status===400)&&this.$toast(this.$t(t.response.message),t.response.type)})}),this.deleteDocumentsDialog=!1},handleInfoButtonClick(e){let t=window.location.pathname.split("/").pop();this.myDocument.id=e.id;let n=`/companies/${t}/document/${this.myDocument.id}`;window.open(n,"_blank")},checkDocument(e){let t=window.location.pathname.split("/").pop();console.log("checkDocument"),this.myDocument.id=e.id,this.myDocument.company_id_company=t,console.log("SelectedType "+this.myDocument.id),console.log("SelectedCompany "+this.myDocument.company_id_company),m.get("/documents-series/"+this.myDocument.company_id_company+"/"+this.myDocument.id).then(n=>{console.log("checkDocument2"),n.data.date.date>this.fecha?confirm("La fecha seleccionada es anterior a la de la última factura, ¿deseas mantener la fecha actual?")&&(alert("Se ha asignado la fecha actual"),this.makeInvoice()):(this.fecha=n.data.date.date,this.makeInvoice())}).catch(n=>{console.error("Error al guardar los datos del documento:",n.response)})},makeInvoice(){console.log("MAke invoice"),window.location.pathname.split("/").pop(),console.log("Fecha factura: "+this.fecha),m.post("/documents-serie/"+this.myDocument.id+"/"+this.fecha).then(e=>{console.log("ha pasao")}).catch(e=>{console.log("ha fallao"),console.error("Error al guardar los datos del documento:",e.response)})}}},N={class:"card"},x={class:"flex justify-between items-center mt-2"},L={class:"relative rounded-md shadow-sm w-1/4"},B=["placeholder"],R=a("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[a("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[a("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),A={class:"confirmation-content"},F=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),V={key:0},z={class:"confirmation-content"},U=a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),O={key:0};function Y(e,t,n,p,s,r){const i=$,v=_,d=T,k=C,g=w;return h(),f("div",null,[a("div",N,[o(v,{class:"mb-4 border border-slate-200 ..."},{start:c(()=>[o(i,{label:"Delete",icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:r.confirmDeleteSelected,disabled:!s.selectedDocuments||!s.selectedDocuments.length},null,8,["onClick","disabled"])]),_:1}),o(k,{ref:"dt",value:s.documents,selection:s.selectedDocuments,"onUpdate:selection":t[1]||(t[1]=l=>s.selectedDocuments=l),dataKey:"id",paginator:!0,rows:10,filters:s.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("documents")}`},{header:c(()=>[a("div",x,[a("h4",null,u(e.$t("Manage documents")),1),a("div",L,[S(a("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":t[0]||(t[0]=l=>s.filters.global.value=l),placeholder:e.$t("Search...")},null,8,B),[[E,s.filters.global.value]]),R])])]),default:c(()=>[o(d,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox"}),o(d,{field:"number",header:e.$t("Number"),sortable:"",class:"dateTable"},null,8,["header"]),o(d,{field:"document_type_name",header:e.$t("Type"),sortable:"",class:"dateTable"},null,8,["header"]),o(d,{field:"customer_name",header:e.$t("Receiver"),sortable:"",class:"dateTable"},null,8,["header"]),o(d,{field:"date",header:e.$t("Date"),sortable:"",class:"dateTable"},null,8,["header"]),o(d,{field:"amount",header:e.$t("Amount"),sortable:"",class:"dateTable"},null,8,["header"]),o(d,{exportable:!1,class:"dateTable"},{body:c(l=>[o(i,{icon:"pi pi-file-check",outlined:"",rounded:"",class:"mr-2 simpleInvoice-button",disabled:l.data.document_type_name!=="Presupuesto",onClick:D=>l.data.document_type_name==="Presupuesto"?r.checkDocument(l.data):null},null,8,["disabled","onClick"]),o(i,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:D=>r.handleInfoButtonClick(l.data)},null,8,["onClick"]),o(i,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:D=>r.confirmDeleteProduct(l.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters","currentPageReportTemplate"])]),o(g,{visible:s.deleteDocumentDialog,"onUpdate:visible":t[3]||(t[3]=l=>s.deleteDocumentDialog=l),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:c(()=>[o(i,{label:"No",icon:"pi pi-times",text:"",onClick:t[2]||(t[2]=l=>s.deleteDocumentDialog=!1)}),o(i,{label:"Yes",icon:"pi pi-check",text:"",onClick:r.deleteProduct},null,8,["onClick"])]),default:c(()=>[a("div",A,[F,e.document?(h(),f("span",V,[y(u(e.$t("Are you sure you want to delete")),1),a("b",null,u(e.document.number),1),y("?")])):b("",!0)])]),_:1},8,["visible","header"]),o(g,{visible:s.deleteDocumentsDialog,"onUpdate:visible":t[5]||(t[5]=l=>s.deleteDocumentsDialog=l),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:c(()=>[o(i,{label:"No",icon:"pi pi-times",text:"",onClick:t[4]||(t[4]=l=>s.deleteDocumentsDialog=!1)}),o(i,{label:"Yes",icon:"pi pi-check",text:"",onClick:r.deleteSelectedProducts},null,8,["onClick"])]),default:c(()=>[a("div",z,[U,s.myDocument?(h(),f("span",O,u(e.$t("Are you sure you want to delete the selected documents?")),1)):b("",!0)])]),_:1},8,["visible","header"])])}const H=I(M,[["render",Y]]);export{H as default};
