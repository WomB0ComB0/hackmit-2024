import { registerOTel } from "@vercel/otel"

export const register = async () => {
  registerOTel({ serviceName: "full-stack-template" })
}