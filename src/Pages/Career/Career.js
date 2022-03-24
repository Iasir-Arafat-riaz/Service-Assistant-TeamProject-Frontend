// import { Avatar, Box, Button, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
// import React from 'react';
// import Navigation from '../SharedRoute/Navigation/Navigation';
// import {
//     createTheme,
//     responsiveFontSizes,
//     ThemeProvider,
// } from '@mui/material/styles';
// import AdjustIcon from '@mui/icons-material/Adjust';
// import Footer from '../SharedRoute/Footer/Footer';
// import { Link } from 'react-router-dom';
// import SendIcon from '@mui/icons-material/Send';
// import Particles from "react-tsparticles";
// import party from "party-js";

// const Career = () => {
//     const career = [
//         {
//             "JobTitle": "Painting Service Expert",
//             "Category": "Painting & Renovation",
//             "Image": "https://i.ibb.co/q7F8pSQ/Male-hand-painting-wall-with-paint-roller-Painting-apartment-renovating-with-blue-color-paint.jpg",
//             "ServiceType": "Square Feet",
//             "Posted": "2 days ago",
//             "About": "We are Service A2Z. Our goal is to provide service to customers without hassle. By joining as a service provider you can meet with new customers and grow your revenue. Your service quality will make your profile bright. Service A2Z always tries to give the service to customers with satisfaction. ",
//             "Responsibility": [
//                 {
//                     "res": "Ensure experienced professional and expert painting"
//                 },
//                 {
//                     "res": "Ensure proper safety and service equipment carries by expert"
//                 },
//                 {
//                     "res": "Ensure proper covering before painting and cleaning after service"
//                 },
//                 {
//                     "res": "Ensure on time work completion with quality service"
//                 }
//             ],
//             "Experience": "3 years",
//             "Vacancies": 3,
//             "WhatToDo": "You will work on a project under the guidance of Service A2Z. Doing service with quality and ensure all safety and others related"
//         },

//     ]

//     let theme = createTheme();
//     theme = responsiveFontSizes(theme);

//     const particlesInit = (main) => {
//         console.log(main);

//         // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
//     };

//     const particlesLoaded = (container) => {
//         console.log(container);
//     };

//     const options = {
//         background: {
//             color: {
//                 value: "#fff"
//             }
//         },
//         fullScreen: {
//             enable: true,
//             zIndex: -1
//         },
//         interactivity: {
//             detectsOn: "window"
//         },
//         emitters: {
//             position: {
//                 x: 50,
//                 y: 50
//             },
//             rate: {
//                 quantity: 15,
//                 delay: 0.25
//             }
//         },
//         particles: {
//             color: {
//                 value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"]
//             },
//             move: {
//                 decay: 0.05,
//                 direction: "top",
//                 enable: true,
//                 gravity: {
//                     enable: true,
//                     maxSpeed: 150
//                 },
//                 outModes: {
//                     top: "none",
//                     default: "destroy"
//                 },
//                 speed: { min: 25, max: 50 }
//             },
//             number: {
//                 value: 0
//             },
//             opacity: {
//                 value: 1
//             },
//             rotate: {
//                 value: {
//                     min: 0,
//                     max: 360
//                 },
//                 direction: "random",
//                 animation: {
//                     enable: true,
//                     speed: 30
//                 }
//             },
//             tilt: {
//                 direction: "random",
//                 enable: true,
//                 value: {
//                     min: 0,
//                     max: 360
//                 },
//                 animation: {
//                     enable: true,
//                     speed: 30
//                 }
//             },
//             size: {
//                 value: 8
//             },
//             roll: {
//                 darken: {
//                     enable: true,
//                     value: 25
//                 },
//                 enable: true,
//                 speed: {
//                     min: 5,
//                     max: 15
//                 }
//             },
//             wobble: {
//                 distance: 30,
//                 enable: true,
//                 speed: {
//                     min: -7,
//                     max: 7
//                 }
//             },
//             shape: {
//                 type: [
//                     "circle",
//                     "square",
//                     "polygon",
//                     // "character",
//                     // "character",
//                     // "character",
//                     "rectangle",
//                     // "image",
//                     // "image"
//                 ],
//                 options: {
//                     image: [
//                         {
//                             src: "https://particles.js.org/images/fruits/apple.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/avocado.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/banana.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/berries.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/cherry.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/grapes.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/lemon.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/orange.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/peach.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/pear.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/pepper.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/plum.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/star.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/strawberry.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src: "https://particles.js.org/images/fruits/watermelon.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         },
//                         {
//                             src:
//                                 "https://particles.js.org/images/fruits/watermelon_slice.png",
//                             width: 32,
//                             height: 32,
//                             particles: {
//                                 size: {
//                                     value: 16
//                                 }
//                             }
//                         }
//                     ],
//                     polygon: [
//                         {
//                             sides: 5
//                         },
//                         {
//                             sides: 6
//                         }
//                     ],
//                     character: [
//                         {
//                             fill: true,
//                             font: "Verdana",
//                             value: ["💩", "🤡", "🍀", "🍙", "🦄", "⭐️"],
//                             style: "",
//                             weight: 400
//                         }
//                     ]
//                 }
//             }
//         }
//     }

//     const onClick = () => {
//         party.confetti(document.body);
//     };
//     return (
//         <ThemeProvider theme={theme}>
//             <Navigation />
//             {/* <Footer /> */}

//             <Button
//                 onClick={onClick}
//                 type="submit"
//                 variant='contained'
//                 sx={{ borderRadius: 28, }}
//                 style={{ backgroundColor: "#FF5E14", }}
//             >Apply Now <SendIcon sx={{ pl: 1 }} />

//             </Button>

//             <Particles
//                 id="tsparticles"
//                 init={particlesInit}
//                 loaded={particlesLoaded}
//                 options={options}
//             />
//         </ThemeProvider>
//     );
// };

// export default Career;