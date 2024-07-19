import{s as C}from"./dialog.esm-Cd7IUNvF.js";import{a as _,c as D,s as U,b as T}from"./column.esm-BoZgGRTr.js";import{s as V}from"./toolbar.esm-DWLXbUPk.js";import{i as $,j as b,o as m,e as g,a as o,b as s,w as a,t as d,k as n,v as u,f as k,m as N,g as v}from"./app-D0CrsufA.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";console.log("Inicio");const S={data(){return console.log("PRIMER PASO"),{products:null,users:[],productDialog:!1,deleteProductDialog:!1,deleteProductsDialog:!1,selectedCompany:"",productos:{name:"",tax_number:"",email:"",phone:"",address:"",post_code:"",town:"",province:"",country:"",user_id:"",user_email:""},selectedUser:null,selectedProducts:[],filters:{},submitted:!1}},created(){console.log("Created"),this.filters={global:{value:null,matchMode:$.CONTAINS}}},mounted(){this.products=this.$page.props.companies,this.fetchUsers()},methods:{fetchUsers(){b.get("/admin-reload-users").then(e=>{this.users=e.data.users}).catch(e=>{console.error("Error fetching phone data:",e)})},fetchCompanies(){b.get("/admin-reload-companies").then(e=>{this.products=e.data.companies}).catch(e=>{console.error("Error fetching phone data:",e)})},openNew(){console.log("OPEN NEW-------------------"),this.productos={},this.submitted=!1,this.productDialog=!0,this.selectedUser=null},hideDialog(){console.log("HIDE"),this.productDialog=!1,this.submitted=!1},saveProduct(){console.log("id: "+this.selectedUser.id),this.productos.user_id=this.selectedUser.id,this.productos.id?this.updateProduct():b.post("/admin-companies",this.productos).then(e=>{console.log(e),this.fetchCompanies(),this.productDialog=!1}).catch(e=>{console.log(e.response),this.productDialog=!1})},editProduct(e){this.productDialog=!0,this.productos.id=e.id,this.productos.user_id=e.user_id,this.productos.name=e.name,this.productos.tax_number=e.tax_number;const t=this.users.find(h=>h.email===e.user_email);this.selectedUser=t},updateProduct(){b.put("/admin-companies/"+this.productos.id,this.productos).then(e=>{this.fetchCompanies(),this.productDialog=!1}).catch(e=>{console.error("Error al actualizar la compañía:",e),this.productDialog=!1})},confirmDeleteProduct(e){this.product=e,this.deleteProductDialog=!0},deleteProduct(){b.delete("/admin-companies/"+this.product.id).then(e=>{this.products=this.products.filter(t=>t.id!==this.productos),this.productos={},this.deleteEmailDialog=!1}).catch(e=>{console.log(e.response),this.deleteProductDialog=!1})},confirmDeleteSelected(){this.deleteProductsDialog=!0},deleteSelectedProducts(){this.selectedProducts.forEach(e=>{b.delete("/admin-companies/"+e.id).then(t=>{this.products=this.products.filter(h=>h.id!==this.productos)}).catch(t=>{console.error("Error al eliminar el producto:",t),this.deleteProductsDialog=!1})}),this.selectedProducts=[],this.deleteProductsDialog=!1},handleInfoButtonClick(e){this.$inertia.get("/admin-companies/"+e)}}},M={class:"card"},q={class:"flex justify-between items-center mt-2"},A={class:"relative rounded-md shadow-sm w-1/4"},B=["placeholder"],L=o("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3"},[o("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[o("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1),R={for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},I={key:0,class:"flex align-items-center"},z={key:1},O={class:"flex align-items-center"},j={class:"grid gap-3 mb-6 md:grid-cols-2"},F={for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},Y=["placeholder"],H={for:"tax_number",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},K=["placeholder"],W={key:0},G={class:"mb-6"},J={for:"address",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},Q=["placeholder"],X={class:"grid gap-3 mb-6 md:grid-cols-2"},Z={for:"province",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},ee=["placeholder"],oe={for:"post_code",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},te=["placeholder"],re={for:"country",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},le=["placeholder"],se={for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},de=["placeholder"],ie={for:"phone",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},ae=["placeholder"],ne={for:"town",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},ue=["placeholder"],ce={class:"grid gap-3 md:grid-cols-1 justify-items-end"},pe={type:"submit",class:"text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},be={class:"confirmation-content"},me=o("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),ge={key:0},he={class:"confirmation-content"},fe=o("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1),ke={key:0};function ye(e,t,h,ve,l,i){const c=D,w=V,p=U,x=_,P=T,f=C;return m(),g("div",null,[o("div",M,[s(w,{class:"mb-4 border border-slate-200 ..."},{start:a(()=>[s(c,{label:e.$t("New"),icon:"pi pi-plus",severity:"success",class:"mr-2 success-button",onClick:i.openNew},null,8,["label","onClick"]),s(c,{label:e.$t("Delete"),icon:"pi pi-trash",severity:"danger",class:"danger-button",onClick:i.confirmDeleteSelected,disabled:!l.selectedProducts||!l.selectedProducts.length},null,8,["label","onClick","disabled"])]),_:1}),s(x,{ref:"dt",value:l.products,selection:l.selectedProducts,"onUpdate:selection":t[1]||(t[1]=r=>l.selectedProducts=r),dataKey:"id",paginator:!0,rows:10,filters:l.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:`${e.$t("Showing")} {first} ${e.$t("of")} {last} ${e.$t("of")} {totalRecords} ${e.$t("companies")}`},{header:a(()=>[o("div",q,[o("h4",null,[o("h4",null,d(e.$t("Manage companies")),1)]),o("div",A,[n(o("input",{type:"search",class:"block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm","onUpdate:modelValue":t[0]||(t[0]=r=>l.filters.global.value=r),placeholder:e.$t("Search...")},null,8,B),[[u,l.filters.global.value]]),L])])]),default:a(()=>[s(p,{selectionMode:"multiple",exportable:!1,class:"datetable checkbox"}),s(p,{field:"user_email",header:e.$t("User"),sortable:"",class:"dateTable"},null,8,["header"]),s(p,{field:"name",header:e.$t("Company"),sortable:"",class:"dateTable"},null,8,["header"]),s(p,{field:"tax_number",header:e.$t("Tax number"),sortable:"",class:"dateTable"},null,8,["header"]),s(p,{field:"phone",header:e.$t("Phone"),sortable:"",class:"dateTable"},null,8,["header"]),s(p,{field:"email",header:e.$t("Email"),sortable:"",class:"dateTable"},null,8,["header"]),s(p,{exportable:!1,class:"dateTable"},{body:a(r=>[s(c,{icon:"pi pi-eye",outlined:"",rounded:"",class:"mr-2 info-button",onClick:y=>i.handleInfoButtonClick(r.data.id)},null,8,["onClick"]),s(c,{icon:"pi pi-pencil",outlined:"",rounded:"",class:"mr-2 edit-button",onClick:y=>i.editProduct(r.data)},null,8,["onClick"]),s(c,{icon:"pi pi-trash",outlined:"",rounded:"",class:"simpleDelete-button",severity:"danger",onClick:y=>i.confirmDeleteProduct(r.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters","currentPageReportTemplate"])]),s(f,{visible:l.productDialog,"onUpdate:visible":t[14]||(t[14]=r=>l.productDialog=r),header:l.productos.id?e.$t("Modify company"):e.$t("Create company"),id:"titleCompany",modal:!0,class:"p-fluid"},{default:a(()=>[o("form",{style:{width:"800px"},onSubmit:t[13]||(t[13]=N((...r)=>i.saveProduct&&i.saveProduct(...r),["prevent"]))},[o("label",R,d(e.$t("Select an user")),1),s(P,{modelValue:l.selectedUser,"onUpdate:modelValue":t[2]||(t[2]=r=>l.selectedUser=r),options:this.users,filter:"",optionLabel:"email",placeholder:e.$t("Select an user"),class:"w-full md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"},{value:a(r=>[r.value?(m(),g("div",I,[o("div",null,d(r.value.email),1)])):(m(),g("span",z,d(r.placeholder),1))]),option:a(r=>[o("div",O,[o("div",null,d(r.option.email),1)])]),_:1},8,["modelValue","options","placeholder"]),o("div",j,[o("div",null,[o("label",F,d(e.$t("Company name")),1),n(o("input",{type:"text",id:"name","onUpdate:modelValue":t[3]||(t[3]=r=>l.productos.name=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Company name"),required:""},null,8,Y),[[u,l.productos.name]])]),o("div",null,[o("label",H,d(e.$t("Tax number")),1),n(o("input",{type:"text",id:"tax_number","onUpdate:modelValue":t[4]||(t[4]=r=>l.productos.tax_number=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Tax number"),required:""},null,8,K),[[u,l.productos.tax_number]])])]),l.productos.id?k("",!0):(m(),g("div",W,[o("div",G,[o("div",null,[o("label",J,d(e.$t("Address")),1),n(o("input",{type:"text",id:"address","onUpdate:modelValue":t[5]||(t[5]=r=>l.productos.address=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Address"),required:""},null,8,Q),[[u,l.productos.address]])])]),o("div",X,[o("div",null,[o("label",Z,d(e.$t("Province")),1),n(o("input",{type:"text",id:"province","onUpdate:modelValue":t[6]||(t[6]=r=>l.productos.province=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Province"),required:""},null,8,ee),[[u,l.productos.province]])]),o("div",null,[o("label",oe,d(e.$t("Post code")),1),n(o("input",{type:"text",id:"post_code","onUpdate:modelValue":t[7]||(t[7]=r=>l.productos.post_code=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Post code"),pattern:"^\\d+$",required:""},null,8,te),[[u,l.productos.post_code]])]),o("div",null,[o("label",re,d(e.$t("Country")),1),n(o("input",{type:"text",id:"country","onUpdate:modelValue":t[8]||(t[8]=r=>l.productos.country=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Country"),required:""},null,8,le),[[u,l.productos.country]])]),o("div",null,[o("label",se,d(e.$t("Email")),1),n(o("input",{type:"email",id:"email","onUpdate:modelValue":t[9]||(t[9]=r=>l.productos.email=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("info@mycompany.com"),required:""},null,8,de),[[u,l.productos.email]])]),o("div",null,[o("label",ie,d(e.$t("Phone")),1),n(o("input",{type:"tel",id:"phone","onUpdate:modelValue":t[10]||(t[10]=r=>l.productos.phone=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Phone"),pattern:"^\\+\\d{1,3}\\s?\\d{1,14}$",required:""},null,8,ae),[[u,l.productos.phone]])]),o("div",null,[o("label",ne,d(e.$t("Town")),1),n(o("input",{type:"text",id:"town","onUpdate:modelValue":t[11]||(t[11]=r=>l.productos.town=r),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:e.$t("Town"),required:""},null,8,ue),[[u,l.productos.town]])])])])),o("div",ce,[o("div",null,[o("button",{class:"mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",text:"",onClick:t[12]||(t[12]=(...r)=>i.hideDialog&&i.hideDialog(...r))},d(e.$t("Close")),1),o("button",pe,d(l.productos.id?e.$t("Update"):e.$t("Save")),1)])])],32)]),_:1},8,["visible","header"]),s(f,{visible:l.deleteProductDialog,"onUpdate:visible":t[16]||(t[16]=r=>l.deleteProductDialog=r),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:a(()=>[s(c,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[15]||(t[15]=r=>l.deleteProductDialog=!1)},null,8,["label"]),s(c,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:i.deleteProduct},null,8,["label","onClick"])]),default:a(()=>[o("div",be,[me,l.products?(m(),g("span",ge,[v(d(e.$t("Are you sure you want to delete")),1),o("b",null,d(e.product.name),1),v("?")])):k("",!0)])]),_:1},8,["visible","header"]),s(f,{visible:l.deleteProductsDialog,"onUpdate:visible":t[18]||(t[18]=r=>l.deleteProductsDialog=r),style:{width:"450px"},header:e.$t("Confirm"),modal:!0},{footer:a(()=>[s(c,{label:e.$t("No"),icon:"pi pi-times",text:"",onClick:t[17]||(t[17]=r=>l.deleteProductsDialog=!1)},null,8,["label"]),s(c,{label:e.$t("Yes"),icon:"pi pi-check",text:"",onClick:i.deleteSelectedProducts},null,8,["label","onClick"])]),default:a(()=>[o("div",he,[fe,l.productos?(m(),g("span",ke,d(e.$t("Are you sure you want to delete the selected companies?")),1)):k("",!0)])]),_:1},8,["visible","header"])])}const De=E(S,[["render",ye]]);export{De as default};
