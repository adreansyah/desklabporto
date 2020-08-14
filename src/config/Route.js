import React from 'react'
/*public components*/
const Login = React.lazy(() => import('page/login'))
const Activated = React.lazy(() => import('page/activated'))
const ResetPassword = React.lazy(() => import('page/resetPassword'))
/*private components*/
const Error = React.lazy(() => import('page/errorLayout'))
const Home = React.lazy(() => import('page/home'))
const Menu = React.lazy(() => import('page/menu'))
const Company = React.lazy(() => import('page/company'))
const User = React.lazy(() => import('page/user'))
const Category = React.lazy(() => import('page/category'))
const Event = React.lazy(() => import('page/event'))
const Venue = React.lazy(() => import('page/venue'))
const Division = React.lazy(() => import('page/division'))
const Departement = React.lazy(() => import('page/departement'))
const Unitresources = React.lazy(() => import('page/unitresources'))
const PositionLevel = React.lazy(() => import('page/positionlevel'))
const PositionTitle = React.lazy(() => import('page/positiontitle'))
const Staffing = React.lazy(() => import('page/staff'))
const DetailStaff = React.lazy(() => import('page/detailstaff'))
const LeaveType = React.lazy(() => import('page/leave/type/LeaveType'))
const LeaveApprover = React.lazy(() => import('page/leave/approver/LeaveApprover'))
const AttendaceList = React.lazy(() => import('page/attendancelist'));
const AttendaceSetting = React.lazy(() => import('page/attendancesetting'));
const LeaveSetting = React.lazy(() => import('page/leave/setting/leaveSetting'));
const LeaveRequest = React.lazy(() => import('page/leave/request/LeaveRequest'));
const LeaveBalance = React.lazy(() => import('page/leave/balance/leaveBalance'));
const Academic = React.lazy(() => import('page/academic'))
const Versioning = React.lazy(() => import('page/versioning'));
const Holiday = React.lazy(() => import('page/holiday'));
const Calendar = React.lazy(() => import('page/calendar'))

const publicRoute = [
  { exact: true, path: '/login', name: 'Login', component: Login },
  { exact: true, path: '/activate/:hashKey', name: 'Aktivasi', component: Activated },
  { exact: true, path: '/reset-password/:hashKey', name: 'Reset Password', component: ResetPassword },
]

const privateRoute = [
  { exact: true, path: '/', name: 'Home', component: Home },
  { exact: true, path: '/settings/menu', name: 'Menu', component: Menu },
  { exact: true, path: '/settings/company', name: 'Company', component: Company },
  { exact: true, path: '/settings/user', name: 'User', component: User },
  { exact: true, path: '/settings/versioning', name: 'Versioning', component: Versioning },
  { exact: true, path: '/settings/holiday', name: 'Holiday', component: Holiday },
  { exact: true, path: '/employee/academic', name: 'Academic', component: Academic },
  { exact: true, path: '/employee/division', name: 'Division', component: Division },
  { exact: true, path: '/employee/departement', name: 'Departement', component: Departement },
  { exact: true, path: '/employee/unit-resources', name: 'Unit Resources', component: Unitresources },
  { exact: true, path: '/employee/position-level', name: 'Position Level', component: PositionLevel },
  { exact: true, path: '/employee/position-title', name: 'Position Title', component: PositionTitle },
  { exact: true, path: '/employee/list-employee', name: 'List Employee', component: Staffing },
  { exact: true, path: '/employee/list-employee/:id', name: 'List Employee', component: DetailStaff },
  { exact: true, path: '/attendance/attendance-list', name: 'Attendance List', component: AttendaceList },
  { exact: true, path: '/attendance/attendance-setting', name: 'Attendance Setting', component: AttendaceSetting },
  { exact: true, path: '/event/event-list', name: 'Event List', component: Event },
  { exact: true, path: '/event/category', name: 'Category', component: Category },
  { exact: true, path: '/event/venue', name: 'Venue', component: Venue },
  { exact: true, path: '/leave/leave-list', name: 'Leave List', component: LeaveRequest },
  { exact: true, path: '/leave/leave-type', name: 'Leave Type', component: LeaveType },
  { exact: true, path: '/leave/leave-approver', name: 'Leave Approver', component: LeaveApprover },
  { exact: true, path: '/leave/leave-balance', name: 'Leave Balance', component: LeaveBalance },
  { exact: true, path: '/leave/leave-setting', name: 'Leave Setting', component: LeaveSetting },
  { exact: true, path: '/calendar', name: 'Calendar', component: Calendar },
  { exact: true, path: '*', name: 'Page Not Found', component: Error },
]

const routes = { 'public': publicRoute, 'private': privateRoute }

export default routes