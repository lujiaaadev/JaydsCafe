import React, { useEffect, useState, useRef } from 'react'
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import yt from '../image/yt.svg';
import arrowLeft from '../image/arrow left.svg'
import arrowUp from '../image/arrowUp.svg'
import bagIcon from '../image/bag.svg';
import gcash from '../image/gcash_logo.svg';
import plus from '../image/plus.svg';
import lock from '../image/lock.svg';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// toast.configure();

export default function Checkout() {
 
    let location = useLocation();

    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([]);
    const [userId, setUserId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [totalBill, setTotalBill] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [code, setCode] = useState('');
    const [checkoutUrl, setCheckoutUrl] = useState(null);
    const [profile, setProfile] = useState([])
    const [selectedPayment, setSelectedPayment] = useState('');
    const { riderNote } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [STATUS, setSTATUS] = useState(false)


    const [cmsName,setCmsName] = useState('');

    useEffect(()=>{

        const fetchNameData = async () => {
          try {
            const response = await axios.post('http://localhost:8081/cms', {title: 'Business Name'});
            setCmsName(response.data.content || '');
          } 
          catch (error) {
            console.error('Error fetching data:', error);
          }
    
        };

        fetchNameData();
    })
    
    //toast
    const [isCancelled, setIsCancelled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(5); // Countdown 5 seconds
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);
    const toastId = useRef(null);

    //eto yung mag ccancel
    const handleCancel = () => {
        setIsCancelled(true); 
        toast.dismiss(); 
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current); // Stop cd
    };

    const notifyAndProceed = () => {
        setIsCancelled(false);
        setRemainingTime(5); // Reset countdown

    toastId.current = toast.success(
      <>
        <div className='mb-4 text-xl tracking-wide'>Processing your payment...</div>
        <div className='my-2'>You can cancel your order within:</div>
        <div className='w-full flex justify-evenly shrink-0 gap-3'>
            <button onClick={handleCloseModal} className='cursor-pointer py-3 px-5 bg-red-600 hover:bg-red-500 font-semibold tracking-wide text-white rounded-md'>
            Cancel
            </button>
        </div>
      </>,
      {
        position: "center",
        autoClose: false, 
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: false,
        draggable: true,
        onClose: () => {
          setIsCancelled(true);
          clearTimeout(timeoutRef.current); // Stop checkout process on close
          clearInterval(intervalRef.current); // Stop the countdown interval
        },
        // Add custom inline styles for centering
        style: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            margin: '0',
            width: 'auto',
            textAlign: 'center',
          },
      }
    );

    // Start an interval to update the countdown timer
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        

        // Update the toast with the new countdown time
        toast.update(toastId.current, {
          render: (
            <>
              <div className='mb-4 text-xl tracking-wide'>Processing your payment...</div>
              <div className='my-2'>You can cancel your order within:</div>
              <div className='w-full flex justify-evenly shrink-0 gap-3'>
                  <button onClick={handleCloseModal} className='cursor-pointer py-3 px-5 bg-red-600 hover:bg-red-500 font-semibold tracking-wide text-white rounded-md'>
                    Cancel
                  </button>
                  <button onClick={handleCheckout} className='cursor-pointer py-3 px-5 bg-textgreenColor hover:bg-green-500 font-semibold tracking-wide text-white rounded-md'>
                    Confirm ({newTime}s remaining)
                  </button>
              </div>
            </>
          ),
        });

        // If time reaches zero, clear the interval and proceed to checkout
        if (newTime === 0) {
          clearInterval(intervalRef.current); // Stop the timer at 0
          if (!isCancelled) {
            handleCheckout(); // Proceed to checkout if not cancelled
          }
        }

        return newTime;
      });
    }, 1000);
  };
    
    useEffect(() => {
        axios.get('http://localhost:8081/')
          .then(res => {
            if (res.data.valid) {
              setAuthenticated(true);
              setUserId(res.data.userId);
              
            } else {
              navigate('/');
            }
          })
          .catch(err => console.log(err));
      }, [navigate]);

    useEffect(() => {
        axios.post('http://localhost:8081/itemGetter', { userId })
            .then(res => {
                setItems(res.data.items);
                const total = items.reduce((sum, item) => sum + item.food_price, 0);
                setTotalBill(total);

            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    },[userId]);
    
    
    useEffect(() => {
        axios.post('http://localhost:8081/profile', { userId })
            .then(res => {
                setProfile(res.data);

            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
    },[userId]);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/cart'); 
    };

    const handleCheckout = async () =>{

        try{
            
            if(selectedPayment !== ''){

            const res = await axios.post('http://localhost:8081/order',{
                userId, 
                amount: totalBill, 
                deliveryMethod: riderNote?.option || '' ,
                paymentMethod: selectedPayment,
                code
            });

            if (res.data.success && selectedPayment === 'gcash' ){
              handleCreatePaymentIntent(res.data.lastOrderId);
              setSTATUS(res.data.success)
            }

            else if (res.data.success && selectedPayment === 'cash') {
                alert("Ordered Successfully Placed");
                navigate(`/paymentSuccess/${res.data.lastOrderId}`)
            }

            else{
              console.log('Checkout Failed')
            }

           } 
        }

           catch (error) {
            console.error('Error during checkout:', error);
        }

    }

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (loading) return;

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8081/validateDiscount', {
                code,
                totalBill,
            });

            setDiscount(response.data.discountAmount);
            setTotalBill(response.data.finalAmount);
        } catch (error) {
            console.error('Error validating discount:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleCreatePaymentIntent = async (id) => {
        try {
                
            const response = await axios.post(`http://localhost:8081/create-payment-intent/${id}`, {
                amount: totalBill,
                description: `Order Payment for ${cmsName}`,
                userId: userId,
            });
    
            const { checkoutUrl } = response.data;
    
            setCheckoutUrl(checkoutUrl);
            window.location.href = checkoutUrl;
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    useEffect(() => {
        
        const total = items.reduce((sum, item) => {
          return sum + item.food_price * (item.quantity || 1);
        }, 0);
      
        setTotalBill(total);
      
    },[items]);

  return (


    <div className='bg-white'>
        {/* <!-- nav --> */}
        <nav class="w-full top-0 fixed bg-white z-20 shadow-lg flex justify-evenly">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="/menu" class="flex items-center text-greenColor ms-2 text-2xl tracking-wide">{cmsName}</a>
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
                <Link to="/cart" class="text-1xl font-semibold hover:underline text-black"> <img src={arrowLeft} alt="" class="inline-block w-4 h-3 me-2 "/>Back to Cart</Link>
                

                <div className='text-left my-8'>
                    <p className=' text-gray-600'>Delivery Method:
                        <span className='text-2xl font-bold block underline text-black'>{riderNote?.option.toUpperCase()}</span></p>
                </div>


                {/* payment checkout display */}
                <div className='text-left mt-8'>
                    <p className=' text-gray-600'>Payment Checkout</p>
                </div>

                {/* ship to section */}
                {riderNote?.option === 'delivery'? <div className='border-b-2 border-textgreenColor my-2 pb-4'>
                    <div className='flex justify-between mb-3'>
                        <h1 className='text-gray-600 font-semibold'>Ship to</h1>
                        <button className='p-2 bg-cards rounded-lg'>
                            <img src={arrowUp}></img>
                        </button>
                    </div>
                     <form > {/* For option ng address */}
                        <div className='space-y-2'> {/* Main container */}
                            <div class="group"> {/* First option */}

                                <label htmlFor="add1"  class="inline-flex ps-4 items-center w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer group-focus-within:bg-cards group-hover:border-textgreenColor group-hover:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                    <input type="radio" id="add1" name="hosting" value="add1" class="peer text-textgreenColor focus:ring-textgreenColor" defaultChecked/>
                                    <div className='flex flex-col py-4 overflow-hidden'>
                                        <label htmlFor="add1" class="w-full ms-3 text-sm font-medium text-gray-900 tracking-wide">{profile.address}</label>
                                        {/* <label htmlFor="add1" class="w-full ms-3 text-sm font-normal text-gray-700 tracking-wide">Imus, Cavite, 1401, Phillipines</label> */}
                                    </div>
                                </label>
                            </div>
                            {/* <div class="group">
                                <label htmlFor="add2" class="inline-flex ps-4 items-center w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer group-focus-within:bg-cards group-hover:border-textgreenColor group-hover:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                                    <input type="radio" id="add2" name="hosting" value="add2" class="peer text-textgreenColor focus:ring-textgreenColor "/>
                                    <div className='flex flex-col py-4 overflow-hidden'>
                                        <label htmlFor="add2" class="w-full ms-3 pb-2 text-sm font-medium text-gray-900 tracking-wide">Edsel Noyuab , Blk 14 Lot 1 Tinola Street</label>
                                        <label htmlFor="add2" class="w-full ms-3 text-sm font-normal text-gray-700 tracking-wide">Imus, Cavite, 1401, Phillipines</label>
                                    </div>
                                </label>
                            </div> */}

                            <button className='inline-flex justify-center p-2 hover:underline text-md'>
                                <img src={plus} className='filter invert'></img> Use a Different address
                            </button>
                        </div>
                    </form>
                </div>:""}

                {/* Payment */}
                <div className='my-10'>
                    <h1 className='text-2xl text-black'>
                        Payment
                    </h1>
                    <p className='text-md text-gray-600'>
                        All transactions are secure and encrypted.
                    </p>

                    <div className='space-y-2' > {/* Main container */}
                        <div class="group"> {/* Gcash option */}
                            <label htmlFor="gcash" class="inline-flex px-4 py-3 justify-between items-center w-full text-white bg-white border border-gray-200 rounded-lg cursor-pointer group-focus-within:bg-cards group-hover:border-textgreenColor hover:bg-gray-100 ">
                                <div className='inline-flex items-center'>
                                    <input type="radio" 
                                    id="gcash" 
                                    name="payment" 
                                    value="gcash" 
                                    class="peer text-textgreenColor focus:ring-textgreenColor " 
                                    onChange={handlePaymentChange} 
                                    checked={selectedPayment === 'gcash'}
                                    required
                                    />
                                    <h1 className='text-black px-3'>Gcash</h1>
                                    <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello to you too!" title='After clicking "Pay with GCash", you will be redirected to GCash to complete your
purchase securely.'>
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
                            <label htmlFor="cash" class="inline-flex px-4 py-5 justify-between items-center w-full text-white bg-white border border-gray-200 rounded-lg cursor-pointer group-focus-within:bg-cards group-hover:border-textgreenColor hover:bg-gray-100 ">
                                <div className='inline-flex items-center'>
                                    <input type="radio" 
                                    id="cash" 
                                    name="payment" 
                                    value="cash" 
                                    class="peer text-textgreenColor focus:ring-textgreenColor " 
                                    onChange={handlePaymentChange}
                                    checked={selectedPayment === 'cash'}
                                    required/>
                                    {riderNote?.option === 'pickup' ? <h1 className='text-black ps-3'>Cash</h1> : <h1 className='text-black ps-3'>Cash on Delivery</h1>}
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className='inline-flex items-center justify-center py-4'>
                        <img src={lock} className=' filter grayscale'></img> <h1 className='text-sm text-gray-500'>Secure and encrypted</h1>
                    </div>
                    {/*  onClick={()=> handleCheckout()}  */}
                    <div>
                        <button onClick={notifyAndProceed} className='bg-gradient-to-r from-[#1f4d29] via-[#2b6b36] to-[#1f4d29] hover:scale-105 duration-300 rounded-xl text-white w-full py-5 font-semibold text-lg'>
                            Pay Now
                        </button>
                        <ToastContainer />
                    </div>
                </div>
            </div>

            {/* right side */}
            <div className='w-full px-16 bg-gray-100'>
                <div className='mt-10 space-y-4 h-96 overflow-hidden overflow-y-auto py-4'> {/* Main container */}

                    {items.map(item => (

                        <div key={item.id} className='flex flex-row items-center py-2'> {/* order list */}
                            
                            {/* Product image */}
                            <div className='w-24 h-24 px-2 rounded-lg bg-textgreenColor overflow-hidden me-4 relative'>
                                <img src={item.image_url} className='object-contain h-full w-full' alt={item.food_name} />

                                {/* Quantity badge */}
                                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black/50 rounded-full top-1 end-1">
                                    {item.quantity}
                                </div>
                            </div>

                            {/* Product details */}
                            <div className='flex flex-col w-full'>
                                {/* Product name and size */}
                                <div className='flex justify-between items-center mb-2'>
                                    <h1 className='font-semibold tracking-wider'>{item.food_name}</h1>
                                    <h1 className='text-gray-500 text-sm tracking-wider'>{item.size}</h1>
                                </div>
                                
                                {/* Addons and price */}
                                <div className='flex justify-between items-center'>
                            
                                    <h1 className='text-sm tracking-wider'><span className='md:font-bold tracking-wider'>Addons:</span> {item.addons ? item.addons : 'No addons'}</h1>
                                    <p className='font-semibold tracking-wider'>
                                        ₱<span>{item.food_price * item.quantity}.00</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        
                    ))}
                      

                </div>

                {/* voucher */}
                <div className='w-full mt-5'> 
                    {discount > 0 ? 
                     <p className="flex justify-center">Voucher "{code}" Applied</p>
                     
                     :<form onSubmit={handleSubmit} className="flex items-center" >   
                     <label htmlFor="code" className="sr-only">Search</label>
                     <input 
                         type="text" 
                         id="code"
                         value={code}
                         onChange={(e) => setCode(e.target.value)}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"  
                         placeholder="Discount code or gift card"
                     />
                     
                     <button 
                         type='submit'
                         className="p-4 ms-2 text-sm font-medium text-white bg-textgreenColor rounded-lg border border-textgreenColor hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-textgreenColor"
                     >
                         {loading ? 'Applying...' : 'Apply'}
                     </button>
                 </form>}
                </div>

                {/* Subtotal / Shipping / Total */}
                <div className='w-full mt-5 space-y-2'>

                    {/* Subtotal */}
                    <div className='text-sm text-gray-900 flex justify-between'> 
                        <h1>
                            Subtotal
                        </h1>
                        <p className='text-md font-semibold'>
                        ₱{totalBill}.00
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
                    <div className='text-sm text-gray-900 flex justify-between'>
                        <h1>
                            Discount
                        </h1>
                        <p className='text-md font-semibold'>
                            - ₱{discount}.00
                        </p>
                    </div>
                    {/* Total */}
                    <div className='text-md text-gray-900 flex justify-between pb-10'>
                        <h1>
                            Total
                        </h1>
                        <p className='text-xl font-bold'>
                            <span className='text-black me-2 text-xl'></span>₱{totalBill}.00
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
                <h1 class="text-white text-4xl font-bold">{cmsName}</h1>
                <div class="flex gap-2">
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={fb} alt=""></img>
                </button>
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={ig} alt=""></img>
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

