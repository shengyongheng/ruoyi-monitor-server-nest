import { Injectable } from '@nestjs/common';
import { SysMenuEntity } from './entities/sys-menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Meta, RouterVo } from './vo/sys-menu.vo';
import { SysUserEnum } from '../sys-user/enum/sys-user.enum';

@Injectable()
export class SysMenuService {
  constructor(
    @InjectRepository(SysMenuEntity)
    private sysMenuRepository: Repository<SysMenuEntity>,
  ) {}

  async selectMenuTreeByUserId() {
    const menus: Array<SysMenuEntity> = await this.sysMenuRepository.find({
      where: {
        // menuType: In(['M', 'C']),
        status: '0',
      },
      order: {
        parentId: 'ASC',
        orderNum: 'ASC',
      },
    });
    return this.getChildPerms(menus, '0');
  }

  getChildPerms(menus: Array<SysMenuEntity>, parentId: string) {
    const returnList: Array<SysMenuEntity> = [];
    for (const menu of menus) {
      if (menu.parentId === parentId) {
        this.recursionFn(menus, menu);
        returnList.push(menu);
      }
    }
    return returnList;
  }

  recursionFn(menus: Array<SysMenuEntity>, menu: SysMenuEntity) {
    const childList: Array<SysMenuEntity> = this.getChildList(menus, menu);
    menu.children = childList;
    for (const child of childList) {
      if (this.hasChild(menus, child)) {
        this.recursionFn(menus, child);
      }
    }
  }

  getChildList(menus: Array<SysMenuEntity>, menu: SysMenuEntity) {
    const childList: Array<SysMenuEntity> = [];
    for (const childMenu of menus) {
      if (childMenu.parentId === menu.menuId) {
        childList.push(childMenu);
      }
    }
    return childList;
  }

  hasChild(menus: Array<SysMenuEntity>, menu: SysMenuEntity) {
    return this.getChildList(menus, menu).length > 0;
  }

  buildMenus(menus: Array<SysMenuEntity>) {
    const routers: Array<RouterVo> = [];
    for (const menu of menus) {
      const router = new RouterVo();
      router.hidden = '1' !== menu.visible;
      router.name = this.getRouteName(menu);
      router.path = this.getRouterPath(menu);
      router.component = this.getComponent(menu);
      router.query = menu.query;
      const meta = new Meta();
      meta.title = menu.menuName;
      meta.icon = menu.icon;
      meta.noCache = menu.isCache === 1;
      meta.link = menu.path;
      router.meta = meta;
      const cMenus = menu.children;
      if (cMenus.length > 0 && SysUserEnum.TYPE_DIR === menu.menuType) {
        router.alwaysShow = true;
        router.redirect = 'noRedirect';
        router.children = this.buildMenus(cMenus);
      }
      if (this.isMenuFrame(menu)) {
        router.meta = undefined;
        const childrenRouters: Array<RouterVo> = [];
        const childrenRouter = new RouterVo();
        childrenRouter.path = menu.path;
        childrenRouter.component = menu.component;
        childrenRouter.name = this.getRouteName(menu);
        const meta = new Meta();
        meta.title = menu.menuName;
        meta.icon = menu.icon;
        meta.noCache = menu.isCache === 1;
        meta.link = menu.path;
        childrenRouter.query = menu.query;
        childrenRouters.push(childrenRouter);
        router.children = childrenRouters;
      }
      if (menu.parentId === '0' && this.isInnerLink(menu)) {
        const metaFir = new Meta();
        metaFir.title = menu.menuName;
        metaFir.icon = menu.icon;
        router.meta = metaFir;
        router.path = '/';
        const childrenRouters: Array<RouterVo> = [];
        const childrenRouter = new RouterVo();
        const routerPath = this.innerLinkReplaceEach(menu.path);
        childrenRouter.path = routerPath;
        childrenRouter.component = SysUserEnum.INNER_LINK;
        childrenRouter.name = this.getRouteName(menu);
        const metaSec = new Meta();
        metaSec.title = menu.menuName;
        metaSec.icon = menu.icon;
        metaSec.link = menu.path;
        router.meta = metaSec;
        childrenRouter.meta = meta;
        childrenRouters.push(childrenRouter);
        router.children = childrenRouters;
      }
      routers.push(router);
    }
    return routers;
  }

