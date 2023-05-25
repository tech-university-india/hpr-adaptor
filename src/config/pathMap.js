const {generateAadhaarOTPSchema,
    verifyAadhaarOTPSchema,
    mobileAuthSchema,
    generateMobileOTPSchema,
    mobileOtpverifySchema,
    checkHPRExistsSchema,
    createHpiIdWithPreVreifiedSchema,
    RegisterToHealthProfessionalRepoSchema} = require('../schemas/healthId');

const pathMap = {   
    "/v2/registration/aadhaar/generateOtp": generateAadhaarOTPSchema,
    "/v1/registration/aadhaar/verifyOTP": verifyAadhaarOTPSchema,
    "/v1/registration/aadhaar/demographicAuthViaMobile": mobileAuthSchema,
    "/v1/registration/aadhaar/generateMobileOTP": generateMobileOTPSchema,
    "/v2/registration/aadhaar/verifyMobileOTP": mobileOtpverifySchema,
    "/v2/registration/aadhaar/checkHpIdAccountExist": checkHPRExistsSchema,
    "/v1/registration/aadhaar/createHprIdWithPreVerified": createHpiIdWithPreVreifiedSchema,
    "/v1/doctors/register-professional": RegisterToHealthProfessionalRepoSchema,
    // "/v1/auth/cert": getKeySchema,
}

module.exports = pathMap;