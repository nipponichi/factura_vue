import{T as b,o as d,e as u,b as a,u as s,w as m,F as k,Z as y,t as n,f as c,a as o,c as h,g as f,q as v,n as x,m as $}from"./app-D0CrsufA.js";import{A as V}from"./AuthenticationCard-BgB1Iqrm.js";import{_ as B}from"./AuthenticationCardLogo-DU0N6j5J.js";import{_ as q}from"./Checkbox-Dt_bWQqe.js";import{_ as p,a as g}from"./TextInput-DR4LkgBQ.js";import{_}from"./InputLabel-DtjnFBwW.js";import{_ as C}from"./PrimaryButton-BvuEWGTU.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const F={key:0,class:"mb-4 font-medium text-sm text-green-600 dark:text-green-400"},N={class:"mt-4"},L={class:"block mt-4"},P={class:"flex items-center"},R={class:"ms-2 text-sm text-gray-600 dark:text-gray-400"},S={class:"flex items-center justify-end mt-4"},Z={__name:"Login",props:{canResetPassword:Boolean,status:String},setup(i){const e=b({email:"",password:"",remember:!1}),w=()=>{e.transform(t=>({...t,remember:e.remember?"on":""})).post(route("login"),{onFinish:()=>e.reset("password")})};return(t,r)=>(d(),u(k,null,[a(s(y),{title:"Log in"}),a(V,null,{logo:m(()=>[a(B)]),default:m(()=>[i.status?(d(),u("div",F,n(i.status),1)):c("",!0),o("form",{onSubmit:$(w,["prevent"])},[o("div",null,[a(_,{for:"email",value:t.$t("Email")},null,8,["value"]),a(p,{id:"email",modelValue:s(e).email,"onUpdate:modelValue":r[0]||(r[0]=l=>s(e).email=l),type:"email",class:"mt-1 block w-full",required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),a(g,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),o("div",N,[a(_,{for:"password",value:t.$t("Password")},null,8,["value"]),a(p,{id:"password",modelValue:s(e).password,"onUpdate:modelValue":r[1]||(r[1]=l=>s(e).password=l),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"current-password"},null,8,["modelValue"]),a(g,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),o("div",L,[o("label",P,[a(q,{checked:s(e).remember,"onUpdate:checked":r[2]||(r[2]=l=>s(e).remember=l),name:"remember"},null,8,["checked"]),o("span",R,n(t.$t("Remember me")),1)])]),o("div",S,[i.canResetPassword?(d(),h(s(v),{key:0,href:t.route("password.request"),class:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"},{default:m(()=>[f(n(t.$t("Forgot your password?")),1)]),_:1},8,["href"])):c("",!0),a(C,{class:x(["ms-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:m(()=>[f(n(t.$t("Login")),1)]),_:1},8,["class","disabled"])])],32)]),_:1})],64))}};export{Z as default};
