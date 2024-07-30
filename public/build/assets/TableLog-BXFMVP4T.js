import{a as d,s as c}from"./column.esm--1YdRAxI.js";import{i as g,j as h,o as u,e as p,a as s,b as t,w as i,t as f,k as m,v as w}from"./app-B0dAp7Ut.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v={data(){return{logs:null,filters:{},submitted:!1}},created(){this.filters={global:{value:null,matchMode:g.CONTAINS}}},mounted(){this.fetchLogs()},methods:{fetchLogs(){h.get("/logs").then(e=>{this.logs=e.data,console.log(this.logs)}).catch(e=>{this.$toast(this.$t("Error connecting to the server"),"error"),console.error(e)})}}},$={class:"card"},P={class:"flex justify-between items-center mt-2"},T={class:"relative rounded-md shadow-sm w-1/4"},L=["placeholder"],k=s("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[s("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1);function y(e,a,_,R,o,M){const l=c,n=d;return u(),p("div",null,[s("div",$,[t(n,{ref:"dt",value:o.logs,selection:e.selectedPhones,"onUpdate:selection":a[1]||(a[1]=r=>e.selectedPhones=r),dataKey:"id",onRowSelect:e.onRowSelect,paginator:!0,rows:10,filters:o.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("logs")}`},{header:i(()=>[s("div",P,[s("h4",null,f(e.$t("Manage Logs")),1),s("div",T,[m(s("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":a[0]||(a[0]=r=>o.filters.global.value=r),placeholder:e.$t("Search...")},null,8,L),[[w,o.filters.global.value]]),k])])]),default:i(()=>[t(l,{field:"user_id",header:e.$t("User id"),sortable:"",class:"dateTable"},null,8,["header"]),t(l,{field:"user_name",header:e.$t("User"),sortable:"",class:"dateTable"},null,8,["header"]),t(l,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),t(l,{field:"ip_address",header:e.$t("IP Address"),sortable:"",class:"dateTable"},null,8,["header"]),t(l,{field:"time",header:e.$t("Time"),sortable:"",class:"dateTable"},null,8,["header"])]),_:1},8,["value","selection","onRowSelect","filters","currentPageReportTemplate"])])])}const B=b(v,[["render",y]]);export{B as default};
