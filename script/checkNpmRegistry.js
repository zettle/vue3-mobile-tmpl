if (!process.env.npm_config_registry.includes('npm.taobao')) {
  console.warn('请切换成 taobao 源再安装');
  process.exit(1);
}
