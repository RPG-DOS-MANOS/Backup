"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[920],{6920:(e,t,a)=>{a.r(t),a.d(t,{hookTests:()=>n});var s=a(4304);let o=e=>{const{describe:t,it:a,assert:o,afterEach:r}=e;t("Torch Common Library Tests",(()=>{t("Library defaulting tests",(()=>{a("library defaults are all applied - no reference",(()=>{let e={fakeSystem:{sources:{nuke:{light:{bright:5,dim:10,angle:360}},other:{light:[{bright:10,dim:20,angle:360}]}},aliases:{bomb:"nuke",alt:"other"}}};s.c.applyFieldDefaults(e),o.equal(e.fakeSystem.system,"fakeSystem"),o.equal(e.fakeSystem.topology,"standard"),o.equal(e.fakeSystem.quantity,"quantity"),o.equal(e.fakeSystem.sources.nuke.name,"nuke"),o.equal(e.fakeSystem.sources.nuke.type,"equipment"),o.equal(e.fakeSystem.sources.nuke.consumable,!1),o.equal(e.fakeSystem.sources.nuke.states,2),o.equal(e.fakeSystem.sources.nuke.light.length,1),o.equal(e.fakeSystem.sources.nuke.light[0].bright,5),o.equal(e.fakeSystem.sources.other.name,"other"),o.equal(e.fakeSystem.sources.other.type,"equipment"),o.equal(e.fakeSystem.sources.other.consumable,!1),o.equal(e.fakeSystem.sources.other.states,2),o.equal(e.fakeSystem.sources.other.light[0].bright,10),o.equal(e.fakeSystem.sources.bomb.name,"bomb"),o.equal(e.fakeSystem.sources.bomb.type,"equipment"),o.equal(e.fakeSystem.sources.bomb.consumable,!1),o.equal(e.fakeSystem.sources.bomb.states,2),o.equal(e.fakeSystem.sources.bomb.light.length,1),o.equal(e.fakeSystem.sources.bomb.light[0].bright,5),o.equal(e.fakeSystem.sources.alt.name,"alt"),o.equal(e.fakeSystem.sources.alt.type,"equipment"),o.equal(e.fakeSystem.sources.alt.consumable,!1),o.equal(e.fakeSystem.sources.alt.states,2),o.equal(e.fakeSystem.sources.alt.light[0].bright,10)})),a("library defaults are all applied - with reference",(()=>{let e={fakeSystem:{sources:{nuke:{light:{bright:5,dim:10,angle:360}},other:{light:[{bright:10,dim:20,angle:360}]}},aliases:{crazy:"special"}}};s.c.applyFieldDefaults(e,{fakeSystem:{topology:"gurps",quantity:"amount",sources:{other:{type:"spell",consumable:!0,states:2,light:[{bright:15,dim:30,angle:57}]},special:{type:"equipment",consumable:!1,states:2,light:[{bright:20,dim:35,angle:90}]}}}}),o.equal(e.fakeSystem.system,"fakeSystem"),o.equal(e.fakeSystem.topology,"gurps"),o.equal(e.fakeSystem.quantity,"amount"),o.equal(e.fakeSystem.sources.nuke.name,"nuke"),o.equal(e.fakeSystem.sources.nuke.type,"equipment"),o.equal(e.fakeSystem.sources.nuke.consumable,!1,"Consumable matches for nuke"),o.equal(e.fakeSystem.sources.nuke.states,2),o.equal(e.fakeSystem.sources.nuke.light.length,1),o.equal(e.fakeSystem.sources.nuke.light[0].bright,5),o.equal(e.fakeSystem.sources.other.name,"other"),o.equal(e.fakeSystem.sources.other.type,"spell"),o.equal(e.fakeSystem.sources.other.consumable,!0,"Consumable matches for other"),o.equal(e.fakeSystem.sources.other.states,2),o.equal(e.fakeSystem.sources.other.light[0].bright,10),o.equal(e.fakeSystem.sources.crazy.name,"crazy"),o.equal(e.fakeSystem.sources.crazy.type,"equipment"),o.equal(e.fakeSystem.sources.crazy.consumable,!1,"Consumable matches for other"),o.equal(e.fakeSystem.sources.crazy.states,2),o.equal(e.fakeSystem.sources.crazy.light[0].bright,20),o.equal(e.fakeSystem.sources.special,void 0)})),a("library defaults do not override actual data - no reference",(()=>{let e={fakeSystem:{system:"aSystem",topology:"gurps",quantity:"count",sources:{nuke:{name:"Nuke2",type:"spell",consumable:!0,states:3,light:[{bright:15,dim:20,angle:360},{bright:20,dim:40,angle:57}]},other:{name:"Other",type:"spell",consumable:!1,states:2,light:[{bright:10,dim:20,angle:360}]}}}};s.c.applyFieldDefaults(e),o.equal(e.fakeSystem.system,"aSystem"),o.equal(e.fakeSystem.topology,"gurps"),o.equal(e.fakeSystem.quantity,"count"),o.equal(e.fakeSystem.sources.nuke.name,"Nuke2"),o.equal(e.fakeSystem.sources.nuke.type,"spell"),o.equal(e.fakeSystem.sources.nuke.consumable,!0),o.equal(e.fakeSystem.sources.nuke.states,3),o.equal(e.fakeSystem.sources.nuke.light.length,2),o.equal(e.fakeSystem.sources.nuke.light[0].bright,15),o.equal(e.fakeSystem.sources.other.name,"Other"),o.equal(e.fakeSystem.sources.other.type,"spell"),o.equal(e.fakeSystem.sources.other.consumable,!1),o.equal(e.fakeSystem.sources.other.states,2),o.equal(e.fakeSystem.sources.other.light[0].bright,10)})),a("library defaults do not override actual data - with reference",(()=>{let e={fakeSystem:{system:"aSystem",topology:"gurps",quantity:"count",sources:{nuke:{name:"Nuke2",type:"spell",consumable:"true",states:3,light:[{bright:15,dim:20,angle:360},{bright:20,dim:40,angle:57}]},other:{name:"Other",type:"spell",consumable:"false",states:2,light:[{bright:10,dim:20,angle:360}]}}}};s.c.applyFieldDefaults(e,{fakeSystem:{topology:"gurps",quantity:"amount",sources:{other:{type:"spell",consumable:!0,states:2,light:[{bright:15,dim:30,angle:57}]}}}}),o.equal(e.fakeSystem.system,"aSystem"),o.equal(e.fakeSystem.topology,"gurps"),o.equal(e.fakeSystem.quantity,"count"),o.equal(e.fakeSystem.sources.nuke.name,"Nuke2"),o.equal(e.fakeSystem.sources.nuke.type,"spell"),o.equal(e.fakeSystem.sources.nuke.consumable,!0),o.equal(e.fakeSystem.sources.nuke.states,3),o.equal(e.fakeSystem.sources.nuke.light.length,2),o.equal(e.fakeSystem.sources.nuke.light[0].bright,15),o.equal(e.fakeSystem.sources.other.name,"Other"),o.equal(e.fakeSystem.sources.other.type,"spell"),o.equal(e.fakeSystem.sources.other.consumable,!1),o.equal(e.fakeSystem.sources.other.states,2),o.equal(e.fakeSystem.sources.other.light[0].bright,10)}))})),t("Library Loading tests",(()=>{r((async()=>{s.c.commonLibrary=void 0})),a("library load for D&D 5e without a user library",(async()=>{o.notOk(s.c.commonLibrary,"no common library loaded initially");let e=await s.c.load("dnd5e",10,50,"Torch");o.ok(s.c.commonLibrary,"common library loaded");let t=e.getLightSource("candle");o.equal(t.light[0].bright,5,"common candle bright light level"),o.equal(t.light[0].dim,10,"common candle dim light level");let a=e.getLightSource("torch");o.equal(a.light[0].bright,10,"torch bright light level from settings"),o.equal(a.light[0].dim,50,"torch dim light level from settings");let r=e.getLightSource("phantom torch");o.notOk(r,"No phantom torch defined as expected")})),a("library load for D&D 5e with no user inventory item set",(async()=>{o.notOk(s.c.commonLibrary,"no common library loaded initially");let e=await s.c.load("dnd5e",50,10,void 0);o.ok(s.c.commonLibrary,"common library loaded");let t=e.getLightSource("candle");o.equal(t.light[0].bright,5,"common candle bright light level"),o.equal(t.light[0].dim,10,"common candle dim light level"),o.notOk(t.light[0].alpha,"no candle alph level set");let a=e.getLightSource("torch");o.equal(a.light[0].bright,20,"common torch bright light level"),o.equal(a.light[0].dim,40,"common torch dim light level")})),a("library load for D&D 5e with a user library",(async()=>{o.notOk(s.c.commonLibrary,"no common library loaded initially");let e=await s.c.load("dnd5e",10,50,"Torch","./modules/torch/test/userLights.json");o.ok(s.c.commonLibrary,"common library loaded");let t=e.getLightSource("candle");o.equal(t.light[0].bright,10,"user candle bright light level"),o.equal(t.light[0].dim,15,"user candle dim light level"),o.equal(t.light[0].alpha,.5,"user candle has alpha defined");let a=e.getLightSource("torch");o.equal(a.light[0].bright,10,"torch bright light level from settings"),o.equal(a.light[0].dim,50,"torch dim light level from settings");let r=e.getLightSource("phantom torch");o.ok(r,"The phantom torch light source exists in the data"),o.equal(r.light[0].bright,5,"user phantom torch bright light level"),o.equal(r.light[0].dim,20,"user phantom torch bright light level")})),a("library load for GURPS with a user library with a GURPS flashlight",(async()=>{o.notOk(s.c.commonLibrary,"no common library loaded initially");let e=await s.c.load("test",50,10,"Torch","./modules/torch/test/userLights.json");o.ok(s.c.commonLibrary,"common library loaded");let t=e.getLightSource("candle");o.notOk(t,"No candle defined as expected");let a=e.getLightSource("self");o.notOk(a,"No self light source defined as expected");let r=e.getLightSource("flashlight");o.ok(r,"Flashlight defined as expected"),o.equal(r.light[0].bright,10,"user flashlight light level"),o.equal(r.light[0].dim,0,"user flashlight light level"),o.equal(r.light[0].angle,3,"user flashlight light angle")}))})),"dnd5e"===game.system.id&&t("Library topology tests for D&D5e actors",(()=>{a("Actor inventory settings for Versatile in D&D5e with a user library",(async()=>{let e=game.actors.getName("Versatile");o.ok(e,"Actor Versatile found");let t=await s.c.load("dnd5e",50,10,"Torch","./modules/torch/test/userLights.json"),a=t.getInventory(e,"Torch");o.ok("number"==typeof a,"Count of torches has a numeric value");let r=t.getInventory(e,"Candle");o.ok("number"==typeof r,"Count of candles has a numeric value");let l=t.getInventory(e,"Light");o.ok(void 0===l,"Light cantrip doesn't have inventory");let i=t.getInventory(e,"Lamp");o.ok(void 0===i,"Lamp doesn't have inventory"),await t._presetInventory(e,"Torch",2);let n=t.getInventory(e,"Torch");await t.decrementInventory(e,"Torch");let u=t.getInventory(e,"Torch");await t.decrementInventory(e,"Torch");let c=t.getInventory(e,"Torch");await t.decrementInventory(e,"Torch");let h=t.getInventory(e,"Torch");o.equal(n,2,"Started with set value"),o.equal(u,1,"Decremented to one"),o.equal(c,0,"Decremented to zero"),o.equal(h,0,"Remained at zero")})),a("Actor image settings for Versatile in D&D5e with a user library",(async()=>{let e=game.actors.getName("Versatile");o.ok(e,"Actor Versatile found");let t=await s.c.load("dnd5e",50,10,"Torch","./modules/torch/test/userLights.json"),a=t.getImage(e,"Torch");o.ok(a,"Torch should have a defined image"),o.notEqual(a,"","Torch image has a reasonable value");let r=t.getImage(e,"Candle");o.ok(r,"Candle should have a defined image"),o.notEqual(r,"","Candle image has a reasonable value");let l=t.getImage(e,"Lamp");o.ok(l,"Lamp should have a defined image"),o.notEqual(l,"","Lamp image has a reasonable value");let i=t.getImage(e,"Light");o.ok(i,"Light cantrip should have a defined image"),o.notEqual(i,"","Light cantrip image has a reasonable value")})),a("Actor light sources for Lightbearer, Breaker, Empty, and Bic in D&D5e with a user library",(async()=>{let e=game.actors.getName("Breaker");o.ok(e,"Actor Breaker found");let t=game.actors.getName("Empty");o.ok(t,"Actor Empty found");let a=game.actors.getName("Torchbearer");o.ok(a,"Actor Torchbearer found");let r=game.actors.getName("Bic");o.ok(r,"Actor Bic found");let l=await s.c.load("dnd5e",50,10,"Torch","./modules/torch/test/userLights.json"),i=l.actorLightSources(e);o.equal(i.length,2,"Breaker has two known light sources"),o.notEqual(i[0].name,i[1].name,"Breaker's sources are different"),o.ok(["Torch","Dancing Lights"].includes(i[0].name),"Breaker's first source is expected"),o.ok(["Torch","Dancing Lights"].includes(i[1].name),"Breaker's second source is expected"),o.equal(l.actorHasLightSource(e,"Dancing Lights"),!0,"Breaker is reported as having Dancing Lights");let n=l.actorLightSources(a);o.equal(n.length,1,"Torchbearer has precisely one light source"),o.equal(n[0].name,"Torch","Torchbearer's light source is Torch, as eqpected"),o.equal(l.actorHasLightSource(a,"Torch"),!0,"Bearer is reported as having the Torch light source");let u=l.actorLightSources(t);o.equal(u.length,0,"Empty truly has no known light sources"),o.equal(l.actorHasLightSource(t,"Candle"),!1,"Empty is reported as not having the candle light source");let c=l.actorLightSources(r);o.equal(c.length,0,"Bic has no known light sources, even though it has ways of casting light"),o.equal(l.actorHasLightSource(r,"Candle"),!1,"Empty is reported as not having the candle light source")}))}))}))};var r=a(1288);let l=async function(e,t,a,o){let l=game.scenes.active.tokens.getName(e);o.ok(l,"Token for "+e+" found in scene");let i=await s.c.load("dnd5e",10,20);return o.ok(i,"Library successfully created"),await i._presetInventory(l.actor,t,a),new r.c(l,i)},i=e=>{const{describe:t,it:a,assert:o,afterEach:r}=e;t("Torch Common Token Tests",(()=>{"dnd5e"===game.system.id&&t("Token tests for D&D5e actors, scene, and tokens",(()=>{r((async()=>{s.c.commonLibrary=void 0})),a("Light source selection",(async()=>{let e=await l("Versatile","Torch",1,o),t=e.ownedLightSources,a=e.currentLightSource;o.ok(t,"Owned light sources came back in one piece"),o.ok(a,"The token has a current source")})),a("Cycle of token states - torch",(async()=>{let e=await l("Versatile","Torch",1,o);await e.forceStateOff(),o.equal(e.lightSourceState,e.STATE_OFF,"Token is off"),await e.setCurrentLightSource("Torch");let t=e.lightSourceIsExhausted("Torch");o.equal(t,!1,"Torches are not exhausted when we start"),await e.advanceState(),o.equal(e.lightSourceState,e.STATE_ON,"Token is on"),await e.advanceState(),o.equal(e.lightSourceState,e.STATE_OFF,"Token is off"),t=e.lightSourceIsExhausted("Torch"),o.equal(t,!0,"Torches are exhausted when we're done")})),a("Cycle of token states - hooded lantern",(async()=>{let e=await l("Versatile","Torch",1,o);await e.forceStateOff(),o.equal(e.lightSourceState,e.STATE_OFF,"Token is off"),await e.setCurrentLightSource("Hooded Lantern");let t=e.lightSourceIsExhausted("Hooded Lantern");o.equal(t,!1,"Hooded Lanterns are not exhausted when we start"),await e.advanceState(),o.equal(e.lightSourceState,e.STATE_ON,"Token is on"),await e.advanceState(),o.equal(e.lightSourceState,e.STATE_DIM,"Token is dim"),await e.advanceState(),o.equal(e.lightSourceState,e.STATE_OFF,"Token is off"),t=e.lightSourceIsExhausted("Hooded Lantern"),o.equal(t,!1,"Hooded Lanterns are not exhausted when we're done either")}))}))}))};function n(){game.world.data.name.startsWith("torch-test-")&&(console.log("Torch | Registering tests..."),quench.registerBatch("torch.common.library",o,{displayName:"Torch: Common Library Tests"}),quench.registerBatch("torch.common.token",i,{displayName:"Torch: Common Token Tests"}),game.system.id)}}}]);
//# sourceMappingURL=920.js.map