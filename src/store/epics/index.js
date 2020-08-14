import { combineEpics } from "redux-observable";
import { RequestAuthentication } from "./epicAuthentication";
import { RequestMenuLists } from "./epicMenu";
import { RequestCompany } from "./epicCompany";
import { RequestCategory } from "./epicCategory";
import { RequestEvent } from "./epicEvent";
import { RequestVenue } from "./epicVenue";
import { RequestDivision } from "./epicDivision";
import { RequestDepartement } from "./epicDepartement";
import { RequestUnitResources } from "./epicUnitResources";
import { RequestPositionLevel } from "./epicPositionLevel";
import { RequestPositionTitle } from "./epicPositionTitle";
import { RequestStaff } from "./epicStaff";
import { RequestFamilyStaff } from "./epicFamilyStaff"
import { RequestEducationStaff } from "./epicEducation"
import { RequestMasterAcademic } from "./epicAcademic"
import { RequestPersonalInformation } from "./epicsPersonalInformation";
import { RequestWorkingHistoryStaff } from "./epicWorkingHistory"
import { RequestLeaveType } from "./epicLeaveType"
import { RequestLeaveApprover } from "./epicLeaveApprover"
import { RequestPositionInformation } from "./epicPositionInformation";
import { RequestUser } from "./epicUser"
import { RequestLeaveSetting } from "./epicLeaveSetting";
import { RequestLeaveList } from "./epicLeaveList";
import { RequestLeaveBalance } from "./epicLeaveBalance";
import { RequestActivation } from "./epicActivation";
import { RequestResetPassword } from "./epicResetPassword";
import { RequestAppVersioning } from "./epicAppVersioning";
import { RequestHoliday } from './epicHoliday';
import { RequestCalendar } from "./epicCalendar";

const setupEpic = combineEpics(
    // MODULES VARIABLE
    RequestAuthentication,
    RequestMenuLists,
    RequestCompany,
    RequestCategory,
    RequestEvent,
    RequestVenue,
    RequestDivision,
    RequestDepartement,
    RequestUnitResources,
    RequestPositionLevel,
    RequestPositionTitle,
    RequestStaff,
    RequestFamilyStaff,
    RequestEducationStaff,
    RequestMasterAcademic,
    RequestWorkingHistoryStaff,
    RequestLeaveType,
    RequestLeaveApprover,
    RequestLeaveSetting,
    RequestPersonalInformation,
    RequestPositionInformation,
    RequestUser,
    RequestLeaveList,
    RequestLeaveBalance,
    RequestActivation,
    RequestResetPassword,
    RequestAppVersioning,
    RequestHoliday,
    RequestCalendar
)

export default setupEpic