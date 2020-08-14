import { combineReducers } from 'redux';
import { authentication } from './auth';
import { setAlerts } from './alertBlock';
import { setAlertsToast } from './alertToast';
import { menuList } from './menu';
import { company } from './company';
import { category } from './category';
import { event } from './event'
import { venue } from './venue';
import { division } from './division';
import { departement } from './departement';
import { unitResources } from './unitResources';
import { positionLevel } from './positionLevel';
import { positionTitle } from './positionTitle';
import { staff } from './staff';
import { familyStaff } from './familyStaff';
import { educationStaff } from './educationStaff';
import { workingHistory } from './workingHistory';
import { leaveType } from './leaveType';
import { leaveApprover } from './leaveApprover';
import { academic } from './academic';
import { personalInformation } from './personalInformation';
import { positionInformation } from './positionInformation ';
import { users } from './user';
import { leaveSetting } from './leaveSetting';
import { leaveList } from './leaveList';
import { leaveBalance } from './leaveBalance';
import { activation } from './activation'
import { resetPassword } from './resetPassword'
import { appVersioning } from './appVersioning'
import { holiday } from './holiday';
import { calendar } from './calendar'

const rootReducers = combineReducers({
    authentication,
    setAlerts,
    setAlertsToast,
    menuList,
    company,
    category,
    event,
    venue,
    division,
    departement,
    unitResources,
    positionLevel,
    positionTitle,
    staff,
    familyStaff,
    personalInformation,
    positionInformation,
    educationStaff,
    workingHistory,
    leaveType,
    leaveApprover,
    leaveSetting,
    academic,
    users,
    leaveList,
    leaveBalance,
    activation,
    resetPassword,
    appVersioning,
    holiday,
    calendar
})

export default rootReducers
