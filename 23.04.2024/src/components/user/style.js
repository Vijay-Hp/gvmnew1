import styled from "@emotion/styled";

export const NavbarStyle=styled("div")(() => ({
".MuiDrawer-root":{
    
},
".navbar-bg":{
    backgroundColor:"#3d3b52",
},
".listItemStyles" : {
    height: '25px',
    width: '25px',
    filter: 'invert(100%)'
},
".search":
{
    backgroundColor:'#312e47',
    position:"absolute",
},
'.search:hover': {
    backgroundColor: '#312e47', // Change this to your desired hover color
},

".search-icon":
{
     position:"absolute",
     left:"420px"
},
".search":{
    backgroundColor:'white',
},

".search:hover":{
    backgroundColor:'white',
},
'& .MuiInputBase-input::placeholder': {
    color: 'black', // Change the placeholder color here
},
  '& .MuiInputBase-input': {
    color:'black'   
},
// navbar bg
".Box1":{
    backgroundColor:'#312e47',
    minHeight:'250%',
    //width:'90vh',
},

".line":{
    height: '2px',
    backgroundColor:'white',
    border: 'none',
    width:'90%'
},
"@media (max-width: 768px)": {
    ".line": {
        width: '85%'/* Adjust width for mobile devices */
    }
},

//dashboard
".dashboard":{
    position: 'relative',
    padding:"10px",
    display:"flex",
    justifyContent:"right"
},

".ul":{
    textDecoration:'none',
},


".box":{
    height: '50px',
    width: '50px',
    border: '2px solid none',
    borderRadius: '5px',
    backgroundColor: '#babaef',
    padding: '10px',
    position: 'absolute',
    disply:'flex', 
    alignItems: 'center'
},

"@media (max-width: 547px)": {
    ".box": {
      height: '50px',
      width: '50px',
      border: '2px solid none',
      borderRadius: '5px',
      backgroundColor: '#babaef',
      padding: '10px',
      position: 'absolute',
      display: 'flex',
   left: '350px', // Adjust left position for mobile devices
    },
  },

//view_purchase
".updatebtn":{
    color:'black',
    height:'20px',
    paddingRight:'15px',
    marginTop:'-4px',
},
".updatebtn1":{
    color:'white',
    height:'20px',
    paddingRight:'15px',
    marginTop:'-4px',
},
".table-center":{
    textAlign:'center',
},
//construction
".bread":{
    textColor:'white',
    backgroundColor:'red' 
},
//settings
// toggle btn
".toogle":{
    color:'white',
    
},

}
))


