

    function datas() {
        var data = {
            // home页面的个人中心
            centerArr:[
                {
                    name:'关羽管理员',
                    sex:0,
                    iden:513022189511025841,
                    office:0,
                    school:'彩虹幼儿园',
                    culture:1,
                    subject:0,
                    phone:15852495875,
                    email:'123@guanyu.com',
                    password:123456,
                    explain:'关管理英明神武，智勇双全'
                },
                {
                    name:'张飞老师',
                    sex:0,
                    iden:513022189511025841,
                    office:0,
                    school:'彩虹幼儿园',
                    culture:1,
                    subject:0,
                    phone:15852495875,
                    email:'123@zhangfei.com',
                    password:123456,
                    explain:'张老师英明神武，智勇双全'
                },
                {
                    name:'刘备园长',
                    sex:0,
                    iden:513022189511025841,
                    office:0,
                    school:'彩虹幼儿园',
                    culture:1,
                    subject:0,
                    phone:15852495875,
                    email:'123@liubei.com',
                    password:123456,
                    explain:'刘园长英明神武，智勇双全'
                }],
            // 登录权限
            users:[
                {
                    userName:'admin',
                    userPassword:123456,
                    userPower:0
                },
                {
                    userName:'teacher',
                    userPassword:123456,
                    userPower:1
                },
                {
                    userName:'master',
                    userPassword:123456,
                    userPower:2
                }
            ],
            // 不同的权限所显示的页面索引 管理员 老师 园长
            manage:[[0,1,2,3,4,5,6,7,8],[0,1,2],[0,3]]
        }
        return data;
    }
    // 获取cookie
    function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
            {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
        return "";
    }
    var data = datas();

    // 彭涛
    var msgs = [{
        name:"张飞老师",
        class_grade:"大一",
        grade:"三",
        theme:"表扬通告1",
        content:"黄双媚老师是我们班的语文老师兼班主任，她虽然严厉，可我十分敬佩她。她对我们的要求很高，常常因为我们犯下的错误而不留情面，对此，那些调皮的男生也十分怕她。可是，毕竟古有云：“严师出高徒。”黄老师这么一调教，我们班的班风还真改了不少。现在，我们六(6)班可是全校里有名的标兵班呢!不过，除了严厉，黄老师也有着温和的一面。一次，我生了病，老师便打来好几个电话，问我是不是着凉了，还提醒我要注意多喝水，待在家里好好养病，别急着上学。我很要感谢语文老师，因为她不仅把知识传授给了我们，更重要的是她还教会了我们做人的道理，为我们今后的漫漫人生路抚平了许多坎坷。!",
        time:"2019/1/10 下午5:37:22",
    },
    {
        name:"关羽管理员",
        class_grade:"大一",
        grade:"3",
        theme:"好时光2",
        content:"我园自成立招生以来，全园教职工共同努力，不断学习探索，整理思路，找准“让幼儿快乐成长，给幼儿幸福童年”，每天有进步每天有结果的工作理念，在健康、体智能引领下，全面发展得到大家的认可 自下周一11月26日至l12月6日开始预收19年春季学费，原价1600元，优惠期间1500元，凡在优惠期间一次性缴清学费的幼儿均送园服一套、精美玩具一套。 注:园服、玩具数量有限，送完为止。",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"关羽管理员",
        class_grade:"大一",
        grade:"3",
        theme:"好时光3",
        content:"我园自成立招生以来，全园教职工共同努力，不断学习探索，整理思路，找准“让幼儿快乐成长，给幼儿幸福童年”，每天有进步每天有结果的工作理念，在健康、体智能引领下，全面发展得到大家的认可 自下周一11月26日至l12月6日开始预收19年春季学费，原价1600元，优惠期间1500元，凡在优惠期间一次性缴清学费的幼儿均送园服一套、精美玩具一套。注:园服、玩具数量有限，送完为止。!",
        time:"2019/1/1 下午5:37:22",
    },
    {
        name:"关羽管理员",
        class_grade:"大一",
        grade:"3",
        theme:"好时光4",
        content:"这几天由于天气炎热和那个什么甲型H1N1流感病毒，学校几乎没怎么上课，作业也少得可怜。大家都至呼“爽”，可我却没那么安逸了。今天是一个好日子，太阳很大，晒的人暖洋洋的，不想动只想睡觉，舒舒服服的睡大觉，玩游戏，刨手机，这样的时光真是美滋滋!",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"张飞老师",
        class_grade:"大一",
        grade:"3",
        theme:"办学公告2",
        content:"为引导各类学期教育机构依法依规办学，进一步规范学前教育管理，加强社会监督，提供便民服务，促进我市学前教育健康有序发展。依照《深圳市学前教育办学信息公开管理办法》（深教规〔2018〕3号）的有关规定，现将全市经教育行政部门批准设立的幼儿园自2017年9月至2018年9月的办学基本信息予以公告 ",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"关羽管理员",
        class_grade:"大一",
        grade:"三",
        theme:"教育局通知",
        content:"各区教育局、各新区公共事业局：为全面实施第二期学前教育发展行动计划，进一步扩大普惠性幼儿园（以下简称“普惠园”）覆盖面，经幼儿园自愿申报、各区认真审核认定，2016年全市共新增普惠园223所。现将深圳市福田区林海幼儿园等223所新增普惠园名单予以公布。各区应按照《深圳市普惠性幼儿园管理暂行办法》的要求，结合积分值管理和年检等工作，继续重视和加强普惠园管理人员和师资队伍建设，加强幼儿园内部管理与保教工作指导，督促普惠园全面履行办学承诺。要进一步完善普惠园奖励性补助经费使用办法，及时落实发放奖励性补助经费，监督指导幼儿园严格执行财务制度，规范经费管理，做到专款专用各区要按照广东省及我市提出的2017年普惠园建设任务目标，认真推进普惠园建设工作，进一步强化普惠园在我市学前教育公共服务体系中的主体地位，努力满足适龄儿童就近接受普惠性学前教育公共服务的需求。!",
        time:"2015/1/8 下午5:37:22",
    },
    {
        name:"张飞老师",
        class_grade:"大一",
        grade:"三",
        theme:"好时光3",
        content:"2017年8月24日 - 学校的通告范文 经学校研究决定将于本月月底举行春季运动会,具体比赛项目另行通告,望各位老师及同学高度重视,积极参与,各班报名截止日 月xx日。望...",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"刘备园长",
        class_grade:"大一",
        grade:"3",
        theme:"好时光8",
        content:"黄双媚老师是我们班的语文老师兼班主任，她虽然严厉，可我十分敬佩她。她对我们的要求很高，常常因为我们犯下的错误而不留情面，对此，那些调皮的男生也十分怕她。可是，毕竟古有云：“严师出高徒。”黄老师这么一调教，我们班的班风还真改了不少。现在，我们六(6)班可是全校里有名的标兵班呢!不过，除了严厉，黄老师也有着温和的一面。一次，我生了病，老师便打来好几个电话，问我是不是着凉了，还提醒我要注意多喝水，待在家里好好养病，别急着上学。我很要感谢语文老师，因为她不仅把知识传授给了我们，更重要的是她还教会了我们做人的道理，为我们今后的漫漫人生路抚平了许多坎坷。",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"张飞老师",
        class_grade:"大一",
        grade:"3",
        theme:"好时光4",
        content:"今天是一个好日子，太阳很大，晒的人暖洋洋的，不想动只想睡觉，舒舒服服的睡大觉，玩游戏，刨手机，这样的时光真是美滋滋!",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"刘备园长",
        class_grade:"大一",
        grade:"3",
        theme:"好时光10",
        content:"　一、五·一小长假即将来临，按照国家放假规定，结合我校实际，现将五·一放假及返校时间通知如下：1、放假时间：4月27日下午2：30(小学部)、3：30(初中部六、七年级)，八、九年级放假时间为4月28日下午3：302、返校时间：5月2日上午8：00(初中部)、9：00(小学部)。3、请各位家长按时接送孩子上下学，遵守交通规则，路上注意安全。　二、我校定于4月27日全天举行幼儿园大型亲子活动“梦幻海、陆、空”，届时诚邀各位家长朋友前来参观指导。举行时间：上午9：00，下午2：30;地点：学校操场(五环起舞体育场)。特此通知",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"刘备园长",
        class_grade:"大一",
        grade:"3",
        theme:"天气",
        content:"今天是一个好日子，太阳很大，晒的人暖洋洋的，不想动只想睡觉，舒舒服服的睡大觉，玩游戏，刨手机，这样的时光真是美滋滋!",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"音乐老师",
        class_grade:"大一",
        grade:"3",
        theme:"时间",
        content:"时光，像悠悠西去的泉水，流过了六个春秋的童年。它带走了我们曾经的懵懂无知，却带不走我对恩师的依恋。小学六年漫长的时光里，这些老师为我的学习付出了许多辛劳，可是，我最要感谢的便是如今六年级的语数英三科老师了。",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"刘备园长",
        class_grade:"大一",
        grade:"3",
        theme:"好时光10",
        content:"今天是一个好日子，太阳很大，晒的人暖洋洋的，不想动只想睡觉，舒舒服服的睡大觉，玩游戏，刨手机，这样的时光真是美滋滋!",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"刘备园长",
        class_grade:"大一",
        grade:"3",
        theme:"好时光10",
        content:"今天是一个好日子，太阳很大，晒的人暖洋洋的，不想动只想睡觉，舒舒服服的睡大觉，玩游戏，刨手机，这样的时光真是美滋滋!",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"音乐老师",
        class_grade:"大一",
        grade:"3",
        theme:"感谢信",
        content:"黄双媚老师是我们班的语文老师兼班主任，她虽然严厉，可我十分敬佩她。她对我们的要求很高，常常因为我们犯下的错误而不留情面，对此，那些调皮的男生也十分怕她。可是，毕竟古有云：“严师出高徒。”黄老师这么一调教，我们班的班风还真改了不少。现在，我们六(6)班可是全校里有名的标兵班呢!不过，除了严厉，黄老师也有着温和的一面。一次，我生了病，老师便打来好几个电话，问我是不是着凉了，还提醒我要注意多喝水，待在家里好好养病，别急着上学。我很要感谢语文老师，因为她不仅把知识传授给了我们，更重要的是她还教会了我们做人的道理，为我们今后的漫漫人生路抚平了许多坎坷。",
        time:"2019/1/7 下午5:37:22",
    },
    {
        name:"张飞老师",
        class_grade:"大一",
        grade:"三",
        theme:"表扬通告5",
        content:"黄双媚老师是我们班的语文老师兼班主任，她虽然严厉，可我十分敬佩她。她对我们的要求很高，常常因为我们犯下的错误而不留情面，对此，那些调皮的男生也十分怕她。可是，毕竟古有云：“严师出高徒。”黄老师这么一调教，我们班的班风还真改了不少。现在，我们六(6)班可是全校里有名的标兵班呢!不过，除了严厉，黄老师也有着温和的一面。一次，我生了病，老师便打来好几个电话，问我是不是着凉了，还提醒我要注意多喝水，待在家里好好养病，别急着上学。我很要感谢语文老师，因为她不仅把知识传授给了我们，更重要的是她还教会了我们做人的道理，为我们今后的漫漫人生路抚平了许多坎坷。!",
        time:"2019/1/10 下午5:37:22",
    },
    {
        name:"关羽管理员",
        class_grade:"大一",
        grade:"3",
        theme:"好时光2",
        content:"我园自成立招生以来，全园教职工共同努力，不断学习探索，整理思路，找准“让幼儿快乐成长，给幼儿幸福童年”，每天有进步每天有结果的工作理念，在健康、体智能引领下，全面发展得到大家的认可 自下周一11月26日至l12月6日开始预收19年春季学费，原价1600元，优惠期间1500元，凡在优惠期间一次性缴清学费的幼儿均送园服一套、精美玩具一套。 注:园服、玩具数量有限，送完为止。",
        time:"2019/1/7 下午5:37:22",
    }]
    
    // 何经纬
    var gIndex=7;
    var index=12;
    var header=[];
    var Class=[{
                name:'张三',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'大班',
                garde:'一班',
                parent:'张总',
                tel:'18283600769',
                birthday:'2018-04-05',
                location:'成都',
                index:'0',
            },
            {
                name:'张一',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'大班',
                garde:'一班',
                parent:'张总',
                tel:'18283600444',
                birthday:'2018-04-05',
                location:'成都',
                index:'1',
            },
            {
                name:'张二',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'大班',
                garde:'二班',
                parent:'东陈',
                tel:'18283611767',
                birthday:'2018-04-05',
                location:'成都',
                index:'2',
            },
            {
                name:'张五',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'大班',
                garde:'一班',
                parent:'陈东',
                tel:'18283550767',
                birthday:'2018-04-05',
                location:'成都',
                index:'3',
            },
            {
                name:'王一',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'小班',
                garde:'二班',
                parent:'东陈',
                tel:'18288800767',
                birthday:'2018-04-05',
                location:'成都',
                index:'4',
            },
            {
                name:'王二',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'小班',
                garde:'一班',
                parent:'东陈',
                tel:'18283600767',
                birthday:'2018-04-05',
                location:'成都',
                index:'5',
            },
            {
                name:'吱吱',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'小班',
                garde:'二班',
                parent:'东陈',
                tel:'18283600767',
                birthday:'2018-04-05',
                location:'成都',
                index:'6',
            },
            {
                name:'意意',
                startTime:'2019-01-01',
                endTime:'2017-01-02',
                state:'正常',
                classType:'大班',
                garde:'一班',
                parent:'东东',
                tel:'18283600767',
                birthday:'2018-04-05',
                location:'成都',
                index:'7',
            },
            {
                name:'照照',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'小班',
                garde:'二班',
                parent:'靖威',
                tel:'18283600767',
                birthday:'2018-04-05',
                location:'成都',
                index:'8',
            },
            {
                name:'赵紫阳',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'大班',
                garde:'二班',
                parent:'靖威',
                tel:'18283600767',
                birthday:'2018-04-05',
                location:'成都',
                index:'9',
            },
            {
                name:'赵二',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'小班',
                garde:'一班',
                parent:'靖威',
                tel:'18283600767',
                birthday:'2018-04-05',
                location:'成都',
                index:'10',
            },
            {
                name:'赵紫二',
                startTime:'2019-01-01',
                endTime:'2017-1-2',
                state:'正常',
                classType:'大班',
                garde:'二班',
                parent:'靖靖',
                tel:'18283600767',
                birthday:'2018-04-05',
                location:'成都',
                index:'11',
            }
        ]



