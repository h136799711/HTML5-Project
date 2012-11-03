MVC的说明
================================
* View结尾-主要用于页面的元素 CSS样式的控制。
* Model结尾-主要用于数据处理，保存。在controller中调用之。
* controller以Ctrl结尾的，主要用于逻辑控制，调用Model，View的方法来响应程序并有错误友好处理，

期望的用法
-----------------------------------------------------
==========
* controller期望基于View和Model。一般都要先包括View和Model的JS文件。
* Model与View期望不相干。
* 因此期望加载顺序为M,V,C或V,M,C。一般情况下只要controller的JS文件在MV之后即可。
* 后期期望将MVC放在一个文件中以，*.mvc.js为命名规则。这个文件中包含且定义的只是一组MVC类而已
* 比如IndexCtrl，IndexModel,IndexView虽然IndexCtrl使用到了AssetModel但Index.mvc.js文件内期望* * 不包含AssetModel的定义。因此要在AssetModel的JS文件加载后加载Index.mvc.js文件。
* 对于每个JS文件需要在其文件内容最上方注释依赖的其他JS文件。

变量命名的含义
-----------------------------------------------------
=========
* cls_开头指向一个类名基于页面中元素的类名 。
* id_开头指向一个ID名 基于页面中元素的ID名 。
* 以上2个期望是预先定义程序期望使用到的，因为以变量保存了页面中的类名和ID名，页面中的类名和ID名* 可以变化。

