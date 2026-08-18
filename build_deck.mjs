import fs from 'node:fs/promises';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const OUT = process.cwd();
const W=1280,H=720, dark='#073B3A', teal='#08736D', mint='#DDF4EC', sand='#FFF8ED', orange='#EF6B32', red='#C94232', ink='#102C35', gray='#5B706D';
async function save(path, blob){await fs.writeFile(path,new Uint8Array(await blob.arrayBuffer()));}
function box(s,x,y,w,h,fill,rad=16){return s.shapes.add({geometry:'roundRect',position:{left:x,top:y,width:w,height:h},fill,line:{style:'solid',fill,width:0},borderRadius:rad>=50?'rounded-full':'rounded-xl'});}
function text(s,t,x,y,w,h,size=24,color=ink,bold=false,align='right'){const a=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{style:'solid',fill:'none',width:0}});a.text=t;a.text.style={fontSize:size,color,bold,alignment:align,fontFace:'Arial'};return a;}
function title(s,n,t,sub=''){text(s,`حارس النار  |  ${n}`,72,38,1136,34,16,teal,true);text(s,t,72,82,1136,62,38,ink,true);if(sub)text(s,sub,72,149,1136,38,19,gray,false);}
function footer(s,n){text(s,`مشروع إنذار مبكر للحرائق في المناطق النائية  •  ${n}`,72,682,1136,20,12,gray,false,'center');}
function pill(s,t,x,y,w,fill,color='#fff'){box(s,x,y,w,34,fill,17);text(s,t,x,y+5,w,23,13,color,true,'center');}
function line(s,x1,y1,x2,y2,color=teal,width=4){s.shapes.add({geometry:'line',position:{left:x1,top:y1,width:x2-x1,height:y2-y1},line:{style:'solid',fill:color,width}});}

