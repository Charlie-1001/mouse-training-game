import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  return {
    base: command === 'serve' ? '/' : '/eduplayground/gameSources/ict-games/mouse-training-game/'
  }
})