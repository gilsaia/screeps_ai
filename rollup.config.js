import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps';


// 根据指定的目标获取对应的配置项
let config;
const dest = process.env.DEST;
if (!dest) {
    console.log("No destination specified - code will be compiled but not uploaded");
} else if ((config = require("./.screeps.json")[dest]) == null) {
    throw new Error("Invalid upload destination");
}

export default {
    input: 'src_ts/main.ts',
    output: {
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: true
    },

    plugins: [
        clear({ targets: ["dist"] }),
        resolve(),
        commonjs(),
        typescript({tsconfig: "./tsconfig.json"}),
        screeps({config: config, dryRun: config == null})
    ]
}
