import menu from './menu';

/**
 * @description 菜单配置项
 * @param {object} 需要挂载的app 
 */
export default function configureMenu({ app }) {
    let template = process.platform === 'darwin' ? [menu({ app })] : []
    return [...template];
}