  /**
   * 获取路由名称
   *
   * @param menu 菜单信息
   * @return 路由名称
   */
  getRouteName(menu: SysMenuEntity) {
    // 非外链并且是一级目录（类型为目录）
    if (this.isMenuFrame(menu)) {
      return '';
    }
    return menu.routeName ? menu.routeName : menu.path;
  }

  /**
   * 是否为菜单内部跳转
   *
   * @param menu 菜单信息
   * @return 结果
   */
  isMenuFrame(menu: SysMenuEntity) {
    return (
      menu.parentId == '0' &&
      // eslint-disable-next-line
      SysUserEnum.TYPE_MENU === menu.menuType && menu.isFrame === SysUserEnum.NO_FRAME
    );
  }

  /**
   * 获取路由地址
   *
   * @param menu 菜单信息
   * @return 路由地址
   */
  getRouterPath(menu: SysMenuEntity) {
    let routerPath = menu.path;
    // 内链打开外网方式
    if (menu.parentId !== '0' && this.isInnerLink(menu)) {
      routerPath = this.innerLinkReplaceEach(routerPath);
    } else if (
      menu.parentId === '0' &&
      SysUserEnum.TYPE_DIR === menu.menuType &&
      menu.isFrame === SysUserEnum.NO_FRAME
    ) {
      // 非外链并且是一级目录（类型为目录）
      routerPath = '/' + menu.path;
    }
    // 非外链并且是一级目录（类型为菜单）
    else if (this.isMenuFrame(menu)) {
      routerPath = '/';
    }
    return routerPath;
  }

  /**
   * 是否为内链组件
   *
   * @param menu 菜单信息
   * @return 结果
   */
  isInnerLink(menu: SysMenuEntity) {
    return menu.isFrame === SysUserEnum.NO_FRAME && this.isHttp(menu.path);
  }

  isHttp(path: string) {
    if (!path || typeof path !== 'string') {
      return false;
    }
    // 常见实现：忽略大小写，检查前缀
    const lowerPath = path.toLowerCase();
    return lowerPath.startsWith('http://') || lowerPath.startsWith('https://');
  }

  innerLinkReplaceEach(path: string) {
    if (!path || typeof path !== 'string') return path;

    const HTTP = 'http://';
    const HTTPS = 'https://';
    const WWW = 'www.';

    let result = path;
    result = result.replace(HTTP, '');
    result = result.replace(HTTPS, '');
    result = result.replace(WWW, '');
    result = result.replace(/\./g, '/'); // 全局替换 '.' 为 '/'
    result = result.replace(/:/g, '/'); // 全局替换 ':' 为 '/'
    return result;
  }

  /**
   * 获取组件信息
   *
   * @param menu 菜单信息
   * @return 组件信息
   */
  getComponent(menu: SysMenuEntity) {
    let component: SysUserEnum | string = SysUserEnum.LAYOUT;
    if (!!menu.component && !this.isMenuFrame(menu)) {
      component = menu.component;
    } else if (
      !!menu.component &&
      menu.parentId !== '0' &&
      this.isInnerLink(menu)
    ) {
      component = SysUserEnum.INNER_LINK;
    } else if (!!menu.component && this.isParentView(menu)) {
      component = SysUserEnum.PARENT_VIEW;
    }
    return component;
  }
  /**
   * 是否为parent_view组件
   *
   * @param menu 菜单信息
   * @return 结果
   */
  isParentView(menu: SysMenuEntity) {
    return menu.parentId !== '0' && SysUserEnum.TYPE_DIR === menu.menuType;
  }
}
