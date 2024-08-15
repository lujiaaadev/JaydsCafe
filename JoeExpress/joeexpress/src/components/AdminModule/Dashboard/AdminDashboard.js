import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

import arrowUP from '../../image/arrowUp.svg'
import arrowDOWN from '../../image/arrowdown.svg'

function AdminDashboard() {

   const [totalOrder,setTotalOrder] = useState(0);
   const [totalRevenue,setTotalRevenue] = useState(0);
   const [totalCustomer,setTotalCustomer] = useState(0);
   const [foods,setFoods] = useState([]);

   useEffect(()=>{
      axios.post('http://localhost:8081/adminTable')
      .then(response=>{
         setFoods(response.data)
      })
      .catch(error=>{
         console.error('Error fetching food details:', error);
      })
   })

   useEffect(() => {
      axios.post('http://localhost:8081/totalOrder')
      .then(response=>{
         setTotalOrder(response.data.totalOrders);
      })
      .catch(error => {
         console.error('Error fetching totalOrder details:', error);
       });
       
    },[]);

    useEffect(() => {
      axios.post('http://localhost:8081/totalRevenue')
      .then(response=>{
         setTotalRevenue(response.data.total_revenue);
      })
      .catch(error => {
         console.error('Error fetching food details:', error);
       });
       
    },[]);
    
    useEffect(() => {
      axios.post('http://localhost:8081/users')
      .then(response=>{
         setTotalCustomer(response.data.customer_count);
      })
      .catch(error => {
         console.error('Error fetching food details:', error);
       });
       
    },[]);

    useEffect(()=>{
      const button = document.querySelector('[data-collapse-toggle="dropdown-example"]');
      const dropdown = document.getElementById('dropdown-example');

      button.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
      });

      // Dropdown sa Avatar
      const avatarButton = document.getElementById('avatarButton');
      const userDropdown = document.getElementById('userDropdown');

      avatarButton.addEventListener('click', () => {
      userDropdown.classList.toggle('hidden');
      });

      // Dropdown sa short By:
      const shortBy = document.getElementById('shortBy');
      const shortByDropDown = document.getElementById('shortByDropDown');

      shortBy.addEventListener('click', () => {
      shortByDropDown.classList.toggle('hidden');
      });

      AOS.init();

    })
    
  return (
    <div>
      <nav class="z-20 bg-white border-gray-200 dark:bg-gray-900 top-0 sticky flex justify-end shadow-md">
      <div class="px-4 py-3 text-sm text-gray-900 dark:text-white flex flex-col items-center">
         <div class="font-bold">Migz Gomez Go</div>
         <div class="items-center justify-center">Admin</div>
      </div>
      <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src="/public/image/UserAcc.png" alt="User dropdown"/>


      <div id="userDropdown" class="top-16 absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
         
         <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
            </li>
         </ul>
         <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
         </div>
      </div>
   </nav>

  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform -translate-x-full bg-footer border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
     <div class="h-full px-3 pb-4 overflow-y-auto bg-footer dark:bg-gray-800">
      <a href="#" class="flex items-center ps-2.5 mb-5">
         <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34" height="34" fill="#333333" fill-opacity="0.2"/>
            <path d="M13.8122 4.25V3.1875C13.8122 2.34212 14.148 1.53137 14.7458 0.933597C15.3435 0.335825 16.1543 0 16.9997 0L21.2497 0C21.5315 0 21.8017 0.111942 22.001 0.311199C22.2002 0.510456 22.3122 0.780707 22.3122 1.0625C22.3122 1.34429 22.2002 1.61454 22.001 1.8138C21.8017 2.01306 21.5315 2.125 21.2497 2.125H16.9997C16.7179 2.125 16.4476 2.23694 16.2484 2.4362C16.0491 2.63546 15.9372 2.90571 15.9372 3.1875V4.25H26.5622C27.3744 4.24909 28.1564 4.55832 28.7484 5.11452C29.3404 5.67073 29.6977 6.43195 29.7473 7.24271C29.7969 8.05347 29.5352 8.85259 29.0155 9.47686C28.4958 10.1011 27.7574 10.5034 26.951 10.6016L25.6335 29.8945C25.5969 30.4316 25.3579 30.9347 24.9646 31.3024C24.5714 31.67 24.0532 31.8746 23.5149 31.875H10.4844C9.94574 31.8752 9.42709 31.6707 9.03338 31.3031C8.63968 30.9354 8.4003 30.4319 8.36367 29.8945L7.0483 10.6016C6.24198 10.5034 5.50356 10.1011 4.98387 9.47686C4.46418 8.85259 4.20242 8.05347 4.25206 7.24271C4.30169 6.43195 4.65898 5.67073 5.25095 5.11452C5.84292 4.55832 6.6249 4.24909 7.43717 4.25H13.8122ZM9.17967 10.625L10.4844 29.75H23.5149L23.6743 27.3997C21.9867 26.9709 20.5031 25.9638 19.4816 24.5537C18.4602 23.1436 17.9657 21.4199 18.0842 19.6827C18.2028 17.9456 18.9269 16.3051 20.1304 15.0468C21.334 13.7886 22.9408 12.9923 24.6709 12.7968L24.8197 10.625H9.17967ZM7.43717 8.5H26.5622C26.844 8.5 27.1142 8.38806 27.3135 8.1888C27.5127 7.98954 27.6247 7.71929 27.6247 7.4375C27.6247 7.15571 27.5127 6.88546 27.3135 6.6862C27.1142 6.48694 26.844 6.375 26.5622 6.375H7.43717C7.15538 6.375 6.88513 6.48694 6.68587 6.6862C6.48661 6.88546 6.37467 7.15571 6.37467 7.4375C6.37467 7.71929 6.48661 7.98954 6.68587 8.1888C6.88513 8.38806 7.15538 8.5 7.43717 8.5ZM23.8209 25.2301L24.5222 14.9664C23.3644 15.1824 22.3112 15.777 21.5281 16.6568C20.7451 17.5366 20.2766 18.6516 20.1963 19.8267C20.116 21.0017 20.4285 22.1701 21.0846 23.1482C21.7407 24.1263 22.7033 24.8587 23.8209 25.2301Z" fill="#F8F8F8"/>
            </svg>            
         <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-white">JoeExpress</span>
      </a>
        <h1 class="font-bold text-gray-500">MENU</h1>
        <ul class="space-y-2 font-medium">
           <li>
              <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                 </svg>
                 <span class="ms-3">Dashboard</span>
              </a>
           </li>
           <li>
            <button type="button" class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:text-gray-900" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                     <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                  </svg>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Order Management</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            <ul id="dropdown-example" class="hidden py-2 space-y-2">
                  <li>
                     <a href="/public/Html_Admin/orderTracking.html" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:text-gray-900">Order Tracking</a>
                  </li>
                  <li>
                     <a href="/public/Html_Admin/orderHistory.html" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:text-gray-900">Order History</a>
                  </li>
            </ul>
         </li>
           <li> 
              <a href="/ProductManagement" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                 </svg>
                 <span class="flex-1 ms-3 whitespace-nowrap">Product Management</span>
                </a>
           </li>
           <li>
              <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                 </svg>
                 <span class="flex-1 ms-3 whitespace-nowrap">Customer Account</span>
                </a>
           </li>
           <li> 
            <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
              <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Payment Management</span>
            </a>
         </li>
           <li>
              <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                <svg class="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                 </svg>
                 <span class="flex-1 ms-3 whitespace-nowrap">Content Management</span>
              </a>
           </li>
        </ul>

        <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        <h1 class="font-bold text-gray-500">SUPPORT</h1>
         <li> 
            <a href="#" class="flex items-center p-2 text-white transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group hover:text-gray-900">
               <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M9.586 2.586A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2v.089l.473.196.063-.063a2.002 2.002 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.827l-.063.064.196.473H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.089l-.196.473.063.063a2.002 2.002 0 0 1 0 2.828l-1.414 1.414a2 2 0 0 1-2.828 0l-.063-.063-.473.196V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.089l-.473-.196-.063.063a2.002 2.002 0 0 1-2.828 0l-1.414-1.414a2 2 0 0 1 0-2.827l.063-.064L4.089 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09l.195-.473-.063-.063a2 2 0 0 1 0-2.828l1.414-1.414a2 2 0 0 1 2.827 0l.064.063L9 4.089V4a2 2 0 0 1 .586-1.414ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clip-rule="evenodd"/>
                </svg>
                
               <span class="ms-3">Settings</span>
            </a>
         </li>
         <li> 
            <a href="#" class="flex items-center p-2 text-white transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group hover:text-gray-900">
               <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
                </svg>
                <span class="ms-3">Help</span>
            </a>
         </li>
      </ul>
      <h1 class="text-md font-semibold text-gray-500 mt-10">Copyright © 2024 • uixLujiaa</h1>
     </div>
  </aside>
  
  <div class="p-4 sm:ml-72 bg-slate-100">
     <div class="p-4 mt-3">
      <div class="flex relative justify-between">
         <h1 class="font-bold text-xl pb-10 tracking-wide">This Week's Overview</h1>
         
         <button id="shortBy" data-dropdown-toggle="dropdown" class="flex h-10 justify-center text-gray-700 font-medium text-xl items-center" type="button">Sorted By: <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
         </button>
            
            <div id="shortByDropDown" data-dropdown-content class="right-0 top-10 absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700">
               <ul class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                  <li>
                    <div class="flex items-center">
                        <input id="default-radio-1" type="radio" value="" name="default-radio" 
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="default-radio-1" class="py-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">This Week</label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center">
                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" 
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="default-radio-2" class="py-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Week</label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center">
                        <input id="default-radio-3" type="radio" value="" name="default-radio" 
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 
                        dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 
                        focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label for="default-radio-3" class="py-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">This Month</label>
                    </div>
                  </li>
                  <li>
                     <div class="flex items-center">
                         <input id="default-radio-4" type="radio" value="" name="default-radio" 
                         class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                         dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                         <label for="default-radio-4" class="py-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Month</label>
                     </div>
                   </li>
                </ul>
            </div>
      </div>

        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-4">
           <div class="px-4 py-4 flex flex-col h-40 rounded-xl bg-white dark:bg-gray-800 shadow-lg" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="100">
            <div class= "w-14 h-14 mb-6 bg-slate-100 rounded-full justify-center flex items-center">
               <svg width="35" height="30" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.8 15.9156C4.99375 15.9156 1.625 9.41875 1.4875 9.14375C1.38437 8.9375 1.38437 8.6625 1.4875 8.45625C1.625 8.18125 4.99375 1.71875 11.8 1.71875C18.6063 1.71875 21.975 8.18125 22.1125 8.45625C22.2156 8.6625 22.2156 8.9375 22.1125 9.14375C21.975 9.41875 18.6063 15.9156 11.8 15.9156ZM3.06875 8.8C3.825 10.0719 6.78125 14.3688 11.8 14.3688C16.8188 14.3688 19.775 10.0719 20.5313 8.8C19.775 7.52813 16.8188 3.23125 11.8 3.23125C6.78125 3.23125 3.825 7.52813 3.06875 8.8Z" fill="#3D1A08"/>
                  <path d="M11.7998 11.7217C10.1842 11.7217 8.87793 10.4154 8.87793 8.79981C8.87793 7.18419 10.1842 5.87793 11.7998 5.87793C13.4154 5.87793 14.7217 7.18419 14.7217 8.79981C14.7217 10.4154 13.4154 11.7217 11.7998 11.7217ZM11.7998 7.42481C11.0435 7.42481 10.4248 8.04356 10.4248 8.79981C10.4248 9.55606 11.0435 10.1748 11.7998 10.1748C12.5561 10.1748 13.1748 9.55606 13.1748 8.79981C13.1748 8.04356 12.5561 7.42481 11.7998 7.42481Z" fill="#3D1A08"/>
               </svg>
            </div>
              <h1 class="font-bold text-2xl text-gray-700 ps-2">134</h1>
            <div class="inline-flex justify-between ps-2 font-semibold text-gray-400">
               <p>Total Visits</p>
               <p class="inline-flex text-green-500 ">0.43% <img src={arrowUP} alt="Arrow Up" class="w-4 h-4 my-auto pl-1"/></p>
            </div>
              
           </div>
           <div class="px-4 py-4 flex flex-col h-40 rounded-xl bg-white dark:bg-gray-800 shadow-lg" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="200"> 
            <div class= "w-14 h-14 mb-6 bg-slate-100 rounded-full justify-center flex items-center">
               <svg width="35" height="30" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0531 17.2314C10.6781 17.2314 9.57812 18.3314 9.57812 19.7064C9.57812 21.0814 10.6781 22.1814 12.0531 22.1814C13.4281 22.1814 14.5281 21.0814 14.5281 19.7064C14.5281 18.3658 13.3937 17.2314 12.0531 17.2314ZM12.0531 20.6689C11.5375 20.6689 11.125 20.2564 11.125 19.7408C11.125 19.2252 11.5375 18.8127 12.0531 18.8127C12.5687 18.8127 12.9812 19.2252 12.9812 19.7408C12.9812 20.2221 12.5343 20.6689 12.0531 20.6689Z" fill="#3D1A08"/>
                  <path d="M5.52187 17.2314C4.14687 17.2314 3.04688 18.3314 3.04688 19.7064C3.04688 21.0814 4.14687 22.1814 5.52187 22.1814C6.89687 22.1814 7.99687 21.0814 7.99687 19.7064C7.99687 18.3658 6.86249 17.2314 5.52187 17.2314ZM5.52187 20.6689C5.00624 20.6689 4.59375 20.2564 4.59375 19.7408C4.59375 19.2252 5.00624 18.8127 5.52187 18.8127C6.03749 18.8127 6.45 19.2252 6.45 19.7408C6.45 20.2221 6.03749 20.6689 5.52187 20.6689Z" fill="#3D1A08"/>
                  <path d="M19.3062 1.41895H17.45C16.625 1.41895 15.9031 2.03769 15.8 2.86269L15.25 6.81582H1.6719C1.32815 6.81582 0.984402 6.98769 0.743777 7.26269C0.537527 7.53769 0.434402 7.91582 0.537527 8.25957C0.537527 8.29394 0.537527 8.29394 0.537527 8.32832L2.66878 14.7564C2.80628 15.2377 3.25315 15.5814 3.76878 15.5814H13.2562C14.5281 15.5814 15.6281 14.6189 15.8 13.3471L17.2437 3.06894C17.2437 3.00019 17.3125 2.96582 17.3812 2.96582H19.2375C19.65 2.96582 20.0281 2.62207 20.0281 2.17519C20.0281 1.72832 19.7188 1.41895 19.3062 1.41895ZM14.3219 13.1064C14.2531 13.6221 13.8062 14.0002 13.2906 14.0002H4.07815L2.2219 8.36269H15.0094L14.3219 13.1064Z" fill="#3D1A08"/>
                  </svg>
                  
            </div>
              <h1 class="font-bold text-2xl text-gray-700 ps-2">₱ {totalRevenue}</h1>
            <div class="inline-flex justify-between ps-2 font-semibold text-gray-400">
               <p>Total Revenue</p> 
               <p class="inline-flex text-green-500 ">4.35% <img src={arrowUP} alt="Arrow Up" class="w-4 h-4 my-auto pl-1"/></p>
            </div>
              
           </div>
           <div class="px-4 py-4 flex flex-col h-40 rounded-xl bg-white dark:bg-gray-800 shadow-lg" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="300">
            <div class= "w-14 h-14 mb-6 bg-slate-100 rounded-full justify-center flex items-center">
               <svg width="35" height="30" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.9059 18.8463L20.1871 4.03067C20.0153 2.51817 18.7434 1.38379 17.1965 1.38379H6.36834C4.85584 1.38379 3.58397 2.51817 3.37772 4.03067L1.65897 18.8463C1.55584 19.7057 1.83084 20.5307 2.41522 21.1838C2.99959 21.8369 3.79022 22.1807 4.64959 22.1807H18.9153C19.7746 22.1807 20.5996 21.8025 21.1496 21.1838C21.6996 20.565 22.009 19.7057 21.9059 18.8463ZM20.0153 20.1525C19.7403 20.4619 19.3621 20.6338 18.9496 20.6338H4.64959C4.23709 20.6338 3.85897 20.4619 3.58397 20.1525C3.30897 19.8432 3.17147 19.4307 3.24022 19.0182L4.92459 4.23692C4.99334 3.51504 5.61209 2.96504 6.36834 2.96504H17.2309C17.9528 2.96504 18.5715 3.51504 18.6746 4.23692L20.3934 19.0525C20.4278 19.465 20.2903 19.8432 20.0153 20.1525Z" fill="#3D1A08"/>
                  <path d="M15.1346 6.09401C14.7221 6.19714 14.4471 6.60964 14.5502 7.02214C14.5846 7.22839 14.619 7.43464 14.619 7.60651C14.619 9.15339 13.3471 10.4253 11.8002 10.4253C10.2533 10.4253 8.98145 9.15339 8.98145 7.60651C8.98145 7.40026 9.01582 7.22839 9.0502 7.02214C9.15332 6.60964 8.87832 6.19714 8.46582 6.09401C8.05332 5.99089 7.64082 6.26589 7.5377 6.67839C7.46895 6.98776 7.43457 7.29714 7.43457 7.60651C7.43457 10.0128 9.39395 11.9722 11.8002 11.9722C14.2065 11.9722 16.1658 10.0128 16.1658 7.60651C16.1658 7.29714 16.1315 6.98776 16.0627 6.67839C15.9596 6.26589 15.5471 6.02526 15.1346 6.09401Z" fill="#3D1A08"/>
                  </svg>
            </div>
              <h1 class="font-bold text-2xl text-gray-700 ps-2">{totalOrder}</h1>
            <div class="inline-flex justify-between ps-2 font-semibold text-gray-400">
               <p>Total Order(s)</p> 
               <p class="inline-flex text-green-500 ">2.59% <img src={arrowUP} alt="Arrow Up" class="w-4 h-4 my-auto pl-1"/></p>
            </div>
              
           </div>
           <div class="px-4 py-4 flex flex-col h-40 rounded-xl bg-white dark:bg-gray-800 shadow-lg" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="400">
            <div class= "w-14 h-14 mb-6 bg-slate-100 rounded-full justify-center flex items-center">
               <svg width="35" height="30" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.48399 8.83692C9.61524 8.83692 11.3684 7.15254 11.3684 5.05567C11.3684 2.95879 9.61524 1.27441 7.48399 1.27441C5.35274 1.27441 3.59961 2.95879 3.59961 5.05567C3.59961 7.15254 5.35274 8.83692 7.48399 8.83692ZM7.48399 2.85567C8.75586 2.85567 9.82149 3.85254 9.82149 5.09004C9.82149 6.32754 8.79024 7.32442 7.48399 7.32442C6.17774 7.32442 5.14649 6.32754 5.14649 5.09004C5.14649 3.85254 6.21211 2.85567 7.48399 2.85567Z" fill="#3D1A08"/>
                  <path d="M16.1117 10.4873C17.968 10.4873 19.4461 9.04355 19.4461 7.22168C19.4461 5.3998 17.9336 3.95605 16.1117 3.95605C14.2898 3.95605 12.7773 5.3998 12.7773 7.22168C12.7773 9.04355 14.2898 10.4873 16.1117 10.4873ZM16.1117 5.5373C17.1086 5.5373 17.8992 6.29355 17.8992 7.25605C17.8992 8.21855 17.1086 8.9748 16.1117 8.9748C15.1148 8.9748 14.3242 8.21855 14.3242 7.25605C14.3242 6.29355 15.1148 5.5373 16.1117 5.5373Z" fill="#3D1A08"/>
                  <path d="M16.2836 10.8313H15.9742C14.943 10.8313 13.9461 11.1406 13.0867 11.6563C12.1586 10.4188 10.6805 9.59375 9.03047 9.59375H5.9711C3.15235 9.62813 0.917969 11.8625 0.917969 14.6469V17.1219C0.917969 17.775 1.4336 18.2906 2.08672 18.2906H20.5461C21.1992 18.2906 21.7492 17.7406 21.7492 17.0875V16.2625C21.7148 13.2719 19.2742 10.8313 16.2836 10.8313ZM2.46485 16.7438V14.6469C2.46485 12.7219 4.0461 11.1406 5.9711 11.1406H9.03047C10.9555 11.1406 12.5367 12.7219 12.5367 14.6469V16.7438H2.46485ZM20.168 16.7438H14.0492V14.6469C14.0492 14.0969 13.9461 13.5469 13.7742 13.0313C14.393 12.5844 15.1492 12.3781 15.9398 12.3781H16.2492C18.3805 12.3781 20.1336 14.1313 20.1336 16.2625V16.7438H20.168Z" fill="#3D1A08"/>
               </svg>
            </div>
              <h1 class="font-bold text-2xl text-gray-700 ps-2">{totalCustomer}</h1>
            <div class="inline-flex justify-between ps-2 font-semibold text-gray-400">
               <p>Total Customers</p> 
               <p class="inline-flex text-red-500 ">0.43% <img src={arrowDOWN} alt="Arrow Down" class="w-4 h-4 my-auto pl-1"/></p>
            </div>
              
           </div>
        </div>

        {/* <!-- For Graphs (underconstruction)-->
        <!-- <div class="flex items-center justify-center h-48 mb-4 rounded bg-red-300 dark:bg-gray-800">
           <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
              </svg>
           </p>
        </div> --> */}
        
        <div class="relative overflow-x-auto shadow-xl sm:rounded-lg">
         <div class="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
             {/* <!-- <div>
                 <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                     <span class="sr-only">Action button</span>
                     Action
                     <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                     </svg>
                 </button>
                  
                 <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                     <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                         <li>
                             <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                         </li>
                         <li>
                             <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                         </li>
                         <li>
                             <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                         </li>
                     </ul>
                     <div class="py-1">
                         <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                     </div>
                 </div>
             </div> --> */}
             <label for="table-search" class="sr-only">Search</label>
             <div class="relative">
                 <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                     </svg>
                 </div>
                 <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
             </div>
         </div>

   
   <table  class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
   <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
       <tr>
           <th scope="col" class="px-6 py-3">
               Product Name
           </th>
           <th scope="col" class="px-6 py-3">
               Category
           </th>
           <th scope="col" class="px-6 py-3">
               Price
           </th>
           <th scope="col" class="px-6 py-3">
               Sold
           </th>
           <th scope="col" class="px-6 py-3">
               Profit
           </th>
       </tr>
   </thead>


  
   <tbody >
   {foods.map(food => (
       <tr key={food.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
           <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
               <img class="w-10 h-10 rounded-2xl" src={food.image_url} alt={food.name}/>
               <div class="ps-3">
                   <div class="text-base font-semibold">{food.name}</div>
               </div>  
           </th>
           <td class="px-6 py-4">
               {food.title}
           </td>
           <td class="px-6 py-4"> 
              {food.price}
           </td>
           <td class="px-6 py-4">
              {food.sold}
           </td>
           <td class="px-6 py-4"> 
              {food.profit}
           </td>
       </tr>
))}

      </tbody>
   </table>


         
              
     </div>
     </div>
  </div>
  

      
    </div>
  )
}

export default AdminDashboard