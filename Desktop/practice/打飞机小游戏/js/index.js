window.onload=function(){
    var moveRightState=false,
        moveTopState=false,
        moveBottomState=false,
        moveLeftState=false,
        moveBulletState=false;
    //拿到页面值
    var box=document.getElementById("box"),
        start=document.getElementById('start'),
        point=document.getElementById('point'),
        span=document.getElementsByTagName('span');
    var plane;
    var bullet,
        bullets=[];
    var enemys=[];
    var pointSum=0;
    var backgroundPostion=0;
    //轮播图
    // var ul=document.getElementsByTagName('ul')[0];
    //     // li=document.getElementsByTagName('li');  
    //     ul.style.top=-1136+'px';
        
        // function lb (){
        //     ul.style.transition="2s all linear";
        //     ul.style.top=parseInt(ul.style.top)+568+'px';
        //         if(parseInt(ul.style.top)>=0){
        //             clearInterval(lbt);
        //         ul.style.transition='0s';
        //         ul.style.top=-1136+'px';
        //         lbt=setInterval(lb,2000)
        //         lb();
                
                
        //     }
            
            
        // }
        // var lbt=setInterval(lb,2000)
        // ul.transitionend=function(){
        //     if(parseInt(ul.style.top)>=0){
        //         ul.style.transition='0';
        //         ul.style.top=-598+'px';
        //         console.log(111);
                
        //     }
        // }
        //背景的移动，采用背景移动并且背景在y轴重复，最后用计时器；
        background=function (){
       
        console.log(backgroundPostion);
        backgroundPostion+=20;
        box.style.backgroundPositionY=backgroundPostion+'px';
        if(backgroundPostion>1136){
            backgroundPostion=0;
        }
    }    
    //开始游戏，改变背景，清除开始按钮
    function startGame(){
        // box.style.background=('url("./images/bg.png")');
        box.style.background=('url("./images/bg.png") repeat-y');
        setInterval(background,20);
        
        start.style.display='none';
        //将积分栏显示
        span[0].style.opacity=1;
        span[1].style.opacity=1;
        plane=new BulidPlane("./images/myplane.gif",1,8,150,500);

        setInterval(planeMove,20);//飞机的定时器;
        setInterval(bulletFly,20);
        //创建地机
        setInterval(Enemy,500);
        setInterval(enemyMove,30);
        //子弹打敌机
        setInterval(bulletHit,20);
    }
        
      //按下时做按键判断
      document.onkeydown=function (e){   //t:38 b:40 l:37 r:39
        
        if(e.keyCode==39){
            moveRightState=true;
        }else if(e.keyCode==38){
            moveTopState=true;
        }else if(e.keyCode==40){
            moveBottomState=true;
        }else if(e.keyCode==37){
            moveLeftState=true;
        }else if(e.keyCode==32){
            moveBulletState=true;
        }
        
    } 
    

        //松开时做按键判断
     document.onkeyup=function(e){
        if(e.keyCode==39){
            moveRightState=false;
        }else if(e.keyCode==38){
            moveTopState=false;
        }else if(e.keyCode==40){
            moveBottomState=false;
        }else if(e.keyCode==37){
            moveLeftState=false;
        }else if(e.keyCode==32){
            moveBulletState=false;
        }
            
        }

    //创建飞机
    function BulidPlane(imgSrc,boold,speed,positionX,positionY){
        
        this.planeNode=document.createElement('img');
        this.imgSrc=imgSrc;
        this.boold=boold;
        this.speed=speed;
        this.positionX=positionX;
        this.positionY=positionY;

        //设置初始化状态
        this.init=function(){

            this.planeNode.style.position="absolute";
            this.planeNode.src=this.imgSrc;          
            this.planeNode.style.left=this.positionX+'px';
            this.planeNode.style.top=this.positionY+'px';
            box.appendChild(this.planeNode);
            this.wdith=this.planeNode.offsetWidth;
            this.height=this.planeNode.offsetHeight;

        }
        this.init();
       
        
        //四个方向移动函数
        this.moveLeft=function (){
            var wdith=this.planeNode.offsetWidth;
            var height= this.height=this.planeNode.offsetHeight;
            if(parseInt(this.planeNode.style.left)<=-wdith/2){
                
                
                this.planeNode.style.left=-wdith/2;
            }else{
                this.planeNode.style.left=parseInt(this.planeNode.style.left)-speed+'px';
 
            }
        }
        this.moveRight=function (){
                var planeWdith=this.planeNode.offsetWidth;
                if(parseInt(plane.planeNode.style.left) >= (320-planeWdith/2)){
                    this.planeNode.style.left= 320 - planeWdith/2+'px';
                }else{
                    this.planeNode.style.left=parseInt(this.planeNode.style.left)+speed+'px';
                }
            }   
                                    
        this.moveTop=function (){
            this.planeNode.style.top=parseInt(this.planeNode.style.top)-speed+'px';
        }
        this.moveBottom=function (){
            this.planeNode.style.top=parseInt(this.planeNode.style.top)+speed+'px';
        }      
        this.shot=function (){
            var planeWdith=this.planeNode.offsetWidth;
            var x= parseInt(this.planeNode.style.left)+planeWdith/2;
            var y=parseInt(this.planeNode.style.top);
            
            //创建子弹
            bullet=new BulidBullet("./images/bullet1.png",20,x,y,1);
            bullets.push(bullet); 
        }
        
    }

    //创建子弹
    function BulidBullet(imgSrc,speed,positionX,positionY,power){
        //创建子弹
        this.bullet=document.createElement('img');
        this.imgSrc=imgSrc ||"./images/bullet1.png";
        this.speed=speed;
        this.positionX=positionX;
        this.positionY=positionY;
        this.power=power;

        this.init= function (){
            box.appendChild(this.bullet);
            var width=this.bullet.offsetWidth;
            var height=this.bullet.offsetHeight;
            this.bullet.style.position="absolute";
            this.bullet.src=this.imgSrc;
            this.bullet.style.left=this.positionX-width/2+'px';
            this.bullet.style.top=this.positionY+height+'px';
        }
        this.init();
        this.moveBullet=function(){

            this.bullet.style.top=parseInt(this.bullet.style.top)-this.speed+'px';

        }

    }
    //敌机构造函数
    // function BuildEnemy(imgSrc,speed,positionX,boold,type){
    //     this.type=type
    //     this.imgSrc=imgSrc;
    //     this.enemyNode=document.createElement('img');
    //     this.speed=speed;
    //     this.positionX=positionX;
    //     this.boold=boold;
    //     this.dieTime=10;
    //     this.init=function(){
    //         box.appendChild(this.enemyNode);
    //         this.enemyNode.src=this.imgSrc;
    //         this.enemyNode.style.position="absolute";
    //         this.enemyNode.style.top=-this.enemyNode.offsetHeight+'px';
            
            
    //         this.enemyNode.style.left=positionX;
    //         this.height=this.enemyNode.offsetHeight;
    //         this.width=this.enemyNode.width;
            
           
    //     }
    //     this.init();
    // }
    //生成敌机
    function BuildEnemy(enemy){
        //imgSrc,speed,positionX,boold,type
        this.enemy=enemy||{}; 
        this.power=this.enemy.power;
        this.type=this.enemy.type;
        this.imgSrc= this.enemy.imgSrc;
        this.enemyNode=document.createElement('img');
        this.speed= this.enemy.speed;
        this.positionX= this.enemy.positionX;
        this.boold= this.enemy.boold;
        this.point=this.enemy.point;
        this.dieTime=10;
        this.init=function(){
            box.appendChild(this.enemyNode);
            this.enemyNode.src=this.imgSrc;
            this.enemyNode.style.position="absolute";
            this.enemyNode.style.top=-this.enemyNode.offsetHeight+'px';

            this.enemyNode.style.left=this.positionX;
            this.height=this.enemyNode.offsetHeight;
            this.width=this.enemyNode.width;
            
           
        }
        this.init();
    }
    //生成敌机
    function Enemy(){
       var enemyUrl=randomUrl();
       
       
       var Enemy={       
        imgSrc:enemyUrl.url,//生成地址
        type:enemyUrl.type,
        positionX:randomNum(0,300)+'px',//随机生成x轴
        speed:enemyUrl.speed,
        boold:enemyUrl.boold,
        power:enemyUrl.power,
        point:enemyUrl.point
       }
        var enemy=new BuildEnemy(Enemy);
        enemys.push(enemy);

        
        return enemys;
    }
    
    //敌机移动
    function enemyMove(){

        for(var k=0;k<enemys.length;k++){
            if(parseInt(enemys[k].enemyNode.style.top)<568){
                enemys[k].enemyNode.style.top=parseInt(enemys[k].enemyNode.style.top)+enemys[k].speed+'px';
            }else{
                box.removeChild(enemys[k].enemyNode);
                enemys.splice(k,1);
            }
        }
    }
    
    //随机生成地址和对应的血量种类。。
    function randomUrl(){
        var x=Math.ceil(Math.random()*3);
        var allUrl=['null','./images/enemy1.png','./images/enemy3_fly_1.png','./images/enemy2_fly_1.png'];
        var enemyUrl={
            url:allUrl[x],
            type:x,
            boold:x*x*x*x,//按照下标生成血量；
            power:x,
            speed:6-x,
            point:x,
        }
        return enemyUrl;
    }
    
    //随机生成函数
    function randomNum(min,max){ 
        switch(arguments.length){ 
            case 1: 
                return Math.floor(Math.random()*minNum+1); 
            break; 
            case 2: 
                return Math.floor(Math.random()*(max-min+1)+min); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    } 
   
    //飞机移动
    planeMove=function (){
        
        
        if(moveLeftState) {plane.moveLeft()}
        else if(moveRightState) {plane.moveRight()}
        else if(moveTopState) {plane.moveTop()}
        else if(moveBottomState) {plane.moveBottom()}
         if(moveBulletState){plane.shot()}
         planeHit();
    }

     //子弹飞行函数 
    bulletFly=function(){
        
        for(var i=0;i<bullets.length;i++){
            if(parseInt(bullets[i].bullet.style.top)>0){
                bullets[i].moveBullet();
            }else{
                box.removeChild(bullets[i].bullet);
                bullets.splice(i,1);
            }
            

        }


    }
    //飞机碰撞
        function planeHit(){
        for(var i=0;i<enemys.length;i++){
            if(enemys[i].boold>0){
                var eheight=enemys[i].enemyNode.offsetHeight;
                var ewidth=enemys[i].enemyNode.offsetWidth;
                
                var pt=parseInt(plane.planeNode.style.top);
                var pl=parseInt(plane.planeNode.style.left);
                var et=parseInt(enemys[i].enemyNode.style.top);
                var el=parseInt(enemys[i].enemyNode.style.left);
                if(pt<et+eheight&&pt+plane.height>et&&pl+plane.wdith>el&&pl<el+ewidth){
                   plane.boold--;
                   if(plane.boold==0){
                        plane.planeNode.src='./images/die.gif';
                        var planeDie=setTimeout(function(){
                            box.removeChild(plane.planeNode);
                            endGame();
                        },1500)
                        
                        
                   }
                    
                }
                
            }
            
        }
    }
    //积分
    function addNum(index){
        pointSum+=enemys[index].point;
        point.innerHTML=pointSum;
    }
    //子弹碰撞函数
    bulletHit=function(){
        
        var bt,
            et;
        //利用for循环遍历子弹和敌机的位置
        for(var i=0;i<enemys.length;i++){
            for(var j=0;j<bullets.length;j++){
                if(enemys[i].boold>0&&enemys[i]){                          //判断敌机是否死亡

                    bt=parseInt(bullets[j].bullet.style.top);
                    bl=parseInt(bullets[j].bullet.style.left);
                    et=parseInt(enemys[i].enemyNode.style.top);
                    el=parseInt(enemys[i].enemyNode.style.left)
                    var eheight=enemys[i].enemyNode.offsetHeight;
                    var ewidth=enemys[i].enemyNode.offsetWidth;
                     //判断敌机碰撞
                    // var bwidth=bullets[j].bullet.style.offsetWidth;
                     if(bt<et+eheight&&bt>et&&bl>el&&bl<el+ewidth){            
                         box.removeChild(bullets[j].bullet);
                         bullets.splice(j,1);
                        enemyHited(i);
                        
                     }
                }
                    
            }
            /**
             * 这里为了避免没有子弹就不判断，所以写出来
             * 
             */
            //敌机消失
            if(enemys[i].boold==0){ 
                {
                    if(enemys[i].dieTime){
                        enemys[i].dieTime--;
                        
                        
                    }else{
                        box.removeChild(enemys[i].enemyNode);
                        enemys.splice(i,1);
                    }

            }         

            }
            
        }
    }
    
    //敌机被击中
    function enemyHited(index){
        
            enemys[index].boold--;
        if(enemys[index].boold==0){
           addNum(index);
            switch(enemys[index].type){
                case 1:enemys[index].enemyNode.src='./images/smaDie.gif';
                    break;
                case 2:enemys[index].enemyNode.src='./images/midDie.gif';
                    break;
                case 3:enemys[index].enemyNode.src='./images/bigDie.gif';
                    break;
                
            }
            // enemys[index].dieTime--;
            // if(enemys[index].dieTime<0){
                
            // }
            // box.removeChild(enemys[index].enemyNode);
            //     enemys.splice(index,1);
              
            
        }
    }

    //开始按钮
    //imgSrc,boold,speed,positionX,positionY
    start.onclick=function(){
        startGame();

    }
    function endGame(){
        // window.location.search("file:///C:/Users/peoren/Desktop/project/11.27/plane/end.html?point="+pointSum);
        window.location.replace('file:///C:/Users/peoren/Desktop/project/11.27/plane/end.html?'+pointSum);
    }
    
    
}