import{B as M,h as E,i as F,R as O,O as z,f as R,c as N,j as H}from"./column.esm-U4vAboxO.js";import{V as h,M as m,K as l,l as P,N as G,o as d,c as y,w as g,e as p,F as w,h as Z,a as C,k as U,P as S,n as K,f as v,t as W,a6 as j,H as T,U as D,L as x,Y as q,b as L,r as k,$ as A}from"./app-B1ErcoGi.js";var Y={submenu:function(e){var i=e.instance,s=e.processedItem;return{display:i.isItemActive(s)?"block":"none"}}},J={root:function(e){var i=e.instance,s=e.props;return["p-tieredmenu p-component",{"p-tieredmenu-overlay":s.popup,"p-ripple-disabled":i.$primevue.config.ripple===!1}]},start:"p-tieredmenu-start",menu:"p-tieredmenu-root-list",menuitem:function(e){var i=e.instance,s=e.processedItem;return["p-menuitem",{"p-menuitem-active p-highlight":i.isItemActive(s),"p-focus":i.isItemFocused(s),"p-disabled":i.isItemDisabled(s)}]},content:"p-menuitem-content",action:"p-menuitem-link",icon:"p-menuitem-icon",text:"p-menuitem-text",submenuIcon:"p-submenu-icon",submenu:"p-submenu-list",separator:"p-menuitem-separator",end:"p-tieredmenu-end"},Q=M.extend({name:"tieredmenu",classes:J,inlineStyles:Y}),X={name:"BaseTieredMenu",extends:E,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:"body"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Q,provide:function(){return{$parentInstance:this}}},V={name:"TieredMenuSub",hostName:"TieredMenu",extends:E,emits:["item-click","item-mouseenter","item-mousemove"],container:null,props:{menuId:{type:String,default:null},focusedItemId:{type:String,default:null},items:{type:Array,default:null},visible:{type:Boolean,default:!1},level:{type:Number,default:0},templates:{type:Object,default:null},activeItemPath:{type:Object,default:null},tabindex:{type:Number,default:0}},methods:{getItemId:function(e){return"".concat(this.menuId,"_").concat(e.key)},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,i,s){return e&&e.item?h.getItemValue(e.item[i],s):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getItemLabelId:function(e){return"".concat(this.menuId,"_").concat(e.key,"_label")},getPTOptions:function(e,i,s){return this.ptm(s,{context:{item:e,index:i,active:this.isItemActive(e),focused:this.isItemFocused(e),disabled:this.isItemDisabled(e)}})},isItemActive:function(e){return this.activeItemPath.some(function(i){return i.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return h.isNotEmpty(e.items)},onEnter:function(){m.nestedPosition(this.container,this.level)},onItemClick:function(e,i){this.getItemProp(i,"command",{originalEvent:e,item:i.item}),this.$emit("item-click",{originalEvent:e,processedItem:i,isFocus:!0})},onItemMouseEnter:function(e,i){this.$emit("item-mouseenter",{originalEvent:e,processedItem:i})},onItemMouseMove:function(e,i){this.$emit("item-mousemove",{originalEvent:e,processedItem:i})},getAriaSetSize:function(){var e=this;return this.items.filter(function(i){return e.isItemVisible(i)&&!e.getItemProp(i,"separator")}).length},getAriaPosInset:function(e){var i=this;return e-this.items.slice(0,e).filter(function(s){return i.isItemVisible(s)&&i.getItemProp(s,"separator")}).length+1},getMenuItemProps:function(e,i){return{action:l({class:this.cx("action"),tabindex:-1,"aria-hidden":!0},this.getPTOptions(e,i,"action")),icon:l({class:[this.cx("icon"),this.getItemProp(e,"icon")]},this.getPTOptions(e,i,"icon")),label:l({class:this.cx("label")},this.getPTOptions(e,i,"label")),submenuicon:l({class:this.cx("submenuIcon")},this.getPTOptions(e,i,"submenuIcon"))}},containerRef:function(e){this.container=e}},components:{AngleRightIcon:F},directives:{ripple:O}},_=["tabindex"],$=["id","aria-label","aria-disabled","aria-expanded","aria-haspopup","aria-level","aria-setsize","aria-posinset","data-p-highlight","data-p-focused","data-p-disabled"],ee=["onClick","onMouseenter","onMousemove"],te=["href","target"],ie=["id"],ne=["id"];function se(t,e,i,s,r,n){var u=P("AngleRightIcon"),I=P("TieredMenuSub",!0),o=G("ripple");return d(),y(T,l({name:"p-tieredmenu",onEnter:n.onEnter},t.ptm("menu.transition")),{default:g(function(){return[i.level===0||i.visible?(d(),p("ul",l({key:0,ref:n.containerRef,class:i.level===0?t.cx("menu"):t.cx("submenu"),tabindex:i.tabindex},i.level===0?t.ptm("menu"):t.ptm("submenu")),[(d(!0),p(w,null,Z(i.items,function(a,c){return d(),p(w,{key:n.getItemKey(a)},[n.isItemVisible(a)&&!n.getItemProp(a,"separator")?(d(),p("li",l({key:0,id:n.getItemId(a),style:n.getItemProp(a,"style"),class:[t.cx("menuitem",{processedItem:a}),n.getItemProp(a,"class")],role:"menuitem","aria-label":n.getItemLabel(a),"aria-disabled":n.isItemDisabled(a)||void 0,"aria-expanded":n.isItemGroup(a)?n.isItemActive(a):void 0,"aria-haspopup":n.isItemGroup(a)&&!n.getItemProp(a,"to")?"menu":void 0,"aria-level":i.level+1,"aria-setsize":n.getAriaSetSize(),"aria-posinset":n.getAriaPosInset(c)},n.getPTOptions(a,c,"menuitem"),{"data-p-highlight":n.isItemActive(a),"data-p-focused":n.isItemFocused(a),"data-p-disabled":n.isItemDisabled(a)}),[C("div",l({class:t.cx("content"),onClick:function(b){return n.onItemClick(b,a)},onMouseenter:function(b){return n.onItemMouseEnter(b,a)},onMousemove:function(b){return n.onItemMouseMove(b,a)}},n.getPTOptions(a,c,"content")),[i.templates.item?(d(),y(S(i.templates.item),{key:1,item:a.item,hasSubmenu:n.getItemProp(a,"items"),label:n.getItemLabel(a),props:n.getMenuItemProps(a,c)},null,8,["item","hasSubmenu","label","props"])):U((d(),p("a",l({key:0,href:n.getItemProp(a,"url"),class:t.cx("action"),target:n.getItemProp(a,"target"),tabindex:"-1","aria-hidden":"true"},n.getPTOptions(a,c,"action")),[i.templates.itemicon?(d(),y(S(i.templates.itemicon),{key:0,item:a.item,class:K(t.cx("icon"))},null,8,["item","class"])):n.getItemProp(a,"icon")?(d(),p("span",l({key:1,class:[t.cx("icon"),n.getItemProp(a,"icon")]},n.getPTOptions(a,c,"icon")),null,16)):v("",!0),C("span",l({id:n.getItemLabelId(a),class:t.cx("label")},n.getPTOptions(a,c,"label")),W(n.getItemLabel(a)),17,ie),n.getItemProp(a,"items")?(d(),p(w,{key:2},[i.templates.submenuicon?(d(),y(S(i.templates.submenuicon),l({key:0,class:t.cx("submenuIcon"),active:n.isItemActive(a)},n.getPTOptions(a,c,"submenuIcon")),null,16,["class","active"])):(d(),y(u,l({key:1,class:t.cx("submenuIcon")},n.getPTOptions(a,c,"submenuIcon")),null,16,["class"]))],64)):v("",!0)],16,te)),[[o]])],16,ee),n.isItemVisible(a)&&n.isItemGroup(a)?(d(),y(I,{key:0,id:n.getItemId(a)+"_list",style:j(t.sx("submenu",!0,{processedItem:a})),"aria-labelledby":n.getItemLabelId(a),role:"menu",menuId:i.menuId,focusedItemId:i.focusedItemId,items:a.items,templates:i.templates,activeItemPath:i.activeItemPath,level:i.level+1,visible:n.isItemActive(a)&&n.isItemGroup(a),pt:t.pt,unstyled:t.unstyled,onItemClick:e[0]||(e[0]=function(f){return t.$emit("item-click",f)}),onItemMouseenter:e[1]||(e[1]=function(f){return t.$emit("item-mouseenter",f)}),onItemMousemove:e[2]||(e[2]=function(f){return t.$emit("item-mousemove",f)})},null,8,["id","style","aria-labelledby","menuId","focusedItemId","items","templates","activeItemPath","level","visible","pt","unstyled"])):v("",!0)],16,$)):v("",!0),n.isItemVisible(a)&&n.getItemProp(a,"separator")?(d(),p("li",l({key:1,id:n.getItemId(a),style:n.getItemProp(a,"style"),class:[t.cx("separator"),n.getItemProp(a,"class")],role:"separator"},t.ptm("separator")),null,16,ne)):v("",!0)],64)}),128))],16,_)):v("",!0)]}),_:1},16,["onEnter"])}V.render=se;var B={name:"TieredMenu",extends:X,inheritAttrs:!1,emits:["focus","blur","before-show","before-hide","hide","show"],outsideClickListener:null,scrollHandler:null,resizeListener:null,target:null,container:null,menubar:null,searchTimeout:null,searchValue:null,data:function(){return{id:this.$attrs.id,focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:""},activeItemPath:[],visible:!this.popup,submenuVisible:!1,dirty:!1}},watch:{"$attrs.id":{immediate:!0,handler:function(e){this.id=e||D()}},activeItemPath:function(e){this.popup||(h.isNotEmpty(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener()))}},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.container&&this.autoZIndex&&x.clear(this.container),this.target=null,this.container=null},methods:{getItemProp:function(e,i){return e?h.getItemValue(e[i]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemGroup:function(e){return h.isNotEmpty(this.getItemProp(e,"items"))},isItemSeparator:function(e){return this.getItemProp(e,"separator")},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&h.isNotEmpty(e.items)},toggle:function(e){this.visible?this.hide(e,!0):this.show(e)},show:function(e,i){this.popup&&(this.$emit("before-show"),this.visible=!0,this.target=this.target||e.currentTarget,this.relatedTarget=e.relatedTarget||null),i&&m.focus(this.menubar)},hide:function(e,i){this.popup&&(this.$emit("before-hide"),this.visible=!1),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:""},i&&m.focus(this.relatedTarget||this.target||this.menubar),this.dirty=!1},onFocus:function(e){this.focused=!0,this.popup||(this.focusedItemInfo=this.focusedItemInfo.index!==-1?this.focusedItemInfo:{index:this.findFirstFocusedItemIndex(),level:0,parentKey:""}),this.$emit("focus",e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:""},this.searchValue="",this.dirty=!1,this.$emit("blur",e)},onKeyDown:function(e){if(this.disabled){e.preventDefault();return}var i=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Space":this.onSpaceKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!i&&h.isPrintableCharacter(e.key)&&this.searchItems(e,e.key);break}},onItemChange:function(e){var i=e.processedItem,s=e.isFocus;if(!h.isEmpty(i)){var r=i.index,n=i.key,u=i.level,I=i.parentKey,o=i.items,a=h.isNotEmpty(o),c=this.activeItemPath.filter(function(f){return f.parentKey!==I&&f.parentKey!==n});a&&(c.push(i),this.submenuVisible=!0),this.focusedItemInfo={index:r,level:u,parentKey:I},this.activeItemPath=c,a&&(this.dirty=!0),s&&m.focus(this.menubar)}},onOverlayClick:function(e){z.emit("overlay-click",{originalEvent:e,target:this.target})},onItemClick:function(e){var i=e.originalEvent,s=e.processedItem,r=this.isProccessedItemGroup(s),n=h.isEmpty(s.parent),u=this.isSelected(s);if(u){var I=s.index,o=s.key,a=s.level,c=s.parentKey;this.activeItemPath=this.activeItemPath.filter(function(b){return o!==b.key&&o.startsWith(b.key)}),this.focusedItemInfo={index:I,level:a,parentKey:c},this.dirty=!n,m.focus(this.menubar)}else if(r)this.onItemChange(e);else{var f=n?s:this.activeItemPath.find(function(b){return b.parentKey===""});this.hide(i),this.changeFocusedItemIndex(i,f?f.index:-1),m.focus(this.menubar)}},onItemMouseEnter:function(e){this.dirty&&this.onItemChange(e)},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},onArrowDownKey:function(e){var i=this.focusedItemInfo.index!==-1?this.findNextItemIndex(this.focusedItemInfo.index):this.findFirstFocusedItemIndex();this.changeFocusedItemIndex(e,i),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey){if(this.focusedItemInfo.index!==-1){var i=this.visibleItems[this.focusedItemInfo.index],s=this.isProccessedItemGroup(i);!s&&this.onItemChange({originalEvent:e,processedItem:i})}this.popup&&this.hide(e,!0),e.preventDefault()}else{var r=this.focusedItemInfo.index!==-1?this.findPrevItemIndex(this.focusedItemInfo.index):this.findLastFocusedItemIndex();this.changeFocusedItemIndex(e,r),e.preventDefault()}},onArrowLeftKey:function(e){var i=this,s=this.visibleItems[this.focusedItemInfo.index],r=this.activeItemPath.find(function(u){return u.key===s.parentKey}),n=h.isEmpty(s.parent);n||(this.focusedItemInfo={index:-1,parentKey:r?r.parentKey:""},this.searchValue="",this.onArrowDownKey(e)),this.activeItemPath=this.activeItemPath.filter(function(u){return u.parentKey!==i.focusedItemInfo.parentKey}),e.preventDefault()},onArrowRightKey:function(e){var i=this.visibleItems[this.focusedItemInfo.index],s=this.isProccessedItemGroup(i);s&&(this.onItemChange({originalEvent:e,processedItem:i}),this.focusedItemInfo={index:-1,parentKey:i.key},this.searchValue="",this.onArrowDownKey(e)),e.preventDefault()},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var i=m.findSingle(this.menubar,'li[id="'.concat("".concat(this.focusedItemId),'"]')),s=i&&m.findSingle(i,'[data-pc-section="action"]');if(s?s.click():i&&i.click(),!this.popup){var r=this.visibleItems[this.focusedItemInfo.index],n=this.isProccessedItemGroup(r);!n&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){if(this.focusedItemInfo.level!==0){var i=this.focusedItemInfo;this.hide(e,!1),!this.popup&&(this.focusedItemInfo={index:Number(i.parentKey.split("_")[0]),level:0,parentKey:""})}e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var i=this.visibleItems[this.focusedItemInfo.index],s=this.isProccessedItemGroup(i);!s&&this.onItemChange({originalEvent:e,processedItem:i})}this.hide()},onEnter:function(e){this.autoZIndex&&x.set("menu",e,this.baseZIndex+this.$primevue.config.zIndex.menu),m.addStyles(e,{position:"absolute",top:"0",left:"0"}),this.alignOverlay(),m.focus(this.menubar),this.scrollInView()},onAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit("show")},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit("hide"),this.container=null,this.dirty=!1},onAfterLeave:function(e){this.autoZIndex&&x.clear(e)},alignOverlay:function(){m.absolutePosition(this.container,this.target);var e=m.getOuterWidth(this.target);e>m.getOuterWidth(this.container)&&(this.container.style.minWidth=m.getOuterWidth(this.target)+"px")},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(i){var s=e.container&&!e.container.contains(i.target),r=e.popup?!(e.target&&(e.target===i.target||e.target.contains(i.target))):!0;s&&r&&e.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new q(this.target,function(i){e.hide(i,!0)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(i){m.isTouchDevice()||e.hide(i,!0)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isItemMatched:function(e){var i;return this.isValidItem(e)&&((i=this.getProccessedItemLabel(e))===null||i===void 0?void 0:i.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()))},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(i){return i.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(i){return e.isValidItem(i)})},findLastItemIndex:function(){var e=this;return h.findLastIndex(this.visibleItems,function(i){return e.isValidItem(i)})},findNextItemIndex:function(e){var i=this,s=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(r){return i.isValidItem(r)}):-1;return s>-1?s+e+1:e},findPrevItemIndex:function(e){var i=this,s=e>0?h.findLastIndex(this.visibleItems.slice(0,e),function(r){return i.isValidItem(r)}):-1;return s>-1?s:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(i){return e.isValidSelectedItem(i)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,i){var s=this;this.searchValue=(this.searchValue||"")+i;var r=-1,n=!1;return this.focusedItemInfo.index!==-1?(r=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(u){return s.isItemMatched(u)}),r=r===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(u){return s.isItemMatched(u)}):r+this.focusedItemInfo.index):r=this.visibleItems.findIndex(function(u){return s.isItemMatched(u)}),r!==-1&&(n=!0),r===-1&&this.focusedItemInfo.index===-1&&(r=this.findFirstFocusedItemIndex()),r!==-1&&this.changeFocusedItemIndex(e,r),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){s.searchValue="",s.searchTimeout=null},500),n},changeFocusedItemIndex:function(e,i){this.focusedItemInfo.index!==i&&(this.focusedItemInfo.index=i,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,i=e!==-1?"".concat(this.id,"_").concat(e):this.focusedItemId,s=m.findSingle(this.menubar,'li[id="'.concat(i,'"]'));s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest",inline:"start"})},createProcessedItems:function(e){var i=this,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",u=[];return e&&e.forEach(function(I,o){var a=(n!==""?n+"_":"")+o,c={item:I,index:o,level:s,key:a,parent:r,parentKey:n};c.items=i.createProcessedItems(I.items,s+1,c,a),u.push(c)}),u},containerRef:function(e){this.container=e},menubarRef:function(e){this.menubar=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,i=this.activeItemPath.find(function(s){return s.key===e.focusedItemInfo.parentKey});return i?i.items:this.processedItems},focusedItemId:function(){return this.focusedItemInfo.index!==-1?"".concat(this.id).concat(h.isNotEmpty(this.focusedItemInfo.parentKey)?"_"+this.focusedItemInfo.parentKey:"","_").concat(this.focusedItemInfo.index):null}},components:{TieredMenuSub:V,Portal:R}},ae=["id"];function re(t,e,i,s,r,n){var u=P("TieredMenuSub"),I=P("Portal");return d(),y(I,{appendTo:t.appendTo,disabled:!t.popup},{default:g(function(){return[L(T,l({name:"p-connected-overlay",onEnter:n.onEnter,onAfterEnter:n.onAfterEnter,onLeave:n.onLeave,onAfterLeave:n.onAfterLeave},t.ptm("transition")),{default:g(function(){return[r.visible?(d(),p("div",l({key:0,ref:n.containerRef,id:r.id,class:t.cx("root"),onClick:e[0]||(e[0]=function(){return n.onOverlayClick&&n.onOverlayClick.apply(n,arguments)})},t.ptmi("root")),[t.$slots.start?(d(),p("div",l({key:0,class:t.cx("start")},t.ptm("start")),[k(t.$slots,"start")],16)):v("",!0),L(u,{ref:n.menubarRef,id:r.id+"_list",tabindex:t.disabled?-1:t.tabindex,role:"menubar","aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,"aria-disabled":t.disabled||void 0,"aria-orientation":"vertical","aria-activedescendant":r.focused?n.focusedItemId:void 0,menuId:r.id,focusedItemId:r.focused?n.focusedItemId:void 0,items:n.processedItems,templates:t.$slots,activeItemPath:r.activeItemPath,level:0,visible:r.submenuVisible,pt:t.pt,unstyled:t.unstyled,onFocus:n.onFocus,onBlur:n.onBlur,onKeydown:n.onKeyDown,onItemClick:n.onItemClick,onItemMouseenter:n.onItemMouseEnter,onItemMousemove:n.onItemMouseMove},null,8,["id","tabindex","aria-label","aria-labelledby","aria-disabled","aria-activedescendant","menuId","focusedItemId","items","templates","activeItemPath","visible","pt","unstyled","onFocus","onBlur","onKeydown","onItemClick","onItemMouseenter","onItemMousemove"]),t.$slots.end?(d(),p("div",l({key:1,class:t.cx("end")},t.ptm("end")),[k(t.$slots,"end")],16)):v("",!0)],16,ae)):v("",!0)]}),_:3},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo","disabled"])}B.render=re;var ue={root:function(e){var i=e.props;return["p-splitbutton p-component",{"p-button-raised":i.raised,"p-button-rounded":i.rounded,"p-button-text":i.text,"p-button-outlined":i.outlined,"p-button-sm":i.size==="small","p-button-lg":i.size==="large"}]},button:"p-splitbutton-defaultbutton",menuButton:"p-splitbutton-menubutton"},oe=M.extend({name:"splitbutton",classes:ue}),le={name:"BaseSplitButton",extends:E,props:{label:{type:String,default:null},icon:{type:String,default:null},model:{type:Array,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},disabled:{type:Boolean,default:!1},class:{type:null,default:null},style:{type:null,default:null},buttonProps:{type:null,default:null},menuButtonProps:{type:null,default:null},menuButtonIcon:{type:String,default:void 0},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},plain:{type:Boolean,default:!1}},style:oe,provide:function(){return{$parentInstance:this}}},de={name:"SplitButton",extends:le,inheritAttrs:!1,emits:["click"],data:function(){return{id:this.$attrs.id,isExpanded:!1}},watch:{"$attrs.id":{immediate:!0,handler:function(e){this.id=e||D()}}},mounted:function(){var e=this;this.$watch("$refs.menu.visible",function(i){e.isExpanded=i})},methods:{onDropdownButtonClick:function(e){e&&e.preventDefault(),this.$refs.menu.toggle({currentTarget:this.$el,relatedTarget:this.$refs.button.$el}),this.isExpanded=this.$refs.menu.visible},onDropdownKeydown:function(e){(e.code==="ArrowDown"||e.code==="ArrowUp")&&(this.onDropdownButtonClick(),e.preventDefault())},onDefaultButtonClick:function(e){this.isExpanded&&this.$refs.menu.hide(e),this.$emit("click",e)}},computed:{containerClass:function(){return[this.cx("root"),this.class]}},components:{PVSButton:N,PVSMenu:B,ChevronDownIcon:H}},ce=["data-p-severity"];function me(t,e,i,s,r,n){var u=P("PVSButton"),I=P("PVSMenu");return d(),p("div",l({class:n.containerClass,style:t.style},t.ptmi("root"),{"data-p-severity":t.severity}),[L(u,l({type:"button",class:t.cx("button"),label:t.label,disabled:t.disabled,severity:t.severity,text:t.text,outlined:t.outlined,size:t.size,"aria-label":t.label,onClick:n.onDefaultButtonClick},t.buttonProps,{pt:t.ptm("button"),unstyled:t.unstyled}),A({default:g(function(){return[k(t.$slots,"default")]}),_:2},[t.$slots.icon?{name:"icon",fn:g(function(o){return[k(t.$slots,"icon",{class:K(o.class)},function(){return[C("span",l({class:[t.icon,o.class]},t.ptm("button").icon,{"data-pc-section":"buttonicon"}),null,16)]})]}),key:"0"}:void 0]),1040,["class","label","disabled","severity","text","outlined","size","aria-label","onClick","pt","unstyled"]),L(u,l({ref:"button",type:"button",class:t.cx("menuButton"),disabled:t.disabled,"aria-haspopup":"true","aria-expanded":r.isExpanded,"aria-controls":r.id+"_overlay",onClick:n.onDropdownButtonClick,onKeydown:n.onDropdownKeydown,severity:t.severity,text:t.text,outlined:t.outlined,size:t.size},t.menuButtonProps,{pt:t.ptm("menuButton"),unstyled:t.unstyled}),{icon:g(function(o){return[k(t.$slots,"menubuttonicon",{class:K(o.class)},function(){return[(d(),y(S(t.menuButtonIcon?"span":"ChevronDownIcon"),l({class:[t.menuButtonIcon,o.class]},t.ptm("menuButton").icon,{"data-pc-section":"menubuttonicon"}),null,16,["class"]))]})]}),_:3},16,["class","disabled","aria-expanded","aria-controls","onClick","onKeydown","severity","text","outlined","size","pt","unstyled"]),L(I,{ref:"menu",id:r.id+"_overlay",model:t.model,popup:!0,autoZIndex:t.autoZIndex,baseZIndex:t.baseZIndex,appendTo:t.appendTo,unstyled:t.unstyled,pt:t.ptm("menu")},A({_:2},[t.$slots.menuitemicon?{name:"itemicon",fn:g(function(o){return[k(t.$slots,"menuitemicon",{item:o.item,class:K(o.class)})]}),key:"0"}:void 0,t.$slots.item?{name:"item",fn:g(function(o){return[k(t.$slots,"item",{item:o.item,hasSubmenu:o.hasSubmenu,label:o.label,props:o.props})]}),key:"1"}:void 0]),1032,["id","model","autoZIndex","baseZIndex","appendTo","unstyled","pt"])],16,ce)}de.render=me;export{de as s};
