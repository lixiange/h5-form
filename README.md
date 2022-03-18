This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### 适配方案
使用 vw 作为样式大小进行适配 并且 使用postcss-px-to-viewport 进行尺寸单位的自动转换。
### 实现1px 方案
具体方式在 './src/index.css/' 中可查看
### 处理元素容器宽高比
使用 postcss-aspect-ratio-mini
### html 生成图片方案 
使用 html2canvas

### 入口地址
完整项目为kcp-drainage

### 框架功能

该框架是为kcp提供多表单项目是封装的框架<br />
在项目初始化时通过path查询字符串来重定向到某一个表单。<br />
封装了表单失焦校验、获取验证码、提交表单校验等功能<br />
使用hashrouter，使用的跳转方式是路由地址后面拼接path=/kcpSales/form方式来跳转到页面，防止分享后hash路由的hash部分会丢失
