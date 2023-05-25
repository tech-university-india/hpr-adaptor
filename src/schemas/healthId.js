const joi = require('joi');

const generateAadhaarOTPSchema = joi.object({
    aadhaar: joi.string().length(12).required()
});

const verifyAadhaarOTPSchema = joi.object({
    domainName: joi.string().required(),
    idType: joi.string().required(),
    otp: joi.string().required(),
    restrictions: joi.string().allow(''),
    txnId: joi.string().required()
});

const mobileAuthSchema = joi.object({
    mobileNumber: joi.string().length(10).required(),
    txnId: joi.string().required()
});

const generateMobileOTPSchema = joi.object({
    mobileNumber: joi.string().length(10).required(),
    txnId: joi.string().required()
});

const mobileOtpverifySchema = joi.object({
    txnId: joi.string().required(),
    otp: joi.string().required()
});

const checkHPRExistsSchema = joi.object({
    txnId: joi.string().required()
});

const createHpiIdWithPreVreifiedSchema = joi.object({
    domainName: joi.string().required(),
    email: joi.string().email().required(),
    firstName: joi.string().required(),
    hprId: joi.string().required(),
    idType: joi.string().required(),
    lastName: joi.string().required(),
    middleName: joi.string().allow(''),
    password: joi.string().required(),
    txnId: joi.string().required(),
});

const RegisterToHealthProfessionalRepoSchema = joi.object({
    hprToken: joi.string().required(),
    practitioner: joi.object({
      profilePhoto: joi.string().allow(''),
      healthProfessionalType: joi.string().valid('doctor').required(),
      officialMobileCode: joi.string().allow(''),
      officialMobile: joi.string().pattern(/^[0-9]{10}$/).required(),
      officialMobileStatus: joi.string().allow(''),
      officialEmail: joi.string().allow(''),
      officialEmailStatus: joi.string().allow(''),
      visibleProfilePicture: joi.string().allow(''),
      personalInformation: joi.object({
        salutation: joi.string().required(),
        firstName: joi.string().required(),
        middleName: joi.string().allow(''),
        lastName: joi.string().required(),
        fatherName: joi.string().required(),
        motherName: joi.string().required(),
        spouseName: joi.string().allow(''),
        nationality: joi.string().required(),
        placeOfBirthState: joi.string().required(),
        district: joi.string().allow(''),
        subDistrict: joi.string().allow(''),
        city: joi.string().allow(''),
        languagesSpoken: joi.string().required()
      }).required(),
      addressAsPerKYC: joi.string().required(),
      communicationAddress: joi.object({
        isCommunicationAddressAsPerKYC: joi.string().required(),
        address: joi.string().required(),
        name: joi.string().required(),
        country: joi.string().required(),
        state: joi.string().required(),
        district: joi.string().allow(''),
        subDistrict: joi.string().allow(''),
        city: joi.string().allow(''),
        postalCode: joi.number().required()
      }).required(),
      contactInformation: joi.object({
        publicMobileNumber: joi.string().allow(''),
        publicMobileNumberCode: joi.string().allow(''),
        publicMobileNumberStatus: joi.string().allow(''),
        landLineNumber: joi.string().allow(''),
        landLineNumberCode: joi.string().allow(''),
        publicEmail: joi.string().allow(''),
        publicEmailStatus: joi.string().allow('')
      }).required(),
      registrationAcademic: joi.object({
        category: joi.string().required(),
        registrationData: joi.array().items(joi.object({
          registeredWithCouncil: joi.string().required(),
          registrationNumber: joi.string().required(),
          registrationCertificate: joi.string().allow(''),
          isNameDifferentInCertificate: joi.string().required(),
          proofOfNameChangeCertificate: joi.string().allow(''),
          categoryId: joi.string().required(),
          qualifications: joi.array().items(joi.object({
            nameOfDegreeOrDiplomaObtained: joi.string().required(),
            country: joi.string().required(),
            state: joi.string().required(),
            college: joi.string().required(),
            university: joi.string().required(),
            monthOfAwardingDegreeDiploma: joi.string().allow(''),
            yearOfAwardingDegreeDiploma: joi.string().required(),
            degreeCertificate: joi.string().allow(''),
            isNameDifferentInCertificate: joi.string().required(),
            proofOfNameChangeCertificate: joi.string().allow('')
          })).required()
        })).required()
      }).required(),
      specialities: joi.array().items(joi.object({
        speciality: joi.string().required(),
        subSpecialities: joi.string().allow('')
      })).required(),
      currentWorkDetails: joi.object({
        currentlyWorking: joi.string().required(),
        purposeOfWork: joi.string().required(),
        chooseWorkStatus: joi.string().required(),
        reasonForNotWorking: joi.string().allow(''),
        certificateAttachment: joi.string().allow(''),
        facilityDeclarationData: joi.object({
          facilityId: joi.string().required(),
          facilityName: joi.string().required(),
          facilityAddress: joi.string().allow(''),
          facilityPincode: joi.string().allow(''),
          state: joi.string().allow(''),
          district: joi.string().allow(''),
          facilityType: joi.string().required(),
          facilityDepartment: joi.string().required(),
          facilityDesignation: joi.string().required()
        }).required()
      }).required()
    }).required()
  });


module.exports = {
    generateAadhaarOTPSchema,
    verifyAadhaarOTPSchema,
    mobileAuthSchema,
    generateMobileOTPSchema,
    mobileOtpverifySchema,
    checkHPRExistsSchema,
    createHpiIdWithPreVreifiedSchema,
    RegisterToHealthProfessionalRepoSchema
}
