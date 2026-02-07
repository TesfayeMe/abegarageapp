import React from 'react'
import DashBoardCards from './DashBoardCards'
import { FiUserPlus } from "react-icons/fi";
import { PiUsersFourThin } from "react-icons/pi";
import { PiShoppingCart } from "react-icons/pi";
import { TfiPackage } from "react-icons/tfi";
import { PiPlusSquareLight } from "react-icons/pi";
import { PiBriefcaseThin } from "react-icons/pi";
import { PiFilePlus } from "react-icons/pi";
import { RxBarChart } from "react-icons/rx";
import { PiShieldCheckThin } from "react-icons/pi";
import { LuMessageSquare } from "react-icons/lu";
import './dashboards.css'
const Dashboards = () => {
  const dashboardItems = [
    {
      accessed_by: ['admin'],
      access_link: '/admin/add-employee',
      title_of_card: 'ADD EMPLOYEE',
      body_text: 'ADD EMPLOYEE',
      card_icon: <FiUserPlus size={30} />,
    },
    {
      accessed_by: ['admin and manager'],
      access_link: '/admin/employees',
      title_of_card: 'VIEW EMPLOYEES',
      body_text: 'VIEW EMPLOYEES',
      card_icon: <PiUsersFourThin size={30} />,
    },
    {
      accessed_by: ['all'],
      access_link: '/admin/add-customer',
      title_of_card: 'ADD CUSTOMER',
      body_text: 'ADD CUSTOMER',
      card_icon: <FiUserPlus size={30} />,
    },
    {
      accessed_by: ['all'],
      access_link: '/admin/customers',
      title_of_card: 'VIEW CUSTOMERS',
      body_text: 'VIEW CUSTOMERS',
      card_icon: <PiUsersFourThin size={30} />,
    },
    {
      accessed_by: ['all'],
      access_link: '/add-orders',
      title_of_card: 'ADD ORDERS',
      body_text: 'ADD ORDERS',
      card_icon: <PiShoppingCart size={30} />,
    },
    {
      accessed_by: ['all'],
      access_link: '/view-orders',
      title_of_card: 'VIEW ORDERS',
      body_text: 'VIEW ORDERS',
      card_icon: <TfiPackage size={30} />,
    },
    {
      accessed_by: ['admin and manager'],
      access_link: '/admin/add-services',
      title_of_card: 'ADD SERVICES',
      body_text: 'ADD SERVICES',
      card_icon: <PiPlusSquareLight size={30} />,
    },
    {
      accessed_by: ['all'],
      access_link: '/view-services',
      title_of_card: 'VIEW SERVICES',
      body_text: 'VIEW SERVICES',
      card_icon: <PiBriefcaseThin size={30} />,
    },
    {
      accessed_by: ['admin and manager'],
      access_link: '/admin/add-reports',
      title_of_card: 'ADD REPORTS',
      body_text: 'ADD REPORTS',
      card_icon: <PiFilePlus size={30} />,
    },
    {
      accessed_by: ['admin and manager'],
      access_link: '/admin/view-reports',
      title_of_card: 'VIEW REPORTS',
      body_text: 'VIEW REPORTS',
      card_icon: <RxBarChart size={30} />,
    },
    {
      accessed_by: ['admin'],
      access_link: '/admin/manage-roles',
      title_of_card: 'MANAGE ROLES',
      body_text: 'MANAGE ROLES',
      card_icon: <PiShieldCheckThin size={30} />,
    },
    {
      accessed_by: ['admin and manager'],
      access_link: '/admin/view-feedbacks',
      title_of_card: 'VIEW FEEDBACKS',
      body_text: 'VIEW FEEDBACKS',
      card_icon: <LuMessageSquare size={30} />,
    },
  ];
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard! Here you can manage employees, view orders, and access other administrative features. Use the menu on the left to navigate through different sections of the dashboard.
      </p>
      <div className="container-fluid py-4">
        <div className="row g-4">
          {dashboardItems.map((card, index) => (
            //           
            <DashBoardCards
              key={index}
              authorized={card.accessed_by}
              title={card.title_of_card}
              body={card.body_text}
              link={card.access_link}
              icon={card.card_icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboards