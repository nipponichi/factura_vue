<<<<<<<< HEAD:public/build/assets/ApiTokenManager-BZfF7Y8N.js
import{o as i,c as N,w as e,a as t,r as h,T as x,d as b,e as c,b as o,f as g,g as n,u as l,F as w,h as $,n as C,t as y}from"./app-sqzzpRVE.js";import{_ as L}from"./ActionMessage-BTUAFXeu.js";import{_ as z,a as U,b as T}from"./DialogModal-B1_xWeJi.js";import{_ as S}from"./Checkbox-C7n8FE6-.js";import{_ as W}from"./DangerButton-Bfgpm3yg.js";import{_ as E}from"./FormSection-5qvtzEYY.js";import{_ as H,a as Y}from"./TextInput-BW5NGcIF.js";import{_ as B}from"./InputLabel-CtHBHh-x.js";import{_ as I}from"./PrimaryButton-DgAyEQR4.js";import{_ as A}from"./SecondaryButton-DBw73pwN.js";import{S as q}from"./SectionBorder-CdQyVuzb.js";import"./SectionTitle-B8JQyhpJ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const G={class:"bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},J={class:"sm:flex sm:items-start"},K=t("div",{class:"mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"},[t("svg",{class:"h-6 w-6 text-red-600 dark:text-red-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"})])],-1),O={class:"mt-3 text-center sm:mt-0 sm:ms-4 sm:text-start"},Q={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},R={class:"mt-4 text-sm text-gray-600 dark:text-gray-400"},X={class:"flex flex-row justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 text-end"},Z={__name:"ConfirmationModal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(d,{emit:P}){const r=P,m=()=>{r("close")};return(u,v)=>(i(),N(z,{show:d.show,"max-width":d.maxWidth,closeable:d.closeable,onClose:m},{default:e(()=>[t("div",G,[t("div",J,[K,t("div",O,[t("h3",Q,[h(u.$slots,"title")]),t("div",R,[h(u.$slots,"content")])])])]),t("div",X,[h(u.$slots,"footer")])]),_:3},8,["show","max-width","closeable"]))}},ee={class:"col-span-6 sm:col-span-4"},se={key:0,class:"col-span-6"},te={class:"mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"},oe={class:"flex items-center"},ae={class:"ms-2 text-sm text-gray-600 dark:text-gray-400"},ne={key:0},le={class:"mt-10 sm:mt-0"},ie={class:"space-y-6"},re={class:"break-all dark:text-white"},ce={class:"flex items-center ms-2"},de={key:0,class:"text-sm text-gray-400"},me=["onClick"],ue=["onClick"],pe=t("div",null," Please copy your new API token. For your security, it won't be shown again. ",-1),fe={key:0,class:"mt-4 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all"},_e={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},ve={class:"flex items-center"},ke={class:"ms-2 text-sm text-gray-600 dark:text-gray-400"},Ie={__name:"ApiTokenManager",props:{tokens:Array,availablePermissions:Array,defaultPermissions:Array},setup(d){const r=x({name:"",permissions:d.defaultPermissions}),m=x({permissions:[]}),u=x({}),v=b(!1),f=b(null),_=b(null),F=()=>{r.post(route("api-tokens.store"),{preserveScroll:!0,onSuccess:()=>{v.value=!0,r.reset()}})},V=p=>{m.permissions=p.abilities,f.value=p},j=()=>{m.put(route("api-tokens.update",f.value),{preserveScroll:!0,preserveState:!0,onSuccess:()=>f.value=null})},D=p=>{_.value=p},M=()=>{u.delete(route("api-tokens.destroy",_.value),{preserveScroll:!0,preserveState:!0,onSuccess:()=>_.value=null})};return(p,a)=>(i(),c("div",null,[o(E,{onSubmitted:F},{title:e(()=>[n(" Create API Token ")]),description:e(()=>[n(" API tokens allow third-party services to authenticate with our application on your behalf. ")]),form:e(()=>[t("div",ee,[o(B,{for:"name",value:"Name"}),o(H,{id:"name",modelValue:l(r).name,"onUpdate:modelValue":a[0]||(a[0]=s=>l(r).name=s),type:"text",class:"mt-1 block w-full",autofocus:""},null,8,["modelValue"]),o(Y,{message:l(r).errors.name,class:"mt-2"},null,8,["message"])]),d.availablePermissions.length>0?(i(),c("div",se,[o(B,{for:"permissions",value:"Permissions"}),t("div",te,[(i(!0),c(w,null,$(d.availablePermissions,s=>(i(),c("div",{key:s},[t("label",oe,[o(S,{checked:l(r).permissions,"onUpdate:checked":a[1]||(a[1]=k=>l(r).permissions=k),value:s},null,8,["checked","value"]),t("span",ae,y(s),1)])]))),128))])])):g("",!0)]),actions:e(()=>[o(L,{on:l(r).recentlySuccessful,class:"me-3"},{default:e(()=>[n(" Created. ")]),_:1},8,["on"]),o(I,{class:C({"opacity-25":l(r).processing}),disabled:l(r).processing},{default:e(()=>[n(" Create ")]),_:1},8,["class","disabled"])]),_:1}),d.tokens.length>0?(i(),c("div",ne,[o(q),t("div",le,[o(U,null,{title:e(()=>[n(" Manage API Tokens ")]),description:e(()=>[n(" You may delete any of your existing tokens if they are no longer needed. ")]),content:e(()=>[t("div",ie,[(i(!0),c(w,null,$(d.tokens,s=>(i(),c("div",{key:s.id,class:"flex items-center justify-between"},[t("div",re,y(s.name),1),t("div",ce,[s.last_used_ago?(i(),c("div",de," Last used "+y(s.last_used_ago),1)):g("",!0),d.availablePermissions.length>0?(i(),c("button",{key:1,class:"cursor-pointer ms-6 text-sm text-gray-400 underline",onClick:k=>V(s)}," Permissions ",8,me)):g("",!0),t("button",{class:"cursor-pointer ms-6 text-sm text-red-500",onClick:k=>D(s)}," Delete ",8,ue)])]))),128))])]),_:1})])])):g("",!0),o(T,{show:v.value,onClose:a[3]||(a[3]=s=>v.value=!1)},{title:e(()=>[n(" API Token ")]),content:e(()=>[pe,p.$page.props.jetstream.flash.token?(i(),c("div",fe,y(p.$page.props.jetstream.flash.token),1)):g("",!0)]),footer:e(()=>[o(A,{onClick:a[2]||(a[2]=s=>v.value=!1)},{default:e(()=>[n(" Close ")]),_:1})]),_:1},8,["show"]),o(T,{show:f.value!=null,onClose:a[6]||(a[6]=s=>f.value=null)},{title:e(()=>[n(" API Token Permissions ")]),content:e(()=>[t("div",_e,[(i(!0),c(w,null,$(d.availablePermissions,s=>(i(),c("div",{key:s},[t("label",ve,[o(S,{checked:l(m).permissions,"onUpdate:checked":a[4]||(a[4]=k=>l(m).permissions=k),value:s},null,8,["checked","value"]),t("span",ke,y(s),1)])]))),128))])]),footer:e(()=>[o(A,{onClick:a[5]||(a[5]=s=>f.value=null)},{default:e(()=>[n(" Cancel ")]),_:1}),o(I,{class:C(["ms-3",{"opacity-25":l(m).processing}]),disabled:l(m).processing,onClick:j},{default:e(()=>[n(" Save ")]),_:1},8,["class","disabled"])]),_:1},8,["show"]),o(Z,{show:_.value!=null,onClose:a[8]||(a[8]=s=>_.value=null)},{title:e(()=>[n(" Delete API Token ")]),content:e(()=>[n(" Are you sure you would like to delete this API token? ")]),footer:e(()=>[o(A,{onClick:a[7]||(a[7]=s=>_.value=null)},{default:e(()=>[n(" Cancel ")]),_:1}),o(W,{class:C(["ms-3",{"opacity-25":l(u).processing}]),disabled:l(u).processing,onClick:M},{default:e(()=>[n(" Delete ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])]))}};export{Ie as default};
========
import{o as i,c as N,w as e,a as t,r as h,T as x,d as b,e as c,b as o,f as g,g as n,u as l,F as w,h as $,t as y,n as C}from"./app-BuDN-j3b.js";import{_ as L}from"./ActionMessage-CdcU_MlY.js";import{_ as z,a as U,b as T}from"./DialogModal-DK_Zd6Wm.js";import{_ as S}from"./Checkbox-CFqcKgZu.js";import{_ as W}from"./DangerButton-Cw4dDahB.js";import{_ as E}from"./FormSection-CTnTgO9s.js";import{_ as H,a as Y}from"./TextInput-1l6Nf7XC.js";import{_ as B}from"./InputLabel-B3iz06nk.js";import{_ as I}from"./PrimaryButton-DmHbGhoP.js";import{_ as A}from"./SecondaryButton-B9IP9Gfc.js";import{S as q}from"./SectionBorder-ChuqW-mF.js";import"./SectionTitle-CDwtq9XU.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const G={class:"bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"},J={class:"sm:flex sm:items-start"},K=t("div",{class:"mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"},[t("svg",{class:"h-6 w-6 text-red-600 dark:text-red-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"})])],-1),O={class:"mt-3 text-center sm:mt-0 sm:ms-4 sm:text-start"},Q={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},R={class:"mt-4 text-sm text-gray-600 dark:text-gray-400"},X={class:"flex flex-row justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 text-end"},Z={__name:"ConfirmationModal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(d,{emit:P}){const r=P,m=()=>{r("close")};return(u,v)=>(i(),N(z,{show:d.show,"max-width":d.maxWidth,closeable:d.closeable,onClose:m},{default:e(()=>[t("div",G,[t("div",J,[K,t("div",O,[t("h3",Q,[h(u.$slots,"title")]),t("div",R,[h(u.$slots,"content")])])])]),t("div",X,[h(u.$slots,"footer")])]),_:3},8,["show","max-width","closeable"]))}},ee={class:"col-span-6 sm:col-span-4"},se={key:0,class:"col-span-6"},te={class:"mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"},oe={class:"flex items-center"},ae={class:"ms-2 text-sm text-gray-600 dark:text-gray-400"},ne={key:0},le={class:"mt-10 sm:mt-0"},ie={class:"space-y-6"},re={class:"break-all dark:text-white"},ce={class:"flex items-center ms-2"},de={key:0,class:"text-sm text-gray-400"},me=["onClick"],ue=["onClick"],pe=t("div",null," Please copy your new API token. For your security, it won't be shown again. ",-1),fe={key:0,class:"mt-4 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all"},_e={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},ve={class:"flex items-center"},ke={class:"ms-2 text-sm text-gray-600 dark:text-gray-400"},Ie={__name:"ApiTokenManager",props:{tokens:Array,availablePermissions:Array,defaultPermissions:Array},setup(d){const r=x({name:"",permissions:d.defaultPermissions}),m=x({permissions:[]}),u=x({}),v=b(!1),f=b(null),_=b(null),F=()=>{r.post(route("api-tokens.store"),{preserveScroll:!0,onSuccess:()=>{v.value=!0,r.reset()}})},V=p=>{m.permissions=p.abilities,f.value=p},j=()=>{m.put(route("api-tokens.update",f.value),{preserveScroll:!0,preserveState:!0,onSuccess:()=>f.value=null})},D=p=>{_.value=p},M=()=>{u.delete(route("api-tokens.destroy",_.value),{preserveScroll:!0,preserveState:!0,onSuccess:()=>_.value=null})};return(p,a)=>(i(),c("div",null,[o(E,{onSubmitted:F},{title:e(()=>[n(" Create API Token ")]),description:e(()=>[n(" API tokens allow third-party services to authenticate with our application on your behalf. ")]),form:e(()=>[t("div",ee,[o(B,{for:"name",value:"Name"}),o(H,{id:"name",modelValue:l(r).name,"onUpdate:modelValue":a[0]||(a[0]=s=>l(r).name=s),type:"text",class:"mt-1 block w-full",autofocus:""},null,8,["modelValue"]),o(Y,{message:l(r).errors.name,class:"mt-2"},null,8,["message"])]),d.availablePermissions.length>0?(i(),c("div",se,[o(B,{for:"permissions",value:"Permissions"}),t("div",te,[(i(!0),c(w,null,$(d.availablePermissions,s=>(i(),c("div",{key:s},[t("label",oe,[o(S,{checked:l(r).permissions,"onUpdate:checked":a[1]||(a[1]=k=>l(r).permissions=k),value:s},null,8,["checked","value"]),t("span",ae,y(s),1)])]))),128))])])):g("",!0)]),actions:e(()=>[o(L,{on:l(r).recentlySuccessful,class:"me-3"},{default:e(()=>[n(" Created. ")]),_:1},8,["on"]),o(I,{class:C({"opacity-25":l(r).processing}),disabled:l(r).processing},{default:e(()=>[n(" Create ")]),_:1},8,["class","disabled"])]),_:1}),d.tokens.length>0?(i(),c("div",ne,[o(q),t("div",le,[o(U,null,{title:e(()=>[n(" Manage API Tokens ")]),description:e(()=>[n(" You may delete any of your existing tokens if they are no longer needed. ")]),content:e(()=>[t("div",ie,[(i(!0),c(w,null,$(d.tokens,s=>(i(),c("div",{key:s.id,class:"flex items-center justify-between"},[t("div",re,y(s.name),1),t("div",ce,[s.last_used_ago?(i(),c("div",de," Last used "+y(s.last_used_ago),1)):g("",!0),d.availablePermissions.length>0?(i(),c("button",{key:1,class:"cursor-pointer ms-6 text-sm text-gray-400 underline",onClick:k=>V(s)}," Permissions ",8,me)):g("",!0),t("button",{class:"cursor-pointer ms-6 text-sm text-red-500",onClick:k=>D(s)}," Delete ",8,ue)])]))),128))])]),_:1})])])):g("",!0),o(T,{show:v.value,onClose:a[3]||(a[3]=s=>v.value=!1)},{title:e(()=>[n(" API Token ")]),content:e(()=>[pe,p.$page.props.jetstream.flash.token?(i(),c("div",fe,y(p.$page.props.jetstream.flash.token),1)):g("",!0)]),footer:e(()=>[o(A,{onClick:a[2]||(a[2]=s=>v.value=!1)},{default:e(()=>[n(" Close ")]),_:1})]),_:1},8,["show"]),o(T,{show:f.value!=null,onClose:a[6]||(a[6]=s=>f.value=null)},{title:e(()=>[n(" API Token Permissions ")]),content:e(()=>[t("div",_e,[(i(!0),c(w,null,$(d.availablePermissions,s=>(i(),c("div",{key:s},[t("label",ve,[o(S,{checked:l(m).permissions,"onUpdate:checked":a[4]||(a[4]=k=>l(m).permissions=k),value:s},null,8,["checked","value"]),t("span",ke,y(s),1)])]))),128))])]),footer:e(()=>[o(A,{onClick:a[5]||(a[5]=s=>f.value=null)},{default:e(()=>[n(" Cancel ")]),_:1}),o(I,{class:C(["ms-3",{"opacity-25":l(m).processing}]),disabled:l(m).processing,onClick:j},{default:e(()=>[n(" Save ")]),_:1},8,["class","disabled"])]),_:1},8,["show"]),o(Z,{show:_.value!=null,onClose:a[8]||(a[8]=s=>_.value=null)},{title:e(()=>[n(" Delete API Token ")]),content:e(()=>[n(" Are you sure you would like to delete this API token? ")]),footer:e(()=>[o(A,{onClick:a[7]||(a[7]=s=>_.value=null)},{default:e(()=>[n(" Cancel ")]),_:1}),o(W,{class:C(["ms-3",{"opacity-25":l(u).processing}]),disabled:l(u).processing,onClick:M},{default:e(()=>[n(" Delete ")]),_:1},8,["class","disabled"])]),_:1},8,["show"])]))}};export{Ie as default};
>>>>>>>> javier_develop:public/build/assets/ApiTokenManager-DGVnmAca.js
