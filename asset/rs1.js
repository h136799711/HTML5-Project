var MFG_RES_DESC= [
    {res:{//资源1
        bgs:["g/loading.jpg","bgtest.jpg"],//背景图片
        roles:["RYU1/RYU1_crouch.gif","RYU1/RYU1_wait.gif"],//角色图片
        skills:[
            {
                 name:"s_001",
                 url:"RYU1/RYU1_light_kick11.gif"
            },
            {
                 name:"s_002",
                 url:"RYU1/RYU1_light_kick.gif"
            }
            ]
         }},
    {res:{//资源2
        bgs:["g/behind.gif"],        
        roles:["RYU2/RYU2_after_impact_boxing.gif","RYU2/RYU2_after_whirl_kick.gif"],//角色图片
         skills:[
            {
                 name:"s_003",
                 url:["RYU2/RYU2_after_impact_boxing.gif"]
            },
            {
                 name:"s_004",
                 url:["RYU2/RYU2_before_fall_down.gif"]
            }
            ]
        
    }},
           ];

/**
* 程序注释中所谓资源描述符对象-
是一个JS对象用来描述程序中使用到的资源（图片、音乐的路径）
* 资源数据 []数组类型data
* 每个数组data[]中元素为一个对象res
* 对象res中包含bgs,roles,skills 3个数组类型
* bgs字符串数组类型 : 背景图片文件名
* roles字符串数组类型 : 角色图片文件名
* skills字符串数组类型，技能名， 图片路径数组,
* 技能名为 s_001 - s_999，
*/
		   //