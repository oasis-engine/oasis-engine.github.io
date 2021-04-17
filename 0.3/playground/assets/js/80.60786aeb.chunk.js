(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{509:function(n,e,r){"use strict";r.r(e),e.default='import { OrbitControl } from "@oasis-engine/controls";\r\nimport {\r\n  AssetType,\r\n  Camera,\r\n  Color,\r\n  Entity,\r\n  Sprite,\r\n  SpriteRenderer,\r\n  SystemInfo,\r\n  Texture2D,\r\n  Vector3,\r\n  WebGLEngine\r\n} from "oasis-engine";\r\n\r\n// Create engine object\r\nconst engine = new WebGLEngine("o3-demo");\r\nengine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;\r\nengine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;\r\n\r\nconst scene = engine.sceneManager.activeScene;\r\nconst rootEntity = scene.createRootEntity();\r\n\r\n// Create camera\r\nconst cameraEntity = rootEntity.createChild("Camera");\r\ncameraEntity.transform.position = new Vector3(0, 0, 50);\r\ncameraEntity.addComponent(Camera);\r\ncameraEntity.addComponent(OrbitControl);\r\n\r\nengine.resourceManager\r\n  .load<Texture2D>({\r\n    url: "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*KjnzTpE8LdAAAAAAAAAAAAAAARQnAQ",\r\n    type: AssetType.Texture2D\r\n  })\r\n  .then((texture) => {\r\n    // Create origin sprite entity.\r\n    const spriteEntity = new Entity(engine, "spriteColor");\r\n    const spriteRenderer = spriteEntity.addComponent(SpriteRenderer);\r\n    spriteRenderer.sprite = new Sprite(engine, texture);\r\n    const color = new Color();\r\n    // Display normal\r\n    addColorEntity(spriteEntity, -20, color.setValue(1, 1, 1, 1));\r\n    // Display red\r\n    addColorEntity(spriteEntity.clone(), -10, color.setValue(1, 0, 0, 1));\r\n    // Display green\r\n    addColorEntity(spriteEntity.clone(), 0, color.setValue(0, 1, 0, 1));\r\n    // Display blue\r\n    addColorEntity(spriteEntity.clone(), 10, color.setValue(0, 0, 1, 1));\r\n    // Display alpha\r\n    addColorEntity(spriteEntity.clone(), 20, color.setValue(1, 1, 1, 0.2));\r\n  });\r\n\r\nengine.run();\r\n\r\nfunction addColorEntity(entity: Entity, posX: number, color: Color): void {\r\n  rootEntity.addChild(entity);\r\n  entity.transform.setPosition(posX, 0, 0);\r\n  entity.getComponent(SpriteRenderer).color = color;\r\n}\r\n'}}]);