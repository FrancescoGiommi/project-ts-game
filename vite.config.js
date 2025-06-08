import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permette l’accesso da altri dispositivi della rete
    port: 5173, // (opzionale) imposta una porta fissa
  },
});
