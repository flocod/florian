// how to declare letiable ?

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

    // let meta = document.createElement("meta");
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
  } else {
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

function makeNewPosition() {
  // Get viewport dimensions (remove the dimension of the div)
  let h = $(window).height() - $(".moving_shape1").height();
  let w = $(window).width() - $(".moving_shape1").width();

  let nh = Math.floor(Math.random() * h);
  let nw = Math.floor(Math.random() * w);
  let nb = Math.floor(Math.random() * (nw / 2));

  return [nh, nw, nb];
}
function makeNewPosition2() {
  // Get viewport dimensions (remove the dimension of the div)
  let h = $(window).height();
  let w = $(window).width();

  let nh = Math.floor(Math.random() * h);
  let nw = Math.floor(Math.random() * w);

  return [nh, nw];
}

function animateDiv(myclass) {
  let newq = makeNewPosition();
  $(myclass).animate(
    { top: newq[0], left: newq[1], borderWidth: newq[2] },
    8000,
    function () {
      animateDiv(myclass);
      console.log("zsfvgsvf");
    }
  );
}
function animateDiv2(myclass) {
  let newq = makeNewPosition2();
//   $(myclass).animate({ top: newq[0], left: newq[1] }, 1000, function () {
//     //   animateDiv(myclass);
//     console.log("zsfvgsvf");
//   });
  console.log("zsfvgsvf");

  TweenLite.to(myclass, 5, {
    css: {
        top: newq[0], left: newq[1]
    },
  });



}

$(document).ready(function () {
  animateDiv(".moving_shape1");
  // animateDiv2('#lottie_bird');
});



let timeout;
let MoveInterval;
$(window).on("mousemove", function moveContain_cursor(e) {
  clearTimeout(timeout);
  clearInterval(MoveInterval);
  timeout = setTimeout(function () {
    console.log("mouse not move");
   MoveInterval =setInterval(function(){
    animateDiv2('#lottie_bird');
   },5000);

  }, 5000);

  TweenLite.to("#lottie_bird", 1, {
    css: {
      left: e.clientX,
      top: e.clientY,
    },
  });

  // $("#lottie_bird").animate({ top: e.clientY, left:  e.clientX, }, 1000,   function(){

  //     console.log("zsfvgsvf")
  // });
});
