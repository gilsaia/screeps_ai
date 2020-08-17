module.exports = function(grunt) {
    var config=require('.screeps.json');
    // 加载任务依赖
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 定义任务
    grunt.initConfig({
        // screeps 代码上传任务
        screeps: {
            options: {
                server: config.server,
                email: config.email,
                password: config.password,
                branch: config.branch,
                ptr: config.ptr
            },
            dist: {
                src: ['dist/*.{js,wasm}'],
            }
        },
        // 代码变更监听任务
        watch: {
            files: "dist/*.*",
            tasks: [ "screeps" ]
        }
    });
    // 注册默认任务
    grunt.registerTask("default", ["watch"])
}
