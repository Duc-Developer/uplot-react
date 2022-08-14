import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from "rollup-plugin-postcss";
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import { getFiles } from './scripts/buildUtils';
import packageJson from "./package.json";

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

export default {
    input: [
        './src/index.ts',
        ...getFiles('./src/models', extensions),
        ...getFiles('./src/components', extensions),
        ...getFiles('./src/utils', extensions),
    ],
    output: [
        {
            dir: packageJson.main,
            format: "cjs",
            sourcemap: true
        },
        {
            dir: packageJson.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        postcss(),
        terser(),
        visualizer({
            filename: 'bundle-analysis.html',
            open: true,
        }),
    ],
    external: ['react', 'react-dom'],
};