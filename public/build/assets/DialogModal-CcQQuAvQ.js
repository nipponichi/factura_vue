import{S as _}from"./SectionTitle-BvREZyG9.js";import{o as u,e as g,b as m,w as c,r as l,a as e,d as h,M as b,L as k,a2 as $,s as B,l as p,a4 as w,H as v,n as S,f as C,c as E}from"./app-CM9nMGr0.js";const M={class:"md:grid md:grid-cols-3 md:gap-6"},W={class:"mt-5 md:mt-0 md:col-span-2"},z={class:"px-4 py-5 sm:p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg"},q={__name:"ActionSection",setup(t){return(a,s)=>(u(),g("div",M,[m(_,null,{title:c(()=>[l(a.$slots,"title")]),description:c(()=>[l(a.$slots,"description")]),_:3}),e("div",W,[e("div",z,[l(a.$slots,"content")])])]))}},L={class:"fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50","scroll-region":""},N=e("div",{class:"absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"},null,-1),T=[N],V={__name:"Modal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(t,{emit:a}){const s=t,r=a,o=h(),i=h(s.show);b(()=>s.show,()=>{var n;s.show?(document.body.style.overflow="hidden",i.value=!0,(n=o.value)==null||n.showModal()):(document.body.style.overflow=null,setTimeout(()=>{var d;(d=o.value)==null||d.close(),i.value=!1},200))});const y=()=>{s.closeable&&r("close")},f=n=>{n.key==="Escape"&&s.show&&y()};k(()=>document.addEventListener("keydown",f)),$(()=>{document.removeEventListener("keydown",f),document.body.style.overflow=null});const x=B(()=>({sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"})[s.maxWidth]);return(n,d)=>(u(),g("dialog",{class:"z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent",ref_key:"dialog",ref:o},[e("div",L,[m(v,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:c(()=>[p(e("div",{class:"fixed inset-0 transform transition-all",onClick:y},T,512),[[w,t.show]])]),_:1}),m(v,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:c(()=>[p(e("div",{class:S(["mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto",x.value])},[i.value?l(n.$slots,"default",{key:0}):C("",!0)],2),[[w,t.show]])]),_:3})])],512))}},D={class:"px-6 py-4"},j={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},A={class:"mt-4 text-sm text-gray-600 dark:text-gray-400"},H={class:"flex flex-row justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 text-end"},F={__name:"DialogModal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(t,{emit:a}){const s=a,r=()=>{s("close")};return(o,i)=>(u(),E(V,{show:t.show,"max-width":t.maxWidth,closeable:t.closeable,onClose:r},{default:c(()=>[e("div",D,[e("div",j,[l(o.$slots,"title")]),e("div",A,[l(o.$slots,"content")])]),e("div",H,[l(o.$slots,"footer")])]),_:3},8,["show","max-width","closeable"]))}};export{V as _,q as a,F as b};
