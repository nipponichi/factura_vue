import{_ as p}from"./AppLayout-C5WGXR6B.js";import c from"./AccessToLogRegistry-Bo9CNOV6.js";import l from"./LogoutOtherBrowserSessionsForm-OtdpShCC.js";import{S as i}from"./SectionBorder-C_xmiotk.js";import d from"./UpdatePasswordForm-DlwVLgmR.js";import{o,c as _,w as m,a as s,t as f,e as a,b as t,f as r,F as u}from"./app-tfnQKRrZ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Modal-ILo4AEka.js";import"./SectionTitle-BSXbbr03.js";import"./SecondaryButton-dJ5Kv2aC.js";import"./PrimaryButton-OLbMcEcz.js";import"./TableLog-CKN7sMJY.js";import"./column.esm-MDmOvNN_.js";import"./ActionMessage-CNurtHyT.js";import"./DialogModal-BY0nt7Uk.js";import"./TextInput-CkEnXtS6.js";import"./FormSection-CyKAsaR3.js";import"./InputLabel-D32ssqPy.js";const h={class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"},g={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},w={key:0},x={key:1},q={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(n){return(e,y)=>(o(),_(p,{title:"Profile"},{header:m(()=>[s("h2",h,f(e.$t("Profile")),1)]),default:m(()=>[s("div",null,[s("div",g,[e.$page.props.jetstream.canUpdatePassword?(o(),a("div",w,[t(d,{class:"mt-10 sm:mt-0"}),t(i)])):r("",!0),e.$page.props.jetstream.canManageTwoFactorAuthentication?(o(),a("div",x)):r("",!0),t(l,{sessions:n.sessions,class:"mt-10 sm:mt-0"},null,8,["sessions"]),t(i),t(c,{class:"w-full mt-10 sm:mt-0"}),e.$page.props.jetstream.hasAccountDeletionFeatures?(o(),a(u,{key:2},[],64)):r("",!0)])])]),_:1}))}};export{q as default};
