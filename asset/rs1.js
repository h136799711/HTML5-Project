var MFG_RES_DESC= [
    {res:{//资源1
        bgs:["bgtest.jpg","2.png"],//背景图片
        roles:["r1.png","r2.jpg"],//角色图片
        skills:[
            {
                 s1:"skill_name1",
                 urls:["skills_url1","skills_url1"]
            },
            {
                 s1:"skill_name2",
                 urls:["skills_url1","skills_url1"]
            }
            ]
         }},
    {res:{//资源2
        bgs:["1.jpg"],        
        roles:["r3.png","r4.jpg"],//角色图片
         skills:[
            {
                 s1:"skill_name1",
                 urls:["skills_url1","skills_url1"]
            },
            {
                 s1:"skill_name2",
                 urls:["skills_url1","skills_url1"]
            }
            ]
        
    }},
    {res:{//资源3
        bgs:["1.png","2.jpg","3.jpg"],
        roles:["r4.png","r5.jpg"],//角色图片
         skills:[
            {
                 s1:"skill_name1",
                 urls:["skills_url1","skills_url1"]
            },
            {
                 s1:"skill_name2",
                 urls:["skills_url1","skills_url1"]
            }
            ]
    }}            
           ];

/**
* 程序注释中所谓资源描述符对象-
是一个JS对象用来描述程序中使用到的资源（图片、音乐的路径）
* 资源数据 []数组类型data
* 每个数组data[]中元素为一个对象res
* 对象res中包含bgs,roles,skills 3个数组类型
* bgs字符串数组类型 : 背景图片文件名
* roles字符串数组类型 : 角色图片文件名
* 角色下标对应着资源配置中的角色数组。
* skills字符串数组类型，技能名， 图片路径数组
*/
		   //