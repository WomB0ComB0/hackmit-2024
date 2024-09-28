import { registerOTel } from "@vercel/otel"

export const register = async () => {
  registerOTel({ serviceName: "fraud-guard-hackmit-2024" })
}