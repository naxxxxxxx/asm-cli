// 主的流程控制
let apply = (action, ...args) => {
    require(`./${action}`)(...args);
};
export default apply;