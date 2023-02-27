import { LightningElement, api, track, wire } from "lwc";
import {
  FlowNavigationBackEvent,
  FlowNavigationNextEvent
} from "lightning/flowSupport";
import { timezoneOffsetCalculation } from './timezoneOffsetUtil';
import ReviewScreenSubject from "@salesforce/label/c.ReviewScreenSubject";
import ReviewScreenComment from "@salesforce/label/c.ReviewScreenComment";
import ReviewScreenAddress from "@salesforce/label/c.ReviewScreenAddress";
import ReviewScreenStudyAdvisorName from "@salesforce/label/c.ReviewScreenStudyAdvisorName";
import ReviewScreenSalutation from "@salesforce/label/c.ReviewScreenSalutation";
import ReviewScreenFirstName from "@salesforce/label/c.ReviewScreenFirstName";
import ReviewScreenLastName from "@salesforce/label/c.ReviewScreenLastName";
import ReviewScreeneMail from "@salesforce/label/c.ReviewScreeneMail";
import ReviewScreenPhone from "@salesforce/label/c.ReviewScreenPhone";
import ReviewScreenAppointmentStart from "@salesforce/label/c.ReviewScreenAppointmentStart";
import ReviewScreenAppointmentEnd from "@salesforce/label/c.ReviewScreenAppointmentEnd";
import ReviewScreenErrorMsgDataPrivacy from "@salesforce/label/c.ReviewScreenErrorMsgDataPrivacy";
import ReviewScreenErrorMsgMissingFields from "@salesforce/label/c.ReviewScreenErrorMissingFields";
import ReviewScreenTextDataPrivacy from "@salesforce/label/c.ReviewScreenTextDataPrivacy";
import ReviewScreenBackButton from "@salesforce/label/c.ReviewScreenBackButton";
import ReviewScreenConfirmationButton from "@salesforce/label/c.ReviewScreenConfirmationButton";
import ReviewScreenTime from "@salesforce/label/c.ReviewScreenTime";
import ReviewScreenType from "@salesforce/label/c.ReviewScreenType";
import ReviewScreenLocation from "@salesforce/label/c.ReviewScreenLocation";
import ReviewScreenDateSelection from "@salesforce/label/c.ReviewScreenDateSelection";
import ReviewScreenFieldErrorMessage from "@salesforce/label/c.ReviewScreenFieldErrorMessage";

