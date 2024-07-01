import{o as t,e as r,a as s,a2 as N,d as C,a3 as F,n as m,f as a,t as l,m as x,Q as D,a4 as I,s as M,r as f,a5 as j,u as y,l as T,z as B,b as d,w as o,J as E,c as k,q as S,Z as O,g as i,F as _,h as z,a6 as A}from"./app-Dz46uSI6.js";import{_ as R}from"./_plugin-vue_export-helper-DlAUqK2U.js";const V={},U={viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Q=s("path",{d:"M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z",fill:"#6875F5"},null,-1),q=s("path",{d:"M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z",fill:"#6875F5"},null,-1),H=[Q,q];function J(g,u){return t(),r("svg",U,H)}const Z=R(V,[["render",J]]),G={class:"max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8"},K={class:"flex items-center justify-between flex-wrap"},W={class:"w-0 flex-1 flex items-center min-w-0"},X={key:0,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Y=s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),ee=[Y],se={key:1,class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},te=s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"},null,-1),re=[te],oe={class:"ms-3 font-medium text-sm text-white truncate"},ae={class:"shrink-0 sm:ms-3"},ne=s("svg",{class:"h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1),ie=[ne],de={__name:"Banner",setup(g){const u=N(),n=C(!0),p=C("success"),e=C("");return F(async()=>{var b,c;p.value=((b=u.props.jetstream.flash)==null?void 0:b.bannerStyle)||"success",e.value=((c=u.props.jetstream.flash)==null?void 0:c.banner)||"",n.value=!0}),(b,c)=>(t(),r("div",null,[n.value&&e.value?(t(),r("div",{key:0,class:m({"bg-indigo-500":p.value=="success","bg-red-700":p.value=="danger"})},[s("div",G,[s("div",K,[s("div",W,[s("span",{class:m(["flex p-2 rounded-lg",{"bg-indigo-600":p.value=="success","bg-red-600":p.value=="danger"}])},[p.value=="success"?(t(),r("svg",X,ee)):a("",!0),p.value=="danger"?(t(),r("svg",se,re)):a("",!0)],2),s("p",oe,l(e.value),1)]),s("div",ae,[s("button",{type:"button",class:m(["-me-1 flex p-2 rounded-md focus:outline-none sm:-me-2 transition",{"hover:bg-indigo-600 focus:bg-indigo-600":p.value=="success","hover:bg-red-600 focus:bg-red-600":p.value=="danger"}]),"aria-label":"Dismiss",onClick:c[0]||(c[0]=x(v=>n.value=!1,["prevent"]))},ie,2)])])])],2)):a("",!0)]))}},le={class:"relative"},P={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:Array,default:()=>["py-1","bg-white dark:bg-gray-700"]}},setup(g){const u=g;let n=C(!1);const p=c=>{n.value&&c.key==="Escape"&&(n.value=!1)};D(()=>document.addEventListener("keydown",p)),I(()=>document.removeEventListener("keydown",p));const e=M(()=>({48:"w-48"})[u.width.toString()]),b=M(()=>u.align==="left"?"ltr:origin-top-left rtl:origin-top-right start-0":u.align==="right"?"ltr:origin-top-right rtl:origin-top-left end-0":"origin-top");return(c,v)=>(t(),r("div",le,[s("div",{onClick:v[0]||(v[0]=L=>j(n)?n.value=!y(n):n=!y(n))},[f(c.$slots,"trigger")]),T(s("div",{class:"fixed inset-0 z-40",onClick:v[1]||(v[1]=L=>j(n)?n.value=!1:n=!1)},null,512),[[B,y(n)]]),d(E,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"transform opacity-0 scale-95","enter-to-class":"transform opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"transform opacity-100 scale-100","leave-to-class":"transform opacity-0 scale-95"},{default:o(()=>[T(s("div",{class:m(["absolute z-50 mt-2 rounded-md shadow-lg",[e.value,b.value]]),style:{display:"none"},onClick:v[2]||(v[2]=L=>j(n)?n.value=!1:n=!1)},[s("div",{class:m(["rounded-md ring-1 ring-black ring-opacity-5",g.contentClasses])},[f(c.$slots,"content")],2)],2),[[B,y(n)]])]),_:3})]))}},ue={key:0,type:"submit",class:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"},ce=["href"],w={__name:"DropdownLink",props:{href:String,as:String},setup(g){return(u,n)=>(t(),r("div",null,[g.as=="button"?(t(),r("button",ue,[f(u.$slots,"default")])):g.as=="a"?(t(),r("a",{key:1,href:g.href,class:"block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"},[f(u.$slots,"default")],8,ce)):(t(),k(y(S),{key:2,href:g.href,class:"block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"},{default:o(()=>[f(u.$slots,"default")]),_:3},8,["href"]))]))}},$={__name:"NavLink",props:{href:String,active:Boolean},setup(g){const u=g,n=M(()=>u.active?"inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out");return(p,e)=>(t(),k(y(S),{href:g.href,class:m(n.value)},{default:o(()=>[f(p.$slots,"default")]),_:3},8,["href","class"]))}},h={__name:"ResponsiveNavLink",props:{active:Boolean,href:String,as:String},setup(g){const u=g,n=M(()=>u.active?"block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 dark:border-indigo-600 text-start text-base font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 focus:outline-none focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300 transition duration-150 ease-in-out":"block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out");return(p,e)=>(t(),r("div",null,[g.as=="button"?(t(),r("button",{key:0,class:m([n.value,"w-full text-start"])},[f(p.$slots,"default")],2)):(t(),k(y(S),{key:1,href:g.href,class:m(n.value)},{default:o(()=>[f(p.$slots,"default")]),_:3},8,["href","class"]))]))}},pe={class:"min-h-screen bg-gray-100 dark:bg-gray-900"},ge={class:"bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"},he={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},me={class:"flex justify-between h-16"},fe={class:"flex"},ve={class:"shrink-0 flex items-center"},ye={key:0,class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},be={key:1,class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},ke={key:2,class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},_e={key:3,class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},we={key:4,class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},$e={key:5,class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},xe={class:"hidden sm:flex sm:items-center sm:ms-6"},Ce={class:"ms-3 relative"},Me={class:"inline-flex rounded-md"},Se={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"},je=s("svg",{class:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"})],-1),Le={class:"w-60"},Te=s("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),Be=s("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),ze=s("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),Ae=["onSubmit"],Pe={class:"flex items-center"},Ne={key:0,class:"me-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},Fe=s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),De=[Fe],Ie={class:"ms-3 relative"},Ee={key:0,class:"flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"},Oe=["src","alt"],Re={key:1,class:"inline-flex rounded-md"},Ve={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"},Ue=s("svg",{class:"ms-2 -me-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19.5 8.25l-7.5 7.5-7.5-7.5"})],-1),Qe={class:"block px-4 py-2 text-xs text-gray-400"},qe=s("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),He={class:"-me-2 flex items-center sm:hidden"},Je={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},Ze={key:0,class:"pt-2 pb-3 space-y-1"},Ge={key:1,class:"pt-2 pb-3 space-y-1"},Ke={key:2,class:"pt-2 pb-3 space-y-1"},We={key:3,class:"pt-2 pb-3 space-y-1"},Xe={key:4,class:"pt-2 pb-3 space-y-1"},Ye={key:5,class:"pt-2 pb-3 space-y-1"},es={key:6,class:"pt-2 pb-3 space-y-1"},ss={key:7,class:"pt-2 pb-3 space-y-1"},ts={class:"pt-4 pb-1 border-t border-gray-200 dark:border-gray-600"},rs={class:"flex items-center px-4"},os={key:0,class:"shrink-0 me-3"},as=["src","alt"],ns={class:"font-medium text-base text-gray-800 dark:text-gray-200"},is={class:"font-medium text-sm text-gray-500"},ds={class:"mt-3 space-y-1"},ls=s("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),us=s("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Team ",-1),cs=s("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1),ps=s("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Switch Teams ",-1),gs=["onSubmit"],hs={class:"flex items-center"},ms={key:0,class:"me-2 h-5 w-5 text-green-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},fs=s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),vs=[fs],ys={key:0,class:"bg-white dark:bg-gray-800 shadow"},bs={class:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},ks={class:"bg-white rounded-lg shadow m-4 dark:bg-gray-800 no-imprimir"},_s={class:"w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"},ws={class:"text-sm text-gray-500 sm:text-center dark:text-gray-400"},$s=s("a",{href:"https://flowbite.com/",class:"hover:underline"},"Ingeoriol S.L.",-1),Ms={__name:"AppLayout",props:{title:String},setup(g){const u=C(!1),n=e=>{A.put(route("current-team.update"),{team_id:e.id},{preserveState:!1})},p=()=>{A.post(route("logout"))};return(e,b)=>(t(),r(_,null,[s("div",null,[d(y(O),{title:g.title},null,8,["title"]),d(de),s("div",pe,[s("nav",ge,[s("div",he,[s("div",me,[s("div",fe,[s("div",ve,[d(y(S),{href:e.route("dashboard")},{default:o(()=>[d(Z,{class:"block h-9 w-auto"})]),_:1},8,["href"])]),e.$page.props.user.permissions.includes("view company")?(t(),r("div",ye,[d($,{href:e.route("documents.index"),active:e.route().current("documents.*")},{default:o(()=>[i(l(e.$t("Invoice")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("view company")?(t(),r("div",be,[d($,{href:e.route("companies.index"),active:e.route().current("companies.*")},{default:o(()=>[i(l(e.$t("My Company")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("view consulting")?(t(),r("div",ke,[d($,{href:e.route("companies.index")},{default:o(()=>[i(l(e.$t("Consulting")),1)]),_:1},8,["href"])])):a("",!0),e.$page.props.user.permissions.includes("read roles")?(t(),r("div",_e,[d($,{href:e.route("admin-users.index"),active:e.route().current("admin-users.*")},{default:o(()=>[i(l(e.$t("Users")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("read roles")?(t(),r("div",we,[d($,{href:e.route("admin-companies.index"),active:e.route().current("admin-companies.*")},{default:o(()=>[i(l(e.$t("Companies")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("read roles")?(t(),r("div",$e,[d($,{href:e.route("admin-invoices.index"),active:e.route().current("admin-invoices.*")},{default:o(()=>[i(l(e.$t("Invoices")),1)]),_:1},8,["href","active"])])):a("",!0)]),s("div",xe,[s("div",Ce,[e.$page.props.jetstream.hasTeamFeatures?(t(),k(P,{key:0,align:"right",width:"60"},{trigger:o(()=>[s("span",Me,[s("button",Se,[i(l(e.$page.props.auth.user.current_team.name)+" ",1),je])])]),content:o(()=>[s("div",Le,[Te,d(w,{href:e.route("teams.show",e.$page.props.auth.user.current_team)},{default:o(()=>[i(" Team Settings ")]),_:1},8,["href"]),e.$page.props.jetstream.canCreateTeams?(t(),k(w,{key:0,href:e.route("teams.create")},{default:o(()=>[i(" Create New Team ")]),_:1},8,["href"])):a("",!0),e.$page.props.auth.user.all_teams.length>1?(t(),r(_,{key:1},[Be,ze,(t(!0),r(_,null,z(e.$page.props.auth.user.all_teams,c=>(t(),r("form",{key:c.id,onSubmit:x(v=>n(c),["prevent"])},[d(w,{as:"button"},{default:o(()=>[s("div",Pe,[c.id==e.$page.props.auth.user.current_team_id?(t(),r("svg",Ne,De)):a("",!0),s("div",null,l(c.name),1)])]),_:2},1024)],40,Ae))),128))],64)):a("",!0)])]),_:1})):a("",!0)]),s("div",Ie,[d(P,{align:"right",width:"48"},{trigger:o(()=>[e.$page.props.jetstream.managesProfilePhotos?(t(),r("button",Ee,[s("img",{class:"h-8 w-8 rounded-full object-cover",src:e.$page.props.auth.user.profile_photo_url,alt:e.$page.props.auth.user.name},null,8,Oe)])):(t(),r("span",Re,[s("button",Ve,[i(l(e.$page.props.auth.user.name)+" ",1),Ue])]))]),content:o(()=>[s("div",Qe,l(e.$t("Manage Account")),1),d(w,{href:e.route("profile.show")},{default:o(()=>[i(l(e.$t("Profile")),1)]),_:1},8,["href"]),e.$page.props.jetstream.hasApiFeatures?(t(),k(w,{key:0,href:e.route("api-tokens.index")},{default:o(()=>[i(" API Tokens ")]),_:1},8,["href"])):a("",!0),qe,s("form",{onSubmit:x(p,["prevent"])},[d(w,{as:"button"},{default:o(()=>[i(l(e.$t("Log Out")),1)]),_:1})],32)]),_:1})])]),s("div",He,[s("button",{class:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out",onClick:b[0]||(b[0]=c=>u.value=!u.value)},[(t(),r("svg",Je,[s("path",{class:m({hidden:u.value,"inline-flex":!u.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),s("path",{class:m({hidden:!u.value,"inline-flex":u.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),s("div",{class:m([{block:u.value,hidden:!u.value},"sm:hidden"])},[e.$page.props.user.permissions.includes("view company")?(t(),r("div",Ze,[d(h,{href:e.route("dashboard"),active:e.route().current("dashboard")},{default:o(()=>[i(l(e.$t("Dashboard")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("view company")?(t(),r("div",Ge,[d(h,{href:e.route("documents.index"),active:e.route().current("documents.*")},{default:o(()=>[i(l(e.$t("Invoices")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("view company")?(t(),r("div",Ke,[d(h,{href:e.route("companies.index"),active:e.route().current("companies.*")},{default:o(()=>[i(l(e.$t("My Company")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("view consulting")?(t(),r("div",We,[d(h,{href:e.route("products.index"),active:e.route().current("products.*")},{default:o(()=>[i(l(e.$t("My Consulting")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("read roles")?(t(),r("div",Xe,[d(h,{href:e.route("admin-users.index"),active:e.route().current("admin-user.*")},{default:o(()=>[i(l(e.$t("Users")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("read roles")?(t(),r("div",Ye,[d(h,{href:e.route("admin-companies.index"),active:e.route().current("admin-companies.*")},{default:o(()=>[i(l(e.$t("Companies")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("read roles")?(t(),r("div",es,[d(h,{href:e.route("admin-invoices.index"),active:e.route().current("admin-invoice.*")},{default:o(()=>[i(l(e.$t("Invoices")),1)]),_:1},8,["href","active"])])):a("",!0),e.$page.props.user.permissions.includes("read roles")?(t(),r("div",ss,[d(h,{href:e.route("admin-products.index"),active:e.route().current("admin-products.*")},{default:o(()=>[i(l(e.$t("Products")),1)]),_:1},8,["href","active"])])):a("",!0),s("div",ts,[s("div",rs,[e.$page.props.jetstream.managesProfilePhotos?(t(),r("div",os,[s("img",{class:"h-10 w-10 rounded-full object-cover",src:e.$page.props.auth.user.profile_photo_url,alt:e.$page.props.auth.user.name},null,8,as)])):a("",!0),s("div",null,[s("div",ns,l(e.$page.props.auth.user.name),1),s("div",is,l(e.$page.props.auth.user.email),1)])]),s("div",ds,[d(h,{href:e.route("profile.show"),active:e.route().current("profile.show")},{default:o(()=>[i(l(e.$t("Profile")),1)]),_:1},8,["href","active"]),e.$page.props.jetstream.hasApiFeatures?(t(),k(h,{key:0,href:e.route("api-tokens.index"),active:e.route().current("api-tokens.index")},{default:o(()=>[i(" API Tokens ")]),_:1},8,["href","active"])):a("",!0),s("form",{method:"POST",onSubmit:x(p,["prevent"])},[d(h,{as:"button"},{default:o(()=>[i(l(e.$t("Log Out")),1)]),_:1})],32),e.$page.props.jetstream.hasTeamFeatures?(t(),r(_,{key:1},[ls,us,d(h,{href:e.route("teams.show",e.$page.props.auth.user.current_team),active:e.route().current("teams.show")},{default:o(()=>[i(" Team Settings ")]),_:1},8,["href","active"]),e.$page.props.jetstream.canCreateTeams?(t(),k(h,{key:0,href:e.route("teams.create"),active:e.route().current("teams.create")},{default:o(()=>[i(" Create New Team ")]),_:1},8,["href","active"])):a("",!0),e.$page.props.auth.user.all_teams.length>1?(t(),r(_,{key:1},[cs,ps,(t(!0),r(_,null,z(e.$page.props.auth.user.all_teams,c=>(t(),r("form",{key:c.id,onSubmit:x(v=>n(c),["prevent"])},[d(h,{as:"button"},{default:o(()=>[s("div",hs,[c.id==e.$page.props.auth.user.current_team_id?(t(),r("svg",ms,vs)):a("",!0),s("div",null,l(c.name),1)])]),_:2},1024)],40,gs))),128))],64)):a("",!0)],64)):a("",!0)])])],2)]),e.$slots.header?(t(),r("header",ys,[s("div",bs,[f(e.$slots,"header")])])):a("",!0),s("main",null,[f(e.$slots,"default")])])]),s("footer",ks,[s("div",_s,[s("span",ws,[i("©"),$s,i(". "+l(e.$t("All Rights Reserved"))+". ",1)])])])],64))}};export{Ms as _};
