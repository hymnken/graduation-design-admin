const modules = import.meta.globEager('./modules/*.js');
const staticRoutes = [];

Object.keys(modules).forEach((key) => {
    const defaultModule = modules[key].default;
    if (!defaultModule) return;
    if (defaultModule.name === 'login') return;
    const moduleList = Array.isArray(defaultModule)
        ? [...defaultModule]
        : [defaultModule];
    staticRoutes.push(...moduleList);
});

console.log('%c [ staticRoutes ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', staticRoutes)
export default staticRoutes