import{T as y,o as p,e as _,b as t,u as s,w as n,F as w,Z as h,a as o,k as c,q as f,g as d,f as v,p as x,n as k,m as V}from"./app-B0dAp7Ut.js";import{A as b}from"./AuthenticationCard-DfriLNHt.js";import{_ as U}from"./AuthenticationCardLogo-BdlHPGyk.js";import{_ as q}from"./Checkbox-Cz9X0yWt.js";import{_ as u,a as l}from"./TextInput-BvKfZOzf.js";import{_ as i}from"./InputLabel-A1uDerw5.js";import{_ as C}from"./PrimaryButton-CE3XNGUj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const $={class:"mt-4"},P={class:"mt-4"},F={class:"mt-4"},N={class:"mt-4"},A=o("label",{for:"company_type",class:"block font-medium text-gray-700"},"Define your business",-1),R={class:"mt-2 flex justify-center"},T={class:"inline-flex items-center"},j=o("span",{class:"ml-2"},"Freelance",-1),B={class:"inline-flex items-center ml-6"},D=o("span",{class:"ml-2"},"Company",-1),E={class:"inline-flex items-center ml-6"},M=o("span",{class:"ml-2"},"Consulting",-1),S={key:0,class:"mt-4"},z={class:"flex items-center"},I={class:"ms-2"},Z=["href"],G=["href"],H={class:"flex items-center justify-end mt-4"},se={__name:"Register",setup(J){const e=y({name:"",email:"",password:"",password_confirmation:"",company_type:null,terms:!1}),g=()=>{e.post(route("register"),{onFinish:()=>e.reset("password","password_confirmation")})};return(m,a)=>(p(),_(w,null,[t(s(h),{title:"Register"}),t(b,null,{logo:n(()=>[t(U)]),default:n(()=>[o("form",{onSubmit:V(g,["prevent"])},[o("div",null,[t(i,{for:"name",value:"Name"}),t(u,{id:"name",modelValue:s(e).name,"onUpdate:modelValue":a[0]||(a[0]=r=>s(e).name=r),type:"text",class:"mt-1 block w-full",required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),t(l,{class:"mt-2",message:s(e).errors.name},null,8,["message"])]),o("div",$,[t(i,{for:"email",value:"Email"}),t(u,{id:"email",modelValue:s(e).email,"onUpdate:modelValue":a[1]||(a[1]=r=>s(e).email=r),type:"email",class:"mt-1 block w-full",required:"",autocomplete:"username"},null,8,["modelValue"]),t(l,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),o("div",P,[t(i,{for:"password",value:"Password"}),t(u,{id:"password",modelValue:s(e).password,"onUpdate:modelValue":a[2]||(a[2]=r=>s(e).password=r),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"new-password"},null,8,["modelValue"]),t(l,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),o("div",F,[t(i,{for:"password_confirmation",value:"Confirm Password"}),t(u,{id:"password_confirmation",modelValue:s(e).password_confirmation,"onUpdate:modelValue":a[3]||(a[3]=r=>s(e).password_confirmation=r),type:"password",class:"mt-1 block w-full",required:"",autocomplete:"new-password"},null,8,["modelValue"]),t(l,{class:"mt-2",message:s(e).errors.password_confirmation},null,8,["message"])]),o("div",N,[A,o("div",R,[o("label",T,[c(o("input",{type:"radio",id:"sole_proprietorship","onUpdate:modelValue":a[4]||(a[4]=r=>s(e).company_type=r),value:"freelancer",class:"form-radio text-indigo-600",required:""},null,512),[[f,s(e).company_type]]),j]),o("label",B,[c(o("input",{type:"radio",id:"partnership","onUpdate:modelValue":a[5]||(a[5]=r=>s(e).company_type=r),value:"company",class:"form-radio text-indigo-600"},null,512),[[f,s(e).company_type]]),D]),o("label",E,[c(o("input",{type:"radio",id:"corporation","onUpdate:modelValue":a[6]||(a[6]=r=>s(e).company_type=r),value:"consulting",class:"form-radio text-indigo-600"},null,512),[[f,s(e).company_type]]),M])]),t(l,{class:"mt-2",message:s(e).errors.company_type},null,8,["message"])]),m.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature?(p(),_("div",S,[t(i,{for:"terms"},{default:n(()=>[o("div",z,[t(q,{id:"terms",checked:s(e).terms,"onUpdate:checked":a[7]||(a[7]=r=>s(e).terms=r),name:"terms",required:""},null,8,["checked"]),o("div",I,[d(" I agree to the "),o("a",{target:"_blank",href:m.route("terms.show"),class:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"},"Terms of Service",8,Z),d(" and "),o("a",{target:"_blank",href:m.route("policy.show"),class:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"},"Privacy Policy",8,G)])]),t(l,{class:"mt-2",message:s(e).errors.terms},null,8,["message"])]),_:1})])):v("",!0),o("div",H,[t(s(x),{href:m.route("login"),class:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"},{default:n(()=>[d(" Already registered? ")]),_:1},8,["href"]),t(C,{class:k(["ms-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:n(()=>[d(" Register ")]),_:1},8,["class","disabled"])])],32)]),_:1})],64))}};export{se as default};
