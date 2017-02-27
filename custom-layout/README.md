# 三列布局总结

三列布局类似于大号的两列布局。无论是什么布局方式，无外乎需要应用`float`、`inline-block`、`table`、`absolute`和`flex`这五种布局属性，然后再配合负`margin`、`calc()`函数、bfc、增加结构等来实现布局

-自适应包括两种情况：一种是宽度由内容撑开，一种是宽度自动撑满父元素剩余宽度

-可实现宽度由内容撑开的属性有： `float`、`inline`、`inline-block`、`table`、`table-cell`、`absolute`、`fixed`和`flex`

-可实现宽度自动撑满父元素剩余宽度的属性有： `overflow`(配合`float`)、`table`、`flex`