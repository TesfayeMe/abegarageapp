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
import { GrDocumentUser } from "react-icons/gr";
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
      accessed_by: ['manager'],
      access_link: '/mgr/add-customer',
      title_of_card: 'ADD CUSTOMER',
      body_text: 'ADD CUSTOMER',
      card_icon: <FiUserPlus size={30} />,
    },
    {
      accessed_by: ['manager'],
      access_link: '/mgr/customers',
      title_of_card: 'VIEW CUSTOMERS',
      body_text: 'VIEW CUSTOMERS',
      card_icon: <PiUsersFourThin size={30} />,
    },
    {
      accessed_by: ['manager'],
      access_link: '/mgr/new-order',
      title_of_card: 'ADD ORDERS',
      body_text: 'ADD ORDERS',
      card_icon: <PiShoppingCart size={30} />,
    },
    {
      accessed_by: ['manager and employee'],
      access_link: '/orders',
      title_of_card: 'VIEW ORDERS',
      body_text: 'VIEW ORDERS',
      card_icon: <TfiPackage size={30} />,
    },
    {
      accessed_by: ['manager'],
      access_link: '/mgr/services',
      title_of_card: 'SERVICES',
      body_text: 'MANAGE SERVICES',
      card_icon: <PiPlusSquareLight size={30} />,
    },
    {
      accessed_by: ['admin and manager'],
      access_link: '/reports',
      title_of_card: 'REPORTS',
      body_text: 'MANAGE REPORTS',
      card_icon: <PiFilePlus size={30} />,
    },
    {
      accessed_by: ['admin and manager'],
      access_link: '/feedbacks',
      title_of_card: 'FEEDBACKS',
      body_text: 'MANAGE FEEDBACKS',
      card_icon: <LuMessageSquare size={30} />,
    },
  ];
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome to the dashboard! Here you can manage all aspects of your garage operations, from employee management to customer interactions and order processing. Use the cards below to navigate to different sections of the dashboard and perform various tasks. Whether you're an admin, manager, or employee, there's something for everyone to help streamline your workflow and enhance productivity.
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