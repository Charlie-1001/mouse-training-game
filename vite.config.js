import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  return {
    base: command === 'serve' ? '/' : '/eduplayground/gameSources/mouse-training-game/'
  }
})