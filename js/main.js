function loader_percentage() {
  let loader_percen = { percen: 0 },
    percenDisplay = document.getElementById("percenDisplay");

  function showpercen() {
    percenDisplay.innerHTML = loader_percen.percen.toFixed(1);

    if (loader_percen.percen.toFixed(2) >= 100) {
      $(".loader").fadeOut();
      $("body").css('overflow-y','auto');
      $("main").css('opacity','1');
    }
  }

  function imgLoaded() {
    c += 1;
    let perc = ((100 / tot) * c) << 0;

    let tween = TweenLite.to(loader_percen, 3, {
      percen: perc,
      onUpdate: showpercen,
    });
  }

  let img = document.images,
    c = 0,
    tot = img.length-24;

  for (let i = 0; i < tot; i++) {
    let tImg = new Image();
    tImg.onload = imgLoaded;
    tImg.onerror = imgLoaded;
    tImg.src = img[i].src;
    console.log(` image ${i} est correctement chargée`);
    console.log("tImg",tImg.src);
  }
}

loader_percentage();

// how to declare letiable ?

// définit le theme de l'app
const setTheme = () => {
  //set theme on load
  if ( localStorage.getItem("theme") && localStorage.getItem("theme") == "light") {
    document
      .querySelector("meta[name='theme-color']")
      .setAttribute("content", "#fcfaf9");
    $("body").addClass("light");

    setTimeout(function () {
      $("body .weather").removeClass("active");
      $("body #weather_light").addClass("active");
    }, 300);
  } else if (localStorage.getItem("theme") && localStorage.getItem("theme") == "dark") {
    document
      .querySelector("meta[name='theme-color']")
      .setAttribute("content", "#16161d");

    $("body").addClass("dark");

    setTimeout(function () {
      $("body .theme_btn").removeClass("active");
      $("body #theme_dark").addClass("active");
    }, 300);
  } else {
    localStorage.setItem("theme", "light");

    $("body").addClass("light");
    $("#theme_switcher .theme_btn").removeClass("active");
    $("body #theme_light").addClass("active");
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

  //set the user theme
  setTheme();


let last_left_position;
function makeNewPosition() {
  // Get viewport dimensions (remove the dimension of the div)
  let h = window.innerHeight - $(".moving_shape1").height();
  let w = window.innerWidth - $(".moving_shape1").width();

  let nh = Math.floor(Math.random() * h);
  let nw = Math.floor(Math.random() * w);
  let nb = Math.floor(Math.random() * (nw / 2));

  return [nh, nw, nb];
}
function makeNewPosition2() {
  // Get viewport dimensions (remove the dimension of the div)
  let h = window.innerHeight - $("#lottie_bird").height();
  let w = window.innerWidth - $("#lottie_bird").width();

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
      top: newq[0],
      left: newq[1],
    },
  });

  if (last_left_position > newq[1]) {
    $("#lottie_bird").addClass("bird_back");
  } else {
    $("#lottie_bird").removeClass("bird_back");
  }

  last_left_position = newq[1];
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
    MoveInterval = setInterval(function () {
      animateDiv2("#lottie_bird");
    }, 5000);
  }, 5000);

  if (last_left_position > e.clientX) {
    $("#lottie_bird").addClass("bird_back");
  } else {
    $("#lottie_bird").removeClass("bird_back");
  }




  TweenLite.to("#lottie_bird", 1, {
    css: {
      left: e.clientX,
      top: e.clientY,
    },
  });

  last_left_position = e.clientX;
});


function progress_doc() {
  let progress_state;
  $(document).ready(function () {
    totalheight = document.body.scrollHeight - window.innerHeight;
    window.onscroll = function () {
      progress = (window.pageYOffset / totalheight) * 100;
      progress = Math.round(Number(progress));
      progress = progress + "%";
      header = $(".header");

      if (progress_state < progress) {
        $(".header").addClass("header_shade");
        $("#lottie_bird").fadeOut();

        console.log("scroll to bottom");
      } else if (window.pageYOffset == 0) {
        $(".header").removeClass("header_shade");
        $("#lottie_bird").fadeIn();
        // if (window.innerWidth > 1000) {
        //   $(".scroll_indice").css("display", "flex");
        // }
      }

      progress_state = progress;
    };
  });
}

progress_doc();