const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../locales.js'),'utf8'),context);
const data=context.window.GANESHA_LOCALES;
const required=['pt-BR','en','es','fr','de','ja','hi','id','ar','ko','zh-CN'];
const keys=Object.keys(data['pt-BR']).sort();
for(const locale of required){
 const d=data[locale];
 if(!d || JSON.stringify(Object.keys(d).sort())!==JSON.stringify(keys)) throw Error(`${locale}: key coverage mismatch`);
 for(const key of keys){
  const v=d[key];
  if(Array.isArray(v)){
   if(v.length!==data['pt-BR'][key].length || v.some(x=>typeof x!=='string'||!x.trim()))throw Error(`${locale}.${key}: invalid array`);
  }else if(typeof v!=='string'||!v.trim())throw Error(`${locale}.${key}: empty string`);
 }
 console.log(`${locale}: ${keys.length} keys present; 7 stage titles/descriptions/types; review pending`);
}
