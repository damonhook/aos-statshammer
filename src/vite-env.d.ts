/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_USE_MOCK_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
