import { Href } from "expo-router";

const createRoute = <T extends Record<string, Href>>(routes: T) => routes;

export const Routes = createRoute({
  PROFILE: "/profile/my-profile",
  HOME: "/home",
  TRANSACTION_HISTORY: "/transactions/transaction-history",
  SEND_MONEY: "/transactions/send-money",
  REQUEST_MONEY: "/transactions/request-money",
  TOP_UP: "/transactions/top-up",
  SUCCESS_TRANSACTION: "/transactions/success-transaction",
  BILLS: "/bills",
  SETTINGS: "/profile/settings",
  // NOTIFICATIONS: "/notifications",
  PAY_METHODS: "/profile/pay-methods",
  LOGIN: "/sign-in",
  SIGNUP: "/sign-up",
  // FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  OTP_VERIFICATION: "/verify-code",
  // RESET_PASSWORD: "/reset-password",
  CONTACT_US: "/profile/customer-care",
  CUSTOMER_SUPPORT: "/profile/customer-care",
  PRIVACY_POLICY: "/profile/privacy-policy",
});
