import Generator from "yeoman-generator"
import path from "path"
import fs from "fs"
export default (instance:Generator)=>{
   const templateDir= fs.readdirSync(instance.sourceRoot())
    return instance.prompt([{
        type:"input",
        name:"name",
        message:"请输入项目名称",
        default:"",
        validate:(input:string)=>{
          if (!input) {
            return '项目名不能为空！';
          }
          if (instance.fs.exists(input)) {
            return '当前目录已经存在同名项目，请换一个项目名!';
          }
          return true;
        }
    },{
        type:"input",
        name:"description",
        message:"请输入项目介绍！",
    },
    {
        type:"input",
        name:"author",
        message:"请输入作者",
        default:instance.user.git.name,
        store:false
    },
    {
        type:"list",
        name:"templateName",
        message:"请选择项目类型",
        choices:templateDir
    },
    {
        type: 'confirm',
        name: 'typescript',
        message: '是否需要使用 TypeScript?',
    },
    {
      type: 'list',
      name: 'css',
      message: '请选择 CSS 预处理器（Sass/Less）',
      choices: [
          {
            name: 'Sass',
            value: 'sass',
         },
        {
            name: 'Less',
            value: 'less',
        },
        {
            name: '无',
            value: 'none',
        }]
    }
    ])
}