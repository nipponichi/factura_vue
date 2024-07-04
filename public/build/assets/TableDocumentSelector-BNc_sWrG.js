import{s as u,b as m}from"./column.esm-GTDcHOiJ.js";import{j as r,k as h,o as p,e as f,a as t,b as l,w as d,t as g,l as b,v as w}from"./app-DLLTbejH.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y={props:{companyId:{type:String,required:!0}},data(){return{documents:null,selectedDocuments:[],filters:{global:{value:null,matchMode:r.CONTAINS}}}},created(){this.filters={global:{value:null,matchMode:r.CONTAINS}}},mounted(){console.log("companyId recibido:",this.companyId),this.fetchDocuments()},methods:{fetchDocuments(){h.get(`/documents-serie/${this.companyId}`).then(e=>{this.documents=e.data.documents}).catch(e=>{console.error("Error fetching documents data:",e)})},handleRowClick(e){const o=e.data.id;console.log("Documento seleccionado:",o),this.sendDocumentId(o)},sendDocumentId(e){this.$emit("document-selected",e)}}},D={class:"card"},$={class:"flex justify-between items-center mt-2"},T={class:"relative rounded-md shadow-sm w-1/4"},k=["placeholder"],P=t("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1);function _(e,o,C,R,s,i){const a=m,c=u;return p(),f("div",null,[t("div",D,[l(c,{ref:"dt",value:s.documents,selection:s.selectedDocuments,"onUpdate:selection":o[1]||(o[1]=n=>s.selectedDocuments=n),dataKey:"id",paginator:!0,rows:10,filters:s.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("documents")}`,selectionMode:"single",onRowClick:i.handleRowClick},{header:d(()=>[t("div",$,[t("h4",null,g(e.$t("")),1),t("div",T,[b(t("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":o[0]||(o[0]=n=>s.filters.global.value=n),placeholder:e.$t("Search...")},null,8,k),[[w,s.filters.global.value]]),P])])]),default:d(()=>[l(a,{field:"number",header:e.$t("Number"),sortable:"",class:"dateTable"},null,8,["header"]),l(a,{field:"document_type_name",header:e.$t("Type"),sortable:"",class:"dateTable"},null,8,["header"]),l(a,{field:"customer_name",header:e.$t("Receiver"),sortable:"",class:"dateTable"},null,8,["header"]),l(a,{field:"date",header:e.$t("Date"),sortable:"",class:"dateTable"},null,8,["header"]),l(a,{field:"amount",header:e.$t("Amount"),sortable:"",class:"dateTable"},null,8,["header"])]),_:1},8,["value","selection","filters","currentPageReportTemplate","onRowClick"])])])}const S=v(y,[["render",_]]);export{S as default};