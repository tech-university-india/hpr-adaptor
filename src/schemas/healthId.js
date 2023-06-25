const joi = require('joi');

const emptyBody = joi.object({});

const generateAadhaarOTPSchema = joi.object({
    aadhaar: joi.string() 
});

const verifyAadhaarOTPSchema = joi.object({
    domainName: joi.string() ,
    idType: joi.string() ,
    otp: joi.string() ,
    restrictions: joi.string().allow(''),
    txnId: joi.string() 
});

const mobileAuthSchema = joi.object({
    mobileNumber: joi.string().length(10) ,
    txnId: joi.string() 
});

const generateMobileOTPSchema = joi.object({
    mobile: joi.string().length(10) ,
    txnId: joi.string() 
});

const mobileOtpverifySchema = joi.object({
    txnId: joi.string() ,
    otp: joi.string() 
});

const checkHPRExistsSchema = joi.object({
    txnId: joi.string() 
});

const createHpiIdWithPreVreifiedSchema = joi.object({
    domainName: joi.string() ,
    email: joi.string().email() ,
    firstName: joi.string() ,
    hprId: joi.string() ,
    idType: joi.string() ,
    lastName: joi.string() ,
    middleName: joi.string().allow(''),
    password: joi.string() ,
    txnId: joi.string() ,
});

const RegisterToHealthProfessionalRepoSchema = joi.object({
    hprToken: joi.string() ,
    practitioner: joi.object({
      profilePhoto: joi.string().allow(''),
      healthProfessionalType: joi.string().valid('doctor') ,
      officialMobileCode: joi.string().allow(''),
      officialMobile: joi.string().pattern(/^[0-9]{10}$/) ,
      officialMobileStatus: joi.string().allow(''),
      officialEmail: joi.string().allow(''),
      officialEmailStatus: joi.string().allow(''),
      visibleProfilePicture: joi.string().allow(''),
      personalInformation: joi.object({
        salutation: joi.string() ,
        firstName: joi.string() ,
        middleName: joi.string().allow(''),
        lastName: joi.string() ,
        fatherName: joi.string() ,
        motherName: joi.string() ,
        spouseName: joi.string().allow(''),
        nationality: joi.string() ,
        placeOfBirthState: joi.string() ,
        district: joi.string().allow(''),
        subDistrict: joi.string().allow(''),
        city: joi.string().allow(''),
        languagesSpoken: joi.string() 
      }),
      addressAsPerKYC: joi.string() ,
      communicationAddress: joi.object({
        isCommunicationAddressAsPerKYC: joi.string() ,
        address: joi.string() ,
        name: joi.string() ,
        country: joi.string() ,
        state: joi.string() ,
        district: joi.string().allow(''),
        subDistrict: joi.string().allow(''),
        city: joi.string().allow(''),
        postalCode: joi.number() 
      }) ,
      contactInformation: joi.object({
        publicMobileNumber: joi.string().allow(''),
        publicMobileNumberCode: joi.string().allow(''),
        publicMobileNumberStatus: joi.string().allow(''),
        landLineNumber: joi.string().allow(''),
        landLineNumberCode: joi.string().allow(''),
        publicEmail: joi.string().allow(''),
        publicEmailStatus: joi.string().allow('')
      }) ,
      registrationAcademic: joi.object({
        category: joi.string() ,
        registrationData: joi.array().items(joi.object({
          registeredWithCouncil: joi.string() ,
          registrationNumber: joi.string() ,
          registrationCertificate: joi.string().allow(''),
          isNameDifferentInCertificate: joi.string() ,
          proofOfNameChangeCertificate: joi.string().allow(''),
          categoryId: joi.string() ,
          qualifications: joi.array().items(joi.object({
            nameOfDegreeOrDiplomaObtained: joi.string() ,
            country: joi.string() ,
            state: joi.string() ,
            college: joi.string() ,
            university: joi.string() ,
            monthOfAwardingDegreeDiploma: joi.string().allow(''),
            yearOfAwardingDegreeDiploma: joi.string() ,
            degreeCertificate: joi.string().allow(''),
            isNameDifferentInCertificate: joi.string() ,
            proofOfNameChangeCertificate: joi.string().allow('')
          })) 
        })) 
      }) ,
      specialities: joi.array().items(joi.object({
        speciality: joi.string() ,
        subSpecialities: joi.string().allow('')
      })) ,
      currentWorkDetails: joi.object({
        currentlyWorking: joi.string() ,
        purposeOfWork: joi.string() ,
        chooseWorkStatus: joi.string() ,
        reasonForNotWorking: joi.string().allow(''),
        certificateAttachment: joi.string().allow(''),
        facilityDeclarationData: joi.object({
          facilityId: joi.string() ,
          facilityName: joi.string() ,
          facilityAddress: joi.string().allow(''),
          facilityPincode: joi.string().allow(''),
          state: joi.string().allow(''),
          district: joi.string().allow(''),
          facilityType: joi.string() ,
          facilityDepartment: joi.string() ,
          facilityDesignation: joi.string() 
        }) 
      }) 
    }) 
  });


module.exports = {
    generateAadhaarOTPSchema,
    verifyAadhaarOTPSchema,
    mobileAuthSchema,
    generateMobileOTPSchema,
    mobileOtpverifySchema,
    checkHPRExistsSchema,
    createHpiIdWithPreVreifiedSchema,
    RegisterToHealthProfessionalRepoSchema,
    emptyBody
}
