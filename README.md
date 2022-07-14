### gilsaia的screeps代码仓库

目标是全自动化运行的screeps代码 

项目配置部分参考[screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter)

**注意！！！** 目前离目标非常非常遥远！ 船船新版本重构上线 请不要问什么时候重写好（

---
## 介绍
分为两层三部分
- 基础设施
- 功能模块&实体行为

每层只能调用本层和它上层的功能，任意一层的单独模块要求内聚，只调用其他模块对外暴露的接口

## 目标
- [ ] 基础设施
  - [x] 循环队列
  - [x] 状态机模型
- [ ] 功能模块
  - [x] 定时任务
  - [x] creep状态机
- [ ] 各建筑/creep tick动作