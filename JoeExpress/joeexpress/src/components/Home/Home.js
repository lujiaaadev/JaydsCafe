import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jayds1 from '../image/jaydsCoffee.svg';
import jayds2 from '../image/jaydsCoffee2.svg';
import image1 from '../image/bg_bean.png';
import milk from '../image/milk(menu).svg';
import milktea from '../image/milktea(menu).svg';
import fruity from '../image/fruity(menu).svg';
import addons from '../image/addons(menu).svg';
import arrowleft from '../image/arrow left.png';
import arrowright from '../image/arrow right.png';
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import yt from '../image/yt.svg';
import image2 from '../image/bg_bean2.png';
import image3 from '../image/milktea.png';
import image11 from '../image/menu.png';
import aboutUsImage from '../image/AboutUs.png';
import beansImage from '../image/coffe_bean.png';
import chat from '../image/live-chat.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  //styles inside the element
  const styleCard = {
    transform: 'scale(1.5)', 
    opacity: '0.1',
  };

  const styleCard2 = {
    background: 'radial-gradient(black, transparent 0.6)', 
    transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', 
    opacity: '0.2',
  }
  
  const cardContainers = {
    display: 'none',
  }

  const [cmsName,setCmsName] = useState('');
  const [cmsBigLogo,setBigLogo] = useState(null);
  const [cmsSmallLogo,setSmallLogo] = useState(null);
  const [cmsAboutUsImage,setAboutUsImage] = useState(null);
  const [cmsAboutUs,setAboutUs] = useState('');
  const [cmsOperationHour,setOperationHour] = useState('');
  const [cmsOperationDays,setOperationDays] = useState('');
  const [cmsLocation,setLocation] = useState('');
  const [cmsFacebook,setCmsFacebook] = useState('');
  const [cmsInstagram,setCmsInstagram] = useState('');
  const [cmsLink,setCmsLink] = useState('');
  const [cmsPhone,setCmsPhone] = useState('');
  const [cmsTel,setCmsTel] = useState('');
  const [cmsMilkTeaPrice,setCmsMilkTeaPrice] = useState('');
  const [cmsCoffeePrice,setCmsCoffeePrice] = useState('');
  const [cmsSnackPrice,setCmsSnackPrice] = useState('');
 
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
    const fetchMilkTeaPriceData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Milktea Price'});
        setCmsMilkTeaPrice(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    const fetchCoffeePriceData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Coffee Price'});
        setCmsCoffeePrice(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    const fetchSnackPriceData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Snack Price'});
        setCmsSnackPrice(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    
    const fetchaboutusData = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'About Us'});
        setAboutUs(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchOperationHoursData = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'Operation hours'});
        setOperationHour(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchOperationDaysData = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'Operation Days'});
        setOperationDays(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchSmallLogo = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'Small Logo'});
        setSmallLogo(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    const fetchBigLogo = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Big Logo'});
        setBigLogo(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchAboutUsImage = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Store Image'});
        setAboutUsImage(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    const fetchFacebookLinkData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Facebook'});
        setCmsFacebook(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    const fetchInstagramLinkData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Instagram'});
        setCmsInstagram(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    const fetchLinkData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Link'});
        setCmsLink(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    const fetchLocation = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'Location'});
        setLocation(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    }

    const fetchPhoneData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Phone Number'});
        setCmsPhone(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    const fetchTelData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Tel Number'});
        setCmsTel(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

      fetchPhoneData();
      fetchTelData();
      fetchNameData();
      fetchLocation();
      fetchaboutusData();
      fetchLinkData();
      fetchInstagramLinkData();
      fetchFacebookLinkData();
      fetchBigLogo();
      fetchSmallLogo();
      fetchAboutUsImage();
      fetchSnackPriceData();
      fetchCoffeePriceData();
      fetchMilkTeaPriceData();
      fetchOperationHoursData();
      fetchOperationDaysData();


  },[])


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
    <div class="bg-jaydsBg">

    {/* <!-- nav --> */}
    <nav class="sticky top-0 bg-white z-20 shadow-lg">
      <div class="font-extrabold text-2xl flex items-center">
        {/* <!-- Logo/Title in Navbar --> */}
        <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">Jayd's Cafe</a>
      </div>
      <span class="menu">
        <ul
          class="nav_links md:hidden sm:hidden lg:flex lg:flex-row lg:justify-between"
        >
          <li class="link"><a href="#">Home</a></li>
          <li class="link"><a id="menu-link" href="#">Menu</a></li>
          <li class="link"><a href="#about">About Us</a></li>
          <li class="link"><a href="#footer">Contact Us</a></li>
        </ul>
      </span>

      <div class="flex items-center">
        {/* <!-- drawer Burger and show --> */}
        <button
          class="burger lg:hidden mr-3"
          id="burger-btn"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          type="button"
        >
          <img src={image11} alt="" />
        </button>

        {/* <!-- Dropdown menu --> */}
        <div
          id="dropdownHover"
          class="hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="burger-btn"
          >
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#Menu"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Menu</a
              >
            </li>
            <li>
              <a
                href="#about"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="#footer"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>

        {/* <!-- Button for Login or Sign Up --> */}
        <Link to="/login">
          <button
            class="btn mr-3 w-40 h-12 text-greenColor text-sm tracking-widest shadow-md cursor-pointer hover:shadow-lg outline  hover:shadow-gray-400 hover:bg-greenColor hover:text-white hover:outline-none ease-in-out transition background-color 0.3s, color 0.3s duration-300">
               Login/Sign Up 
          </button>
        </Link>
      </div>
    </nav>
    <div class="scroll-progress "></div> {/* <!-- for scroll effect sa taas --> */}

    {/* <!-- Chat button / chat box / chat bot --> */}
    <div class="fixed bottom-0 right-0 mb-4 mr-4 z-50 w-16 h-16">
      <button
        id="open-chat"
        class="bg-footer text-white py-2 px-4 rounded-full hover:bg-amber-700 transition duration-300 flex items-center w-16 h-16"
      >
        <img src={chat} alt="chat"/>
      </button>
    </div>
    <div id="chat-container" class="hidden fixed bottom-16 right-4 w-96 z-50">
      <div class="bg-cards2 shadow-md rounded-lg max-w-lg w-full">
        <div
          class="p-4 border-b bg-footer text-white rounded-t-lg flex justify-between items-center"
        >
          <p class="text-lg font-semibold">JoeBot</p>
          <button
            id="close-chat"
            class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div id="chatbox" class="p-4 h-80 overflow-y-auto">
          {/* <!-- Chat messages will be displayed here --> */}
          <div class="mb-2">
            <p
              class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block"
            >
              👋 Hi there! I'm JoeBot!, your friendly virtual assistant here at
              JoeExpress. I'm here to make your experience as smooth and
              enjoyable as possible. Whether you need help finding your favorite
              milk tea flavor, placing an order, or learning about our latest
              promotions, I'm just a click away!
            </p>
          </div>
          <div class="mb-2">
            <p
              class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block"
            >
              Feel free to ask me anything, and I'll do my best to assist you.
              Let's get started on finding your perfect drink today! 🥤
            </p>
          </div>
        </div>
        <div class="p-4 border-t flex">
          <input
            id="user-input"
            type="text"
            placeholder="Type a message"
            class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            id="send-button"
            class="bg-footer text-white px-4 py-2 rounded-r-md hover:bg-amber-700 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>

    {/* <!-- Land upper --> */}
    <div class="flex lg:flex-row flex-col overflow-hidden bg-jaydsBg text-white py-16 h-fit top-0 items-center" id="about">
      <div class="lg:w-1/2 px-32 py-16 md:text-center lg:text-left"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1500">
        <p class="text-black font-semibold tracking-wider text-3xl pb-1 drop-shadow-2xl">WELCOME TO </p>
        <h1 class="text-textgreenColor text-8xl font-extrabold pb-2 drop-shadow-lg" id="name">Jayd's Cafe</h1>
        <p class="max-w-[28rem] mb-5 text-md text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, molestias temporibus ipsam eaque quidem dicta. Asperiores nisi error delectus, earum accusantium molestias unde quod. Provident rerum laborum aliquam temporibus voluptatibus.</p>
    
        <div class="">
          <button class="bg-greenColor rounded-full py-3 px-5 text-white text-2xl font-light w-fit outline outline-white hover:outline-greenColor hover:bg-white hover:text-textgreenColor transition duration-300">Order Now!</button>
        </div>
      </div>
      <div class="w-[400px] h-[400px] md:m-auto relative hover:scale-100">
        <img src={jayds1} alt="" class="w-[400px] h-[400px] z-10 absolute -top-6 -left-12" data-aos="fade-down-right"
        data-aos-duration="1500" data-aos-easing="ease-in-sine"></img>

        <img src={jayds2} alt="" class= "w-[400px] h-[400px] absolute top-10 left-28"data-aos="fade-down-left"
        data-aos-duration="1500" data-aos-easing="ease-in-sine"></img>
      </div>
      
    </div>

    {/* <!-- Best Sellers --> */}
    <div class="bg-white" id="Menu">
      <h1 class="font-bold text-greenColor text-6xl text-center py-8 top-10 z-auto">
        Top Picks of the Day
      </h1>
      <div class="flex justify-center mb-32">
        <h3 class="text-center text-2xl tracking-wider w-[950px] justify-center text-black">
          Discover our most loved milk tea flavors, refreshed daily based on what our customers are raving about!
        </h3>
      </div>

      {/* <!-- Background Coffee --> */}
      <div class="relative bg-cover">
        <img
          src={image1}
          alt="beans"
          class="absolute top-20 right-0 p-14 rotate--20 z-0"
        />
      </div>

      {/* <!-- Background Coffee --> */}
      <div class="relative bg-cover">
        <img
          src={image1}
          alt="beans"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-14 z-0"
        />
      </div>

      {/* <!-- cards --> */}
      <div class="container mx-auto p-4 flex justify-center">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-32 justify-items-center h-full px-32 py-3">

          {/* <!-- Card 1.2 --> */}
          <div class=" z-10 relative flex flex-col p-4 rounded-xl bg-clip-border text-gray-700 shadow-md outline outline-[6px] outline-greenColor hover:bg-greenColor hover:text-white transition duration-300 overflow-visible" data-aos="flip-right" data-aos-duration="1000" data-aos-easing="ease-out-cubic">
            
            <div class="z-10 relative mx-4 mt-[-130px] h-56 rounded-xl bg-blue-gray-500 bg-clip-border hover:scale-110 duration-500">
              <img src="/public/image/americano.png" alt="img-blur-shadow" layout="fill" class="object-contain w-full h-full"/>
            </div>
            <div>
              <h1 class="text-2xl font-bold mt-4 mb-2 hover:text-white">
                Espresso 
              </h1>

              <div class="min-h-32">
                <p class="text-start text-xs tracking-wider min-w-36">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non atque ipsa quibusdam dicta. Est, atque quaerat neque quasi explicabo ullam. Impedit labore doloribus nisi nobis, possimus ipsam placeat beatae veniam.
                </p>
              </div>

              <div class="flex justify-between items-center mt-4 w-full">
                <span>20ML</span>
              </div>
            </div>
            <div class=" flex justify-end">
              <button class="text-white outline hover:text-black hover:bg-jaydsBg outline-white hover:outline-greenColor font-bold py-2 px-4 rounded-md" >
              BUY NOW
              </button>
            </div>
          </div>

          {/* <!-- Card 2.2 --> */}
          <div class="z-10 relative flex flex-col p-4 rounded-xl bg-clip-border text-gray-700 shadow-md outline outline-[6px] outline-greenColor hover:bg-greenColor hover:text-white transition hover:scale-110 duration-300 overflow-visible" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="300" data-aos-easing="ease-out-cubic">
            
            <div class="z-10 relative mx-4 mt-[-130px] h-56 rounded-xl bg-blue-gray-500 bg-clip-border hover:scale-110 duration-500">
              <img src="/public/image/caramel.png" alt="img-blur-shadow" layout="fill" class="object-contain w-full h-full"/>
            </div>
            <div>
              <h1 class="text-2xl font-bold mt-4 mb-2 hover:text-white">
                Caramel
              </h1>

              <div class="min-h-32">
                <p class="text-start text-xs tracking-wider min-w-36">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non atque ipsa quibusdam dicta. Est, atque quaerat neque quasi explicabo ullam. Impedit labore doloribus nisi nobis, possimus ipsam placeat beatae veniam.
                </p>
              </div>

              <div class="flex justify-between items-center mt-4 w-full">
                <span>20ML</span>
              </div>
            </div>
            <div class=" flex justify-end">
              <button class="text-white outline hover:text-black hover:bg-jaydsBg outline-white hover:outline-greenColor font-bold py-2 px-4 rounded-md" >
              BUY NOW
              </button>
            </div>
          </div>

          {/* <!-- Card 3.2 --> */}
          <div class="z-10 relative flex flex-col p-4 rounded-xl bg-clip-border text-gray-700 shadow-md outline outline-[6px] outline-greenColor hover:bg-greenColor hover:text-white transition hover:scale-110 duration-300 overflow-visible" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="500" data-aos-easing="ease-out-cubic">
            
            <div class="z-10 relative mx-4 mt-[-130px] h-56 rounded-xl bg-blue-gray-500 bg-clip-border hover:scale-110 duration-500">
              <img src="/public/image/fruit.png" alt="img-blur-shadow" layout="fill" class="object-contain w-full h-full"/>
            </div>
            <div>
              <h1 class="text-2xl font-bold mt-4 mb-2 hover:text-white">
                Orange Freshie
              </h1>

              <div class="min-h-32">
                <p class="text-start text-xs tracking-wider min-w-36">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non atque ipsa quibusdam dicta. Est, atque quaerat neque quasi explicabo ullam. Impedit labore doloribus nisi nobis, possimus ipsam placeat beatae veniam.
                </p>
              </div>

              <div class="flex justify-between items-center mt-4 w-full">
                <span>20ML</span>
              </div>
            </div>
            <div class=" flex justify-end">
              <button class="text-white outline hover:text-black hover:bg-jaydsBg outline-white hover:outline-greenColor font-bold py-2 px-4 rounded-md" >
              BUY NOW
              </button>
            </div>
          </div>

          {/* <!-- Card 4.2 --> */}
          <div class="z-10 relative flex flex-col p-4 rounded-xl bg-clip-border text-gray-700 shadow-md outline outline-[6px] outline-greenColor hover:bg-greenColor hover:text-white transition hover:scale-110 duration-300 overflow-visible" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="700" data-aos-easing="ease-out-cubic">
            
            <div class="z-10 relative mx-4 mt-[-130px] h-56 rounded-xl bg-blue-gray-500 bg-clip-border hover:scale-110 duration-500">
              <img src="/public/image/expresso.png" alt="img-blur-shadow" layout="fill" class="object-contain w-full h-full"/>
            </div>
            <div>
              <h1 class="text-2xl font-bold mt-4 mb-2 hover:text-white">
                MilkTea
              </h1>

              <div class="min-h-32">
                <p class="text-start text-xs tracking-wider min-w-36">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non atque ipsa quibusdam dicta. Est, atque quaerat neque quasi explicabo ullam. Impedit labore doloribus nisi nobis, possimus ipsam placeat beatae veniam.
                </p>
              </div>

              <div class="flex justify-between items-center mt-4 w-full">
                <span>20ML</span>
              </div>
            </div>
            <div class=" flex justify-end">
              <button class="text-white outline hover:text-black hover:bg-jaydsBg outline-white hover:outline-greenColor font-bold py-2 px-4 rounded-md" >
              BUY NOW
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* <!-- Background Coffee --> */}
      <div class="relative bg-cover">
        <img
          src={image1}
          alt="beans"
          class="absolute bottom-0 left-0 p-14 z-0"
        />
      </div>
    </div>

    {/* <!-- Menu offering --> */}
    <div class="bg-exportColor w-full mb-10 relative" id="offer">
      <h2
        class="text-4xl font-semibold text-center mb-4 pt-10 text-textgreenColor">
        Menu Offering
      </h2>
      <p class="text-center mb-10 text-xl text-black">A Delicious Variety of Milk Teas, Snacks, and Special Treats</p>


      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-wrap flex-row space-x-5 space-y-2">
          <a href="#offer" class="menu_category" onclick="toggleVisibility('all');"><img src={milk} alt=""></img>All Drinks</a>
          <a href="#offer" class="menu_category" onclick="toggleVisibility('mt');"><img src={milktea} alt=""></img>Milk Tea</a>
          <a href="#offer" class="menu_category" onclick="toggleVisibility('ft');"><img src={fruity} alt=""></img>Fruity</a>
          <a href="#offer" class="menu_category" onclick="toggleVisibility('ic');"><img src={milktea} alt=""></img>Iced Coffee
          </a>
          <a href="#offer" class="menu_category" onclick="toggleVisibility('ao');"><img src={addons}  alt=""></img>Add Ons</a>
          <a href="#offer" class="menu_category" onclick="toggleVisibility('tea');"><img src={milktea}  alt=""></img>Tea</a>
          <a href="#offer" class="menu_category" onclick="toggleVisibility('sk');"><img src={milktea}  alt=""></img>Snacks</a>
        </div>

        <div id="all"> {/* <!-- Div For All Items--> */}
          <div class="px-24 py-12 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4"> {/* <!-- Card Container--> */}

            <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="brown"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="red"/>
              </svg>
              <div class="relative flex flex-col h-full">
                <div class="flex-1">
                  <div class="relative pt-5 px-10 flex items-center justify-center">
                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect--> */}
                    <img class="relative w-40" src="/public/image/caramel.png" alt=""></img>
                  </div>
                </div>
                <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                  <span class="block opacity-75 -mb-1">Large</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">Caramel</span>
                    <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                  </div>
                  <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="purple"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="orange"/>
              </svg>
              <div class="relative flex flex-col h-full">
                <div class="flex-1">
                  <div class="relative pt-5 px-10 flex items-center justify-center">
                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect-->*/}
                    <img class="relative w-40" src="/public/image/fruit.png" alt=""></img>
                  </div>
                </div>
                <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                  <span class="block opacity-75 -mb-1">Medium</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">Strawberry</span>
                    <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                  </div>
                  <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="yellow"/>
              </svg>
              <div class="relative flex flex-col h-full">
                <div class="flex-1">
                  <div class="relative pt-5 px-10 flex items-center justify-center">
                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/*<!-- Shadow Effect-->*/}
                    <img class="relative w-40" src="/public/image/expresso.png" alt=""></img>
                  </div>
                </div>
                <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                  <span class="block opacity-75 -mb-1">Medium</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">Espresso</span>
                    <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                  </div>
                  <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="brown"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="orange"/>
              </svg>
              <div class="relative flex flex-col h-full">
                <div class="flex-1">
                  <div class="relative pt-5 px-10 flex items-center justify-center">
                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect--> */}
                    <img class="relative w-40" src="/public/image/orderPage(Image).png" alt=""></img>
                  </div> 
                </div>
                <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                  <span class="block opacity-75 -mb-1">Medium</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">Strawberry</span>
                    <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                  </div>
                  <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="purple"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="orange"/>
              </svg>
              <div class="relative flex flex-col h-full">
                <div class="flex-1">
                  <div class="relative pt-5 px-10 flex items-center justify-center">
                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect-->*/}
                    <img class="relative w-40" src="/public/image/caramel.png" alt=""></img>
                  </div>
                </div>
                <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                  <span class="block opacity-75 -mb-1">Large</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">Caramel</span>
                    <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                  </div>
                  <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="orange"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="brown"/>
              </svg>
              <div class="relative flex flex-col h-full">
                <div class="flex-1">
                  <div class="relative pt-5 px-10 flex items-center justify-center">
                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect--> */}
                    <img class="relative w-40" src="/public/image/fruit.png" alt=""></img>
                  </div>
                </div>
                <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                  <span class="block opacity-75 -mb-1">Medium</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">Orange</span>
                    <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                  </div>
                  <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="black"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="orange"/>
              </svg>
              <div class="relative flex flex-col h-full">
                <div class="flex-1">
                  <div class="relative pt-5 px-10 flex items-center justify-center">
                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect-->*/}
                    <img class="relative w-40" src="/public/image/expresso.png" alt=""></img>
                  </div>
                </div>
                <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                  <span class="block opacity-75 -mb-1">Medium</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">Espresso</span>
                    <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                  </div>
                  <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
              <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="purple"/>
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="orange"/>
              </svg>
              <div class="relative flex flex-col h-full">
                <div class="flex-1">
                  <div class="relative pt-5 px-10 flex items-center justify-center">
                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect-->*/}
                    <img class="relative w-40" src="/public/image/orderPage(Image).png" alt=""></img>
                  </div> 
                </div>
                <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                  <span class="block opacity-75 -mb-1">Medium</span>
                  <div class="flex justify-between">
                    <span class="block font-semibold text-xl">Strawberry</span>
                    <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                  </div>
                  <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div id="mt" style={cardContainers}>
          <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
            <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
              <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="brown"/>
              <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="red"/>
            </svg>
            <div class="relative flex flex-col h-full">
              <div class="flex-1">
                <div class="relative pt-5 px-10 flex items-center justify-center">
                  <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect-->*/}
                  <img class="relative w-40" src="/public/image/caramel.png" alt=""></img>
                </div>
              </div>
              <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                <span class="block opacity-75 -mb-1">Large</span>
                <div class="flex justify-between">
                  <span class="block font-semibold text-xl">Caramel</span>
                  <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                </div>
                <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div id="ft" style={cardContainers}>I'm container Fruity</div>
        <div id="ic" style={cardContainers}>I'm container ice Coffee</div>
        <div id="ao" style={cardContainers}>I'm container Add Ons</div>
        <div id="tea" style={cardContainers}>I'm container Tea</div>
        <div id="sk" style={cardContainers}>I'm container Snacks</div>

        {/* <!-- Add button here --> */}
        <button class="py-2 px-4 bg-greenColor outline outline-white hover:outline-greenColor hover:bg-white hover:text-textgreenColor text-white font-bold rounded-full shadow-md transition duration-300 ease-in-out flex justify-center mx-auto mt-4 mb-5" > 
          View All Products
          <svg class="rtl:rotate-180 text-lg w-6 h-6 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10" >
            <path stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
    </div>

    {/* <!-- About Us --> */}
    <div class="flex lg:flex-row md:flex-col overflow-hidden bg-greenColor text-white py-10 top-0" id="about">
      <div
        class="p-32 md:text-center lg:text-left"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1500"
      >
        <h3 class="font-extrabold text-6xl mb-10">Our Story</h3>
        <h2 class="font-extrabold text-4xl mb-10">
          Let Us Introduce Ourselves
        </h2>
        <p class="max-w-lg md:m-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non porro
          rem, quod corrupti eius iure sit nihil similique, et voluptatem
          possimus tenetur! Eum obcaecati sed odio velit labore quas in!
        </p>
        {/* <!-- <button
          type="button"
          class="mt-12 text-orange-950 hover:text-white border border-orange-950 hover:bg-orange-950 focus:ring-4 focus:outline-none focus:ring-orange-950 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-950 dark:text-orange-950 dark:hover:text-white dark:hover:bg-orange-950 dark:focus:ring-orange-950"
        >
          Order Now!
        </button> --> */}
      </div>
      <img
        src={aboutUsImage}
        alt="About Us"
        id="aboutUsPic"
        class="w-[550px] h-[591px] md:m-auto hover:scale-100"
        data-aos="fade-down-left"
        data-aos-duration="1500"
      />
    </div>

    {/* <!-- Reviews --> */}
    <div class="mt-20 h-screen">
      <h2 class="font-extrabold text-5xl mb-10 text-yellow-950 text-center">
        Reviews
      </h2>

      {/* <!-- Background Coffee --> */}
      <div class="relative bg-cover">
        <img
          src={image1}
          alt="beans"
          class="absolute top-20 right-96 p-14 rotate--90 z-[-1]"
        />
      </div>

      <div class="gallery-wrap">
        <img
          src={arrowleft}
          alt="Right-button"
          id="backBtn"
          class="w-12 h-12"
        />
        <div class="gallery">
          <div>
            <span
              ><img src="/public/image/Facebook Post Recommendation.png" alt=""
            /></span>
            <span
              ><img
                src="/public/image/Facebook Post Recommendation (1).png"
                alt=""
            /></span>
            <span
              ><img
                src="/public/image/Facebook Post Recommendation (2).png"
                alt=""
            /></span>
          </div>
          <div>
            <span
              ><img src="/public/image/Facebook Post Recommendation.png" alt=""
            /></span>
            <span
              ><img
                src="/public/image/Facebook Post Recommendation (1).png"
                alt=""
            /></span>
            <span
              ><img
                src="/public/image/Facebook Post Recommendation (2).png"
                alt=""
            /></span>
          </div>
          <div>
            <span
              ><img src="/public/image/Facebook Post Recommendation.png" alt=""
            /></span>
            <span
              ><img
                src="/public/image/Facebook Post Recommendation (1).png"
                alt=""
            /></span>
            <span
              ><img
                src="/public/image/Facebook Post Recommendation (2).png"
                alt=""
            /></span>
          </div>
        </div>
        <img
          src={arrowright}
          alt="Right-button"
          id="nextBtn"
          class="w-12 h-12"
        />
      </div>
    </div>

    {/* <!-- Background Coffee --> */}
    <div class="relative bg-cover">
      <img
        src={image1}
        alt="beans"
        class="absolute top-10 left-48 p-14 rotate-180 z-[-1]"
      />
    </div>
    {/* <!-- Background Coffee --> */}
    <div class="relative bg-cover">
      <img
        src={image1}
        alt="beans"
        class="absolute top-72 right-80 p-14 rotate-90 z-[-1]"
      />
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

    {/* <!-- Contact Us --> */}
    <footer class="bg-[#1A1A1A] w-full h-1/4 mt-5 py-7 flex flex-col justify-center items-center" id="footer">

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

    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    {/* <!-- AOS Animation--> */}
    </div>
  );
}

export default Home;