/**
 * 学生的构造函数
 * @param {string} name 
 * @param {string} startTime 
 * @param {string} endTime 
 * @param {string} state 
 */            
function Student(name,startTime,endTime,state,classType,garde,parent,tel,birthday,location){
    this.name=name;
    this.startTime=startTime;
    this.endTime=endTime;
    this.state=state;
    this.index=index;
    this.classType=classType;
    this.garde=garde;
    this.parent=parent;
    this.tel=tel;
    this.birthday=birthday;
    this.location=location;
    index++;
}          
var Garde=[{
    gIndex:'0',
    name:'一班',
    teacher:'赵志意',
    classType:'大班',
    startTime:'2019-01-02',
    gNum:'15',
},
{
    gIndex:'1',
    name:'二班',
    teacher:'意志坚',
    classType:'大班',
    startTime:'2019-01-02',
    gNum:'18',
    
},
{
    gIndex:'2',
    name:'三班',
    teacher:'残志强',
    classType:'小班',
    startTime:'2019-01-02',
    gNum:'15',
    
},
{
    gIndex:'3',
    name:'四班',
    teacher:'意志坚',
    classType:'大班',
    startTime:'2019-01-02',
    gNum:'14',
    
},
{
    gIndex:'4',
    name:'五班',
    teacher:'残志强',
    classType:'小班',
    startTime:'2019-01-02',
    gNum:'15',
    
},{
    gIndex:'5',
    name:'六班',
    teacher:'意志坚',
    classType:'小班',
    startTime:'2019-01-02',
    gNum:'18',
    
},
{
    gIndex:'6',
    name:'七班',
    teacher:'残志强',
    classType:'小班',
    startTime:'2019-01-02',
    gNum:'15',
    
},]
function GardeClass(name,teacher,classType,startTime,gNum){
this.teacher=teacher;
this.gIndex=gIndex;
this.name=name;
this.classType=classType;
this.startTime=startTime;
this.gNum=gNum;
gIndex++;
}
var personAll = [
    {name:'姓名',sex:'性别',pho:'手机号码',department:'部门',post:'职务',power:'权限',date:'出生日期',email:'邮箱'},
    {name:'赵志意',sex:'男',pho:'18434563245',department:'教育科',post:'教师',power:'园长',date:"1995-02-03",email:'1234@qq.com'},
    {name:'意志坚',sex:'男',pho:'18434563245',department:'教育科',post:'年级主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'残志强',sex:'男',pho:'18434563245',department:'教育科',post:'教务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'小李',sex:'男',pho:'18434563245',department:'保卫科',post:'保安',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'小红',sex:'男',pho:'18434563245',department:'保卫科',post:'保安队长',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'小白',sex:'男',pho:'18434563245',department:'财务部',post:'财务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'红红',sex:'男',pho:'18434563245',department:'财务部',post:'会计',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'月月',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁员',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'东东',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁队长',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'威威',sex:'男',pho:'18434563245',department:'行政部',post:'人事专员',power:'园长',date:"1995-02-03",email:'1234@qq.com'},
    {name:'齐齐',sex:'男',pho:'18434563245',department:'行政部',post:'秘书',power:'园长',date:"1995-02-03",email:'1234@qq.com'},
    {name:'涛涛',sex:'男',pho:'18434563245',department:'行政部',post:'书记',power:'园长',date:"1995-02-03",email:'1234@qq.com'},
    {name:'竹竹',sex:'男',pho:'18434563245',department:'教育科',post:'教师',power:'园长',date:"1995-02-03",email:'1234@qq.com'},
    {name:'龙泰13',sex:'男',pho:'18434563245',department:'教育科',post:'年级主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'龙泰14',sex:'男',pho:'18434563245',department:'教育科',post:'教务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'龙泰15',sex:'男',pho:'18434563245',department:'保卫科',post:'保安',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷1',sex:'男',pho:'18434563245',department:'保卫科',post:'保安队长',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷2',sex:'男',pho:'18434563245',department:'财务部',post:'财务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷3',sex:'男',pho:'18434563245',department:'财务部',post:'会计',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷4',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁员',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷5',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁队长',power:'园长',date:'1995-02-03',email:'1234@qq.com'},  
    {name:'绿谷6',sex:'男',pho:'18434563245',department:'教育科',post:'年级主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷7',sex:'男',pho:'18434563245',department:'教育科',post:'教务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷8',sex:'男',pho:'18434563245',department:'保卫科',post:'保安',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷9',sex:'男',pho:'18434563245',department:'保卫科',post:'保安队长',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷10',sex:'男',pho:'18434563245',department:'财务部',post:'财务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷11',sex:'男',pho:'18434563245',department:'财务部',post:'会计',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷12',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁员',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'绿谷13',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁队长',power:'园长',date:'1995-02-03',email:'1234@qq.com'},
    {name:'好羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'人事专员',power:'园长',date:"1995-02-03",email:'1234@qq.com'},
    {name:'美羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'秘书',power:'园长',date:"1995-02-03",email:'1234@qq.com'},
    {name:'喜羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'书记',power:'园长',date:"1995-02-03",email:'1234@qq.com'},
   
   
]

//部门管理数据
var $doc_add = [
    {
        docname: "行政部",
        docdec: "行政部行政部行政部行政部行政部行政部行政"
    },
    {
        docname: "财务部",
        docdec: "财务部财务部财务部财务部财务部财务部财务"
    },
    {
        docname: "后勤部",
        docdec: "后勤部后勤部后勤部后勤部后勤部后勤部后勤"
    },
    {
        docname: "教育科",
        docdec: "教育部教育部教育部教育部教育部教育部教育"
    },
    {
        docname: "保卫科",
        docdec: "保卫科保卫科保卫科保卫科保卫科保卫科保卫"
    }
    ];
    var personA = [
        {name:'姓名',sex:'性别',pho:'手机号码',department:'部门',post:'职务',power:'权限',date:'出生日期',email:'邮箱',state:'激活状态'},
        {name:'赵志意',sex:'男',pho:'18434563245',department:'教育科',post:'教师',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'是'},
        {name:'意志坚',sex:'男',pho:'18434563245',department:'教育科',post:'年级主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'否'},
        {name:'残志强',sex:'男',pho:'18434563245',department:'教育科',post:'教务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'小李',sex:'男',pho:'18434563245',department:'保卫科',post:'保安',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'小红',sex:'男',pho:'18434563245',department:'保卫科',post:'保安队长',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'否'},
        {name:'小白',sex:'男',pho:'18434563245',department:'财务部',post:'财务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'红红',sex:'男',pho:'18434563245',department:'财务部',post:'会计',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'月月',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁员',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'否'},
        {name:'东东',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁队长',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'否'},
        {name:'威威',sex:'男',pho:'18434563245',department:'行政部',post:'人事专员',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'是'},
        {name:'齐齐',sex:'男',pho:'18434563245',department:'行政部',post:'秘书',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'是'},
        {name:'涛涛',sex:'男',pho:'18434563245',department:'行政部',post:'书记',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'否'},
        {name:'竹竹',sex:'男',pho:'18434563245',department:'教育科',post:'教师',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'是'},
        {name:'龙泰13',sex:'男',pho:'18434563245',department:'教育科',post:'年级主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'否'},
        {name:'龙泰14',sex:'男',pho:'18434563245',department:'教育科',post:'教务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'龙泰15',sex:'男',pho:'18434563245',department:'保卫科',post:'保安',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'否'},
        {name:'绿谷1',sex:'男',pho:'18434563245',department:'保卫科',post:'保安队长',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷2',sex:'男',pho:'18434563245',department:'财务部',post:'财务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷3',sex:'男',pho:'18434563245',department:'财务部',post:'会计',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷4',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁员',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷5',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁队长',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},  
        {name:'绿谷6',sex:'男',pho:'18434563245',department:'教育科',post:'年级主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷7',sex:'男',pho:'18434563245',department:'教育科',post:'教务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷8',sex:'男',pho:'18434563245',department:'保卫科',post:'保安',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'否'},
        {name:'绿谷9',sex:'男',pho:'18434563245',department:'保卫科',post:'保安队长',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷10',sex:'男',pho:'18434563245',department:'财务部',post:'财务主任',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷11',sex:'男',pho:'18434563245',department:'财务部',post:'会计',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'否'},
        {name:'绿谷12',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁员',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'绿谷13',sex:'男',pho:'18434563245',department:'后勤部',post:'保洁队长',power:'园长',date:'1995-02-03',email:'1234@qq.com',state:'是'},
        {name:'好羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'人事专员',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'是'},
        {name:'美羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'秘书',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'否'},
        {name:'喜羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'书记',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'是'},
        {name:'懒羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'人事专员',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'是'},
        {name:'老羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'秘书',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'否'},
        {name:'白羊羊',sex:'男',pho:'18434563245',department:'行政部',post:'书记',power:'园长',date:"1995-02-03",email:'1234@qq.com',state:'是'},
    ]