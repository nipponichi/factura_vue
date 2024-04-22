import{o as s,e as a,a as t,W as N,d as C,X as D,n as p,f as h,t as k,i as $,R as F,Y as E,k as M,r as f,$ as S,u as v,l as L,a0 as B,b as n,w as r,z as O,c as b,j,Z as I,g as i,F as w,h as P,a1 as z}from"./app-sqzzpRVE.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";const R={},H={viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Q=t("path",{d:"M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z",fill:"#6875F5"},null,-1),U=t("path",{d:"M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z",fill:"#6875F5"},null,-1),W=[Q,U];function X(c,d){return s(),a("svg",H,W)}const Y=V(R,[["render",X]]),Z={class:"max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8"},q={class:"flex items-center justify-between flex-wrap"},G={class:"w-0 flex-1 flex items-center min-w-0"},J={key:0,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},K=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),ee=[K],te={key:1,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},se=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"},null,-1),re=[se],oe={class:"ms-3 font-medium text-sm text-white truncate"},ae={class:"shrink-0 sm:ms-3"},ne=t("svg",{class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1),ie=[ne],de={__name:"Banner",setup(c){const d=N(),o=C(!0),u=C("success"),e=C("");return D(async()=>{var y,l;u.value=((y=d.props.jetstream.flash)==null?void 0:y.bannerStyle)||"success",e.value=((l=d.props.jetstream.flash)==null?void 0:l.banner)||"",o.value=!0}),(y,l)=>(s(),a("div",null,[o.value&&e.value?(s(),a("div",{key:0,class:p({"bg-indigo-500":u.value=="success","bg-red-700":u.value=="danger"})},[t("div",Z,[t("div",q,[t("div",G,[t("span",{class:p(["flex p-2 rounded-lg",{"bg-indigo-600":u.value=="success","bg-red-600":u.value=="danger"}])},[u.value=="success"?(s(),a("svg",J,ee)):h("",!0),u.value=="danger"?(s(),a("svg",te,re)):h("",!0)],2),t("p",oe,k(e.value),1)]),t("div",ae,[t("button",{type:"button",class:p(["-me-1 flex p-2 rounded-md focus:outline-none sm:-me-2 transition",{"hover:bg-indigo-600 focus:bg-indigo-600":u.value=="success","hover:bg-red-600 focus:bg-red-600":u.value=="danger"}]),"aria-label":"Dismiss",onClick:l[0]||(l[0]=$(m=>o.value=!1,["prevent"]))},ie,2)])])])],2)):h("",!0)]))}},le={class:"relative"},A={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:Array,default:()=>["py-1","bg-white dark:bg-gray-700"]}},setup(c){const d=c;let o=C(!1);const u=l=>{o.value&&l.key==="Escape"&&(o.value=!1)};F(()=>document.addEventListener("keydown",u)),E(()=>document.removeEventListener("keydown",u));const e=M(()=>({48:"w-48"})[d.width.toString()]),y=M(()=>d.align==="left"?"ltr:origin-top-left rtl:origin-top-right start-0":d.align==="right"?"ltr:origin-top-right rtl:origin-top-left end-0":"origin-top");return(l,m)=>(s(),a("div",le,[t("div",{onClick:m[0]||(m[0]=T=>S(o)?o.value=!v(o):o=!v(o))},[f(l.$slots,"trigger")]),L(t("div",{class:"fixed inset-0 z-40",onClick:m[1]||(m[1]=T=>S(o)?o.value=!1:o=!1)},null,512),[[B,v(o)]]),n(O,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"transform opacity-0 scale-95","enter-to-class":"transform opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"transform opacity-100 scale-100","leave-to-class":"transform opacity-0 scale-95"},{default:r(()=>[L(t("div",{class:p(["absolute z-50 mt-2 rounded-md shadow-lg",[e.value,y.value]]),style:{display:"none"},onClick:m[2]||(m[2]=T=>S(o)?o.value=!1:o=!1)},[t("div",{class:p(["rounded-md ring-1 ring-black ring-opacity-5",c.contentClasses])},[f(l.$slots,"content")],2)],2),[[B,v(o)]])]),_:3})]))}},ue={key:0,type:"submit",class:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"},ce=["href"],_={__name:"DropdownLink",props:{href:String,as:String},setup(c){return(d,o)=>(s(),a("div",null,[c.as=="button"?(s(),a("button",ue,[f(d.$slots,"default")])):c.as=="a"?(s(),a("a",{key:1,href:c.href,class:"block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"},[f(d.$slots,"default")],8,ce)):(s(),b(v(j),{key:2,href:c.href,class:"block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"},{default:r(()=>[f(d.$slots,"default")]),_:3},8,["href"]))]))}},x={__name:"NavLink",props:{href:String,active:Boolean},setup(c){const d=c,o=M(()=>d.active?"inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out");return(u,e)=>(s(),b(v(j),{href:c.href,class:p(o.value)},{default:r(()=>[f(u.$slots,"default")]),_:3},8,["href","class"]))}},g={__name:"ResponsiveNavLink",props:{active:Boolean,href:String,as:String},setup(c){const d=c,o=M(()=>d.active?"block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 dark:border-indigo-600 text-start text-base font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 focus:outline-none focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300 transition duration-150 ease-in-out":"block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out");return(u,e)=>(s(),a("div",null,[c.as=="button"?(s(),a("button",{key:0,class:p([o.value,"w-full text-start"])},[f(u.$slots,"default")],2)):(s(),b(v(j),{key:1,href:c.href,class:p(o.value)},{default:r(()=>[f(u.$slots,"default")]),_:3},8,["href","class"]))]))}},he={class:"min-h-screen bg-gray-100 dark:bg-gray-900"},ge={class:"bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"},pe={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},fe={class:"flex justify-between h-16"},me={class:"flex"},ve={class:"shrink-0 flex items-center"},ye={class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},be={class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},_e={class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},ke={class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},xe={class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},we={key:0,class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},$e={class:"hidden sm:flex sm:items-center sm:ms-6"},Ce={class:"ms-3 relative"},Me={class:"inline-flex rounded-md"},je={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"},Se=t("svg",{class:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"})],-1),Te={class:"w-60"},Le=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),Be=t("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),Pe=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),ze=["onSubmit"],Ae={class:"flex items-center"},Ne={key:0,class:"me-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},De=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),Fe=[De],Ee={class:"ms-3 relative"},Oe={key:0,class:"flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"},Ie=["src","alt"],Ve={key:1,class:"inline-flex rounded-md"},Re={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"},He=t("svg",{class:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 8.25l-7.5 7.5-7.5-7.5"})],-1),Qe=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Account ",-1),Ue=t("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),We={class:"-me-2 flex items-center sm:hidden"},Xe={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},Ye={class:"pt-2 pb-3 space-y-1"},Ze={class:"pt-2 pb-3 space-y-1"},qe={class:"pt-2 pb-3 space-y-1"},Ge={class:"pt-2 pb-3 space-y-1"},Je={class:"pt-2 pb-3 space-y-1"},Ke={key:0,class:"pt-2 pb-3 space-y-1"},et={class:"pt-4 pb-1 border-t border-gray-200 dark:border-gray-600"},tt={class:"flex items-center px-4"},st={key:0,class:"shrink-0 me-3"},rt=["src","alt"],ot={class:"font-medium text-base text-gray-800 dark:text-gray-200"},at={class:"font-medium text-sm text-gray-500"},nt={class:"mt-3 space-y-1"},it=t("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),dt=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),lt=t("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),ut=t("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),ct=["onSubmit"],ht={class:"flex items-center"},gt={key:0,class:"me-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},pt=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),ft=[pt],mt={key:0,class:"bg-white dark:bg-gray-800 shadow"},vt={class:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},_t={__name:"AppLayout",props:{title:String},setup(c){const d=C(!1),o=e=>{z.put(route("current-team.update"),{team_id:e.id},{preserveState:!1})},u=()=>{z.post(route("logout"))};return(e,y)=>(s(),a("div",null,[n(v(I),{title:c.title},null,8,["title"]),n(de),t("div",he,[t("nav",ge,[t("div",pe,[t("div",fe,[t("div",me,[t("div",ve,[n(v(j),{href:e.route("dashboard")},{default:r(()=>[n(Y,{class:"block h-9 w-auto"})]),_:1},8,["href"])]),t("div",ye,[n(x,{href:e.route("dashboard"),active:e.route().current("dashboard")},{default:r(()=>[i(" Dashboard ")]),_:1},8,["href","active"])]),t("div",be,[n(x,{href:e.route("invoices.index"),active:e.route().current("invoices.*")},{default:r(()=>[i(" Invoices ")]),_:1},8,["href","active"])]),t("div",_e,[n(x,{href:e.route("customers.index"),active:e.route().current("customers.*")},{default:r(()=>[i(" My Customers ")]),_:1},8,["href","active"])]),t("div",ke,[n(x,{href:e.route("companies.index"),active:e.route().current("companies.*")},{default:r(()=>[i(" My Company ")]),_:1},8,["href","active"])]),t("div",xe,[n(x,{href:e.route("products.index"),active:e.route().current("products.*")},{default:r(()=>[i(" Products ")]),_:1},8,["href","active"])]),e.$page.props.user.permissions.includes("read roles")?(s(),a("div",we,[n(x,{href:e.route("dashboard"),active:e.route().current("dashboard")},{default:r(()=>[i(" Admin ")]),_:1},8,["href","active"])])):h("",!0)]),t("div",$e,[t("div",Ce,[e.$page.props.jetstream.hasTeamFeatures?(s(),b(A,{key:0,align:"right",width:"60"},{trigger:r(()=>[t("span",Me,[t("button",je,[i(k(e.$page.props.auth.user.current_team.name)+" ",1),Se])])]),content:r(()=>[t("div",Te,[Le,n(_,{href:e.route("teams.show",e.$page.props.auth.user.current_team)},{default:r(()=>[i(" Team Settings ")]),_:1},8,["href"]),e.$page.props.jetstream.canCreateTeams?(s(),b(_,{key:0,href:e.route("teams.create")},{default:r(()=>[i(" Create New Team ")]),_:1},8,["href"])):h("",!0),e.$page.props.auth.user.all_teams.length>1?(s(),a(w,{key:1},[Be,Pe,(s(!0),a(w,null,P(e.$page.props.auth.user.all_teams,l=>(s(),a("form",{key:l.id,onSubmit:$(m=>o(l),["prevent"])},[n(_,{as:"button"},{default:r(()=>[t("div",Ae,[l.id==e.$page.props.auth.user.current_team_id?(s(),a("svg",Ne,Fe)):h("",!0),t("div",null,k(l.name),1)])]),_:2},1024)],40,ze))),128))],64)):h("",!0)])]),_:1})):h("",!0)]),t("div",Ee,[n(A,{align:"right",width:"48"},{trigger:r(()=>[e.$page.props.jetstream.managesProfilePhotos?(s(),a("button",Oe,[t("img",{class:"h-8 w-8 rounded-full object-cover",src:e.$page.props.auth.user.profile_photo_url,alt:e.$page.props.auth.user.name},null,8,Ie)])):(s(),a("span",Ve,[t("button",Re,[i(k(e.$page.props.auth.user.name)+" ",1),He])]))]),content:r(()=>[Qe,n(_,{href:e.route("profile.show")},{default:r(()=>[i(" Profile ")]),_:1},8,["href"]),n(_,{href:e.route("profile.show")},{default:r(()=>[i(" Pricing ")]),_:1},8,["href"]),e.$page.props.jetstream.hasApiFeatures?(s(),b(_,{key:0,href:e.route("api-tokens.index")},{default:r(()=>[i(" API Tokens ")]),_:1},8,["href"])):h("",!0),Ue,t("form",{onSubmit:$(u,["prevent"])},[n(_,{as:"button"},{default:r(()=>[i(" Log Out ")]),_:1})],32)]),_:1})])]),t("div",We,[t("button",{class:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out",onClick:y[0]||(y[0]=l=>d.value=!d.value)},[(s(),a("svg",Xe,[t("path",{class:p({hidden:d.value,"inline-flex":!d.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),t("path",{class:p({hidden:!d.value,"inline-flex":d.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),t("div",{class:p([{block:d.value,hidden:!d.value},"sm:hidden"])},[t("div",Ye,[n(g,{href:e.route("dashboard"),active:e.route().current("dashboard")},{default:r(()=>[i(" Dashboard ")]),_:1},8,["href","active"])]),t("div",Ze,[n(g,{href:e.route("invoices.index"),active:e.route().current("invoices.*")},{default:r(()=>[i(" Invoices ")]),_:1},8,["href","active"])]),t("div",qe,[n(g,{href:e.route("customers.index"),active:e.route().current("customers.*")},{default:r(()=>[i(" My Customer ")]),_:1},8,["href","active"])]),t("div",Ge,[n(g,{href:e.route("companies.index"),active:e.route().current("companies.*")},{default:r(()=>[i(" My Company ")]),_:1},8,["href","active"])]),t("div",Je,[n(g,{href:e.route("products.index"),active:e.route().current("products.*")},{default:r(()=>[i(" Products ")]),_:1},8,["href","active"])]),e.$page.props.user.permissions.includes("read roles")?(s(),a("div",Ke,[n(g,{href:e.route("dashboard"),active:e.route().current("dashboard")},{default:r(()=>[i(" Admin ")]),_:1},8,["href","active"])])):h("",!0),t("div",et,[t("div",tt,[e.$page.props.jetstream.managesProfilePhotos?(s(),a("div",st,[t("img",{class:"h-10 w-10 rounded-full object-cover",src:e.$page.props.auth.user.profile_photo_url,alt:e.$page.props.auth.user.name},null,8,rt)])):h("",!0),t("div",null,[t("div",ot,k(e.$page.props.auth.user.name),1),t("div",at,k(e.$page.props.auth.user.email),1)])]),t("div",nt,[n(g,{href:e.route("profile.show"),active:e.route().current("profile.show")},{default:r(()=>[i(" Profile ")]),_:1},8,["href","active"]),e.$page.props.jetstream.hasApiFeatures?(s(),b(g,{key:0,href:e.route("api-tokens.index"),active:e.route().current("api-tokens.index")},{default:r(()=>[i(" API Tokens ")]),_:1},8,["href","active"])):h("",!0),t("form",{method:"POST",onSubmit:$(u,["prevent"])},[n(g,{as:"button"},{default:r(()=>[i(" Log Out ")]),_:1})],32),e.$page.props.jetstream.hasTeamFeatures?(s(),a(w,{key:1},[it,dt,n(g,{href:e.route("teams.show",e.$page.props.auth.user.current_team),active:e.route().current("teams.show")},{default:r(()=>[i(" Team Settings ")]),_:1},8,["href","active"]),e.$page.props.jetstream.canCreateTeams?(s(),b(g,{key:0,href:e.route("teams.create"),active:e.route().current("teams.create")},{default:r(()=>[i(" Create New Team ")]),_:1},8,["href","active"])):h("",!0),e.$page.props.auth.user.all_teams.length>1?(s(),a(w,{key:1},[lt,ut,(s(!0),a(w,null,P(e.$page.props.auth.user.all_teams,l=>(s(),a("form",{key:l.id,onSubmit:$(m=>o(l),["prevent"])},[n(g,{as:"button"},{default:r(()=>[t("div",ht,[l.id==e.$page.props.auth.user.current_team_id?(s(),a("svg",gt,ft)):h("",!0),t("div",null,k(l.name),1)])]),_:2},1024)],40,ct))),128))],64)):h("",!0)],64)):h("",!0)])])],2)]),e.$slots.header?(s(),a("header",mt,[t("div",vt,[f(e.$slots,"header")])])):h("",!0),t("main",null,[f(e.$slots,"default")])])]))}};export{_t as _};
