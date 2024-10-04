import { Appearance } from "@clerk/types";
import { dark } from "@clerk/themes";

export const clerkAppearance: Appearance = {
  baseTheme: dark,
  layout: {
    logoPlacement: "inside",
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "iconButton",
    termsPageUrl: "https://your-terms-page.com",
    privacyPageUrl: "https://your-privacy-page.com",
  },
  variables: {
    colorPrimary: "#6366f1",
    colorTextOnPrimaryBackground: "#ffffff",
    colorBackground: "#1f2937",
    colorInputBackground: "#374151",
    colorInputText: "#ffffff",
    colorTextSecondary: "#9ca3af",
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.5rem",
  },
  elements: {
    formButtonPrimary: {
      fontSize: "16px",
      textTransform: "none",
      backgroundColor: "#6366f1",
      "&:hover": {
        backgroundColor: "#4f46e5",
      },
    },
    card: {
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      borderRadius: "0.75rem",
    },
  },
};
