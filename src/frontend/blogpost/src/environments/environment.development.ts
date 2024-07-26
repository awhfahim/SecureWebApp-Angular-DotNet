const V1_BASE_URL = "https://localhost:7231/api/";
export const environment = {
  API_BASE_URL: {
    V1: "https://localhost:7231/api/"
  },
  V1: {
    BASE_URL: V1_BASE_URL,
    LOGIN: V1_BASE_URL.concat("auth/login"),
    SIGN_UP: V1_BASE_URL.concat("auth/signup"),
    CONFIRM_ACCOUNT: V1_BASE_URL.concat("auth/confirm"),
    FORGOT_PASSWORD: V1_BASE_URL.concat("auth/forgot-password"),
    RESET_PASSWORD: V1_BASE_URL.concat("account/reset-password"),
    RESEND_VERIFICATION_CODE: V1_BASE_URL.concat("account/resend-verification-code"),
    CHECK_TOKEN: V1_BASE_URL.concat("account/check-token"),
    LOAD_XSRF_TOKEN: V1_BASE_URL.concat("load-xsrf-token"),
    LOGOUT: V1_BASE_URL.concat("account/logout"),
    QUESTION: V1_BASE_URL.concat("question"),
    Tags: V1_BASE_URL.concat("tag/all")
  },
  RECAPTCHA_V3_SITE_KEY: "6Ley4BgqAAAAAKafD21fy7QVOOD2IV9HGOf84nqy",
  PRODUCTION: false,
};
