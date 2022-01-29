/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string; // 当前环境
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
