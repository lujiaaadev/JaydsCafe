import React from 'react'
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import yt from '../image/yt.svg';
import arrowLeft from '../image/arrow left.svg'
import arrowUp from '../image/arrowUp.svg'
import jaydscoffee from '../image/jaydsCoffee.svg'
import expresso from '../image/expresso.png'
import cart from '../image/cart.svg'
import bagIcon from '../image/bag.svg';
import gcash from '../image/gcash_logo.svg';
import plus from '../image/plus.svg';
import lock from '../image/lock.svg';

export default function Checkout() {
  return (
    <div className='bg-white'>
        {/* <!-- nav --> */}
        <nav class="w-full top-0 fixed bg-white z-20 shadow-lg flex justify-evenly">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">Jayd's Cafe</a>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <button>
                <img src={bagIcon} alt=""/>
            </button>
        </nav>

        <section class="grid grid-cols-1 md:grid-cols-2 p-4 pt-24 mx-32">
            {/* Left Side */}
            <div className='w-full px-10'>
                <a href="/cart" class="text-2xl font-bold hover:underline"> <img src={arrowLeft} alt="" class="inline-block w-4 h-4 me-2"/>Back to Cart</a>
                
                {/* payment checkout display */}
                <div className='text-center'>
                    <p  className='mb-3 mt-5 text-gray-600'>Payment Checkout</p>
                    <div className='text-white flex flex-row flex-wrap gap-2 justify-between mb-2'>
                        <button className='inline-flex justify-center items-center text-md bg-blue-800 rounded-lg px-9 py-2 cursor-default '>
                            <img src={gcash} className='me-2'></img>Gcash
                        </button>
                        <button className='flex justify-center items-center text-md bg-textgreenColor rounded-lg px-16 py-2 cursor-default '>
                            Cash
                        </button>
                    </div>
                     {/* <!-- or --> */}
                    <div class="flex items-center mb-4">
                        <hr class="w-full border-t border-greenColor" />
                        <span class="px-4 text-gray-600 w-fit"> OR </span>
                        <hr class="w-full border-t border-greenColor" />
                    </div>
                </div>

                {/* ship to section */}
                <div className='border-b-2 border-textgreenColor my-2 pb-4'>
                    <div className='flex justify-between mb-3'>
                        <h1 className='text-gray-400 font-semibold'>Ship to</h1>
                        <button className='p-2 bg-cards rounded-lg'>
                            <img src={arrowUp}></img>
                        </button>
                    </div>
                    <form> {/* For option ng address */}
                        <div className='space-y-2'> {/* Main container */}
                            <div class="group"> {/* First option */}
                                <label for="add1" class="inline-flex ps-4 items-center w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer group-focus-within:bg-cards group-hover:border-textgreenColor group-hover:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                                    <input type="radio" id="add1" name="hosting" value="add1" class="peer text-textgreenColor focus:ring-textgreenColor "/>
                                    <div className='flex flex-col py-4 overflow-hidden'>
                                        <label for="add1" class="w-full ms-3 pb-2 text-sm font-medium text-gray-900 tracking-wide">Edsel Noyuab , Blk 14 Lot 1 Tinola Street</label>
                                        <label for="add1" class="w-full ms-3 text-sm font-normal text-gray-700 tracking-wide">Imus, Cavite, 1401, Phillipines</label>
                                    </div>
                                </label>
                            </div>
                            <div class="group">
                                <label for="add2" class="inline-flex ps-4 items-center w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer group-focus-within:bg-cards group-hover:border-textgreenColor group-hover:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                                    <input type="radio" id="add2" name="hosting" value="add2" class="peer text-textgreenColor focus:ring-textgreenColor "/>
                                    <div className='flex flex-col py-4 overflow-hidden'>
                                        <label for="add2" class="w-full ms-3 pb-2 text-sm font-medium text-gray-900 tracking-wide">Edsel Noyuab , Blk 14 Lot 1 Tinola Street</label>
                                        <label for="add2" class="w-full ms-3 text-sm font-normal text-gray-700 tracking-wide">Imus, Cavite, 1401, Phillipines</label>
                                    </div>
                                </label>
                            </div>

                            <button className='inline-flex justify-center p-2 hover:underline text-md'>
                                <img src={plus} className='filter invert'></img> Use a Different address
                            </button>
                        </div>
                    </form>
                </div>

                {/* Payment */}
                <div className='my-10'>
                    <h1 className='text-2xl text-black'>
                        Payment
                    </h1>
                    <p className='text-md text-gray-600'>
                        All transactions are secure and encrypted.
                    </p>

                    <div className='space-y-2'> {/* Main container */}
                        <div class="group"> {/* Gcash option */}
                            <label for="gcash" class="inline-flex px-4 py-3 justify-between items-center w-full text-white bg-white border border-gray-200 rounded-lg cursor-pointer group-focus-within:bg-cards group-hover:border-textgreenColor hover:bg-gray-100 ">
                                <div className='inline-flex items-center'>
                                    <input type="radio" id="gcash" name="hosting" value="gcash" class="peer text-textgreenColor focus:ring-textgreenColor " required />
                                    <h1 className='text-black px-3'>Gcash</h1>
                                    <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello to you too!">
                                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                        </svg>
                                    </a>
                                </div>
                                <div className='inline-flex justify-center items-center text-md bg-blue-800 rounded-lg px-9 py-2 cursor-auto'>
                                    <img src={gcash} className='me-2 '></img>Gcash 
                                </div>
                            </label>
                        </div>
                        <div class="group"> {/* Cash option */}
                            <label for="cash" class="inline-flex px-4 py-5 justify-between items-center w-full text-white bg-white border border-gray-200 rounded-lg cursor-pointer group-focus-within:bg-cards group-hover:border-textgreenColor hover:bg-gray-100 ">
                                <div className='inline-flex items-center'>
                                    <input type="radio" id="cash" name="hosting" value="cash" class="peer text-textgreenColor focus:ring-textgreenColor " required />
                                    <h1 className='text-black ps-3'>Cash</h1>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className='inline-flex items-center justify-center py-4'>
                        <img src={lock} className=' filter grayscale'></img> <h1 className='text-sm text-gray-500'>Secure and encrypted</h1>
                    </div>
                    
                    <div>
                        <button className='bg-textgreenColor rounded-xl text-white w-full py-5'>
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>

            {/* right side */}
            <div className='w-full px-16'>
                <div className='mt-10 space-y-4 h-96 overflow-hidden overflow-y-auto py-4'> {/* Main container */}
                    <div className='flex flex-row relative'> {/* order list */}
                        <div className='w-24 h-24 px-2 rounded-lg bg-textgreenColor overflow-hidden me-4'>
                            <img src={expresso} className='object-contain object-fit h-full w-full' alt="expresso"></img>
                        </div>
                        <div className='flex justify-between w-full items-center font-semibold'>
                            <h1 className='tracking-wider'>
                                Rato Melkti
                            </h1>
                            <p>
                                ₱29.99
                            </p>
                        </div>
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black/50 rounded-full -top-2 start-16">3</div>
                    </div>

                    <div className='flex flex-row relative'> {/* order list */}
                        <div className='w-24 h-24 px-2 rounded-lg bg-textgreenColor overflow-hidden me-4'>
                            <img src={jaydscoffee} className='object-contain object-fit h-full w-full' alt="expresso"></img>
                        </div>
                        <div className='flex justify-between w-full items-center font-semibold'>
                            <h1 className='tracking-wider'>
                                Coffee Camarel
                            </h1>
                            <p>
                                ₱79.99
                            </p>
                        </div>
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black/50 rounded-full -top-2 start-16">10</div>
                    </div>

                    <div className='flex flex-row relative'> {/* order list */}
                        <div className='w-24 h-24 px-2 rounded-lg bg-textgreenColor overflow-hidden me-4'>
                            <img src={jaydscoffee} className='object-contain object-fit h-full w-full' alt="expresso"></img>
                        </div>
                        <div className='flex justify-between w-full items-center font-semibold'>
                            <h1 className='tracking-wider'>
                                Coffee Camarel
                            </h1>
                            <p>
                                ₱79.99
                            </p>
                        </div>
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black/50 rounded-full -top-2 start-16">10</div>
                    </div>

                </div>

                {/* voucher */}
                <div className='w-full mt-5'> 
                    <form class="flex items-center ">   
                        <label for="simple-search" class="sr-only">Search</label>
                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"  placeholder="Discount code or gift card"/>
                        
                        <button class="p-4 ms-2 text-sm font-medium text-white bg-textgreenColor rounded-lg border border-textgreenColor hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-textgreenColor">
                            Apply
                        </button>
                    </form>
                </div>

                {/* Subtotal / Shipping / Total */}
                <div className='w-full mt-5 space-y-2'>

                    {/* Subtotal */}
                    <div className='text-sm text-gray-900 flex justify-between'> 
                        <h1>
                            Subtotal
                        </h1>
                        <p className='text-md font-semibold'>
                            ₱109.98
                        </p>
                    </div>
                    {/* Shipping */}
                    <div className='text-sm text-gray-900 flex justify-between'>
                        <h1>
                            Shipping
                        </h1>
                        <p className='text-md font-semibold'>
                            ₱0.00
                        </p>
                    </div>
                    {/* Total */}
                    <div className='text-md text-gray-900 flex justify-between'>
                        <h1>
                            Total
                        </h1>
                        <p className='text-lg font-semibold'>
                            <span className='text-gray-500 me-2 text-sm'>PHP</span>₱109.98
                        </p>
                    </div>
                </div>
            </div>

        </section>

        {/* <!-- Contact Us --> */}
        <footer class="bg-[#1A1A1A] w-full h-1/4 mt-5 py-7 flex flex-col justify-center items-center bottom-0" id="footer">

            <div class="border-y-2 border-gray-400 w-4/5 p-10">
            {/* <!-- container footer--> */}
            <div class="flex justify-between w-full">
                <h1 class="text-white text-5xl font-bold">Jayd's Cafe</h1>
                <div class="flex gap-2">
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={fb} alt=""></img>
                </button>
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={ig} alt=""></img>
                </button>
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={yt} alt=""></img>
                </button>
                </div>
            </div>
            
            <button type="button" class="rounded-full text-white w-fit px-6 py-2 mt-7" id="viewloc">View Location</button>
            </div>

            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2024. Capstone Inc.</span >

            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0" >
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6" data-modal-target="default-modal" data-modal-toggle="default-modal">Refund Policy</a>
                </li>
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6" data-modal-target="default-modal3" data-modal-toggle="default-modal3">Terms and Conditions</a>
                </li>
            </ul>
            </div>

            {/* <!-- Refund Policy modal --> */}
            <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <div class="relative bg-jaydsBg rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 class="text-2xl font-bold text-gray-900 ">
                            Refund Policy
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-white hover:text-greenColor rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div class="p-4 md:p-5 space-y-4">
                        <p class="text-base leading-relaxed text-gray-500">
                            We do not accept returns or exchanges however, if you are unhappy with your order, kindly give us a call at +639771931022 and
                            let us know how we can better serve you.
                        </p>
                        <p class="text-base leading-relaxed text-gray-500">
                            Refunds We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If
                            approved, you'll be automatically refunded on your original payment method. Please remember it can takes 7-10 days for your
                            bank or credit card company to process and post the refund too.
                        </p>
                    </div>
                </div>
            </div>
            </div>

            {/* <!-- Modal for Terms and Condition --> */}
            <div id="default-modal3" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">

                {/* <!-- Modal content --> */}
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal3">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div class="p-4 md:p-5 space-y-4">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button id="accept-button" data-modal-hide="default-modal3" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button data-modal-hide="default-modal3" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                    </div>
                </div>
            </div>
            </div>

        </footer>
    </div>
  )
}