import{s as C}from"./dialog.esm-BSV8BAis.js";import{a as $,c as T,s as x}from"./column.esm-kB5OSM7O.js";import{s as P}from"./toolbar.esm-CmyO6oHg.js";import{i as F,j as f,o as d,e as g,a as l,c as D,w as u,f as p,b as i,t as h,k,x as S,v as I,g as v}from"./app-CitTDTgB.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const M={data(){return{documents:null,receivedDocuments:[],emitedDocuments:[],deleteDocumentDialog:!1,deleteDocumentsDialog:!1,serie:"",date:"",myDocument:{id:"",number:"",company_id_company:"",company_id_customer:"",documents_type_id:"",documents_series_id:"",date:"",dateFormatted:"",subTotal:"",totalTax:"",amount:"",paid:"",customer_name:"",invoiced:""},selectedDocuments:[],filters:{},submitted:!1,isChecked:!1}},created(){this.filters={global:{value:null,matchMode:F.CONTAINS}};const e=new Date,t=e.getFullYear(),s=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getDate().toString().padStart(2,"0");this.fecha=`${t}-${s}-${n}`},mounted(){this.fetchDocuments()},computed:{valueToUse(){return this.isChecked?this.receivedDocuments:this.emitedDocuments}},methods:{fetchDocuments(){let e=window.location.pathname.split("/").pop();console.log("ID company "+e),f.get("/documents-serie/"+e).then(t=>{let s,n;for(let o=0;o<t.data.documents.length;o++)s=t.data.documents[o].date,n=this.dateFormat(s),t.data.documents[o].dateFormatted=n;this.documents=t.data.documents,console.log(this.documents),this.documents.forEach(o=>{o.isReceived===0?this.emitedDocuments.push(o):o.isReceived===1&&this.receivedDocuments.push(o)})}).catch(t=>{console.error("Error fetching documents data:",t)})},confirmDeleteProduct(e){this.myDocument=e,this.deleteDocumentDialog=!0},deleteProduct(){f.delete("/documents/"+this.myDocument.id).then(e=>{this.isChecked?this.receivedDocuments=this.receivedDocuments.filter(t=>t.id!==this.myDocument.id):this.emitedDocuments=this.emitedDocuments.filter(t=>t.id!==this.myDocument.id),this.$toast(this.$t(e.data.message),e.data.type),this.updateFields()}).catch(e=>{this.$toast(this.$t(e.response.message),e.response.type)}),this.deleteDocumentDialog=!1},confirmDeleteSelected(){console.log("CONFIRM DELETE SELECTED"),this.deleteDocumentsDialog=!0},deleteSelectedProducts(){this.selectedDocuments.forEach(e=>{f.delete("/documents/"+e.id).then(t=>{this.isChecked?this.receivedDocuments=this.receivedDocuments.filter(s=>s.id!==e.id):this.emitedDocuments=this.emitedDocuments.filter(s=>s.id!==e.id),this.$toast(this.$t(t.data.message),t.data.type),this.updateFields()}).catch(t=>{(t.response||t.response.status===400)&&this.$toast(this.$t(t.response.message),t.response.type)})}),this.deleteDocumentsDialog=!1},handleInfoButtonClick(e){let t=window.location.pathname.split("/").pop();this.myDocument.id=e.id;let s=`/companies/${t}/document/${this.myDocument.id}`;window.open(s,"_blank")},checkDocument(e){let t=window.location.pathname.split("/").pop();console.log("checkDocument"),this.myDocument.id=e.id,this.myDocument.company_id_company=t,console.log("SelectedType "+this.myDocument.id),console.log("SelectedCompany "+this.myDocument.company_id_company),f.get("/documents-series/"+this.myDocument.company_id_company+"/"+this.myDocument.id).then(s=>{console.log("checkDocument2"),s.data.date.date>this.fecha?confirm("La fecha seleccionada es anterior a la de la última factura, ¿deseas mantener la fecha actual?")&&(alert("Se ha asignado la fecha actual"),this.makeInvoice()):(this.fecha=s.data.date.date,this.makeInvoice())}).catch(s=>{console.error("Error al guardar los datos del documento:",s.response)})},dateFormat(e){let t=new Date(e),s=t.getDate(),n=t.getMonth()+1,o=t.getFullYear();return s<10&&(s="0"+s),n<10&&(n="0"+n),`${s}/${n}/${o}`},makeInvoice(){console.log("Make invoice"),window.location.pathname.split("/").pop(),console.log("Fecha factura: "+this.fecha),f.post("/documents-serie/"+this.myDocument.id+"/"+this.fecha).then(e=>{}).catch(e=>{console.error("Error al guardar los datos del documento:",e.response)})},updateFields(){this.$emit("updateDocument",1)}}},N={class:"card"},L={class:"flex justify-between items-center mt-2"},R={key:0,class:"flex items-center cursor-pointer"},U={key:0,class:"text-lg font-medium text-gray-900 dark:text-gray-300"},B={key:1,class:"text-lg font-medium text-gray-900 dark:text-gray-300"},V=l("div",{class:"relative w-11 h-6 ml-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"},null,-1),A={class:"relative rounded-md shadow-sm w-1/4"},z=["placeholder"],Y=l("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[l("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[l("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),O={class:"confirmation-content"},j=l("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),K={key:0},q={class:"confirmation-content"},G=l("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1);function H(e,t,s,n,o,c){const r=T,w=P,m=x,_=$,y=C;return d(),g("div",null,[l("div",N,[e.$page.props.user.permissions.includes("delete document income")?(d(),D(w,{key:0,class:"mb-4 border border-slate-200 ..."},{start:u(()=>[i(r,{label:"Delete",icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:c.confirmDeleteSelected,disabled:!o.selectedDocuments||!o.selectedDocuments.length},null,8,["onClick","disabled"])]),_:1})):p("",!0),i(_,{ref:"dt",value:c.valueToUse,selection:o.selectedDocuments,"onUpdate:selection":t[2]||(t[2]=a=>o.selectedDocuments=a),dataKey:"id",paginator:!0,rows:10,filters:o.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("documents")}`},{header:u(()=>[l("div",L,[l("h4",null,h(e.$t("Manage documents")),1),e.$page.props.user.permissions.includes("read document expense")?(d(),g("label",R,[o.isChecked?(d(),g("span",B,h(e.$t("Invoice-Expense")),1)):(d(),g("span",U,h(e.$t("Invoice-Income")),1)),k(l("input",{type:"checkbox",class:"sr-only peer","onUpdate:modelValue":t[0]||(t[0]=a=>o.isChecked=a)},null,512),[[S,o.isChecked]]),V])):p("",!0),l("div",A,[k(l("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":t[1]||(t[1]=a=>o.filters.global.value=a),placeholder:e.$t("Search...")},null,8,z),[[I,o.filters.global.value]]),Y])])]),default:u(()=>[i(m,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox"}),i(m,{field:"number",header:e.$t("Number"),sortable:"",class:"dateTable"},null,8,["header"]),i(m,{field:"document_type_name",header:e.$t("Type"),sortable:"",class:"dateTable"},null,8,["header"]),i(m,{field:"customer_name",header:e.$t("Receiver"),sortable:"",class:"dateTable"},null,8,["header"]),i(m,{field:"dateFormatted",header:e.$t("Date"),sortable:"",class:"dateTable"},null,8,["header"]),i(m,{field:"amount",header:e.$t("Amount"),sortable:"",class:"dateTable"},null,8,["header"]),i(m,{exportable:!1,class:"dateTable",header:e.$t("Utilidades")},{body:u(a=>[e.$page.props.user.permissions.includes("delete document income")?(d(),D(r,{key:0,icon:"pi pi-envelope",outlined:"",rounded:"",class:"mr-2 simpleDelete-button",severity:"danger",onClick:b=>c.confirmDeleteProduct(a.data)},null,8,["onClick"])):p("",!0),e.$page.props.user.permissions.includes("update document income")?(d(),D(r,{key:1,icon:"pi pi-file-check",outlined:"",rounded:"",class:"mr-2 simpleInvoice-button",disabled:a.data.document_type_name!=="Presupuesto",onClick:b=>a.data.document_type_name==="Presupuesto"?c.checkDocument(a.data):null},null,8,["disabled","onClick"])):p("",!0),e.$page.props.user.permissions.includes("delete document income")?(d(),D(r,{key:2,icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:b=>c.confirmDeleteProduct(a.data)},null,8,["onClick"])):p("",!0)]),_:1},8,["header"])]),_:1},8,["value","selection","filters","currentPageReportTemplate"])]),i(y,{visible:o.deleteDocumentDialog,"onUpdate:visible":t[4]||(t[4]=a=>o.deleteDocumentDialog=a),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:u(()=>[i(r,{label:"No",icon:"pi pi-times",text:"",onClick:t[3]||(t[3]=a=>o.deleteDocumentDialog=!1)}),i(r,{label:"Yes",icon:"pi pi-check",text:"",onClick:c.deleteProduct},null,8,["onClick"])]),default:u(()=>[l("div",O,[j,o.myDocument?(d(),g("span",K,[v(h(e.$t("Are you sure you want to delete")),1),l("b",null,h(o.myDocument.number),1),v("?")])):p("",!0)])]),_:1},8,["visible","header"]),i(y,{visible:o.deleteDocumentsDialog,"onUpdate:visible":t[6]||(t[6]=a=>o.deleteDocumentsDialog=a),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:u(()=>[i(r,{label:"No",icon:"pi pi-times",text:"",onClick:t[5]||(t[5]=a=>o.deleteDocumentsDialog=!1)}),i(r,{label:"Yes",icon:"pi pi-check",text:"",onClick:c.deleteSelectedProducts},null,8,["onClick"])]),default:u(()=>[l("div",q,[G,l("span",null,h(e.$t("Are you sure you want to delete the selected documents?")),1)])]),_:1},8,["visible","header"])])}const ee=E(M,[["render",H]]);export{ee as default};