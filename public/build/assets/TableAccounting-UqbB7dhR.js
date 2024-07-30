import{s as y}from"./dialog.esm-CFBtU7hN.js";import{s as v,a as w,b as _}from"./column.esm-U4vAboxO.js";import{o as c,c as x,w as i,i as b,j as D,a as t,t as l,e as u,f as m,g as $,b as d,k as h,v as g}from"./app-B1ErcoGi.js";import{_ as C}from"./AppLayout-DQYPdZgb.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const F={class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"},T={class:"py-12"},k={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},S={class:"bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"},B={class:"card"},V={class:"relative inline-block flex mb-5"},M=["disabled"],R={class:"font-bold text-lg"},j={key:0,class:"pi pi-plus mr-2"},N={class:"flex flex-col sm:flex-row justify-between items-center mt-2 space-y-2 sm:space-y-0"},A={class:"flex items-center space-x-2 sm:space-x-0"},U={class:"font-semibold mr-3"},I={class:"flex items-center space-x-2 sm:space-x-0"},E={class:"font-semibold ml-3"},O={class:"relative rounded-md shadow-sm ml-auto"},z=["placeholder"],Y=t("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),H={class:"text-center"},K={class:"flex justify-center gap-2 text-sm text-gray-500"},L={class:"w-1/3 text-center px-3"},q={class:"w-1/3 text-center px-12"},G={class:"w-1/3 text-center pl-16"},J={class:"flex gap-2 justify-center"},Q={class:"w-1/3 border-r border-gray-400 px-2 text-center"},W={class:"w-1/3 border-r border-gray-400 px-2 text-center"},X={class:"w-1/3 px-2 text-center"},Z={class:"text-center"},P={class:"flex gap-2 justify-center text-sm text-gray-500"},ee={class:"w-1/3 text-center px-3"},te={class:"w-1/3 text-center px-12"},ae={class:"w-1/3 text-center pl-16"},se={class:"flex gap-2 justify-center"},oe={class:"w-1/3 border-r border-gray-400 px-2 text-center"},le={class:"w-1/3 border-r border-gray-400 px-2 text-center"},ne={class:"w-1/3 px-2 text-center"},ie={class:"flex flex-col items-center justify-center sm:flex-row sm:justify-end"},de={class:"totals-container w-full sm:w-1/3 mb-4 sm:mb-0 sm:ml-4"},ce={class:"totals p-4 rounded-md"},re={class:"w-full"},ue={class:"text-gray-600 pr-4"},me={class:"pl-4"},he=t("hr",{class:"my-2 border-gray-300"},null,-1),ge={class:"text-gray-600 pr-4"},pe={class:"pl-4"},be=t("hr",{class:"my-2 border-gray-300"},null,-1),fe={class:"text-gray-600 pr-4"},ye={class:"pl-4"},ve={for:"name",class:"block text-sm font-medium text-gray-900 dark:text-white"},we={key:0,class:"flex align-items-center"},_e={class:"flex align-items-center"},xe={data(){return{documents:[],companies:[],totalDocuments:[],balance:{subtotal:0,amount:0,tax:0},initialDate:"",endDate:"",startDate:"",selectedCompany:"",accountingDialog:!1,selectedDocuments:[],filters:{global:{value:null,matchMode:b.CONTAINS}}}},created(){this.filters={global:{value:null,matchMode:b.CONTAINS}};const n=new Date,e=n.getFullYear(),a=(n.getMonth()+1).toString().padStart(2,"0"),o=n.getDate().toString().padStart(2,"0");this.initialDate=`${e}-01-01`,this.endDate=`${e}-${a}-${o}`,console.log(this.initialDate),console.log(this.endDate)},async mounted(){this.companies=this.$page.props.companies,this.selectedCompany=this.companies[0],await this.fetchDocuments(),await this.calculateBalance(),await this.itemsFiltrados()},watch:{async selectedCompany(n,e){n!==e&&(await this.fetchDocuments(),await this.calculateBalance(),await this.itemsFiltrados())},async hadleCalculateBalance(){await this.calculateBalance()}},methods:{async fetchDocuments(){await D.get(`/accountings/${this.selectedCompany.id}`).then(n=>{console.log(n.data.documents);let e,a;for(let o=0;o<n.data.documents.length;o++)e=n.data.documents[o].date,a=this.dateFormat(e),n.data.documents[o].dateFormatted=a,console.log("fetch: "+a);this.totalDocuments=n.data.documents.filter(o=>o.documents_type_id===1)}).catch(n=>{console.error("Error fetching documents data:",n)})},async itemsFiltrados(){if(this.documents=[],!this.initialDate||!this.endDate)return this.totalDocuments;const n=new Date(this.initialDate),e=new Date(this.endDate);this.documents=this.totalDocuments.filter(a=>{const o=new Date(a.date);return o>=n&&o<=e}),await this.calculateBalance()},async calculateBalance(){console.log("calculateTotal1"),console.log(this.balance),this.balance={subtotal:0,amount:0,tax:0};let n=0,e=0,a=0;for(let o=0;o<this.documents.length;o++)this.documents[o].isReceived?(n-=parseFloat(this.documents[o].amount),e-=parseFloat(this.documents[o].subtotal),a-=parseFloat(this.documents[o].tax)):(n+=parseFloat(this.documents[o].amount),e+=parseFloat(this.documents[o].subtotal),a+=parseFloat(this.documents[o].tax));this.balance={subtotal:e.toFixed(2),amount:n.toFixed(2),tax:a.toFixed(2)},console.log("calculateTotal2"),console.log(this.balance)},dateFormat(n){let e=new Date(n),a=e.getDate(),o=e.getMonth()+1,r=e.getFullYear();return a<10&&(a="0"+a),o<10&&(o="0"+o),`${a}/${o}/${r}`},hideDialog(){this.accountingDialog=!1},openNew(){this.accountingDialog=!0},selectCompany(){this.accountingDialog=!0}}},ke=Object.assign(xe,{__name:"TableAccounting",setup(n){return(e,a)=>{const o=v,r=w,p=_,f=y;return c(),x(C,{title:"Accounting"},{header:i(()=>[t("h2",F,l(e.$t("Accounting")),1)]),default:i(()=>[t("div",T,[t("div",k,[t("div",S,[t("div",null,[t("div",B,[t("div",V,[!e.loading&&e.companies.length>0?(c(),u("button",{key:0,type:"button",class:"px-4 py-2 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-white flex items-center",onClick:a[0]||(a[0]=s=>e.companies.length>1?e.selectCompany():null),disabled:e.companies.length===1},[t("span",R,[e.companies.length>1?(c(),u("i",j)):m("",!0),$(" "+l(e.selectedCompany.name),1)])],8,M)):m("",!0)]),d(r,{ref:"dt",value:e.documents,selection:e.selectedDocuments,"onUpdate:selection":a[6]||(a[6]=s=>e.selectedDocuments=s),dataKey:"id",selectionMode:"single",onRowClick:e.handleRowClick},{header:i(()=>[t("div",N,[t("div",A,[t("div",U,l(e.$t("Initial date"))+": ",1),h(t("input",{type:"date","onUpdate:modelValue":a[1]||(a[1]=s=>e.initialDate=s),onChange:a[2]||(a[2]=(...s)=>e.itemsFiltrados&&e.itemsFiltrados(...s)),class:"border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400"},null,544),[[g,e.initialDate]])]),t("div",I,[t("div",E,l(e.$t("End date"))+": ",1),h(t("input",{type:"date","onUpdate:modelValue":a[3]||(a[3]=s=>e.endDate=s),onChange:a[4]||(a[4]=(...s)=>e.itemsFiltrados&&e.itemsFiltrados(...s)),class:"border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400"},null,544),[[g,e.endDate]])]),t("div",O,[h(t("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":a[5]||(a[5]=s=>e.filters.global.value=s),placeholder:e.$t("Search...")},null,8,z),[[g,e.filters.global.value]]),Y])])]),default:i(()=>[d(o,{field:"dateFormatted",header:e.$t("Date"),sortable:"",class:"dateTable"},null,8,["header"]),d(o,{field:"number",header:e.$t("Concept"),sortable:"",class:"dateTable"},null,8,["header"]),d(o,{class:"dateTable"},{header:i(()=>[t("div",H,[t("div",null,l(e.$t("Duty")),1),t("div",K,[t("div",L,l(e.$t("Subtotal")),1),t("div",q,l(e.$t("Tax")),1),t("div",G,l(e.$t("Total")),1)])])]),body:i(s=>[t("div",J,[t("div",Q,l(s.data.isReceived?"-":s.data.subtotal),1),t("div",W,l(s.data.isReceived?"-":s.data.tax),1),t("div",X,l(s.data.isReceived?"-":s.data.amount),1)])]),_:1}),d(o,{class:"dateTable"},{header:i(()=>[t("div",Z,[t("div",null,l(e.$t("Have")),1),t("div",P,[t("div",ee,l(e.$t("Subtotal")),1),t("div",te,l(e.$t("Tax")),1),t("div",ae,l(e.$t("Total")),1)])])]),body:i(s=>[t("div",se,[t("div",oe,l(s.data.isReceived?s.data.subtotal:"-"),1),t("div",le,l(s.data.isReceived?s.data.tax:"-"),1),t("div",ne,l(s.data.isReceived?s.data.amount:"-"),1)])]),_:1})]),_:1},8,["value","selection","onRowClick"]),t("div",ie,[t("div",de,[t("div",ce,[t("table",re,[t("tbody",null,[t("tr",null,[t("td",ue,l(e.$t("Subtotal (excluding Tax)"))+":",1),t("td",me,l(e.balance.subtotal)+"€",1)]),he,t("tr",null,[t("td",ge,l(e.$t("Total Tax"))+":",1),t("td",pe,l(e.balance.tax)+"€",1)]),be,t("tr",null,[t("td",fe,l(e.$t("Total (with IVA)"))+":",1),t("td",ye,l(e.balance.amount)+"€",1)])])])])])])])])])])]),d(f,{visible:e.accountingDialog,"onUpdate:visible":a[8]||(a[8]=s=>e.accountingDialog=s),header:e.$t("Select companies"),modal:!0,onChange:e.handleCompanySelection,class:"p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl"},{default:i(()=>[t("label",ve,l(e.$t("Select your company"))+":",1),d(p,{modelValue:e.selectedCompany,"onUpdate:modelValue":a[7]||(a[7]=s=>e.selectedCompany=s),options:e.companies,filter:"",optionLabel:"name",class:"w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500",onChange:e.handleCompanySelection},{value:i(s=>[s.value?(c(),u("div",we,[t("div",null,l(s.value.name),1)])):m("",!0)]),option:i(s=>[t("div",_e,[t("div",null,l(s.option.name),1)])]),_:1},8,["modelValue","options","onChange"])]),_:1},8,["visible","header","onChange"])]),_:1})}}});export{ke as default};
