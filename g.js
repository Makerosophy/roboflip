var $={v:.1,cols:{black:"#000",ash:"#9d9d9d",blind:"#fff",bloodred:"#be2633",pigmeat:"#e06f8b",oldpoop:"#493C2B",newpoop:"#a46422",blaze:"#eb8931",zornskin:"#f7e26b",shadegreen:"#2f484e",leafgreen:"#44891A",slimegreen:"#A3CE27",nightblue:"#1B2632",seablue:"#005784",skyblue:"#31A2F2",cloudblue:"#B2DCEF"}},initializing=!1,fnTest=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/,lastClassId=0;Class=function(){};var inject=function(t){var i=this.prototype,s={};for(var e in t)"function"==typeof t[e]&&"function"==typeof i[e]&&fnTest.test(t[e])?(s[e]=i[e],i[e]=function(t,i){return function(){var e=this._super;this._super=s[t];var h=i.apply(this,arguments);return this._super=e,h}}(e,t[e])):i[e]=t[e]};Class.extend=function(t){function i(){if(!initializing){if(this.staticInstantiate){var t=this.staticInstantiate.apply(this,arguments);if(t)return t}for(var i in this)"object"==typeof this[i]&&(this[i]=ig.copy(this[i]));this.init&&this.init.apply(this,arguments)}return this}var s=this.prototype;initializing=!0;var e=new this;initializing=!1;for(var h in t)e[h]="function"==typeof t[h]&&"function"==typeof s[h]&&fnTest.test(t[h])?function(t,i){return function(){var e=this._super;this._super=s[t];var h=i.apply(this,arguments);return this._super=e,h}}(h,t[h]):t[h];return i.prototype=e,i.prototype.constructor=i,i.extend=window.Class.extend,i.inject=inject,i.classId=e.classId=++lastClassId,i},$.Load=function(t){this.g=t,this.imgsLoaded=0,this.imgsTotal=Object.keys($.data.i).length,this.init=function(){var t,i=this.g,s="data:image/gif;base64,",e=$.data.i;for(t in e)e.hasOwnProperty(t)&&(i.imgs[t]=new Image,i.imgs[t].onload=this.checkLoaded(),i.imgs[t].src=s+e[t])},this.checkLoaded=function(){var t=(this.g,this);this.imgsLoaded+=1,t.imgsLoaded===t.imgsTotal&&window.setTimeout(function(){t.mkFonts()},10)},this.mkFonts=function(){var t,i=this.g,s={b:[0,0,0],w:[255,255,255],g:[163,206,39],p:[224,111,139]},e=i.imgs;for(t in s)i.fonts[t]=$.H.resize(i.imgs.font,1,s[t]);for(t in e)e[t+"_w"]=$.H.resize(e[t],1,[255,255,255]);window.setTimeout(function(){i.init()},10)},this.init()},$.Game=function(){this.w=480,this.h=320,this.bgs={},this.imgs={},this.fonts={},this.ents=[],this.events=[],this.sfx={},this.plays=0,this.time=0,this.dt=0,this.fps=0,this.hiScore=parseInt(localStorage.getItem("hiScore"),10)||100,this.boot=function(t){this.startState=t||"Title",this.c=document.getElementsByTagName("canvas")[0],this.ctx=this.c.getContext("2d"),this.c.style.width=this.w+"px",this.c.style.height=this.h+"px",this.draw=new $.Draw(this.ctx,this.w,this.h),this.load=new $.Load(this),document.title=$.data.title},this.init=function(){function t(){i.loop(),requestAnimationFrame(t,i.c)}var i=this,s=navigator.userAgent.toLowerCase();i.mobile="createTouch"in document||!1,i.mobile="createTouch"in document||!1,i.android=s.indexOf("android")>-1,i.ios=/ipad|iphone|ipod/.test(s),i.firefox=s.indexOf("firefox")>-1,i.input=new $.Input,i.input.init(i),i.emitter=new $.Emitter(i),this.ios?this.audio={play:function(){},say:function(){}}:(this.audio=new $.Audio($.data.sfx),this.audio.init()),$.H.el("b").style.display="block",$.H.el("l").style.display="none",i.resize(),$.H.listen("resize",function(){i.resize()}),$.H.listen("orientationchange",function(){i.resize()}),i.shake=new $.Shake(i),i.changeState(i.startState),t()},this.changeState=function(t){var i=this;i.ents=[],i.events=[],i.tick=0,i.state=new $[t](i)},this.addEvent=function(t){this.events.push(t)},this.resize=function(){var t=window.innerHeight,i=window.innerWidth,s=this.w/this.h,e=t*s;scale=e/this.w,t>i?($.H.el("l").style.display="block",$.H.el("h").innerHTML="Rotate Device",$.H.el("b").style.display="none"):($.H.el("l").style.display="none",$.H.el("b").style.display="block"),this.c.width=this.w,this.c.height=this.h,this.w2=this.w/2,this.h2=this.h/2,this.c.style.width=~~e+"px",this.c.style.height=~~t+"px",this.c.style.marginLeft=~~((i-e)/2)+"px"},this.loop=function(t){var i=this,s=(new Date).getTime();this.dt=s-(this.time||s),this.fps=~~(1e3/this.dt),this.time=s,i.shake.update(),i.state.update(),i.state.render(),i.tick+=i.dt/1e3},this.countGroup=function(t){for(var i=this.ents,s=i.length,e=0;s--;)i[s].group===t&&(e+=1);return e},this.mkFont=function(t,i){var s=this,e=s.draw.scale(s.fonts[t],i);return e.scale=i,e},this.findClosest=function(t,i){for(var s,e,h,a=this,n=a.ents.length,r=-1.5,o=2*a.w;n--;)e=a.ents[n],e.group===i&&(h=$.H.getDist(t,e),o>h&&(o=h,s=e));return s&&(r=$.H.getAngle(s,t)),{dist:o,angle:r,e:s}}},$.H={listen:function(t,i){window.addEventListener(t,i,!1)},el:function(t){return document.getElementById(t)},rnd:function(t,i){return~~(Math.random()*i)+t},rndArray:function(t){return t[~~(Math.random()*t.length)]},textWidth:function(t,i){return 3*t.length*i.scale+1*t.length*i.scale},fullScreen:function(t){t.requestFullscreen?t.requestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.msRequestFullscreen&&t.msRequestFullscreen()},mkCanvas:function(t,i){var s=document.createElement("canvas"),e=s.getContext("2d");return s.width=t,s.height=i,e.mozImageSmoothingEnabled=!1,e.webkitImageSmoothingEnabled=!1,e.msImageSmoothingEnabled=!1,e.imageSmoothingEnabled=!1,s},resize:function(t,i,s){i=i||1,s=s||!1;var e=t.width*i,h=t.height*i,a=document.createElement("canvas");a.width=t.width,a.height=t.height;var n=a.getContext("2d");n.drawImage(t,0,0);var r=n.getImageData(0,0,t.width,t.height),o=document.createElement("canvas");o.width=e,o.height=h;var l,c,d=o.getContext("2d"),u=d.getImageData(0,0,e,h);for(l=0;h>l;l++)for(c=0;e>c;c++){var p=4*(Math.floor(l/i)*t.width+Math.floor(c/i)),g=4*(l*e+c);u.data[g]=r.data[p],u.data[g+1]=r.data[p+1],u.data[g+2]=r.data[p+2],u.data[g+3]=r.data[p+3],0===r.data[p+3]?(u.data[g]=0,u.data[g+1]=0,u.data[g+2]=0,u.data[g+3]=0):s&&(u.data[g]=s[0],u.data[g+1]=s[1],u.data[g+2]=s[2],u.data[g+3]=255)}d.putImageData(u,0,0);var f=new Image;return f.src=o.toDataURL("image/png"),f}},$.Draw=function(t,i,s){this.ctx=t,this.w=i,this.h=s,this.clear=function(){this.ctx.clearRect(0,0,this.w,this.h)},this.rect=function(t,i,s,e,h){this.ctx.fillStyle=h,this.ctx.fillRect(~~t,~~i,s,e)},this.circle=function(t,i,s,e){var h=this.ctx;t+=s/2,i+=s/2,h.beginPath(),h.arc(t,i,s,0,2*Math.PI,!0),h.closePath(),h.fillStyle=e,h.fill()},this.rotate=function(t,i){{var s=document.createElement("canvas"),e=s.getContext("2d"),h=Math.max(t.width,t.height)+6;i*(180/Math.PI)}return s.width=h,s.height=h,e.translate(h/2,h/2),e.rotate(i+Math.PI/2),e.drawImage(t,-(t.width/2),-(t.height/2)),s},this.scale=function(t,i,s){var e=$.H.mkCanvas(t.width*i,t.height*i),h=e.getContext("2d");return e.width&&(h.save(),h.scale(i,i),h.drawImage(t,0,0),h.restore()),e},this.flip=function(t,i,s){var e=$.H.mkCanvas(t.width,t.height),h=e.getContext("2d"),a=i?-1:1,n=s?-1:1,r=i?-1*t.width:0,o=s?-1*t.height:0;return e.width=t.width,e.height=t.height,h.save(),h.scale(a,n),h.drawImage(t,r,o,t.width,t.height),h.restore(),e},this.text=function(t,i,s,e){var h=0,a=this.ctx,n=65,r=0,o=3*i.scale,l=5*i.scale,c=1*i.scale,d=$.H.textWidth(t,i),u=0;for(("number"==typeof t||"0"===t[0])&&(t+="",r=43),s=s||(this.w-d)/2,h=0;h<t.length;h+=1)u=(t.charCodeAt(h)-n+r)*(o+c),u>-1&&a.drawImage(i,u,0,o,l,~~s,~~e,o,l),s+=o+c}},$.Audio=function(t){this.sounds=t,this.sfx={},this.init=function(){var t;for(t in this.sounds)this.add(t,10,$.data.sfx[t])},this.add=function(t,i,s){var e;for(this.sfx[t]={tick:0,pool:[]},e=0;i>e;e++){var h=new Audio;h.src=jsfxr(s),this.sfx[t].pool.push(h)}},this.play=function(t){var i=this.sfx[t];i.pool[i.tick].play(),i.tick=i.tick<i.pool.length-1?i.tick+=1:i.tick=0},this.say=function(t,i){if("undefined"!=typeof SpeechSynthesisUtterance){var s=new SpeechSynthesisUtterance(t);s.pitch=.1,s.rate=i||.7,speechSynthesis.speak(s)}}},$.Input=function(){this.init=function(t){var i=this,s=window.addEventListener;this.g=t,i.k=[],i.k[32]=0,i.k[16]=0,i.touching=0,i.touchLeft=0,i.touchRight=0,s("touchstart",function(t){i.touching=1,i.trackTouch(t.touches)}),s("touchmove",function(t){t.preventDefault(),i.trackTouch(t.touches)}),s("touchend",function(t){t.preventDefault(),i.trackTouch(t.touches),i.touching=0}),s("keydown",function(t){i.k[t.keyCode]=1},!1),s("keyup",function(t){i.k[t.keyCode]=0},!1)},this.trackTouch=function(t){var i,s,e,h=this,a=this.g.c,n=a.offsetTop,r=a.offsetLeft,o=parseInt(a.style.width,10)/a.width;for(h.touchLeft=0,h.touchRight=0,e=0;e<t.length&&!(e>1);e+=1)i=~~((t[e].pageX-r)/o),s=~~((t[e].pageY-n)/o),i<a.width/2?this.touchLeft=1:this.touchRight=1}},$.Sprite=Class.extend({init:function(t,i){var s;this.g=t,this.angle=0,this.id=Date.now(),this.offscreen=!1,this.remove=!1,this.dead=!1,this.tick=0,this.vx=0,this.vy=0,this.scale=1,this.alpha=1,this.col=$.cols.slimegreen,this.frames=1,this.frame=1,this.gravity=0,this.frameRate=80,this.frameNext=0,this.hurt=0,this.hurtTime=200;for(s in i)this[s]=i[s]},update:function(){var t=this.g;this.tick+=t.dt/100,this.lastX=this.x,this.lastY=this.y,this.x+=this.vx*t.dt,this.y+=this.vy*t.dt,this.gravity&&(this.vy+=this.gravity*t.dt),this.offscreen=this.checkOffScreen(),this.cx=this.x+this.w/2,this.cy=this.y+this.y/2,this.frameNext<0&&(this.frameNext=this.frameRate,this.frame=this.frame===this.frames?1:this.frame+=1),this.frameNext-=t.dt},render:function(){var t=this.g,i=this.i;i?(this.flipped&&(i=t.draw.flip(i,0,1)),this.flipX&&(i=t.draw.flip(i,1,0)),t.ctx.drawImage(i,this.frame*this.w-this.w,0,this.w,this.h,~~this.x,~~this.y,this.w,this.h)):this.g.draw.rect(~~this.x,~~this.y,this.w,this.h,this.col)},keepOnScreen:function(){var t=this.g,i=t.bg.ground||0,s=!1;return this.x<0?(this.x=0,s=!0):this.x>t.w-this.w&&(this.x=t.w-this.w,s=!0),this.y<i?(this.y=i,this.jumping=!1,this.flipping=!1,this.jumpCount=0,s=!0):this.y>t.h-i-this.h&&(this.y=t.h-this.h-i,this.jumping=!1,this.flipping=!1,this.jumpCount=0,s=!0),s},checkOffScreen:function(){var t=this.g;return this.x<0||this.x>t.w-this.w||this.y<0||this.y>t.h-this.h},doDamage:function(t){this.remove=!0},kill:function(){this.dead=!0,this.remove=!0},receiveDamage:function(t){this.kill()},hitGroup:function(t){for(var i=this.g,s=i.ents.length;s--;)i.ents[s]&&i.ents[s].group===t&&i.ents[s].id!==this.id&&this.hit(i.ents[s])&&(this.doDamage(i.ents[s]),i.ents[s].receiveDamage(this))},hit:function(t){return!(t.y+t.h-1<this.y||t.y>this.y+this.h-1||t.x+t.w-1<this.x||t.x>this.x+this.w-1)},mkImg:function(t){var i=this.g;this.i=i.draw.scale(i.imgs[t],this.scale),this.w=this.i.width/this.frames,this.h=this.i.height,this.iHurt=i.draw.scale(i.imgs[t+"_w"],this.scale)}}),$.State=Class.extend({init:function(t){this.g=t,this.fader=0,t.jump=0,t.lastJump=0,t.doJump=!1},update:function(){var t,i=this.g,s=i.ents.length;for(i.lastJump=i.jump,i.jump=i.mobile?i.input.touchLeft:i.input.k[32],i.doJump=0===i.lastJump&1===i.jump?!0:!1;s--;)i.ents[s]&&!i.ents[s].remove&&i.ents[s].update();for(s=i.ents.length;s--;)i.ents[s].remove&&i.ents.splice(s,1);for(s=i.events.length;s--&&(t=i.events[s]);)t.time-=i.dt/1e3,t.time<0&&(t.cb.call(this),i.events.splice(s,1));this.fader=Math.sin(3*i.tick)+1},render:function(){var t,i=this.g;for(t=0;t<i.ents.length;t+=1)i.ents[t].remove||i.ents[t].render()}}),$.Emitter=function(t){this.g=t,this.particle=function(t,i,s){var e,h=this.g;if(!h.ios)for(e=0;t>e;e+=1)h.ents.push(new $.Particle(h,{x:i,y:s}))},this.explosion=function(t,i,s,e,h){for(var a=this.g,n=$.H.rnd;t--;)window.setTimeout(function(){a.ents.push(new $.Explosion(a,{x:i+n(-10,10),y:s+n(-10,10),magnitude:h,particles:e}))},150*t)}},$.Particle=$.Sprite.extend({init:function(t,i){this._super(t,i),this.name="particle",this.scale=1,this.group="na",this.w=4,this.h=4,this.v=5*Math.random()+5,this.lifespan=$.H.rnd(20,50),this.ttl=this.lifespan,this.alpha=1,this.vx=($.H.rnd(0,600)-300)/1e3,this.vy=($.H.rnd(0,600)-300)/1e3},update:function(){this._super(),this.ttl-=1,this.ttl<0&&(this.remove=!0)},render:function(){var t=this.g;t.ctx.globalAlpha=this.ttl/this.lifespan,t.draw.rect(this.x,this.y,5,5,$.cols.zornskin),t.ctx.globalAlpha=1}}),$.Tile=Class.extend({init:function(t,s){for(this.g=t,this.i=s.i,this.x=s.x,this.y=s.y,this.speed=s.speed/1e3,this.w=this.i.width,this.h=this.i.height,this.ctx=s.ctx,this.numTiles=Math.ceil(t.w/this.w)+2,this.tiles=[],i=0;i<this.numTiles;i+=1)this.tiles.push({x:i*this.w,y:this.y})},update:function(){var t,i,s,e=this.g;for(t=0;t<this.numTiles;t+=1)i=this.tiles[t],s=this.speed*e.dt,i.x<-this.w&&(i.x=this.findLastTile()+this.w),i.x+=s},findLastTile:function(){for(var t=0,i=this.tiles.length;i--;)t=this.tiles[i].x>t?this.tiles[i].x:t;return t},render:function(){var t,i;for(t=0;t<this.numTiles;t+=1)i=this.tiles[t],this.ctx.drawImage(this.i,~~i.x,~~i.y)}}),$.Shake=function(t){this.g=t,this.c=t.c,this.ttl=0,this.mag=0,this.start=function(t,i){this.mag=t,this.ttl=i,this.l=(window.innerWidth-this.c.style.width)/2},this.update=function(){var t=this.g,i=this.c,s=$.H.rnd(-this.mag,this.mag);t.ios||(this.ttl-=1,0===this.ttl?(i.style.marginLeft=this.l+"px",i.style.marginTop="0px"):this.ttl>0&&(i.style.marginTop=s+"px",i.style.marginLeft=s+this.l+"px"))}},$.Bg=Class.extend({init:function(t,i){i=i||{};var s=i.numStars||20,e=t.imgs;sc=t.draw.scale,this.g=t,this.c=$.H.mkCanvas(t.w,t.h),this.ctx=this.c.getContext("2d"),this.draw=new $.Draw(this.ctx,t.w,t.h),this.ground=i.ground||40,this.groundTileImg=i.groundTile||e.ground,this.groundTileScale=i.groundTile||e.ground,this.speed=i.speed,this.tiles=[];var h=sc(e.ground,4);for(this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:280,i:h,speed:-i.speed})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:0,i:t.draw.flip(h,0,1),speed:-i.speed})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:230,i:t.draw.scale(t.imgs.bg1,10),speed:-(i.speed/1.5)})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:41,i:t.draw.scale(t.imgs.window,8),speed:-(i.speed/2)})),this.stars=[];s--;)this.stars.push({x:$.H.rnd(0,t.w),y:$.H.rnd(0,t.h)})},update:function(){for(var t=(this.g,this.tiles.length);t--;)this.tiles[t].update()},render:function(){var t,i=this.g,s=this.stars.length;for(this.ctx.fillStyle=$.cols.black,this.ctx.fillRect(0,0,i.w,i.h);s--;)t=this.stars[s],this.draw.circle(t.x,t.y,1,$.cols.blind);for(s=this.tiles.length;s--;)this.tiles[s].render();i.ctx.drawImage(this.c,0,0)},stop:function(){var t=this.tiles.length;for(this.speed=0;t--;)this.tiles[t].speed=0},makeFloor:function(t){var i,s=10,e=$.H.mkCanvas(10*t.width,t.height),h=e.getContext("2d");for(i=0;s>i;i+=1)h.drawImage(t,t.width*i,0);return e}}),$.Bg1=$.Bg.extend({init:function(t,i){this._super(t,i);var s=20,e=t.imgs;sc=t.draw.scale,this.g=t,this.c=$.H.mkCanvas(t.w,t.h),this.ctx=this.c.getContext("2d"),this.draw=new $.Draw(this.ctx,t.w,t.h),this.ground=40,this.speed=i.speed,this.tiles=[];var h=this.makeFloor(sc(e.ground,4));for(this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:280,i:h,speed:-i.speed})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:0,i:t.draw.flip(h,0,1),speed:-i.speed})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:230,i:t.draw.scale(t.imgs.bg1,10),speed:-(i.speed/1.5)})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:41,i:t.draw.scale(t.imgs.window,8),speed:-(i.speed/2)})),this.stars=[];s--;)this.stars.push({x:$.H.rnd(0,t.w),y:$.H.rnd(0,t.h)})}}),$.Bg2=$.Bg.extend({init:function(t,i){this._super(t,i);var s=40,e=t.imgs;sc=t.draw.scale,this.g=t,this.c=$.H.mkCanvas(t.w,t.h),this.ctx=this.c.getContext("2d"),this.draw=new $.Draw(this.ctx,t.w,t.h),this.ground=40,this.speed=i.speed,this.tiles=[];var h=this.makeFloor(sc(e.ground1,4));for(this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:280,i:h,speed:-i.speed})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:0,i:t.draw.flip(h,0,1),speed:-i.speed})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:230,i:t.draw.scale(t.imgs.bg2,10),speed:-(i.speed/1.5)})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:0,i:t.draw.scale(t.imgs.window,5),speed:-(i.speed/2)})),this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:160,i:t.draw.scale(t.imgs.window,5),speed:-(i.speed/2)})),this.stars=[];s--;)this.stars.push({x:$.H.rnd(0,t.w),y:$.H.rnd(0,t.h)})}}),$.BgTitle=$.Bg.extend({init:function(t,i){this._super(t,i),this.tiles=[],this.tiles.push(new $.Tile(this.g,{ctx:this.ctx,x:0,y:-5,i:t.draw.scale(t.imgs.window,10),speed:-(i.speed/2)}))}}),$.Star=$.Sprite.extend({init:function(t,i){this._super(t,i),this.scale=6,this.group="star",this.speed=-1*t.bg.speed,this.frames=1,this.mkImg("star"),this.vx=t.bg.speed/1e3*-1,this.vy=.05*(this.x>t.w/2?1:-1)},update:function(){this._super(),this.hitGroup("player")},doDamage:function(t){var i=this.g;"player"===t.group&&(this.remove=!0,i.audio.play("powerup"),i.ents.push(new $.Msg(i,{text:this.val,col:"p",x:this.x,y:this.y})))}}),$.Battery=$.Sprite.extend({init:function(t,i){this._super(t,i),this.scale=6,this.group="battery",this.speed=-1*t.bg.speed,this.frames=1,this.mkImg("battery"),this.vx=t.bg.speed/1e3*-1,this.x=480,this.y=120},update:function(){this._super(),this.hitGroup("player")},doDamage:function(t){var i=this.g;"player"===t.group&&(this.remove=!0,i.ents.push(new $.Msg(i,{text:i.p1.doPowerup(),col:"p",x:this.x,y:this.y})))}}),$.Fader=$.Sprite.extend({init:function(t,i){this._super(t,i),this.w=0,this.h=t.h,this.remove=!1,this.col=i.col,this.cb=i.cb,this.dir=i.dir||1},update:function(){var t=this.g;this.tick=t.dt/1.5,this.w+=this.tick,this.w>t.w&&(this.cb&&this.cb(),this.remove=!0)},render:function(){var t=this.g;1===this.dir?(t.draw.rect(0,0,this.w,this.h,this.col),t.draw.rect(t.w,0,-this.w,this.h,this.col)):-1===this.dir&&(t.draw.rect(0,0,t.w-this.w,this.h,this.col),t.draw.rect(t.w,0,-(t.w-this.w),this.h,this.col))}}),$.Explosion=$.Sprite.extend({init:function(t,i){this._super(t,i),this.name="explosion",this.scale=1,this.group="na",this.startX=i.x,this.startY=i.y,this.particles=i.particles||3,this.magnitude=i.magnitude||9,this.factor=1,this.mkImg("circle"),t.emitter.particle(this.particles,this.x,this.y),t.audio.play("explode"),this.angle=0,this.grow=1},update:function(){this.g;this._super(),this.scale<=this.magnitude&&(this.scale+=this.factor),this.scale===this.magnitude&&(this.factor*=-1),this.scale<=1&&(this.remove=!0),this.mkImg("circle")},render:function(){var t=this.startX-this.w/2,i=this.startY-this.h/2,s=this.g,e=this.i;s.ctx.drawImage(e,t,i)}}),$.Msg=$.Sprite.extend({init:function(t,i){this._super(t,i),this.vy=-1,this.lifespan=2,this.ttl=this.lifespan,this.w=10,this.h=10,this.col=i.col||"w",this.f=t.mkFont(this.col,3),this.vx=-.09,this.vy=-.05},update:function(){var t=this.g;this._super(),this.x+=this.vx*t.dt,this.y+=this.vy*t.dt,this.ttl-=t.dt/1e3,this.ttl<0&&this.kill()},render:function(){var t=this.g;t.ctx.globalAlpha=this.ttl/this.lifespan,t.draw.text(this.text,this.f,this.x,this.y),t.ctx.globalAlpha=1}}),$.Robo=$.Sprite.extend({init:function(t,i){this._super(t,i),this.speed=1,this.group="player",this.frames=2,this.scale=4,this.mkImg("p1"),this.angle=0,this.speed=5,this.vy=this.speed,this.gravity=.001,this.jump=-.4,this.jumping=!1,this.flipping=!1,this.flipped=!1,this.jumpCount=0,this.jumps=0,this.flips=0,this.pause=!1,this.powerup=0,this.gun=1},update:function(){{var t=this.g;t.input.k}this.pause||(this.hitGroup("baddies"),t.doJump&&this.jumpCount<2&&this.tick>2&&(this.jumpCount+=1,this.jumping?this.jumping&&(t.audio.play("flip"),this.flips+=1,this.flipping=!0,this.gravity*=-1,this.jump*=-1,this.flipped=!this.flipped):(t.audio.play("jump"),this.jumps+=1,this.jumping=!0,this.vy=this.jump)),this._super(),this.keepOnScreen(),this.x>450&&(this.frame=1))},render:function(){this.pause||this._super()},doDamage:function(t){"baddies"===t.group&&this.kill()},receiveDamage:function(t){"baddies"===t.group&&this.kill()},kill:function(){{var t=this.g;$.H.rnd}this.dead=!0,this.remove=!0,t.bg.stop(),t.ents.push(new $.Explosion(t,{x:this.x,y:this.y})),t.shake.start(50,50)},doPowerup:function(){var t=this.g;return this.powerup+=1,this.powerup>3?(t.score+=100,100):1===this.powerup?(t.bulletInterval=100,"RAPID FIRE"):2===this.powerup?"DOUBLE SHOT":3===this.powerup?"TRIPLE SHOT":void 0}}),$.Floater=$.Sprite.extend({init:function(t,i){this._super(t,i),this.scale=$.H.rnd(2,5),this.health=10*this.scale,this.group="baddies",this.speed=1,this.frames=2,this.frameChange=10,this.mkImg("floater"),this.frameRate=120,this.x=$.H.rnd(t.w/2-this.w/2),this.y=$.H.rnd(t.h/2-this.h/2),this.setDir()},update:function(){var t=this.g;this.lastX=this.x,this.lastY=this.y,this.gravity&&(this.vy+=this.gravity),this.x+=this.vx*t.dt,this.y+=this.vy*t.dt,this.atEdget=this.keepOnScreen(),this.atEdget&&this.setDir(),this.cx=this.x+this.w/2,this.cy=this.y+this.y/2,this.tick+=1,this.frameNext<0&&(this.frameNext=this.frameRate,this.frame=this.frame===this.frames?1:this.frame+=1),this.frameNext-=t.dt,this.hurt-=t.dt},render:function(){var t=this.g,i=this.i;this.hurt>0&&(i=this.iHurt),this.flipX&&(i=t.draw.flip(i,1,0)),t.ctx.drawImage(i,this.frame*this.w-this.w,0,this.w,this.h,~~this.x,~~this.y,this.w,this.h)},receiveDamage:function(){var t=this.g;this.hurt=this.hurtTime,t.emitter.particle(2,this.x,this.y),this.health-=10,this.health<0&&(t.ents.push(new $.Msg(t,{text:10*this.scale,x:this.x,y:this.y})),t.ios||(t.shake.start(5*this.scale,5*this.scale),t.ents.push(new $.Explosion(t,{x:this.x,y:this.y}))),this.remove=!0)},kill:function(){},setDir:function(){this.vx=($.H.rnd(0,200)-100)/1e3,this.vy=($.H.rnd(0,200)-100)/1e3,this.flipX=this.vx>0?!0:!1}}),$.Crate=$.Sprite.extend({init:function(t,i){this._super(t,i),this.scale=4,this.health=10*this.scale,this.group="baddies",this.speed=-1*t.bg.speed,this.frames=1,this.mkImg("crate"),this.iHurt=t.draw.scale(t.imgs.crate_w,this.scale),this.frameRate=120,this.hurt=0,this.hurtTime=200,this.x=500,this.y=i.y||t.h-t.bg.ground-this.h,this.vx=t.bg.speed/1e3*-1},update:function(){var t=this.g;this.lastX=this.x,this.lastY=this.y,0!==t.bg.speed&&(this.x+=this.vx*t.dt),this.x<-this.w&&(this.x=2*t.w+$.H.rnd(0,t.w)),this.frameNext-=t.dt,this.hurt-=t.dt},render:function(){var t=this.g,i=this.i;this.hurt>0&&(i=this.iHurt),t.ctx.drawImage(i,this.frame*this.w-this.w,0,this.w,this.h,~~this.x,~~this.y,this.w,this.h)},receiveDamage:function(){var t=this.g;this.hurt=this.hurtTime,t.emitter.particle(2,this.x,this.y),this.health-=0,this.health<0&&(t.shake.start(5*this.scale,5*this.scale),t.ents.push(new $.Explosion(t,{x:this.x,y:this.y})),this.remove=!0)},kill:function(){}}),$.Spark=$.Sprite.extend({init:function(t,i){this._super(t,i),this.scale=4,this.health=10*this.scale,this.group="baddies",this.speed=-1*t.bg.speed,this.frames=2,this.mkImg("spark"),this.iHurt=t.draw.scale(t.imgs.spark_w,this.scale),this.hurt=0,this.hurtTime=200,this.frameRate=100,this.x=500,this.vx=t.bg.speed/1e3*-1},update:function(){var t=this.g;this._super(),this.x<-this.w&&(this.x=2*t.w)},render:function(){var t=this.g,i=this.i;this.hurt>0&&(i=this.iHurt),t.ctx.drawImage(i,this.frame*this.w-this.w,0,this.w,this.h,~~this.x,~~this.y,this.w,this.h)},receiveDamage:function(){var t=this.g;t.emitter.particle(2,this.x,this.y),this.health-=0,this.health<0&&(t.shake.start(5*this.scale,5*this.scale),t.ents.push(new $.Explosion(t,{x:this.x,y:this.y})),this.remove=!0)},kill:function(){}}),$.Drone=$.Sprite.extend({init:function(t,i){this._super(t,i),this.scale=4,this.health=5,this.group="baddies",this.speed=t.bg.speed/4*-1,this.frames=2,this.t=0,this.m=$.data.moves[i.m],this.scale=this.m.scale||4,this.flipped=this.m.flipped||0,this.mkImg(this.m.img||"drone"),this.x=i.x||this.m.sx,this.y=i.y||this.m.sy,this.t=0},update:function(){var t=this.g,i=this.m;this.t+=t.dt/1e3,this.lastX=this.x,this.lastY=this.y,this.vx=i.A+i.B*Math.sin(i.C*this.t+i.D),this.vy=i.E+i.F*Math.sin(i.G*this.t+i.H),this.x+=this.vx*(t.dt/1e3),this.y+=this.vy*(t.dt/1e3),this.x<-50&&(this.remove=!0),this.frameNext<0&&(this.frameNext=this.frameRate,this.frame=this.frame===this.frames?1:this.frame+=1),this.frameNext-=t.dt,this.hurt-=t.dt},receiveDamage:function(){var t=this.g;this.hurt=this.hurtTime,t.emitter.particle(2,this.x,this.y),this.health-=10,this.health<0&&(this.remove=!0,t.score+=10*this.scale,t.ents.push(new $.Explosion(t,{x:this.x,y:this.y})),t.ents.push(new $.Msg(t,{text:10*this.scale,x:this.x,y:this.y})),t.waves[this.waveId]-=1,t.ios||t.shake.start(5*this.scale,5*this.scale),0===t.waves[this.waveId]&&(t.score+=30*this.scale,t.ents.push(new $.Star(t,{val:30*this.scale,x:this.x,y:this.y}))))},kill:function(){}}),$.Bullet=$.Sprite.extend({init:function(t,i){this._super(t,i),this.w=i.size||8,this.h=i.size||8,this.name="bullet",this.speed=.6,this.ttl=3e3,this.group="bullets",this.scale=2,this.vx=this.speed*Math.cos(this.angle),this.vy=this.speed*Math.sin(this.angle),this.col=$.cols.zornskin,t.audio.play("shoot")},update:function(){this._super(),this.hitGroup("baddies"),this.offscreen&&this.kill(),this.ttl-=this.tick,this.ttl<0&&(this.remove=!0)},render:function(){var t=this.g,i=t.draw.scale(t.imgs.circle_w,2);this._super(),this.tick<.3&&t.ctx.drawImage(i,~~this.x,~~this.y)},keepOnScreen:function(){var t=this.g;this.x<0?this.vx*=-1:this.x>t.w-this.w&&(this.vx*=-1),this.y<0?this.vy*=-1:this.y>t.h-this.h&&(this.vy*=-1)}}),$.Portal=$.Sprite.extend({init:function(t,i){this._super(t,i),this.scale=4,this.health=10*this.scale,this.group="portal",this.speed=0,this.h=50,this.w=20,this.hide()},update:function(){this._super(),this.hitGroup("player")},show:function(){var t=this.g;this.x=t.w-this.w,this.y=t.h/2-this.h/2,this.col=$.cols.slimegreen},hide:function(){var t=this.g;this.x=-2*t.w,this.active=!1},doDamage:function(t){var i=this.g;"player"===t.group&&(this.active=!0,this.col=$.cols.pigmeat,i.score+=100,i.ents.push(new $.Msg(i,{text:"BONUS",x:this.x,y:this.y})))}}),$.Splash=$.State.extend({init:function(t){this._super(t),this.h1=t.mkFont("g",6),this.p=t.mkFont("w",2),this.fade=0,this.skull=t.draw.scale(t.imgs.skull_w,6)},update:function(){var t=this.g;this._super(),this.fade+=.05*t.dt/100,this.fade>2&&(t.audio.play("powerup"),t.changeState("Title"))},render:function(){{var t=this.g,i=this;$.cols}t.draw.rect(0,0,t.w,t.h,$.cols.black),t.ctx.globalAlpha=this.fade,t.draw.text("EOINMCG PRESENTS",this.p,!1,100),t.ctx.globalAlpha=this.fade/10,t.ctx.drawImage(this.skull,220,150),t.ctx.globalAlpha=1,i._super()}}),$.Title=$.State.extend({init:function(t){this._super(t),this.startText=t.mobile?"TAP LEFT TO START":"PRESS SPACE",this.h1=t.mkFont("g",6),this.p=t.mkFont("w",2),0===t.plays&&t.audio.say($.data.title),this.bg=new $.BgTitle(t,{speed:500,numStars:0}),this.hideText=!1},update:function(){var t=this.g;this._super(),this.bg.update(),t.doJump&&t.tick>.4&&(this.hideText=!0,t.ents.push(new $.Fader(t,{col:$.cols.black,cb:function(){t.changeState(t.plays<1?"Tutorial":"Play")}})))},render:function(){{var t=this.g,i=this;$.cols}this.bg.render(),i._super(),this.hideText||(t.draw.text("HI",this.p,40,40),t.draw.text(t.hiScore,this.p,60,40),t.ctx.globalAlpha=this.fader,t.draw.text(this.startText,this.p,!1,250),t.ctx.globalAlpha=1,t.draw.text($.data.title,this.h1,150,85))}}),$.Play=$.State.extend({init:function(t){this._super(t),this.h1=t.mkFont("g",5),this.p=t.mkFont("w",3),t.newHi=!1,t.plays+=1,t.score=0,this.levelNum=0,t.waves=[],this.p1=new $.Robo(t,{x:60,y:200}),t.p1=this.p1,t.ents.push(this.p1),this.portal=new $.Portal(t,{}),t.ents.push(this.portal),this.gameover=!1,t.state=this,this.bulletDelay=0,t.bulletInterval=200,t.audio.play("alarm"),this.nextLevel()},update:function(){var t=this.g,i=this,s=t.input,e=s.k;if(this._super(),this.bg.update(),(s.touchRight||e[16])&&this.bulletDelay<0&&!i.p1.dead&&!i.p1.pause&&(this.bulletDelay=t.bulletInterval,t.ents.push(new $.Bullet(t,{x:this.p1.x+this.p1.w/2,y:this.p1.y+this.p1.h/3,angle:0})),t.p1.powerup>1&&t.ents.push(new $.Bullet(t,{x:this.p1.x+this.p1.w/2,y:this.p1.y+this.p1.h/3,angle:-.3})),t.p1.powerup>2&&t.ents.push(new $.Bullet(t,{x:this.p1.x+this.p1.w/2,y:this.p1.y+this.p1.h/3,angle:.3}))),this.bulletDelay-=t.dt,t.p1.dead&&!this.gameover){if(this.gameover=!0,t.score>t.hiScore){t.newHi=!0,t.hiScore=t.score;try{localStorage.setItem("hiScore",t.score)}catch(h){}}t.ents.push(new $.Fader(t,{col:$.cols.bloodred,cb:function(){t.changeState("Gameover")}}))}this.gameover&&t.doJump&&t.changeState("Title"),t.distance-=t.dt,t.distance<0&&(t.p1.vx=.5,this.portal.show(),t.bg.stop()),t.p1.x>450&&(this.portal.active=!0),t.distance<-2e3&&!this.gameover&&(this.portal.active=!0),this.portal.active&&this.levelUp()},render:function(){{var t=this.g,i=this;t.ents.length,$.cols}this.bg.render(),i._super(),this.gameover||t.draw.text(t.score,this.p,40,40)},levelUp:function(){var t=this.g,i=this,s=t.ents.length;if(!t.p1.pause){for(t.audio.play("levelup"),t.p1.pause=!0;s--;)"baddies"===t.ents[s].group&&(t.ents[s].remove=!0);for(s=t.ents.length;s--;)t.ents[s].remove&&t.ents.splice(s,1);t.events=[],i.p1.x=t.w/3,i.portal.hide(),t.ents.push(new $.Fader(t,{col:$.cols.nightblue,cb:function(){t.ents.push(new $.Fader(t,{col:$.cols.nightblue,cb:function(){t.state.nextLevel(),t.p1.pause=!1},dir:-1}))}}))}},nextLevel:function(){var t,i,s=this.g,e=this;this.levelNum>$.L.length-1&&(this.levelNum=0),this.level=$.L[this.levelNum],t=this.level,"all"===t.baddies[0]&&(t.baddies=Object.keys($.data.moves)),this.bg=new $[t.bg](s,t.bgSettings),t.powerup&&s.addEvent({time:t.powerup,cb:function(){s.ents.push(new $.Battery(s,{}))}}),s.addEvent({time:2,cb:function(){for(e.spawnWave(),i=0;i<t.init.length;i+=1)s.ents.push(new $[t.init[i][0]](s,t.init[i][1]))}}),s.bg=this.bg,s.level=this.level,s.distance=s.level.distance,s.p1.x=60,s.p1.vx=0,e.portal.hide(),s.p1.pause=!1,this.levelNum+=1},spawnWave:function(){var t,i=this.g,s=this,e=this.level,h=e.waveSize,a=(new Date).getTime(),n=$.H.rndArray(e.baddies);if(!(i.distance<100||i.p1.dead||0===e.baddies.length)){for(i.waves[a]=h,t=0;t<e.waveSize;t+=1)i.addEvent({time:.2*t,cb:function(){i.ents.push(new $.Drone(i,{m:n,waveId:a,x:500}))}});i.addEvent({time:e.interval,cb:function(){s.spawnWave()}})}}}),$.Tutorial=$.State.extend({init:function(t){this._super(t),this.h1=t.mkFont("g",5),this.p=t.mkFont("w",3),this.p2=t.mkFont("p",3),this.shootKey=t.mobile?"TAP RIGHT":"SHIFT KEY",this.jumpKey=t.mobile?"TAP LEFT":"SPACE BAR",this.bg=new $.Bg1(t,{speed:200}),t.bg=this.bg,this.hideText=!1},update:function(){var t=this.g;this.bg.update(),this._super(),(t.doJump&&t.tick>1||t.tick>5)&&(this.hideText=!0,t.ents.push(new $.Fader(t,{col:$.cols.nightblue,cb:function(){t.changeState("Play")}})))},render:function(){var t=this.g;this.bg.render(),this._super(),this.hideText||(t.draw.text("HOW TO PLAY",this.h1,!1,50),t.draw.text("SHOOT",this.p,130,130),t.draw.text(this.shootKey,this.p2,230,130),t.draw.text("JUMP",this.p,130,160),t.draw.text(this.jumpKey,this.p2,230,160),t.ctx.globalAlpha=this.fader,t.draw.text("DOUBLE JUMP REVERSES GRAVITY",this.p2,!1,210),t.ctx.globalAlpha=1)}}),$.Gameover=$.State.extend({init:function(t){this._super(t),this.h1=t.mkFont("b",7),this.h2=t.mkFont("g",5),this.p=t.mkFont("w",2),this.skull=t.newHi?t.draw.scale(t.imgs.star_w,27):t.draw.scale(t.imgs.skull_w,27),t.audio.play("die")},update:function(){var t=this.g;this._super(),t.doJump&&t.tick>1&&t.ents.push(new $.Fader(t,{col:$.cols.pigmeat,dir:-1,cb:function(){t.changeState("Title")}}))},render:function(){var t=this.g;this._super(),t.draw.rect(0,0,t.w,t.h,$.cols.bloodred),t.draw.text("GAME OVER",this.h1,!1,70),t.ctx.globalAlpha=.05,t.ctx.drawImage(this.skull,220,100+20*this.fader),t.ctx.globalAlpha=1,t.newHi&&(t.ctx.globalAlpha=this.fader,t.draw.text("NEW HISCORE",this.h2,!1,170),t.ctx.globalAlpha=1)}}),$.L=[{distance:1e4,bg:"Bg1",bgSettings:{speed:400},baddies:[],waveSize:3,interval:3,init:[["Crate",{}],["Crate",{y:40}]]},{distance:1e4,bg:"Bg1",bgSettings:{speed:400},baddies:["straightBot"],waveSize:3,interval:3,init:[["Crate",{}],["Crate",{y:40}]]},{distance:1e4,bg:"Bg1",powerup:1,bgSettings:{speed:400},baddies:["sway","straightTop"],waveSize:4,interval:3,init:[["Crate",{}]]},{distance:1e4,bg:"Bg1",powerup:3,bgSettings:{speed:400},baddies:["topbot","bottop"],waveSize:5,interval:3,init:[["Spark",{y:150}]]},{distance:2e4,
bg:"Bg2",powerup:4,bgSettings:{speed:400},baddies:["topbot","bottop","circle"],waveSize:5,interval:2,init:[["Crate",{}],["Crate",{y:40}]]},{distance:2e4,bg:"Bg2",powerup:3,bgSettings:{speed:600},baddies:["all"],waveSize:5,interval:2,init:[["Crate",{}],["Crate",{y:40}]]}],$.data={title:"ROBO FLIP",i:{circle:"R0lGODlhBgAGAKEDAL4mM+uJMffia////yH5BAEKAAMALAAAAAAGAAYAAAIN3AB2EQkhRHuxLWuQKQA7",floater:"R0lGODlhDgAIAKEDAL4mMzGi8vfia////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAMALAAAAAAOAAgAAAIdXIZnuOEPIQBxVirxE4MLJ4ShwyRHhHiGUppPyxQAOw==",spark:"R0lGODlhDgAHAKECAOuJMffia////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAMALAAAAAAOAAcAAAIYxGZ4u+acWohoHgCCmE7b+4HRQ43XyRwFADs=",p1:"R0lGODlhDAAIAMIFAAUDC74mMzWADJrKH/3//P///////////yH5BAEKAAcALAAAAAAMAAgAAAMfeLonMkM5KF9sVgUS9tkdgVFj5GRlRU4RsLiHCzNKAgA7",crawler:"R0lGODlhEAAIAKECAL4mM/fia////////yH5BAEKAAIALAAAAAAQAAgAAAIZlI8Skba4WIoIAHnsc/TE/WHhFJYmZSpjAQA7",drone:"R0lGODlhEAAIAKEDAL4mM+Bvi/fia////yH5BAEKAAMALAAAAAAQAAgAAAIenBOmu4j8VBAuHSernbXhoSXASJYmMJyGurYKmhoFADs=",star:"R0lGODlhBQAFAIABAPfia////yH5BAEKAAEALAAAAAAFAAUAAAIITGCGB43OWAEAOw==",battery:"R0lGODlhAwAFAKECAESJGqPOJ////////yH5BAEKAAIALAAAAAADAAUAAAIGFAwBuZoFADs=",font:"R0lGODlhjwAFAIABAAAAAMwAACH5BAEKAAEALAAAAACPAAUAAAJ0DGKHcLzOFDRJ0UbXzdJ2lFQbRo5ipJ1TA7XsW2KanNWyZXpuzuNSz5txQDZTChSrsI6kHQpVu/wer9GvWuw5ssMp1LmbuZKeDdN4NVqT1BAydWvHi14ityTUSZHLE3El0uWHN/Vg9WYoOPe01YEl9VgVUQAAOw==",window:"R0lGODlhIAAiAKECABsmMi9ITv///////yH5BAEKAAMALAAAAAAgACIAAAJZDI6py2gNo5O0PTCy3rzviXnimB0GiXpmmLbD6rpwnM40ad9irnd8/wGcgCohixgcIpPH5cvoZEY1P2SVeAVme1td9/alhWNjGXT6VEZXTSy7An/HK5c5pQAAOw==",ground:"R0lGODlhCgAKAKECAABXhDGi8v///////yH5BAEKAAIALAAAAAAKAAoAAAIQjI+gyxztoIRvWlBlVqiHAgA7",ground1:"R0lGODlhCgAKAKEBABsmMi9ITi9ITi9ITiH5BAEKAAIALAAAAAAKAAoAAAIPhI8RoMoNo5y02vucQ7wAADs=",bg1:"R0lGODlhFAAFAIABAC9ITv///yH5BAEKAAEALAAAAAAUAAUAAAIRjI+pG+CMXnNSPTpxzZzeWgAAOw==",bg2:"R0lGODlhFAAFAIAAAC9ITi9ITiH5BAEKAAEALAAAAAAUAAUAAAIPjI+pBr0fmoRpTnpAxqYAADs=",skull:"R0lGODlhCAAIAIABAAAAAP///yH5BAEKAAEALAAAAAAIAAgAAAIOTIBoyc27nDuKJnMyMAUAOw==",crate:"R0lGODlhCgAKAKECAC9ITp2dnf///////yH5BAEKAAMALAAAAAAKAAoAAAIZXI5nAd0JEkMRiTotxuHSLoSc80hmsJhDAQA7"},sfx:{jump:[0,,.2432,,.1709,.3046,,.1919,,,,,,.5923,,,,,1,,,,,.5],flip:[0,.001,.2379,.1592,.0225,.85,,.0659,.0917,,-.6595,-.2759,.7809,.0597,.0205,.3604,-.0083,-.5261,.3385,-3e-4,.0833,,.6489,.5],powerup:[0,,.0129,.5211,.4714,.4234,,,,,,.4355,.5108,,,,,,1,,,,,.5],shoot:[2,,.1128,,.178,.7748,.0046,-.4528,,,,,,.185,.0994,,,,1,,,,,.5],explode:[3,,.3708,.5822,.3851,.0584,,-.0268,,,,-.0749,.7624,,,,,,1,,,,,.5],levelup:[1,.115,.2886,.4061,.6535,.0666,,.3295,.0262,-.0114,,.2484,.4319,.7129,-.7396,,,-.906,.9658,.1462,.6577,.0129,.0448,.56],die:[2,.1987,.388,.4366,.0335,.5072,,.1128,-.1656,.1987,,-.376,.2686,-.684,.1392,-.6819,-.8117,-.1072,.9846,.057,,.004,-.0045,.56],alarm:[1,.0241,.9846,.6067,.3041,.1838,,.0565,.1439,-.3068,.1402,.0867,.7339,.1332,-.3119,-.3257,.2875,-.0014,.5866,.0086,-.9675,.3643,,.5]},moves:{straightTop:{sx:500,sy:42,scale:4,img:"crawler",flipped:1,A:-200,B:0,C:0,D:0,E:0,F:0,G:0,H:0},straightBot:{sx:500,sy:247,scale:4,img:"crawler",A:-200,B:0,C:0,D:0,E:0,F:0,G:0,H:0},topbot:{sx:500,sy:50,scale:3,img:"floater",A:-200,B:0,C:0,D:0,E:80,F:0,G:0,H:0},bottop:{sx:500,sy:230,scale:3,img:"floater",A:-200,B:0,C:0,D:0,E:-80,F:0,G:0,H:0},sway:{sx:500,sy:60,scale:4,img:"drone",A:-100,B:0,C:0,D:0,E:0,F:360,G:4,H:0},circle:{sx:500,sy:160,scale:5,img:"drone",A:-150,B:-100,C:5,D:0,E:50,F:200,G:10,H:Math.PI/2}}},window.addEventListener("load",function(){var t=new $.Game;t.boot("Splash")},!1);