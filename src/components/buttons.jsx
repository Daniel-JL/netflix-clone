import React from "react";
import styled from 'styled-components';


// :root {
//   --primary: rgb(96, 99, 102);
//   --operator: rgb(96, 99, 102);
//   --number: rgb(67, 69, 71);
//   --equals: rgba(79, 120, 187, 0.52);
//   --warning: #ffd028;
//   --danger: #eb3f27;
//   --success: #75fa83;
//   --white: #fdfdfd;
//   --dark: #1a1818fd;
//   background-color: ;
// }

// .btn {
//   font-family: "Roboto", sans-serif;
//   font-weight: 400;
//   cursor: pointer;
//   transition: transform 0.3s ease;
// }

// .btn:hover {
//   border: 1px solid white;
//   color: black;
// }

// .btn:focus {
//   outline: none;
//   box-shadow: none;
// }

// /*Button colours and styles*/

// .btn--primary--solid {
//   background-color: var(--primary);
//   color: var(--white);
//   border: 1px solid black;
// }

// .btn--clear--solid {
//   background-color: firebrick;
//   color: var(--white);
//   border: 1px solid black;
// }

// .btn--operator--solid {
//   background-color: var(--operator);
//   color: var(--white);
//   border: 1px solid black;
// }

// .btn--number--solid {
//   background-color: var(--number);
//   color: var(--white);
//   border: 1px solid black;
// }

// .btn--equals--solid {
//   background-color: var(--equals);
//   color: var(--white);
//   border: 1px solid black;
// }

// .btn--warning--solid {
//   background-color: var(--warning);
//   color: var(--dark);
//   border: black;
// }

// .btn--danger--solid {
//   background-color: var(--danger);
//   color: var(--white);
//   border: black;
// }

// .btn--success--solid {
//   background-color: var(--success);
//   color: var(--white);
//   border: black;
// }

// .btn--primary--outline {
//   background-color: transparent;
//   color: var(--primary);
//   border: 2px solid var(--primary);
// }

// .btn--warning--outline {
//   background-color: transparent;
//   color: var(--warning);
//   border: 2px solid var(--warning);
// }

// .btn--danger--outline {
//   background-color: transparent;
//   color: var(--danger);
//   border: 2px solid var(--danger);
// }

// .btn--success--outline {
//   background-color: transparent;
//   color: var(--success);
//   border: 2px solid var(--success);
// }

// /* Button sizes */

// .btn--normal {
//   height: 50px;
//   width: 65px;
//   font-size: 15px;
// }

// .btn--long {
//   height: 100px;
//   width: 65px;
//   font-size: 15px;
// }

// .btn--wide {
//   height: 50px;
//   width: 130px;
//   font-size: 15px;
// }


// const STYLES = [
//   "btn--primary--solid",
//   "btn--clear--solid",
//   "btn--operator--solid",
//   "btn--number--solid",
//   "btn--equals--solid",
//   "btn--warning--solid",
//   "btn--danger--solid",
//   "btn--success--solid",
//   "btn--primary--outline",
//   "btn--warning--outline",
//   "btn--danger--outline",
//   "btn--success--outline",
// ];

// const SIZES = [
//   "btn--normal",
//   "btn--long",
//   "btn--wide",
// ];

const RectButton = styled.button`
  font-family: "Roboto", sans-serif;
  color: white;
  font-weight: 100;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 50px;
  width: 65px;
  font-size: 11px;
  border: 1px solid black;
`;

const RoundButton = styled.button`
  font-family: "Roboto", sans-serif;
  font-color: white;
  font-weight: normal;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 50px;
  width: 50px;
  font-size: 15px;
  border-radius: 50%;
  border: 1px solid white;
  text-align: center; 
`;

export const RectPlayButton = styled(RectButton)`
  color: black;

  &:hover {
    opacity: 0.7;
  }
`;

export const RectInfoButton = styled(RectButton)`
  color: gray;
  opacity: 0.7;

  &:hover {
    opacity: 0.4;
  };
`;

export const LinkTextButton = styled(RectButton)`
  border: 0px;
  background-color: transparent;

  &:hover {
    opacity: 0.6;
  }

  &:focus {
    font-size: 12px;
    font-weight: bold;
    outline: none;
  }
`;

export const RoundPlayButton = styled(RoundButton)`
  background-color: white;
  font-size: 25px;
  

  &:hover {
    background-color: rgba(255,255,255, 0.8);
  };
`;

export const RoundDarkButton = styled(RoundButton)`
  background-color: transparent;
  color: white;

  &:hover {
    background-color: rgba(255,255,255, 0.2);
  };
`;



// export const Button = ({ 
//   children, 
//   type, 
//   onClick, 
//   buttonStyle, 
//   buttonSize 
// }) => {

//   const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  
//   const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

//   return(
//     <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
//       {children}
//     </button>
//   );
// };