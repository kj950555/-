import Vue from "vue";

// 引入组件库
import {
  Button,
  Menu,
  Select,
  MenuItem,
  Submenu,
  Input,
  Option,
  Carousel,
  Row,
  Col,
  Form,
  FormItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Avatar,
  Table,
  TableColumn,
  Pagination,
  MessageBox,
  Message,
  Dialog,
  Upload,
  Divider,
  Tree,
  Notification,
  Popover,
  Tag,
  Steps,
  Step,
  Tabs,
  TabPane,
  CheckboxGroup,
  Checkbox,
  Cascader,
  InputNumber,
  Switch,
  Card
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Button)
  .use(Select)
  .use(Menu)
  .use(MenuItem)
  .use(Submenu)
  .use(Input)
  .use(Option)
  .use(Carousel)
  .use(Row)
  .use(Col)
  .use(Form)
  .use(FormItem)
  .use(MenuItemGroup)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Avatar)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(Dialog)
  .use(Upload)
  .use(Divider)
  .use(Tree)
  .use(Popover)
  .use(Tag)
  .use(Steps)
  .use(Step)
  .use(Tabs)
  .use(TabPane)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Cascader)
  .use(InputNumber)
  .use(Switch)
  .use(Card)
  
// 提示语挂载
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
