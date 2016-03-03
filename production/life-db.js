var LifeDB=function(){var e,n,i,t,r,o,f,s,a,u,d,c,p,y,g,h,N,m,v,S,l,b;this.initiate,this.insert,this.update,this.find,this.remove,t={dbNameNotSpecified:"Database name mast have to provide in time of initiating the database",pageNameCannotBeEmpty:"Page name required",pageDoesnotExists:"Provided page doesn't exists"},N=["@eq","@lt","@gt","@le","@ge"],m=function(e,n,i){return"undefined"==typeof e[n]?!1:e[n]==i},v=function(e,n,i){return"undefined"==typeof e[n]?!1:isNaN(e[n])?!1:e[n]>i},l=function(e,n,i){return"undefined"==typeof e[n]?!1:isNaN(e[n])?!1:e[n]>=i},S=function(e,n,i){return"undefined"==typeof e[n]?!1:isNaN(e[n])?!1:e[n]<i},b=function(e,n,i){return"undefined"==typeof e[n]?!1:isNaN(e[n])?!1:e[n]<=i},y=function(e){return a[e]},h=function(e,n){var i,t,r;for(t in N)if(-1!==n.indexOf(N[t])){i=N[t];break}switch(r=n.split(" "+i+" "),i){case"@eq":return m(e,r[0],r[1]);case"@gt":return v(e,r[0],r[1]);case"@lt":return S(e,r[0],r[1]);case"@ge":return l(e,r[0],r[1]);case"@le":return b(e,r[0],r[1])}},g=function(e,n){var i,t,r,o;i=n.split(" || "),o=[];for(r in e)for(t in i)if(h(e[r],i[t])){o.push(e[r]);break}return o},chopDataByLimit=function(e,n){var i,t;i=[];for(t in e)if(!(t<n[0])){if(t>n[1])break;i.push(e[t])}return i},p=function(e,n,i,t){var r,o,f;if(r=y(e),"undefined"!=typeof n&&""!==n.trim()){o=n.split(" && ");for(f in o)r=g(r,o[f])}return 0!==i[1]&&(r=chopDataByLimit(r,i)),r},c=function(e){return"undefined"!=typeof a[e]},d=function(){var n;!f&&o?"undefined"==typeof sessionStorage[e]||""!==sessionStorage[e].trim()&&(a=JSON.parse(sessionStorage[e])):f&&(n=require("fs"),n.statSync(e).isFile()&&(a=JSON.parse(n.readFileSync(e))))},n=function(e,n){var i;try{if("undefined"==typeof a&&(a={}),"undefined"==typeof a[e]&&(a[e]=[]),Array.isArray(n)){for(i in n)a[e].push(n[i]);return i}return a[e].push(n),1}catch(t){return 0}},u=function(){var n;!f&&o?sessionStorage[e]=JSON.stringify(a):f&&(n=require("fs"),n.writeFileSync(e,JSON.stringify(a)))},i=function(e){console.error(t[e])},s=function(){f=this!==window},r=function(){"undefined"!=typeof sessionStorage?(o=!0,sessionStorage[e]=""):o=!1},this.initiate=function(){return"undefined"==typeof arguments[0][0]?(i("dbNameNotSpecified"),!1):(e=arguments[0][0],r(),s(),void d())}(arguments),this.insert=function(e,i,t,r){var o;o=n(e,i),("undefined"==typeof r||r)&&u(),o?t(!1,o):t(!0,0)},this.find=function(e,n,t,r){return""===e.trim()?(i("pageNameCannotBeEmpty"),!1):c(e)?("undefined"==typeof t&&(t=[0,0]),"undefined"==typeof r&&(r=["",""]),p(e,n,t,r)):(i("pageDoesnotExists"),!1)}};