import ReviewScreenSubjectGerman from "@salesforce/label/c.ReviewScreenSubjectGerman";
import ReviewScreenCommentGerman from "@salesforce/label/c.ReviewScreenCommentGerman";
import ReviewScreenAddressGerman from "@salesforce/label/c.ReviewScreenAddressGerman";
import ReviewScreenStudyAdvisorNameGerman from "@salesforce/label/c.ReviewScreenStudyAdvisorNameGerman";
import ReviewScreenSalutationGerman from "@salesforce/label/c.ReviewScreenSalutationGerman";
import ReviewScreenFirstNameGerman from "@salesforce/label/c.ReviewScreenFirstNameGerman";
import ReviewScreenLastNameGerman from "@salesforce/label/c.ReviewScreenLastNameGerman";
import ReviewScreenPhoneGerman from "@salesforce/label/c.ReviewScreenPhoneGerman";
import ReviewScreenAppointmentStartGerman from "@salesforce/label/c.ReviewScreenAppointmentStartGerman";
import ReviewScreenAppointmentEndGerman from "@salesforce/label/c.ReviewScreenAppointmentEndGerman";
import ReviewScreenErrorMsgDataPrivacyGerman from "@salesforce/label/c.ReviewScreenErrorMsgDataPrivacyGerman";
import ReviewScreenErrorMsgMissingFieldsGerman from "@salesforce/label/c.ReviewScreenErrorMissingFieldsGerman";
import ReviewScreenTextDataPrivacyGerman from "@salesforce/label/c.ReviewScreenTextDataPrivacyGerman";
import ReviewScreenBackButtonGerman from "@salesforce/label/c.ReviewScreenBackButtonGerman";
import ReviewScreenConfirmationButtonGerman from "@salesforce/label/c.ReviewScreenConfirmationButtonGerman";
import ReviewScreenTimeGerman from "@salesforce/label/c.ReviewScreenTimeGerman";
import ReviewScreenTypeGerman from "@salesforce/label/c.ReviewScreenTypeGerman";
import ReviewScreenLocationGerman from "@salesforce/label/c.ReviewScreenLocationGerman";
import ReviewScreenDateSelectionGerman from "@salesforce/label/c.ReviewScreenDateSelectionGerman";
import ReviewScreenFieldErrorMessageGerman from "@salesforce/label/c.ReviewScreenFieldErrorMessageGerman";
import ReviewScreenEmailValidation from "@salesforce/label/c.ReviewScreenEmailValidation";
import ReviewScreenEmailValidationGerman from "@salesforce/label/c.ReviewScreenEmailValidationGerman";
import ReviewScreenPhoneValidationGerman from "@salesforce/label/c.ReviewScreenPhoneValidationGerman";
import ReviewScreenPhoneValidation from "@salesforce/label/c.ReviewScreenPhoneValidation";
import ReviewScreenCountry from "@salesforce/label/c.ReviewScreenCountry";
import ReviewScreenCountryGerman from "@salesforce/label/c.ReviewScreenCountryGerman";
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import CountryTest__pc from '@salesforce/schema/Account.CountryTest__pc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class MacromediaReviewScreen extends LightningElement {
  label = {
    ReviewScreeneMail
  };
 @api flowCountry;
 @api recordId;
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  objectInfo;

  @wire(getPicklistValues,
      {
          recordTypeId: '$objectInfo.data.defaultRecordTypeId',
          fieldApiName: CountryTest__pc
      }
  )
 picklistValues;

 get countryValues() {
  if (this.picklistValues.data) {
      return this.picklistValues.data.values.map(value => {
          return { label: value.label, value: value.value };
      });
  }
}

  @api availableActions = [];
  @api comment;
  @api serviceTerritoryStreet;
  @api serviceTerritoryCity;
  @api serviceTerritoryState;
  @api serviceTerritoryPostalCode;
  @api serviceTerritoryCountry;
  @api appointmentType;
  @api serviceResources;
  @api salutation;
  @api firstName;
  @api lastName;
  @api personEmail;
  @api phone;
  @api schedStartTime;
  @api schedEndTime;
  @api privacyPolicy;
  @api contactId;
  @api parentRecordId;
  @api additionalInfo;
  @api serviceResourceId;
  @api ServiceTerritoryId;
  @api workTypeGroupId;
  @api serviceAppointmentFields;
  @api IsAnonymousBooking;
  @api appointmentInvitation;
  @api faultMessage;
  @api schedulingPolicyName;
  @api serviceAppointment;
  @api serviceAppointmentId;
  @api showServiceResource;
  @api timeSlotChanged;
  @api selectedTimezone;
  @api validations;
  @api workTypeId;
  @api optionalAttendees;
  @track serviceResourceName;
  @track onlineAppointment = false;
  @track showModal = false;
  @track showModalMissingFields = false;
  @api personalInfoReadOnly;
  serviceTerritoryAddress;
  @api language;
  @api semesterStartDate;
  @api location;
  @api saType;
  @api selectedStudyDateTwo;
  @api selectedStudyDate;
  @api StudyDateSelected;
  @api isSlotChanged;
  @api CountrySelected;
  @api timeZoneOffset;

  salutationMr;
  salutationMs;

  @api
  get SubjectLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenSubjectGerman;
    } else {
      return ReviewScreenSubject;
    }
  }
  @api
  get CommentLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenCommentGerman;
    } else {
      return ReviewScreenComment;
    }
  }
  @api
  get AddressLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenAddressGerman;
    } else {
      return ReviewScreenAddress;
    }
  }
  @api
  get StudyAdvisorNameLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenStudyAdvisorNameGerman;
    } else {
      return ReviewScreenStudyAdvisorName;
    }
  }
  @api
  get SalutationLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      if (this.salutation == "Mr.") {
        this.salutation = "Herr";
      } else if (this.salutation == "Ms.") {
        this.salutation = "Frau";
      }
      this.salutationMr = "Herr";
      this.salutationMs = "Frau";
      return ReviewScreenSalutationGerman;
    } else {
      if (this.salutation == "Herr") {
        this.salutation = "Mr.";
      } else if (this.salutation == "Frau") {
        this.salutation = "Ms.";
      }
      this.salutationMr = "Mr.";
      this.salutationMs = "Ms.";
      return ReviewScreenSalutation;
    }
  }
  @api
  get SalutationMr() {
    return this.salutationMr;
  }
  @api
  get SalutationMs() {
    return this.salutationMs;
  }
  @api
  get FirstNameLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenFirstNameGerman;
    } else {
      return ReviewScreenFirstName;
    }
  }
  @api
  get LastNameLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenLastNameGerman;
    } else {
      return ReviewScreenLastName;
    }
  }
  @api
  get PhoneLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenPhoneGerman;
    } else {
      return ReviewScreenPhone;
    }
  }
  @api
  get AppointmentStartLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenAppointmentStartGerman;
    } else {
      return ReviewScreenAppointmentStart;
    }
  }
  @api
  get AppointmentEndLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenAppointmentEndGerman;
    } else {
      return ReviewScreenAppointmentEnd;
    }
  }
  @api
  get ErrorMsgDataPrivacyLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenErrorMsgDataPrivacyGerman;
    } else {
      return ReviewScreenErrorMsgDataPrivacy;
    }
  }
  @api
  get ErrorMsgMissingFieldsLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenErrorMsgMissingFieldsGerman;
    } else {
      return ReviewScreenErrorMsgMissingFields;
    }
  }
  @api
  get ReviewScreenTextDataPrivacyLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenTextDataPrivacyGerman;
    } else {
      return ReviewScreenTextDataPrivacy;
    }
  }
  @api
  get BackButtonLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenBackButtonGerman;
    } else {
      return ReviewScreenBackButton;
    }
  }
  @api
  get ConfirmationButtonLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenConfirmationButtonGerman;
    } else {
      return ReviewScreenConfirmationButton;
    }
  }
  @api
  get TimeLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenTimeGerman;
    } else {
      return ReviewScreenTime;
    }
  }
  @api
  get LocationLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenLocationGerman;
    } else {
      return ReviewScreenLocation;
    }
  }
  @api
  get TypeLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenTypeGerman;
    } else {
      return ReviewScreenType;
    }
  }

  @api
  get DateSelectionLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenDateSelectionGerman;
    } else {
      return ReviewScreenDateSelection;
    }
  }

  @api
  get FieldErrorMessage() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenFieldErrorMessageGerman;
    } else {
      return ReviewScreenFieldErrorMessage;
    }
  }

  @api
  get EmailValidationErrorMessage() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenEmailValidationGerman;
    } else {
      return ReviewScreenEmailValidation;
    }
  }
  @api
  get PhoneValidationErrorMessage() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenPhoneValidationGerman;
    } else {
      return ReviewScreenPhoneValidation;
    }
  }
 @api
  get CountryLabel() {
    if (
      this.language == "Deutsch" ||
      this.language == "deutsch" ||
      this.language == "German" ||
      this.language == "german"
    ) {
      return ReviewScreenCountryGerman;
    } else {
      return ReviewScreenCountry;
    }
  }

  renderedCallback() {
    var addressArray = [
      this.serviceTerritoryStreet,
      this.serviceTerritoryCity,
      this.serviceTerritoryPostalCode,
      this.serviceTerritoryState,
      this.serviceTerritoryCountry
    ];
    addressArray = addressArray.filter((n) => n);
    this.serviceTerritoryAddress = addressArray.join(", ");
    if (this.appointmentType == "Video") {
      this.onlineAppointment = true;
    } 
  }

  handleConfirm(component, event) {
    console.log("confirm");
    this.optionalAttendees = this.optionalAttendees != null ? this.optionalAttendees : "";


    if (
      this.salutation == null ||
      this.salutation == "" ||
      this.firstName == null ||
      this.firstName == "" ||
      this.lastName == null ||
      this.lastName == "" ||
      this.personEmail == null ||
      this.personEmail == "" ||
      !this.validEmail||
      this.StudyDateSelected == null ||
      this.phone == "" ||
      this.phone == null ||
      !this.validPhone
    ) {
      this.showModal = true;
      this.showModalMissingFields = true;
     }
    else if (!this.privacyPolicy) {
      this.showModal = true;
    } else {
      if (this.availableActions.find((action) => action === "NEXT")) {
        const navigateNextEvent = new FlowNavigationNextEvent();
        try {
          this.serviceAppointmentFields = JSON.stringify({
            AdditionalInformation: this.additionalInfo,
            AppointmentType: this.appointmentType,
            Description: this.comment,
            ParentRecordId: this.parentRecordId,
            ServiceTerritoryId: this.ServiceTerritoryId,
            ServiceResourceId: this.serviceResourceId,
            WorkTypeGroupId: this.workTypeGroupId,
            SchedStartTime: this.schedStartTime,
            SchedEndTime: this.schedEndTime,
            IsAnonymousBooking: this.IsAnonymousBooking,
            Phone: this.phone,
            Email: this.personEmail,
            Street: this.serviceTerritoryStreet,
            State: this.serviceTerritoryState,
            City: this.serviceTerritoryCity,
            PostalCode: this.serviceTerritoryPostalCode,
            Country: this.serviceTerritoryCountry,
            Id: this.serviceAppointmentId,
            workTypeId: this.workTypeId,
            Scheduled: "Scheduled",
            Subject: " " + this.firstName + " " + this.lastName,
            isSlotChanged: this.isSlotChanged,
            Comments: " "
          });
          this.timeZoneOffset=timezoneOffsetCalculation(this.schedStartTime,this.selectedTimezone);    
          this.dispatchEvent(navigateNextEvent);
        } catch (ex) {
          console.log(ex);
          this.faultMessage = ex;
        }
  }
}
}

  handleBack() {
    if (this.availableActions.find((action) => action === "BACK")) {
      const navigateBackEvent = new FlowNavigationBackEvent();
      this.dispatchEvent(navigateBackEvent);
    }
  }

  handleChange(e) {
    this.privacyPolicy = e.target.checked;
  }

  changeComment(e) {
    this.comment = e.target.value;
  }

  changePhone(e) {
    this.phone = e.target.value;
   const phoneRegex=/^\+[0-9]{5,10}$/;
   const phoneField =this.template.querySelector(".phone");
   const phone=phoneField.value;
      if(phoneRegex.test(phone)){
          phoneField.setCustomValidity("");
          this.validPhone = true;
      }else{
        phoneField.setCustomValidity(this.PhoneValidationErrorMessage);
          this.validPhone = false;
      }
      phoneField.reportValidity();
  }

  changeFirstName(e) {
    this.firstName = e.target.value;
  }

  changeLastName(e) {
    this.lastName = e.target.value;
  }

  changeSalutation(e) {
    this.salutation = e.target.value;
    console.log(e.target.value);
  }
 changeEmail(e) {
   this.personEmail = e.target.value;
   const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const emailField =this.template.querySelector(".email");
   const email=emailField.value;
      if(emailRegex.test(email)){
          emailField.setCustomValidity("");
          this.validEmail = true;
      }else{
          emailField.setCustomValidity(this.EmailValidationErrorMessage);
          this.validEmail = false;
      }
      emailField.reportValidity();
  }
  
  handleChangeDate(e) {
    this.StudyDateSelected = e.target.value;
  }

 changeCountry (e) {
    this.flowCountry = e.target.value
  }

  hideModal() {
    this.showModal = false;
    this.showModalMissingFields = false;
  }

  get optionsSalutation() {
    return [
      { label: this.salutationMr, value: this.salutationMr },
      { label: this.salutationMs, value: this.salutationMs }
    ];
  }

  get options() {
    try {
      this.semesterStartDate = JSON.parse(this.semesterStartDate);
    } catch (error) {}
    var outputSemesterStartDate = [];
    for (var date of this.semesterStartDate) {
      const dateObject = {
        label: date,
        value: date
      };
      outputSemesterStartDate.push(dateObject);
    }
    return outputSemesterStartDate;
  }


}
