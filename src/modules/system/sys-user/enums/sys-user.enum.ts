export enum SysUserEnum {
  /** 菜单类型（目录） */
  TYPE_DIR = 'M',
  /** 菜单类型（菜单） */
  TYPE_MENU = 'C',
  /** 是否菜单外链（否） */
  NO_FRAME = '1',
  /** Layout组件标识 */
  LAYOUT = 'Layout',
  /** ParentView组件标识 */
  PARENT_VIEW = 'ParentView',
  /** InnerLink组件标识 */
  INNER_LINK = 'InnerLink',
  /** Jwt secret */
  JWT_SECRET = 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
}