const p=Presentation.create({slideSize:{width:W,height:H}});
// 1
{const s=p.slides.add();s.background.fill=dark; text(s,'حارس النار',72,106,700,82,58,'#fff',true);text(s,'منصة ذكاء اصطناعي للإنذار المبكر وإدارة مخاطر حرائق المناطق النائية',72,201,670,72,28,'#d7eee8',false);pill(s,'نموذج أولي قابل للتجربة',72,311,220,orange);text(s,'الدفاع المدني  •  المقيمون  •  فرق المراقبة',72,584,600,30,18,'#b9d9d2',false); // abstract marks
box(s,876,108,224,224,'#0f625d',112);box(s,927,159,122,122,orange,61);text(s,'🔥',938,171,100,86,50,'#fff',false,'center');footer(s,1);}
//2
{const s=p.slides.add();s.background.fill='#fff';title(s,'المشكلة','الحرائق تُكتشف متأخرة حين يكون القرار أصعب');text(s,'في المناطق النائية تتفرق إشارات الخطر بين الطقس وصور الأقمار الصناعية وسجل المواقع. النتيجة: صعوبة تحديد أين نرفع الجاهزية قبل أن يتحول الخطر إلى حريق واسع.',72,203,665,116,25,ink,false);box(s,798,202,338,276,sand);text(s,'إشارات متفرقة',828,230,280,35,25,ink,true);text(s,'☀️  حرارة وجفاف\n💨  رياح متغيرة\n🛰️  نقاط حرارية\n📍  تاريخ حرائق',827,285,270,155,23,gray,false);pill(s,'المستخدمون: الدفاع المدني والمقيمون',72,475,370,teal);footer(s,2);}
//3
{const s=p.slides.add();s.background.fill=mint;title(s,'الحل','تحويل البيانات المتفرقة إلى قرار وقائي واضح','درجة خطر لكل منطقة + توصية تنفيذية قابلة للمراجعة');const items=[['🛰️','تجميع','طقس، نقاط حرارية، سجل حرائق'],['🧠','تقييم','درجة خطر من 0 إلى 100'],['📣','استجابة','تنبيه وخطوة تشغيلية']];items.forEach((v,i)=>{let x=72+i*380;box(s,x,245,320,220,'#fff');text(s,v[0],x+24,272,70,50,33);text(s,v[1],x+105,278,180,32,26,ink,true);text(s,v[2],x+28,345,263,70,18,gray,false);});text(s,'القرار النهائي يبقى للمسؤول البشري؛ النظام يرفع الوعي وسرعة الاستجابة.',72,535,1136,32,20,teal,true,'center');footer(s,3);}
//4
{const s=p.slides.add();s.background.fill='#fff';title(s,'دور الوكلاء','ثلاثة وكلاء يعملون كفريق واحد');const xs=[930,635,340];const labels=[['وكيل الاستشعار','يجمع ويُوحّد البيانات'],['وكيل تقييم الخطر','يحلل ويبرر الدرجة'],['وكيل الاستجابة','يقرر التوصية ويرسل التقرير']];xs.forEach((x,i)=>{box(s,x,235,230,190,i===1?'#fff3e4':'#eef8f5');text(s,String(i+1),x+86,255,60,44,32,i===1?orange:teal,true,'center');text(s,labels[i][0],x+20,315,190,30,20,ink,true,'center');text(s,labels[i][1],x+20,362,190,40,15,gray,false,'center');});line(s,850,330,865,330,orange,4);line(s,555,330,570,330,orange,4);text(s,'يعيد النظام عرض مستوى الثقة وأسباب القرار ليسهّل المراجعة البشرية.',190,522,900,38,22,gray,false,'center');footer(s,4);}
//5
{const s=p.slides.add();s.background.fill='#f8fbfa';title(s,'سير العمل','من الطلب إلى النتيجة خلال دورة واحدة');const steps=['اختيار المنطقة','قراءة البيانات','تحليل الخطر','اختيار الأداة','التنبيه والتقرير'];steps.forEach((v,i)=>{let x=82+i*225;box(s,x,285,175,130,'#fff');text(s,String(i+1),x+62,304,50,32,25,orange,true,'center');text(s,v,x+15,352,145,38,17,ink,true,'center');if(i<4)text(s,'←',x+180,330,38,34,27,teal,true,'center');});text(s,'طلب المستخدم  ↓  تحليل الطلب  ↓  اختيار الأداة  ↓  تنفيذ المهمة  ↓  عرض النتيجة',72,500,1136,36,22,teal,true,'center');footer(s,5);}
//6
{const s=p.slides.add();s.background.fill='#fff';title(s,'تجربة النموذج','تنومة: درجة خطر 72 وتوصية جاهزية');box(s,72,208,700,388,'#e4f0e9');text(s,'خريطة المخاطر — منطقة عسير',110,230,610,27,20,ink,true);[['تنومة',562,292,red],['أبها',405,391,orange],['محايل',180,375,orange],['خميس مشيط',530,490,'#f2b544']].forEach(v=>{box(s,v[1],v[2],20,20,v[3],10);text(s,v[0],v[1]-20,v[2]+29,90,18,13,ink,true,'center');});box(s,810,208,326,388,sand);text(s,'توصية الوكيل',842,240,260,30,23,ink,true);text(s,'أولوية: عالية',842,302,250,31,24,red,true);text(s,'رفع جاهزية الفرقة القريبة\nوتنبيه المقيمين لتجنب\nإشعال النار حتى 22:00.',842,357,245,112,19,ink,false);text(s,'السبب: رياح نشطة + جفاف مرتفع + سجل متكرر',842,505,244,56,14,gray,false);footer(s,6);}
//7
{const s=p.slides.add();s.background.fill=mint;title(s,'الأدوات المستخدمة','تصميم قابل للربط بمصادر حية عند الإطلاق');const rows=[['نموذج الذكاء الاصطناعي','OpenAI GPT لتحويل التحليل إلى تقرير وتنبيه مفهوم'],['البيانات الميدانية','NASA FIRMS للنقاط الحرارية + OpenWeather للطقس'],['الخريطة والبيانات','Mapbox أو Google Maps + PostgreSQL/PostGIS'],['الأتمتة والتنبيهات','n8n + SMS/واتساب أو إشعارات التطبيق']];rows.forEach((r,i)=>{let y=210+i*85;box(s,72,y,1136,64,'#fff');text(s,r[0],900,y+17,250,24,18,teal,true);text(s,r[1],104,y+17,740,28,17,ink,false);});footer(s,7);}
//8
{const s=p.slides.add();s.background.fill=dark;title(s,'التحديات والتطوير','خطوة عملية تبدأ بسيطة وتتوسع بأمان');[['جودة البيانات','تأكيد النقاط الحرارية قبل أي إنذار عاجل'],['الاتصال في المناطق النائية','رسائل SMS ووضع عمل منخفض الاتصال'],['التطوير القادم','تنبؤ 24–72 ساعة، مسارات الإخلاء، سجل مراجعة للقرارات']].forEach((r,i)=>{let y=224+i*95;box(s,650,y,486,70,'#0d5a56');text(s,r[0],925,y+19,180,24,18,'#fff',true);text(s,r[1],682,y+19,225,27,15,'#d2eee7',false);});text(s,'هدفنا: وقت إنذار أقصر، قرار أوضح، ومجتمعات أكثر جاهزية.',72,534,520,64,28,'#fff',true);pill(s,'جاهز للعرض والتجربة',72,620,220,orange);footer(s,8);}

for(const [i,s] of p.slides.items.entries()) await save(`${OUT}/slide-${i+1}.png`,await p.export({slide:s,format:'png',scale:1}));
const pptx=await PresentationFile.exportPptx(p); await pptx.save(`${OUT}/عرض_حارس_النار.pptx`);
