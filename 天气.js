/**
 * @author 烟雨阁
 * @name 天气
 * @team 烟雨阁
 * @version 1.0
 * @description 天气查询
 * @rule ^天气([\s\S]+)$
 * @rule ^([\s\S]+)(天气)$
 * @priority 99999
 * @admin false
 * @public false
 * @classification ["工具"]
 * @disable false
 */
//code = s.param(1);  获取输入
const request = require('request');

const jsonSchema = BncrCreateSchema.object({
  app_id: BncrCreateSchema.string()
    .setTitle('自定义app_id')
    .setDescription('设置用于查询的API接口')
    .setDefault(''),
  app_secret: BncrCreateSchema.string()
    .setTitle('自定义app_secret')
    .setDescription('设置用于查询的API接口')
    .setDefault('')
});


const ConfigDB = new BncrPluginConfig(jsonSchema);

module.exports = async s => {
  await ConfigDB.get();

  const userConfig = ConfigDB.userConfig;
  if (!Object.keys(userConfig).length) {
    return s.reply('请先前往前端web界面配置插件。密钥获取地址：https://www.mxnzp.com/');
  }

  const app_id = userConfig.app_id || 'xxxx';
  const app_secret = userConfig.app_secret || 'xxxx';

  //you code
  kl = s.param(1);
  var options = {
    'method': 'POST',
    'url': 'https://www.mxnzp.com/api/weather/current/'+encodeURIComponent(kl)+'?app_id=majtlqqagnrmjo8d&app_secret=RG5lQXRCVGhRVisxbEw2dDgrbEoxQT09',
    'headers': {
    }
  };
  request(options, async (error, response) => {
    if (error) {
        console.error(error);
        return;
    }
    try {
        //转成json格式
        const data = JSON.parse(response.body);
        //打印数据
        //console.log(data);
        let dq = data.data.address
        let wd = data.data.temp
        let tq = data.data.weather
        let fx = data.data.windDirection
        let fl = data.data.windPower
        let sd = data.data.humidity
        let time = data.data.reportTime
var logs =`地区：${dq}
温度：${wd}
天气：${tq}
风向：${fx}
风力：${fl}
湿度：${sd}
发布时间：${time}`
     //打印log
     //console.log(logs)
     await s.reply(logs)
    } catch (error) {
        console.error(error);
    }
});
  //插件运行结束时 如果返回 'next' ，则继续向下匹配插件 否则只运行当前插件
  return 'next'  //继续向下匹配插件
}