import{k as n,l as u,v as l,o as i,e as k}from"./app-sqzzpRVE.js";const p=["value"],m={__name:"Checkbox",props:{checked:{type:[Array,Boolean],default:!1},value:{type:String,default:null}},emits:["update:checked"],setup(e,{emit:r}){const c=r,s=e,t=n({get(){return s.checked},set(o){c("update:checked",o)}});return(o,a)=>u((i(),k("input",{"onUpdate:modelValue":a[0]||(a[0]=d=>t.value=d),type:"checkbox",value:e.value,class:"rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"},null,8,p)),[[l,t.value]])}};export{m as _};
