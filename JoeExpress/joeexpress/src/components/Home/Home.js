import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import image1 from '../image/bg_bean.png';
import image2 from '../image/bg_bean2.png';
import image3 from '../image/milktea.png';
import image8 from '../image/logo.png';
import image9 from '../image/UserAcc.png';
import image10 from '../image/bag.png';
import image11 from '../image/menu.png';
import aboutUsImage from '../image/AboutUs.png';
import beansImage from '../image/coffe_bean.png';
import milkteaoffer from '../image/milktea_offer.png';
import splash from '../image/splash.png';
import coffee from '../image/coffee.png';
import snacks from '../image/snacks.png';
import chat from '../image/live-chat.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {


  useEffect(() => {
    // Burger menu functionality
    const burgerBtn = document.getElementById('burger-btn');
    const navLinks = document.querySelector('.nav_links');
    if (burgerBtn && navLinks) {
      burgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('hidden');
      });
    }

    // Double click functionality
    let clickCount = 0;
    let lastClickTime = 0;
    const menuLink = document.getElementById('menu-link');
    if (menuLink) {
      menuLink.addEventListener('click', (event) => {
        event.preventDefault();
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastClickTime;

        if (timeDiff < 500) { // 500ms threshold for double click
          clickCount++;
        } else {
          clickCount = 1;
        }

        lastClickTime = currentTime;

        if (clickCount % 2 === 1) {
          window.location.href = '#Menu';
        } else {
          window.location.href = '#offer';
        }
      });
    }

    // Scroll functionality for review tab
    const scrollContainer = document.querySelector('.gallery');
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      });

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          scrollContainer.scrollLeft += 900;
        });
      }

      if (backBtn) {
        backBtn.addEventListener('click', () => {
          scrollContainer.scrollLeft -= 900;
        });
      }
    }

    // Chatbot functionality
    const chatbox = document.getElementById('chatbox');
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const openChatButton = document.getElementById('open-chat');
    const closeChatButton = document.getElementById('close-chat');

    let isChatboxOpen = true; // Set the initial state to open

    function toggleChatbox() {
      if (chatContainer) {
        chatContainer.classList.toggle('hidden');
        isChatboxOpen = !isChatboxOpen; // Toggle the state
      }
    }

    if (openChatButton) {
      openChatButton.addEventListener('click', toggleChatbox);
    }

    if (closeChatButton) {
      closeChatButton.addEventListener('click', toggleChatbox);
    }

    if (sendButton) {
      sendButton.addEventListener('click', function () {
        const userMessage = userInput.value;
        if (userMessage.trim() !== '') {
          addUserMessage(userMessage);
          respondToUser(userMessage);
          userInput.value = '';
        }
      });
    }

    if (userInput) {
      userInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
          const userMessage = userInput.value;
          addUserMessage(userMessage);
          respondToUser(userMessage);
          userInput.value = '';
        }
      });
    }

    function addUserMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('mb-2', 'text-right');
      messageElement.innerHTML = `<p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">${message}</p>`;
      chatbox.appendChild(messageElement);
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    function addBotMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('mb-2');
      messageElement.innerHTML = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
      chatbox.appendChild(messageElement);
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    function respondToUser(userMessage) {
      // Replace this with your chatbot logic
      setTimeout(() => {
        addBotMessage('Burat!');
      }, 500);
    }

    // Automatically open the chatbox on page load
    toggleChatbox();

    // Initialize AOS
    AOS.init();

    // Cleanup event listeners on component unmount
    return () => {
      if (burgerBtn) {
        burgerBtn.removeEventListener('click', () => {
          navLinks.classList.toggle('hidden');
        });
      }

      if (menuLink) {
        menuLink.removeEventListener('click', (event) => {
          event.preventDefault();
          // Your click event logic
        });
      }

      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', (evt) => {
          evt.preventDefault();
          scrollContainer.scrollLeft += evt.deltaY;
        });

        if (nextBtn) {
          nextBtn.removeEventListener('click', () => {
            scrollContainer.scrollLeft += 900;
          });
        }

        if (backBtn) {
          backBtn.removeEventListener('click', () => {
            scrollContainer.scrollLeft -= 900;
          });
        }
      }

      if (openChatButton) {
        openChatButton.removeEventListener('click', toggleChatbox);
      }

      if (closeChatButton) {
        closeChatButton.removeEventListener('click', toggleChatbox);
      }

      if (sendButton) {
        sendButton.removeEventListener('click', () => {
          const userMessage = userInput.value;
          if (userMessage.trim() !== '') {
            addUserMessage(userMessage);
            respondToUser(userMessage);
            userInput.value = '';
          }
        });
      }

      if (userInput) {
        userInput.removeEventListener('keyup', (event) => {
          if (event.key === 'Enter') {
            const userMessage = userInput.value;
            addUserMessage(userMessage);
            respondToUser(userMessage);
            userInput.value = '';
          }
        });
      }
    };
  }, []);

  const [authenticated, setAuthenticated] = useState(false);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate('/menu')
  }
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/foods')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching food details:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => {
        if (res.data.valid) {
          setAuthenticated(true);
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:8081/logout');
      if (res.data.success) {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        navigate('/');
      } else {
        console.log('Logout Failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}

      <nav className="sticky top-0 bg-white z-20">
        <div className="font-extrabold text-3xl flex items-center">
          <a href="#" className="flex items-center"><img src={image8} alt="logo" className="logo" />JoeExpress</a>
        </div>
        <span class="menu">

          <ul class="nav_links md:hidden sm:hidden lg:flex lg:flex-row lg:justify-between" >
            <li className="link"><a href="#Landing1">Home</a></li>
            <li className="link"><a id="menu-link" href="#Menu" >Menu</a></li>
            <li className="link"><a href="#about">About Us</a></li>
            <li className="link"><a href="#footer">Contact Us</a></li>
          </ul>

        </span>

        <div className="flex items-center">
          <button className="burger lg:hidden mr-3" id="burger-btn"><img src={image11} alt="" /></button>
          {authenticated ? (
            <>
              <div className="flex space-x-2 mr-2">
                <a href="#"><img src={image9} alt="user" className="mr-3" /></a>
                <Link to={'/cart'}><img src={image10} alt="bag"/></Link>
              </div>
              <button
                onClick={handleLogout}
                className="btn w-48 h-14 bg-slate-900 text-gray-100 text-base tracking-widest lg:bg-green-600 md:bg-yellow-500 sm:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={navLogin} className="btn mr-3 w-48 h-14 bg-footer text-gray-100 text-base tracking-widest">
              Login/Sign Up
            </button>
          )}
        </div>
      </nav>

      <div class="fixed bottom-0 right-0 mb-4 mr-4 z-50 w-16 h-16">
        <button id="open-chat" class="bg-amber-600 text-white py-2 px-4 rounded-full hover:bg-amber-700 transition duration-300 flex items-center w-16 h-16">
            <img src={chat} alt="chat"/>
        </button>
    </div>
    <div id="chat-container" class="hidden fixed bottom-16 right-4 w-96 z-50">
        <div class="bg-cards2 shadow-md rounded-lg max-w-lg w-full">
            <div class="p-4 border-b bg-amber-600 text-white rounded-t-lg flex justify-between items-center">
                <p class="text-lg font-semibold">Pouring Joe Admin</p>
                <button id="close-chat" class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div id="chatbox" class="p-4 h-80 overflow-y-auto">
                
              {/* <!-- Chat messages will be displayed here --> */}
              <div class="mb-2">
                <p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">Hi! Welcome to Pouring Joe. How can I help you?</p>
              </div>
            </div>
            <div class="p-4 border-t flex">
                <input id="user-input" type="text" placeholder="Type a message" class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button id="send-button" class="bg-amber-600 text-white px-4 py-2 rounded-r-md hover:bg-amber-700 transition duration-300">Send</button>
            </div>
        </div>
    </div>

      {/* Landing section */}
      <div className="pt-10 pb-52" id="Landing1">
        <div className="relative">

        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/> 
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/> 
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/> 
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" /> 


            <div class="beans object-center">
                <img src={image1} alt="bean" class="w-60 h-56 block" data-aos="fade-down-right" data-aos-duration="1500"/>
                <img src={image2} alt="bean" class="w-60 h-56 block" data-aos="fade-down-right" data-aos-duration="1500"/>
            </div>

          <div className="pt-11 absolute bottom-0 m-auto top-0 left-0 right-0">
            <p className="text-center font-semibold text-2xl">WELCOME TO <br />
              <span className="text-yellow-950 font-bold text-8xl">POURING JOE</span> <br />
              <span className="font-light text-xl">Embrace The Harmony Of Milk Tea And Pure Bliss.</span></p>
          </div>
        </div>

        <div className="flex flex-row w-full top-[700px] lg:absolute md:mt-10 mb-10 overflow-hidden h-full">
          <div class="pl-40 w-full" data-aos="fade-down-left" data-aos-duration="1500">
            <p className="text-2xl absolute left-0 pl-20">
              <span className="font-semibold">OPERATION HOURS</span><br />
              MONDAY-SATURDAY <br />
              2:00 PM - 9:00 PM
            </p>
          </div>

          
          <div className="p-4">
            <p className="text-2xl absolute right-0 pr-20" data-aos="fade-down-right" data-aos-duration="1500">
              <span className="font-semibold">LOCATED AT</span><br />
              AURORA HOME SALINAS 1 <br />
              BACOOR, CAVITE
            </p>
          </div>
        </div>

        <div className="relative w-full h-auto">
          <div className="object-center flex justify-center items-center pt-12">
            <img src={image3} alt="display1" data-aos="fade-up" data-aos-duration="1500" />
          </div>
          <div className="flex flex-col justify-center items-center top-[550px] absolute bottom-0 right-0 w-[100%]">
            <button onClick={handleNavigate} type="button" className="text-yellow-950 bg-orange-100 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 tracking-wide font-bold rounded-full italic text-3xl px-5 py-2.5 me-2 mb-2 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[258px] h-80 shadow-xl items-center">Order Now!</button>
          </div>
        </div>
      </div>

      {/* Menu section */}
      <div id="Menu">
        <h1 className="font-bold text-stone-800 text-7xl text-center pb-10">Best Sellers</h1>
        <h2 className="font-bold text-orange-900 text-center text-3xl tracking-wider pb-10">Enjoy a new blend of Milk Tea and Coffee style!</h2>
        <h3 className="text-center text-xl tracking-wider pb-10">Explore all flavours of coffee with us. There is always a new cup worth experiencing</h3>

        <div className="relative bg-cover">
          <img src={image1} alt="beans" className="absolute top-20 right-0 p-14 rotate--90 z-[-1]" />
        </div>

        <div className="relative bg-cover">
          <img src={image1} alt="beans" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-14 z-[-1]" />
        </div>

        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-center mb-8">Our Coffee Menu</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {foods.map(food => (
              <div key={food.id} class="bg-cards rounded-3xl p-4 z-10">
                <img src={food.image_url} alt={food.name} class="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-4xl font-semibold text-center mb-2 text-yellow-950">{food.name}</h2>
                <p className="text-black mb-4">{food.description}</p>
                <div className="flex items-center justify-between">
                         
                    <span key={food.size} className="text-gray-500">
                      Price starts at P{food.price}
                    </span>
            
                  <button onClick={handleNavigate} class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md mt-4">BUY NOW</button>
                </div>
              </div>
            ))}

              {/* <!-- Background Coffee --> */}

          <div class="relative bg-cover">
                      <img src={image1} alt="beans" class="absolute bottom-0 left-0 p-14 z-0"/>
                  </div>
          </div>

        <div class="bg-exportColor h-screen w-full mb-10 relative" id="offer"> 

        <h2 class="text-4xl font-semibold text-center mb-20 pt-10 text-yellow-950">Menu Offering</h2>

        <div class="splash">
            <img src={splash} alt="splash" class="absolute top-0 right-0 rotate-180 z--0"/>
            <img src={splash} alt="splash" class="absolute bottom-0 left-0 z-0"/>
            </div>

        <div class="flex flex-col justify-center items-center">

            <div class="flex flex-row text-right pr-64">
                <img src={milkteaoffer} alt="Milktea" class="w-36 h-36" data-aos="zoom-out-up" data-aos-duration="1500"/>
                <h1 class="font-extrabold text-left self-center" data-aos="fade-right" data-aos-duration="1500">MILK TEA <br/>
                    <span class="font-normal">29 Pesos to 39 Pesos</span>
                </h1>
            </div>
            <div class="flex flex-row text-left pl-96">
                <h1 class="font-extrabold text-left self-center" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">COFFEE <br/>
                    <span class="font-normal"> 29 Pesos to 59 Pesos</span>
                </h1>
                <img src={coffee} alt="Coffee" class="w-36 h-36" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="500"/>
            </div>
            <div class="flex flex-row text-right pr-56 mb-11">
                <img src={snacks} alt="Snacks" class="w-36 h-36" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="700"/>
                <h1 class="font-extrabold text-left self-center" data-aos="fade-right" data-aos-duration="1500">SNACKS <br/>
                    <span class="font-normal">49 Pesos to 59 Pesos</span>
                </h1>
            </div>
        </div>

        <button onClick={handleNavigate} class="py-3 px-6 bg-orange-950 hover:bg-orange-900 text-white font-bold rounded-full shadow-md transition duration-300 ease-in-out flex justify-center mx-auto">
            View All Products
            <svg class="rtl:rotate-180 text-lg w-6 h-6 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>

    </div>
        </div>

        {/* <div className="relative bg-cover">
          <img src={image1} alt="beans" className="absolute bottom-0 left-0 p-14 z-[-1]" />
        </div> */}
      </div>

      {/* About Us section */}
      <div className="flex lg:flex-row md:flex-col" id="about">
        <div className="p-32 md:text-center lg:text-left" data-aos="fade-right" data-aos-offset="300"data-aos-easing="ease-in-sine" data-aos-duration="1500">
          <h3 className="font-extrabold text-6xl mb-10">Our Story</h3>
          <h2 className="font-extrabold text-4xl mb-10">Let Us Introduce Ourselves</h2>
          <p className="max-w-lg md:m-auto">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non porro rem, quod corrupti eius iure sit nihil similique, et voluptatem possimus tenetur! Eum obcaecati sed odio velit labore quas in!</p>
          <button type="button" className="mt-12 text-orange-950 hover:text-white border border-orange-950 hover:bg-orange-950 focus:ring-4 focus:outline-none focus:ring-orange-950 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-950 dark:text-orange-950 dark:hover:text-white dark:hover:bg-orange-950 dark:focus:ring-orange-950">Order Now!</button>
        </div>
        <img src={aboutUsImage} alt="About Us" id="aboutUsPic" className="w-[550px] h-[591px] md:m-auto" data-aos="fade-down-left" data-aos-duration="1500"/>
      </div>

      {/* Reviews section */}
      <div className="mt-20 h-screen">
        <h2 className="font-extrabold text-4xl mb-10 text-yellow-950 text-center">Reviews</h2>
        <div className="relative bg-cover">
          <img src={image1} alt="beans" className="absolute top-20 right-96 p-14 rotate--90 z-[-1]" />
        </div>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
      </div>

      {/* <!-- FAQ --> */}
    <div class="h-screen pt-10">
      <h2
        class="text-3xl font-extrabold text-black mb-10 flex flex-col justify-center items-center"
      >
        Frequently Asked Questions
      </h2>

      <div class="flex justify-center items-center">
        <div
          id="accordion-color"
          data-accordion="collapse"
          data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
          class="w-4/5"
        >
          <h2 id="accordion-color-heading-1">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-color-body-1"
              aria-expanded="true"
              aria-controls="accordion-color-body-1"
            >
              <span class="text-lg"
                >How do I place an order on JoeExpress?</span
              >
              <svg
                data-accordion-icon
                class="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-1"
            class="hidden"
            aria-labelledby="accordion-color-heading-1"
          >
            <div
              class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                To place an order, simply browse our menu, select your favorite
                items, and add them to your cart. Once you're ready, proceed to
                checkout, where you can review your order and provide your
                delivery details. Finally, choose your preferred payment method
                and confirm your order.
              </p>
            </div>
          </div>
          <h2 id="accordion-color-heading-2">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-color-body-2"
              aria-expanded="false"
              aria-controls="accordion-color-body-2"
            >
              <span class="text-lg">What payment methods do you accept?</span>
              <svg
                data-accordion-icon
                class="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-2"
            class="hidden"
            aria-labelledby="accordion-color-heading-2"
          >
            <div
              class="p-5 border border-b-0 border-gray-200 dark:border-gray-700"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                We accept only Cash on delivery or Gcash payment method.
              </p>
            </div>
          </div>
          <h2 id="accordion-color-heading-3">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-color-body-3"
              aria-expanded="false"
              aria-controls="accordion-color-body-3"
            >
              <span class="text-lg">Do you charge for delivery?</span>
              <svg
                data-accordion-icon
                class="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-3"
            class="hidden"
            aria-labelledby="accordion-color-heading-3"
          >
            <div
              class="p-5 border border-t-0 border-gray-200 dark:border-gray-700"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                We offer free delivery for orders over a certain amount. For
                orders below this amount, a small delivery fee may apply.
                Details will be provided during checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Footer */}
      <footer class="bg-footer w-full h-1/4 py-7 flex flex-col justify-center items-center" id="footer">
                        {/* <!-- container footer--> */}
        <div class="border-y-2 border-gray-400 w-4/5 p-10 flex justify-between">
        
        {/* <!-- logo / soc med--> */}
            <div class="md:flex">
            <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="149"
      height="149"
      fill="none"
      viewBox="0 0 149 149"
    >
      <path fill="url(#pattern0_283_1439)" d="M0 0H149V149H0z"></path>
      <defs>
        <pattern
          id="pattern0_283_1439"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.00093)" xlinkHref="#image0_283_1439"></use>
        </pattern>
        <image
          id="image0_283_1439"
          width="1080"
          height="1080"
          xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIbGNtcwIQAABtbnRyUkdCIFhZWiAH4gADABQACQAOAB1hY3NwTVNGVAAAAABzYXdzY3RybAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWhhbmSdkQA9QICwPUB0LIGepSKOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAF9jcHJ0AAABDAAAAAx3dHB0AAABGAAAABRyWFlaAAABLAAAABRnWFlaAAABQAAAABRiWFlaAAABVAAAABRyVFJDAAABaAAAAGBnVFJDAAABaAAAAGBiVFJDAAABaAAAAGBkZXNjAAAAAAAAAAV1UkdCAAAAAAAAAAAAAAAAdGV4dAAAAABDQzAAWFlaIAAAAAAAAPNUAAEAAAABFslYWVogAAAAAAAAb6AAADjyAAADj1hZWiAAAAAAAABilgAAt4kAABjaWFlaIAAAAAAAACSgAAAPhQAAtsRjdXJ2AAAAAAAAACoAAAB8APgBnAJ1A4MEyQZOCBIKGAxiDvQRzxT2GGocLiBDJKwpai5+M+s5sz/WRldNNlR2XBdkHWyGdVZ+jYgskjacq6eMstu+mcrH12Xkd/H5////2wBDAAICAgICAgMCAgMEAwMDBAUEBAQEBQcFBQUFBQcIBwcHBwcHCAgICAgICAgKCgoKCgoLCwsLCw0NDQ0NDQ0NDQ3/2wBDAQICAgMDAwYDAwYNCQcJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3/wAARCAQ4BDgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorO1LU9O0ezk1DVruCytYhmSe5kWKJR7s5AH4mvgj4s/8FO/2RvhNqFxosviafxZqVqP3tv4ZtxfqGBIKi5d4bQsCOQJuO+KAP0Ior8RLj/gqZ8eviXmy/Zz/Z41nVWvHKadqWofar63cE/K8sFpbxRoMct/pm0f3sc1gah8Vv8AgtD4lvRLpPw+03Q06+TbW2lxxf8AfV/ezN/4/QB+7VFfiLp3w9/4LS+LLZ/7V+IXh7w2s3z+TcrpCyR552iSw0y4YY6ffP1PWtaz/wCCdX7ZesWkFz4s/a18VWt9KFluILO41a7t4ZnGXWJm1O2yitkKfKjyMfKvQAH7SUV+Mv8Aw7N/acQlo/2vfGQJ64j1If8AubrzTxd+wL/wUe0Ofd4A/aS1fX7WPlReeJtc0yc46DyfMuoufeXFAH7y0V/NL4j/AGiP+Csv7M2siw+IVrqevaXpUJJlvNDttW0uaCPgSyajYQrMeBk+ZcLJzlxmvc/hV/wWy0S4aCw+Nfw/nsifLWXUvDdwJ48nhm+x3JjZFHXieQ44xkcgH7z0V8o/Bb9tj9mb4/Xf9k/DnxrazasE3nTL+OTTrwgAZ2RXKx+bjPJiLgetfVoOaAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoor59/aM/aS+Gn7L/AIAl8ffEm6kWN2MOn6fbAPeajdbciCBCQM92ZiEQck0Aew+JPFHhzwbol34l8WanaaNpNhGZbm9vpkt7eFFGSWkkIUDA9a/F/wCN3/BYXSo9ZufAn7MPg+fxbrEtx9jsdX1BJPstxMTgG1sIP9Judx4Tc0RJ52kGvgS4H7Tv/BVT443T6b5+neENPu4j5UszPo3hqycFQ235BPdSKrngeZK5IykY+T+gj9mf9jL4I/st6Ilv4G0lbzXpYoxf+Ir9Vm1G5cKA+xzn7PExGfJiwvPO480AflP4V/YK/bR/a51JPFf7Y/j3U/Dnh97gXsOhPcC7uQWB/wCPewik+w2B2NtDMDKOjRda/SX4O/8ABOn9kv4MpbT6Z4Lg8R6rbbW/tTxKRqk7OnRxFIBaxuDyDFAhB/Cvbfjn+0p8F/2cdDj1z4u+JbfR/tAY2lkoae+vCpAPkW0QaVwCQC2Ai5+ZgOa/G/4y/wDBa7UXuJdP+AXgaKKAcLqnipi8jc87bK0lULx0JuG5PK8YIB/QFBDDbRJb26LFFEoREQBVVVGAABwAB0FTk4r+Qmf9pT/goZ+1Bc3Vl4a1zxprlvdymKS08JWctpaxBjkROdOijAjAOCZWPy8uTya9K8O/sFf8FIviPLHpHiJdX0jTnjGZ/EfiYG1jHZTDFc3M/TsITjvigD+qJbu1aJp0mjMSEhnDDaCOuT0GKzrjxH4ftImmu9Us4Y0GWaS4jVQPUkkYr+bq1/4JDftpW1g+nW3j3wlb2kn+stk1vV1ib6ounbTXA+I/+CPH7X2mRG4s7nwp4gk/uWOrTLJ+d5a2y/8Aj1AH9NOnfEf4eau5i0vxRot64OCsGoW8pB9MLIa663ure6TzLaaOZfWNgw/MV/Hhrf8AwTd/bX0AO938L76dEJGbK9sL0nHcLb3UjYP0ryB/hb+1J8I72Yjwt478JXEJLPLDY6jY/d/iEkaKCP8AaBI96AP7dq+afib+x/8AszfF83M3jz4daHeXt0rCXULa2FjfsW53farXypiQTkEsea/lK8F/tv8A7XXw6nU6D8U/EjCF8+Rqt2dWhUr1Xyr8TqB6gAD8a/Rv4Lf8FpvG+m38Vh8ffCFlrOmbVV9R8NqbTUEwOXa3uJnt5ix7K9uBnj0oA9D+On/BFrSpLGbVv2dvFs8V4HeT+yPFDq8DqxyEhvLeFXj2DhRLFJnjMg5J+SvCX7WP7b3/AAT+8Wj4WfFS2n1nSbIIkWj+IpHurdrVeFbTdQRmZY8fdCtJGnQxAggf0U/Av9pT4M/tHaC+vfCTxFBqwto4mvbJwYL+yaUZC3Fu4DrzkbhmMkHazDmvRvHPgLwb8S/Dl54P8faJZa/o18myeyv4VmiYDkEA8hgQCGBBU4IIIoA+Lf2bv+Ckf7O37RV3Y+GYr6fwh4uvcRx6LreEE82OVtbpcwTc8KCY5W/551+gtfzSft0/8Euta+GMl18UP2btOutX8GxwtNqWg+a91f6V5QJaWAvmW4tdoyQS8sZzncvK737AX/BTnWfCOqab8G/2kNWN74XlSGy0fxJcgm40x1ASKG8ccy2rDAEzDfEeXJQkxgH9HtFRq6uodSCpGQRyCKkoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMzVtV03Q9Mu9a1i4jtLGxhkuLmeVtscUMQ3OzHsABmv5QPj18SfHH/AAUm/a40rwl8PIZ10Rp/7K8OwyodlnpykNdahcL/AA7wpmk6HYqR/eAz+tH/AAV3+PJ+G3wDt/hXo9wYtZ+Itw1tKFOGXSbTa90eh4lYxxfRmrzP/gjZ+z1D4a+Hmr/tF63Gjaj4teXSNGyATDpllNtuHBIyDPdR7SAcYgU96AP1H/Z++A3gT9nD4YaT8LvAFtstLBPMuruRf9Iv71wPOup27ySHt0RcIoCqAPlD9vb9vXQP2UNBTwj4TSDWfiTrNuZbGylO63023bKi7uwCCckHyosgyEEkhRz9u/FL4haL8KPhz4k+JXiIkab4a0241KdR99xAhYIv+1IcKPc1+FH7A/7M2tftcfFbXf21/wBomNdR0+fWXuNI0+RAYNQ1C3IG9kYEGysQqwxR8iR1wTiIhwDxP4B/sN/tG/t1+LW+N/7ROuanpHh7UkDHV9QjH9p6lGnCR2FswWOG2H8MhVYgP9Wj5OP2V+E3/BN79kX4Q3FlqWneC08Q6vZBNuo+Ipn1J3kTpJ9nkIs1fPIKwLg9McV92KoRQqjAHAA6AU+gCnaWdrYW6WdjBFbW8S4SKJAiKPQKoAAq5RWTrGuaL4dsJNV8Qaha6ZZRf6y5vJkghT6vIVUfiaANaiviX4i/8FEf2O/hnc/YdX+I+n6rdc/udASXWcbeCGls0lhQg9mkBr4n8ff8FsvhFpEnlfDb4f674l2OVeXVLuDRoWAP3o/LW/kIPUb0jPqBQB+2VFfzS+N/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nrg78j8Kpyaj/wAFSPhtoGoeK9Tvfivpej6TC19fXWqT38sEEMYyzv8AamcBVHLccDk0Af1V+NPHXg34ceHbnxd4+1qx8P6LZ48++1CdYIELHCjc5ALMeAByT0Br4uuv+CoX7DlpdtaP8SN/luyPJFousSRgqcHDLYkOPQrkEcg18g/sM/BDWP2xfDNh+0p+1v4nufiXDayXmkaD4a1JE/su2FuwR7qeCMJFLMx3AAp0wzlzt2fpHL+xf+yZPZtYP8IPBoibqyaNbJL+EqxiQfg1AH4Rf8FWfjh+z7+0BcfDbxp8G/Flr4i1CzttSstQjhtbiCWO1ZoZbcy/aIonXDmXCMM/MTjrX7wfsefEz/hbv7Mfw48dy3Bury70G2tb+UjBe/sR9lumI954mPHrX5s/tL/8EdPB3ic3Xin9mzVV8Mai26Q+H9UZ5tMlckkiC4+aa29ArCVOw2CviL9mz9ub42fsI+LLz9n34waJJqnhbw7qM9rfaOyLHqWmSM+6SSxnJVJYpM+aiyExyhg0boG3EA/qcorzn4V/FHwR8aPAekfEr4eajHqeh61AJoJVxvjbo8My5PlzRNlJEPKsCK9GoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/kF/4Kc6Nc+Hf24PiFMqmJb19I1C2kHGRLptruYfSUOPqK/rN8CeJIfGXgfw74vt2Dxa5pVlqUbDoVu4EmBH4NX4E/8Fs/hjc23i34f/GG1tx9lv7Gfw9ezqACJ7WRrm3DdyXjllx7R1+h/wDwS4+K1p8TP2QvC+m+fJNqfgqW48N34lz8n2Z/NtQpPVRZywgY4BBXtQB+ileX2/wZ+FFr8Q7r4tQeENHTxnexrFca6LOL7e6qqoMzY3Z2RquRzgAZwK9Qr8nf2wP+Cktv8KvFR+CP7O+ijx78SJXe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RH+JXlar8Sfg/eXLEXEFl4k0+2J+VTCxtb5wPVhJaA/7tAHjv/BIz9pS6+Gnxfu/gF4tvmt/D3jhidNiuGKpbeIIQAigMQEN3EphI6vKsK9a/pwr+T7/AIKffB2T4CftYN418FpLplh4wSLxVp89uPKW21RZiLpYWAGHWdFn4+75wr+jL9lH486V+0l8CvDHxSsZI/t93bLa61BEpRbbV7dVW7iCkkhPM+aPJOY2U96APo+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvIvjv8PoPiv8ABjxt8N7mRoF8RaHfWKyqAxjlliby3APXZJg49q9dpCM8HkGgD+Nf/gnp4vbwT+2R8MNTFwbeK81Y6TN8xVZF1SCW0CN2ILyqQD/EAeoFfY3/AAWX8It4U/aJ8H/EjSZWtrnX9AjzJF+7kW70m4YLKHGDuEckQB6jYK/PH4++DdV/Z+/aZ8XeF9MdbW68JeJ5bnTJIflWOJZRdWTKBjbiJozgdDwK/b7/AIK4eGdP+J37LHw/+Omlwq0um31lcCUKCV07X7XcRu6485IPbmgD9Zvg54zg+Ivwm8G+PLe5S9XX9B07UGnj+60lxbo8nHYhyQR1BBB5Fem1+W//AASJ+IMfi/8AZItPDLzGS68Ga1qGlMjElhDcOL6IjP8AB/pLKP8AcI7V+pFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/MX/wUY+GniX9kr9r3Qv2kfhbD/Zlj4kvY/EFlLCpFvDrdsw+327gdUusiZ1JxIJpVA2ggf0R/CT4n+Evjr8LfD3xQ8JN5+i+KNPW6jim2s8RbMc9tMFLJ5sEqvDKASN6MASOa89/at/Z18P8A7UPwW1r4W60yW15Li90W/cE/YNVgVhbz8Anb8zRSgcmKRwMEgj8Qf+Cen7S3if8AZL+N+sfsi/HDfaaPqGvPpcTSuTFo+uCTyQyE4H2O9O3LgbcmOYYUyEgHjX/BSj9j68/Zr+Ky/Ez4cWD2PgDxTdfarBrP93Ho+q5MklouzHkx5Hm22MAJlF/1VfvJ+wz+1TpP7VfwWsfEk0u3xdoCW+meKbY7FP29Yx/pSIgULBd4MkYAAU74xnyyT738afhN4V+Onwv8RfCrxlCsmneILKW280xrI9rOR+4uYg3Hm28u2WM/3gO2RX8tPws8afFD/gmh+13d6L4zt5Z7KylGneILS1YGDV9EuCHhu7bJClgu2eDJVlcGGQoTKoAP6hv2h/DH/CafAL4k+Eg8UT6x4T1uxjluBuiikns5lSRh/wBM3IbPbGRX83X/AAR7lmj/AGv0SLO2XwvqqSY/u7oG5/4EBX7P/tjftqfCP4Yfs1z+KvD+s2uval8R9DuYfCFvbtv+1i8hMX2qRDgpb23mZlDhW3jyuHJx8e/8Eev2Wrjw54euf2p/Ec4M3ieyutG8P2S8+XZRXQW5uZT1Ekk1t5cSjGI1ZiSJBtAPqP8A4Kl/ACX41/s03vibRYoDr3w3km8SQySKPNfTYYH/ALQt43wSu+ILNgffe3Qehr88f+CLvxvtPD/jvxb8BNbvZEXxXDFrWhwO37n7fp6OLxIx186e1KSHt5dqckEAH+ijVdMsNb0u80XVYVubK/gltbmFxlZYZlKOp9mUkGv5AdK0Wf8AY9/4KCadocdy8Vj4K8e21uszNmWTQ7udQC5G355dOn+btliOR1AP7EKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP5cv+Cxnw0tPCX7TOneOdPXanjjQbe6ugFxm9sCbRz75hSD3zmvvr9n24t/2o/wDglFq/gKeUahq/h/QtV8PEXILiK90T/S9MUHDHEcH2TaQPl6DpWX/wWn+F7698HfB/xWsoN83hPWJN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KPw207x/+zR8fv8AhF9M1KZ4fE+n2d9quj3mm6jCo/cvDZMY7o7SrLIzxAxkEdwAD96P2rf2lfCX7Lvwi1b4heIJ4JNVaKS30DS5Ww+pamVPkxBVO7ylOGmcfcjBPUqD+U//AASm+F198avij4//AG2viW8F9rL6ze6fpqogEcOqXyJc39wqdY/Lt7mOGDBI2Syg8hTXpvxB/wCCdmh+E/gH8S/ij+0L478RfGXx3oPgfX7vSL7W767FppU9rp808bW8b3MssrRyrkGaQxtgHyVPNdP/AMEVf+TWfFP/AGP+o/8Aps0qgD9fqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxU/4LQ/B1vEfwl8K/GnTkzceDtQfTL/A62GrbQjsf+mVzEiAf9NjX7V15r8XfhroPxj+GPif4X+Jolk07xLpk9hIXUP5Lyr+6nUNkeZBKFljPZ1BHIoA/FT/gjR8W7XxN4Y+IH7MniYvdQLC/iDT4ZC7qbG6EdlqMOTxHGJGgZVH3mmlbrkn8cf2l/grqH7PXxx8XfCG+kkuY9BviLG5lAD3OnzqJ7SZsADc8EiGQLwJNw7V7V+yd4s8Qfso/tt+HbPxW/wBhl0XxJP4S8RxiZkt/IupG0+4ZyNvmRQOwuEyMExI3YV+mH/BaH4Cm70vwr+0XoVpmSxP/AAjviCWNf+WMhMthM+OySGWIsc58yJewoA/Ff4F/H34nfs5+OIfiB8K9WOnagimG5gkHm2d7btyYLmHIWSMnkdGVgGUqwBH9AnwG/wCCxfwU8biDR/jdpd18P9UKANfwiTUtIlk6dYYzdQbj0VopEUfel4zX8yFFAH94HgP4mfDz4paQNe+HHibSvE+n5XdcaVeRXSRswyFk8tmMb+qNhh0IrvK/gr8MeM/GHgi+bU/Bmu6loF46+W1xpd5NZzFfQvCy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trxxqmgajoCaZoibotH+1W0luXuZ1IihNshZvKQtKpUBkVTuHa/8EqNb8Par+xN4MstDmikudIvdastWjj5eG9bUJ7kJIcL85tp4JB1xG6jPFAH6NUUUUAFFFFABX4i/siyf8KQ/4Ka/Hv4FxtDHpXi5ZdetoYVEaRzFo9UtYURcKEhtdSnTAHG0V+3Vfjb8TNOh0b/gsx8Jru0SOFtd8E3dzdmJArTNHYa5ADIQMuwW1jAJ52oo6ACgD9kq/KP/AILC+Abzxb+yjD4psFVj4M8R2GpXRIy32S6WWwYDuP31zCT7A1+rleMftCfD1Piv8DPHnw4NulzN4g8PahZ2qSAEC8aBzbOM5+aOcRuD2IBoA+av+CZHji98c/sX+ApdVvft17oi3uhyMxy8UVhdSpawn08q08lVH90Cvvyvwx/4Il+JCPBvxT+H128kV3pWr6fqZtZMqU+2Qy27kIehBtQH44+XPav3OoAKKKKACiiigAooooAKKKKAPmf9qD9l34Z/tTeAJPCXjywWTUbGK6k0HVFd4p9MvZ49gkVoz80ZIUyROGjfaCVyqkfxm+PvBWufDfxv4g+HviZI01fw1qd3pN8IiWi8+ylaGQxsQu5Cy5VsDK4Pev7yq/mZ/wCCyXwMk8IfGfRfjfpNsy6X46shaahIqkqmr6YojyxA2r51p5WwE5YxSnscAH401/Vf/wAEgPGuqeLP2RF0jUeY/CXifU9FtG3Fy1u0dtqAznptkvXUDsoFfyoV/T9/wRV/5NZ8U/8AY/6j/wCmzSqAP1+ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD8BbLx03wT/wCCy/iAeJZHg03x8lvoq3Vz8oKapp9pJaeWT1X7dbxW47dfTFfv1X4Ef8FlPhHr+k6/4B/ac8IJcxS6aqaLqd7bls2U1tMbrTZ8qP3eZJJl8wkfOIx1Ir9N/wBif9p/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AAUY1fwbfOtq1zL4p8PQJ91fOtpJJhH6Di1IA9cAckV/UVQAUUUUAfmD/wAFZfhA/wAS/wBla88T6baGfVPAN/DrsZXG8WJBgvRz/AI5BM3f90Pofjf/AIInfFopdeP/AII6nffLKlr4j0i0kbgMmba/KA92BtSQP7pPrj91fH3g7S/iJ4G8Q+Adbz/Z/iXSr3SLrb1EN7C8DkdOQHOPev5Bf2f/ABRrP7If7aujLrs4jPhDxXceG9ck3GGF7J5pNPu5DnrGI2MybuMqp7AgA/srooooA/Fb/gtZ4As9T+C/gr4lxwbtQ0HxF/ZTygciz1O2lkbJ9BNaxAe719gf8E5/jDP8aP2TfB2q6hzqXhuH/hF75zL5zyS6SkcccrsefMltzFI2ecsTk5zXcftvfC+L4u/srfEfwobI317HotxqumQqCZTf6Yv2qAR4wd7vF5YHcMQeCRX5B/8ABFD4r2+meNfHnwX1GRgdds7bXdNUn5BNp5aG5UD+/JHNE30iNAH9FtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfhL/wAFrfhHNe+EfAnxq01F8vSL250DUVSP5tmoD7RbykjoiyQyqSeryr61tf8ABE74k2l/8MvHvwlnmc3ui61Dr0COc5ttSgS3YRjsI5bTLDpmUHqTX6OftmfCBvjn+zJ4++HVvkX9zpbX2nFVDMb/AExlvLeMdcCaSERMRyEc4Ffzif8ABLD4oN8OP2vvDemXNw0Wn+M7a78O3K78IZJ0861yvQk3MMSDuN5+hAP636KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACimjqfanUAFFFFABRRRQAUUUUAFFFFABRRRQAmAe1AGKWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+Lv8AgoT4MPjn9jf4o6WkQllsdH/tmPJIKf2RNHfMwx3EcLfXpX5N/wDBEnxstl8RfiR8PJZlUavo1jq0MTNgl9NneFio7nbdjOOwFf0I+LvDtn4w8Ka1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ZJb9oD4TD4geEbbzfG/gWGW4tkQMz3+mn5ri1AGcuMebFkfeBUEbyaXW4H0n+xr+0ton7T/wR0bxzBPD/wAJBbRJY+I7GMgNa6lEMOdmfljmx5sX+wwHUED6xr+KL9lb9onxT+zF8XNP8X6dcXUGmSTw2uv2UR2vPZrJ+8G1gVMkfJUEeq5GSa/sj+HHj/w98T/BeleOfC11Feadq1tHcRSxMHX51DYBHXGaFe9mB3VFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmOCylQcZBGafRQB/OD/wUR/4J9+OYvF2t/HH4SaP/AGlYXayX+t6dYQhZVeMZmvI414YyfelRBu3ZfBLGviH9kv8Abu+Lv7Jt89lomzxH4SuSTceHdQmkSBWYli9rKu77NKSckhXQ5OUJOR/YrNDFcRPbzoHjkUoytyCrcEH61+Zv7U//AATD+Cvx7+3eKvBka+CPGdwfNa8sY82V24zxcWoKR5YnJePa5OMnFSk1uBZ+Cv8AwVT/AGXPisgtfFGqP8PtUxu+z6+dtuccHbdoPJ+m8oSO3avuTwt8Y/hR42ijn8H+L9G1qKZd0cljewzowPcMjEH86/li+If/AAS7/a+8D3tyuk+Ex4rsIZJBHdaRcQuzxqflYwSPHLlhztQSYPGT1Pxr4g+GPxV8A3Un/CS+F9d0Ca1ZkZ7qxuLbay8HDsgH4g4NHowP7rY5YpIxLG4ZGGQwIII+tMa5tlfy3mQPjO0sAcfTNfwgw/EX4g2tp/Z9t4n1mK1/54x39wsX/fIfH6UQfEX4gWrmS18T6zC5G0mPULhSR6ZD9KqzA/u5i1CwuJjbwXMMkoGTGjqzY9cA5q9X8Zn7FF18QtT/AGlPDd54evNTlkSS4n1OeJ55ALZYJMtcFTyu7GN5xux3r+w3whZ31h4X0uz1K4N1cx20YlmPV2xnPNAHTUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVS6s7S9j8q7hjnT+7IgYfkat0UNJ7gZUOjaXAoSC1hjVeAEjVQB7YArN1LwjoGqqReWqNu9gf5g109FYPDUW7uK+4Dz6x+G3hfTXmawtRCLmJ4bgKAPMjk5ZSRggH2rvI40ijWKMbVQBQPQDpUtFbpW0QBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//Z"
        ></image>
      </defs>
    </svg>

                {/* <!-- Div for informations--> */}
                <div class="md:flex w-full md:items-center md:flex-wrap" >
                {/* <!-- location--> */}
                    <div class="flex items-center w-full flex-wrap mt-4 justify-end">
                        <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M5.496 8.174c0-3.515 3.44-6.357 7.695-6.357 4.254 0 7.694 2.842 7.694 6.357 0 3.788-4.858 9.01-6.848 11-.44.435-1.242.435-1.682 0-2-1.99-6.859-7.212-6.859-11zm4.947 0c0 1.254 1.23 2.271 2.748 2.271 1.517 0 2.748-1.017 2.748-2.27 0-1.254-1.231-2.271-2.748-2.271-1.517 0-2.748 1.017-2.748 2.27z"
                            clipRule="evenodd"
                        ></path>
                            </svg>
                            <span class="flex text-white">Aurora Home Salinas 1, Bacoor, Cavity City</span>
                    </div>
                    {/* <!-- phone--> */}
                    <div class="flex items-center w-full flex-wrap mt-4 justify-end">
                        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M19.349 14.846l-2.512-.268a2.054 2.054 0 00-1.622.527l-1.82 1.699c-2.799-1.33-5.093-3.463-6.517-6.086l1.83-1.709c.425-.397.632-.951.563-1.515l-.287-2.327c-.118-.933-.959-1.635-1.968-1.635h-1.71c-1.118 0-2.048.869-1.979 1.912.525 7.887 7.28 14.186 15.715 14.676 1.118.064 2.047-.804 2.047-1.848v-1.597c.01-.933-.741-1.718-1.74-1.829z"
                                clipRule="evenodd"
                            ></path>
                            </svg><span class="text-white mr-4">(+63) 908-729-012</span>

                            <svg width="29" height="23" viewBox="0 0 29 23" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M8.973 3.039h11.78c.649 0 1.179.416 1.179.924V5.81c0 .508-.53.923-1.178.923H8.973c-.648 0-1.178-.415-1.178-.923V3.963c0-.508.53-.924 1.178-.924zM6.617 7.657H23.11c1.956 0 3.534 1.237 3.534 2.77v3.695c0 1.016-1.06 1.847-2.356 1.847h-2.356v1.847c0 1.016-1.06 1.847-2.356 1.847H10.15c-1.296 0-2.356-.831-2.356-1.847V15.97H5.439c-1.296 0-2.356-.831-2.356-1.847v-3.694c0-1.534 1.578-2.771 3.534-2.771zm4.712 10.16h7.068c.648 0 1.178-.416 1.178-.925v-3.694h-9.424v3.694c0 .509.53.924 1.178.924zm11.78-6.466c-.647 0-1.178-.416-1.178-.924 0-.507.53-.923 1.178-.923.648 0 1.179.416 1.179.924 0 .507-.53.923-1.178.923z"
                                clipRule="evenodd"
                            ></path>
                            </svg><span class="text-white">(+63) 908-729-012</span>
                    </div>
                    {/* <!-- social media--> */}
                    <div class="flex items-center w-full flex-wrap mt-4 justify-end mr-36"> 
                        <span class="text-white pr-3">Social Media</span>
                        {/* <!-- facebook link --> */}
                        <button class="mr-4">
                            <a href="https://www.facebook.com/MigoooyMigoooy" class=""><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9841 17.395H1.88631C1.30711 17.395 0.837891 16.9841 0.837891 16.4774V1.68828C0.837891 1.18146 1.30719 0.770752 1.88631 0.770752H18.7853C19.3642 0.770752 19.8336 1.18146 19.8336 1.68828V16.4774C19.8336 16.9842 19.3642 17.395 18.7853 17.395H13.9447V10.9572H16.4138L16.7835 8.44824H13.9447V6.84645C13.9447 6.12005 14.1752 5.62504 15.3654 5.62504L16.8835 5.62446V3.38044C16.6209 3.34987 15.7198 3.28156 14.6714 3.28156C12.4826 3.28156 10.9841 4.45078 10.9841 6.59797V8.44824H8.50865V10.9572H10.9841V17.395Z" fill="white"/>
                            </svg>
                            </a>
                        </button>
                        {/* <!-- Instagram link --> */}
                        <button class="mr-4">
                            <a href="https://www.instagram.com/chardgrey/" class="" ><svg width="20" height="18" viewBox="4 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M14.723 2.77c-2.909 0-3.273.01-4.416.05-1.14.041-1.918.182-2.599.387-.704.213-1.301.497-1.897.959-.595.462-.961.926-1.235 1.472-.264.529-.445 1.133-.497 2.018-.053.886-.065 1.17-.065 3.427s.012 2.54.065 3.427c.052.885.233 1.489.497 2.018.274.546.64 1.01 1.235 1.472.596.462 1.193.746 1.897.959.681.205 1.46.346 2.6.386 1.142.04 1.506.05 4.415.05 2.908 0 3.272-.01 4.415-.05 1.14-.04 1.918-.18 2.599-.386.704-.213 1.301-.497 1.897-.96.595-.461.961-.925 1.235-1.471.264-.53.445-1.133.497-2.018.053-.887.065-1.17.065-3.427 0-2.258-.012-2.54-.065-3.427-.052-.885-.233-1.49-.497-2.018-.274-.546-.64-1.01-1.235-1.472-.596-.462-1.193-.746-1.897-.959-.681-.205-1.46-.346-2.6-.386-1.142-.04-1.506-.05-4.414-.05zm0 1.498c2.858 0 3.197.009 4.326.049 1.044.037 1.611.172 1.989.286.5.15.856.331 1.23.622.376.29.608.568.802.956.147.293.321.733.369 1.543.051.877.062 1.14.062 3.359 0 2.22-.01 2.482-.062 3.359-.048.81-.222 1.25-.369 1.543a2.62 2.62 0 01-.801.956c-.375.29-.731.47-1.231.622-.378.114-.945.249-1.989.286-1.129.04-1.467.048-4.327.048s-3.198-.008-4.327-.048c-1.044-.037-1.611-.172-1.988-.286-.5-.151-.857-.331-1.232-.622a2.62 2.62 0 01-.8-.956c-.147-.293-.322-.733-.37-1.543-.05-.877-.062-1.14-.062-3.36 0-2.219.011-2.481.063-3.358.047-.81.222-1.25.368-1.543.195-.388.427-.665.801-.956.375-.291.732-.471 1.232-.622.377-.114.944-.25 1.988-.286 1.13-.04 1.468-.049 4.327-.049zm-5.5 6.815c0-2.358 2.462-4.269 5.5-4.269 3.036 0 5.498 1.911 5.498 4.269 0 2.357-2.462 4.268-5.499 4.268-3.037 0-5.499-1.91-5.499-4.268zm5.5 2.77c-1.972 0-3.57-1.24-3.57-2.77s1.598-2.77 3.57-2.77c1.97 0 3.569 1.24 3.569 2.77s-1.599 2.77-3.57 2.77zm5.716-6.21c.71 0 1.285-.446 1.285-.997 0-.551-.576-.998-1.285-.998-.71 0-1.285.447-1.285.998 0 .55.575.997 1.285.997z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                            </a>
                        </button>
                        {/* <!-- RSS link --> */}
                         <button><a href=""><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M20 17.395h-3.768c0-7.42-7.184-13.458-16.015-13.458V.771C11.125.77 20 8.229 20 17.395zM.217 15.02c0-1.311 1.266-2.375 2.826-2.375 1.561 0 2.826 1.064 2.826 2.375 0 1.312-1.265 2.375-2.826 2.375-1.56 0-2.826-1.063-2.826-2.375zm9.421 2.375h3.768c0-6.111-5.917-11.083-13.189-11.083v3.167c5.195 0 9.421 3.551 9.421 7.916z"
                                clipRule="evenodd"
                            ></path>
                            </svg>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li class="footer-links"><a href="#" class="hover:underline me-4 md:me-6">About Us</a></li>
            <li class="footer-links"><a href="#" class="hover:underline me-4 md:me-6">Contact Us</a></li>
            <li class="footer-links"><a href="#" class="hover:underline me-4 md:me-6">Help</a></li>
            <li class="footer-links"><a href="#" class="hover:underline me-4 md:me-6">Private Policy</a></li>
            <li class="footer-links"><a href="#" class="hover:underline">Disclaimer</a></li>
          </ul>
          
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2024. Capstone Inc.</span>
        </div>
    </footer> 
      
    </div>
  );
}

export default Home;
