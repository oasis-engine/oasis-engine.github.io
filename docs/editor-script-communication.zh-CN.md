---
order: 10
title: 事件通信
type: 编辑器
---

开发完的3D项目往往还需要添加到真正的业务项目中和业务代码相结合。

> Oasis 组件如何与业务代码进行双向的通信 ？

举个例子，点击业务中用 React 编写的 UI 按钮通知游戏开始，这时候就需要用到事件通信。Oasis Engine 中的 [Engine](${docs}engine-cn) 就是一个 [EventDispatcher](${docs}event-cn) 我们可以使用他作为内外部通信的媒介。

## 基本用法

- **监听事件**

```typescript
 engine.addEventListener('test', e => {
   console.log('test event triggered', e);
 });
```

- **触发事件**：

```typescript
engine.dispatch('test');
```

下面介绍 Oasis 与业务双向通信分别怎么写。

## 从外到里通信

1. 在脚本组件的[生命周期函数](${docs}script-cn#组件生命周期函数)（如 `onAwake` ）内可以监听事件：

```typescript
onAwake () {
  // 监听事件
  this.engine.addEventListener('test', e => {
    console.log('test event triggered', e);
  });
}
```

2. 在业务代码里触发事件：

```typescript
import MyOasisComponent from "MyOasisComponent";

export default ()=> {
  let engine = null

  const handleSceneLoaded = oasis => {
    // 从 oasis 对象中可以直接拿到 engine 实例
    engine = oasis.engine;
  };

  const handleClick = () => {
    // 触发事件
    engine && engine.dispatch('rotate');
  };

  return (
    < >
    <button onClick={handleClick}>旋转</button>
    <MyOasisComponent
			handleSceneLoaded={handleSceneLoaded}/>
    </>
  );
}

```


## 从里到外通信

1. 在业务代码里触发事件：

```typescript
import { Event } from 'oasis-engine';
import MyOasisComponent from "MyOasisComponent";

export default ()=> {
  let engine = null

  const handleSceneLoaded = oasis => {
    // 从 oasis 对象中可以直接拿到 engine 实例
    engine = oasis.engine;
    
    // 监听事件
    engine.addEventListener('test', e => {
      console.log('test event triggered', e);
    });
  };

  return (
    < >
    <MyOasisComponent
			handleSceneLoaded={handleSceneLoaded}/>
    </>
  );
}

```

2. 在脚本组件的[生命周期函数](${docs}script-cn)内可以触发事件：

```typescript
this.engine.dispatch('rotate');
```

## 事件测试
在 Oasis Editor 的代码编辑器中，我们提供了一个事件测试面板，用户可以使用它进行事件通信的测试：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Qg5pQ7cSrC8AAAAAAAAAAAAAARQnAQ)

3D项目中监听的事件会出现在输入事件列表中，触发的事件则会出现在输出事件面板中。

> 注意，脚本组件一定要绑定到某个实体上，才会展示事件列表。

点击输入事件列表中的事件名右侧的编辑按钮，可以配置事件参数：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*cfsMSKvFq3cAAAAAAAAAAAAAARQnAQ)

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*24eJSJ2T3oYAAAAAAAAAAAAAARQnAQ)

点击触发按钮事件就被触发了：

![image.png](https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*GP1cSq2GJuYAAAAAAAAAAAAAARQnAQ)
