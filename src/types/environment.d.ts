import 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MY_CUSTOM_VAR: string;
    }
  }
}
