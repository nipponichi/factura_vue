import{_ as n}from"./AppLayout-BLtRcGiE.js";import{o as e,c as p,w as i,a as s,t as c,e as o,b as a,f as r,F as l}from"./app-BuDN-j3b.js";import d from"./LogoutOtherBrowserSessionsForm-Nq4Pip2B.js";import{S as _}from"./SectionBorder-ChuqW-mF.js";import f from"./UpdatePasswordForm-CNv7X55A.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ActionMessage-CdcU_MlY.js";import"./DialogModal-DK_Zd6Wm.js";import"./SectionTitle-CDwtq9XU.js";import"./TextInput-1l6Nf7XC.js";import"./PrimaryButton-DmHbGhoP.js";import"./SecondaryButton-B9IP9Gfc.js";import"./FormSection-CTnTgO9s.js";import"./InputLabel-B3iz06nk.js";const u={class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"},h={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},g={key:0},x={key:1},D={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(m){return(t,y)=>(e(),p(n,{title:"Profile"},{header:i(()=>[s("h2",u,c(t.$t("Profile")),1)]),default:i(()=>[s("div",null,[s("div",h,[t.$page.props.jetstream.canUpdatePassword?(e(),o("div",g,[a(f,{class:"mt-10 sm:mt-0"}),a(_)])):r("",!0),t.$page.props.jetstream.canManageTwoFactorAuthentication?(e(),o("div",x)):r("",!0),a(d,{sessions:m.sessions,class:"mt-10 sm:mt-0"},null,8,["sessions"]),t.$page.props.jetstream.hasAccountDeletionFeatures?(e(),o(l,{key:2},[],64)):r("",!0)])])]),_:1}))}};export{D as default};
