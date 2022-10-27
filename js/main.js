// how to declare variable ?

// définit le theme de l'app
const setTheme = () => {
    //set theme on load
    if (localStorage.getItem("theme") == "light") {
      document
        .querySelector("meta[name='theme-color']")
        .setAttribute("content", "#fcfaf9");
      $("body").addClass("light");
  
      setTimeout(function () {
        $("body .weather").removeClass("active");
        $("body #weather_light").addClass("active");
      }, 300);
    } else if (localStorage.getItem("theme") == "dark") {
      document
        .querySelector("meta[name='theme-color']")
        .setAttribute("content", "#16161d");
  
      $("body").addClass("dark");
      $("body .weather").removeClass("active");
      $("body #weather_dark").addClass("active");
  
      setTimeout(function () {
        $("body .weather").removeClass("active");
        $("body #weather_dark").addClass("active");
      }, 300);
    } else {
      localStorage.setItem("theme", "dark");
  
      $("body").addClass("dark");
      $("#theme_switcher .weather").removeClass("active");
      $("body #weather_dark").addClass("active");
    }
    // set theme on load
  };



  $("body").on("click", "#theme_switcher", () => {
    $(this).find(".theme_btn").toggleClass("active");

    let current_theme = localStorage.getItem("theme");
    if (current_theme == "light") {
      $("body").removeClass("light");
      $("body").addClass("dark");

      $("#theme_switcher .theme_btn").removeClass("active");
      $("#theme_switcher").find("#theme_dark").addClass("active");
      document
        .querySelector("meta[name='theme-color']")
        .setAttribute("content", "#16161d");

      // var meta = document.createElement("meta");
      // meta.name = "theme-color";
      // meta.content = "#f5f5f5";
      // document.getElementsByTagName("head")[0].appendChild(meta);

      localStorage.setItem("theme", "dark");
    } else if (current_theme == "dark") {
      $("body").removeClass("dark");
      $("body").addClass("light");
      document
        .querySelector("meta[name='theme-color']")
        .setAttribute("content", "#fcfaf9");
      $("#theme_switcher .theme_btn").removeClass("active");
      $("#theme_switcher").find("#theme_light").addClass("active");

      localStorage.setItem("theme", "light");
    }else{
        $("body").removeClass("dark");
        $("body").addClass("light");
        document
          .querySelector("meta[name='theme-color']")
          .setAttribute("content", "#fcfaf9");
        $("#theme_switcher .theme_btn").removeClass("active");
        $("#theme_switcher").find("#theme_light").addClass("active");
  
        localStorage.setItem("theme", "light");
      }
  });

//   setTheme();

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - $(".moving_shape1").height();
    var w = $(window).width() -  $(".moving_shape1").width();

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    var nb = Math.floor(Math.random() * (nw/2));

    
    return [nh,nw,nb];    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1],borderWidth: newq[2] }, 8000,   function(){
      animateDiv(myclass);      
      console.log("zsfvgsvf")  
    });
    
};
function animateDiv2(myclass){
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 5000,   function(){
      animateDiv(myclass);      
      console.log("zsfvgsvf")  
    });
    
};

$(document).ready(function(){
    animateDiv('.moving_shape1');
    // animateDiv2('.moving_shape2');

});

