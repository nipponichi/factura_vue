import{s as p,b as u,a as m}from"./column.esm-RItjM3vu.js";import{j as f,o as h,e as g,a as t,b as a,w as r,t as b,l as v,v as w}from"./app-CM9nMGr0.js";import{_ as $}from"./_plugin-vue_export-helper-DlAUqK2U.js";const P={data(){return console.log("PRIMER PASO"),{companies:null,filters:{},submitted:!1}},created(){console.log("Created"),this.filters={global:{value:null,matchMode:f.CONTAINS}}},mounted(){this.companies=this.$page.props.companies},methods:{handleInfoButtonClick(e){this.$inertia.get("/companies/"+e)}}},T={class:"card"},k={class:"flex justify-between items-center mt-2"},C={class:"relative rounded-md shadow-sm w-1/4"},y=["placeholder"],_=t("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1);function M(e,o,B,N,n,i){const l=u,d=m,c=p;return h(),g("div",null,[t("div",T,[a(c,{ref:"dt",value:n.companies,selection:e.selectedCompanies,"onUpdate:selection":o[1]||(o[1]=s=>e.selectedCompanies=s),dataKey:"id",paginator:!0,rows:10,filters:n.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("companies")}`},{header:r(()=>[t("div",k,[t("h4",null,b(e.$t("Manage companies")),1),t("div",C,[v(t("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":o[0]||(o[0]=s=>n.filters.global.value=s),placeholder:e.$t("Search...")},null,8,y),[[w,n.filters.global.value]]),_])])]),default:r(()=>[a(l,{field:"name",header:e.$t("Name"),sortable:"",class:"dateTable"},null,8,["header"]),a(l,{field:"tax_number",header:e.$t("Tax Number"),sortable:"",class:"dateTable"},null,8,["header"]),a(l,{field:"phone",header:e.$t("Phone"),sortable:"",class:"dateTable"},null,8,["header"]),a(l,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),a(l,{field:"town",header:e.$t("Town"),sortable:"",class:"dateTable"},null,8,["header"]),a(l,{field:"province",header:e.$t("Province"),sortable:"",class:"dateTable"},null,8,["header"]),a(l,{exportable:!1,class:"dateTable"},{body:r(s=>[a(d,{icon:"pi pi-eye",outlined:"",rounded:"",class:"mr-2 info-button",onClick:R=>i.handleInfoButtonClick(s.data.id)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters","currentPageReportTemplate"])])])}const I=$(P,[["render",M]]);export{I as default};
