// 导入state文件
import {state} from './state'
// 导入mutations文件
import {mutations} from './mutations'
export const menuModule = {
    namespaced:true,
    state,
    mutations
}