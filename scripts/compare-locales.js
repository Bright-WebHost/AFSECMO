const fs = require('fs');
const path = require('path');
const enDir = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'en');
const frDir = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'fr');
function readJson(p){return JSON.parse(fs.readFileSync(p,'utf8'))}
function flatten(obj,prefix=''){
  let res={};
  if(typeof obj==='string' || typeof obj==='number' || typeof obj==='boolean' || obj===null){res[prefix]=obj;return res}
  if(Array.isArray(obj)){obj.forEach((v,i)=>{Object.assign(res,flatten(v,prefix?prefix+"."+i:String(i)))});return res}
  for(const k of Object.keys(obj||{})){const key=prefix?prefix+"."+k:k;Object.assign(res,flatten(obj[k],key))}
  return res
}
function compareFiles(file){
  const enPath=path.join(enDir,file);
  const frPath=path.join(frDir,file);
  if(!fs.existsSync(frPath)){
    console.log(`MISSING FR FILE: ${file}`);
    return
  }
  const en=readJson(enPath);
  const fr=readJson(frPath);
  const enFlat=flatten(en);
  const frFlat=flatten(fr);
  const missingInFr=[];
  const missingInEn=[];
  const identical=[];
  for(const k of Object.keys(enFlat)){
    if(!(k in frFlat)) missingInFr.push(k);
    else{
      const ev=enFlat[k];
      const fv=frFlat[k];
      if(typeof ev==='string' && typeof fv==='string' && ev.trim()===fv.trim()) identical.push(k);
    }
  }
  for(const k of Object.keys(frFlat)){
    if(!(k in enFlat)) missingInEn.push(k);
  }
  console.log('\n== '+file+' ==');
  if(missingInFr.length)console.log('Missing in fr ('+missingInFr.length+'):\n',missingInFr.join('\n'));
  else console.log('No keys missing in fr');
  if(missingInEn.length)console.log('\nExtra in fr ('+missingInEn.length+'):\n',missingInEn.join('\n'));
  if(identical.length)console.log('\nPossibly untranslated (identical) ('+identical.length+'):\n',identical.join('\n'));
  else console.log('\nNo identical strings');
}
const enFiles=fs.readdirSync(enDir).filter(f=>f.endsWith('.json'));
for(const f of enFiles)compareFiles(f);
console.log('\nDone');
