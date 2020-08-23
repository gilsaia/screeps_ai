module.exports = function(grunt) {
    require('time-grunt')(grunt);
    // 加载个人配置
    const config=require('./.screeps.json');
    let branch = grunt.option('branch') || config.branch;
    let email = grunt.option('email') || config.email;
    let password = grunt.option('password') || config.password;
    let ptr = grunt.option('ptr') ? true : config.ptr;
    let server = grunt.option('server') || config.server;
    // 加载任务依赖
    grunt.loadNpmTasks("grunt-screeps");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 定义任务
    grunt.initConfig({
        // screeps 代码上传任务
        screeps: {
            options: {
                server: server,
                email: email,
                password: password,
                branch: branch,
                ptr: ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        },
        // 移除 dist 文件夹中的所有文件。
        clean: {
            'dist': ['dist']
        },
        // 将所有源文件复制到 dist 文件夹中并展平文件夹结构
        copy: {
            // 将游戏代码推送到dist文件夹，以便在将其发送到 screeps 服务器之前可以对其进行修改。
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src_js/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile'
                }],
            }
        },
        // 代码变更监听任务
        watch: {
            files: "src_js/*.*",
            tasks: [ "screeps" ]
        }
    });
    // 注册默认任务
    grunt.registerTask("default", ['clean', 'copy:screeps', 'screeps']);
};
