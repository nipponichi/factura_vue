import{T as f,o as n,e as d,b as e,u as a,w as r,F as p,Z as _,a as t,t as l,f as g,n as w,g as y,m as b}from"./app-CM9nMGr0.js";import{A as x}from"./AuthenticationCard-GyQHl1sA.js";import{_ as $}from"./AuthenticationCardLogo-DuVbsTtI.js";import{_ as k,a as v}from"./TextInput-BXN18Izb.js";import{_ as V}from"./InputLabel-dYAM87qs.js";import{_ as h}from"./PrimaryButton-BzxW9JvQ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const F={class:"mb-4 text-sm text-gray-600 dark:text-gray-400"},C={key:0,class:"mb-4 font-medium text-sm text-green-600 dark:text-green-400"},N={class:"flex items-center justify-end mt-4"},q={__name:"ForgotPassword",props:{status:String},setup(m){const s=f({email:""}),u=()=>{s.post(route("password.email"))};return(o,i)=>(n(),d(p,null,[e(a(_),{title:"Forgot Password"}),e(x,null,{logo:r(()=>[e($)]),default:r(()=>[t("div",F,l(o.$t("Forgot your password? We will send a link to your email address for restore your password")),1),m.status?(n(),d("div",C,l(m.status),1)):g("",!0),t("form",{onSubmit:b(u,["prevent"])},[t("div",null,[e(V,{for:"email",value:o.$t("Email")},null,8,["value"]),e(k,{id:"email",modelValue:a(s).email,"onUpdate:modelValue":i[0]||(i[0]=c=>a(s).email=c),type:"email",class:"mt-1 block w-full",required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),e(v,{class:"mt-2",message:a(s).errors.email},null,8,["message"])]),t("div",N,[e(h,{class:w({"opacity-25":a(s).processing}),disabled:a(s).processing},{default:r(()=>[y(l(o.$t("Send")),1)]),_:1},8,["class","disabled"])])],32)]),_:1})],64))}};export{q as default};
