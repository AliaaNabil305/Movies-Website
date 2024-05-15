
let contentWidth=$('#nav-content').outerWidth(true)
$('nav').css('left',`-=${contentWidth}`)
$('#open').click(function(){
    if($("nav").css('left')<'0px'){
        $('nav').animate({"left":`+=${contentWidth}`},500)
        $('#open').html(`<i class="fa fa-align-justify fa-times fa-xs fw-bold"></i>`);
        $('.nav-link').css('top','100px')
        $('.nav-link').eq(0).delay(700).animate({'top':'0px','opacity':'1'})
        $('.nav-link').eq(1).delay(850).animate({'top':'0px','opacity':'1'})
        $('.nav-link').eq(2).delay(950).animate({'top':'0px','opacity':'1'})
        $('.nav-link').eq(3).delay(1050).animate({'top':'0px','opacity':'1'})
        $('.nav-link').eq(4).delay(1150).animate({'top':'0px','opacity':'1'})
        $('.nav-link').eq(5).delay(1250).animate({'top':'0px','opacity':'1'})
    }
    else{
        $('nav').animate({"left":`-=${contentWidth}`},500)
        $('#open').html(`<i class="fa fa-align-justify  fa-xs fw-bold"></i>`);
        $('.nav-link').animate({'top':'100px','opacity':'0'},200)
    }
})

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

let apiURL = "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2lWzShTgsD3oj0w6zSX-fvp4EheLUXD5mWlxD0_b_OS5K1IorVruUf0yE";
let shows;
getData(apiURL);

let category;
$(".nav-link").click(function(e){
    category=$(e.target).attr('href')
    if(category != '#contact'){
        let space=$('body').offset().top
        $('html,body').animate({'scrollTop':space},700)
        category=category.replace('#','')
        if(category=='trending'){
            apiURL = "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2lWzShTgsD3oj0w6zSX-fvp4EheLUXD5mWlxD0_b_OS5K1IorVruUf0yE";
        }
        else{
                apiURL = `https://api.themoviedb.org/3/movie/${category}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1`;
        }
    }
    getData(apiURL)
})


function checkNotUndefined(x,y){
    if(x==undefined){
        return y;
    }
    else{
        return x;
    }
}

$('#demo').click(function(){
    let space =$('.contact').offset().top
    $('html,body').animate({scrollTop:space},700);
})

let searchByMovie=document.getElementById("searchByMovie")
searchByMovie.addEventListener('keyUp',function(){
    let searchValue=searchByMovie.value
    apiURL = `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${searchValue}`;
    getData(apiURL);
})





async function getData(apiURL){
    let response=await fetch(apiURL)
    shows= await response.json()
    displayMovies(shows.results)

    let search=document.getElementById('search')
    search.addEventListener('keyup',function(){
        let searchValue=search.value
        let res=[]
        for(let i=0;i<shows.results.length;i++){
            let movieName=checkNotUndefined(shows.results[i].title,shows.results[i].name).toLowerCase()
            if(movieName.includes(searchValue.toLowerCase())){
                res.push(movieName)
            }
        }
        if(res.length==0){
            displayMovies(shows.results)
        }
        else{
            let newRes=[]
            for(let j=0;j<shows.results.length;i++){
                let movieName=checkNotUndefined(shows.results[j].title,shows.results[j].name).toLowerCase()
            if(res.indexOf(movieName) != -1){
                newRes.push(shows.results[j])
            }
            }
            displayMovies(newRes)
        }
    })

}


function displayMovies(movies){
    let box=``
    for(let i=0;i<movies.length;i++){
        box+= `<div class="col-lg-4 col-md-6 ">
        <div class="film">
          <div class="layer d-flex align-items-center">
            <div class="content text-center">
              <h2 id="movieTitle" class="fw-light">${checkNotUndefined(movies[i].title,movies[i].name)}</h2>
              <p id="movieOverview" class="fs-normal px-2">${movies[i].overview}</p>
            
              <p id="movieRate">${movies[i].vote_average}</p>
              <p id="movieDate">${checkNotUndefined(movies[i].first_air_date,movies[i].release_date)}</p>
            </div>
          </div>
          <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" id="movieImg" class="img-fluid"/>
        </div>
      </div>`
    }
    $("#filmContainer").html(box)
}

$('.contact input').click(function(e){
    let inputField= e.currentTarget
    if(inputField.value==""){
        $(inputField).next().css("display","block")
    }
})

$(".contact input").keyup(function(e){
    let inputField= e.currentTarget
    let inputFieldValue= inputField.value
    if(($(inputField).attr('id'))=='yourName'){
        inputFieldValue.trim()
        if(!inputFieldValue.replace(/\s/g,'').length){
            $(inputField).next().css('display','block')
        }
        else{
            $(inputField).next().css('display','none')
        }
    }
    else if(($(inputField).attr('id'))=='yourEmail'){
        if(validationEmail(inputFieldValue)==true){
            $(inputField).next().css('display','none')
        }
        else{
            $(inputField).next().css('display','block')
        }
    }

    else if(($(inputField).attr('id'))=='yourPhone'){
        if(validationPhone(inputFieldValue)==true){
            $(inputField).next().css('display','none')
        }
        else{
            $(inputField).next().css('display','block')
        }
    }

    else if(($(inputField).attr('id'))=='yourAge'){
        if(validationAge(inputFieldValue)==true){
            $(inputField).next().css('display','none')
        }
        else{
            $(inputField).next().css('display','block')
        }
    }

    else if(($(inputField).attr('id'))=='yourPass'){
        if(validationPass(inputFieldValue)&& inputFieldValue.length>=8){
            $(inputField).next().css('display','none')
        }
        else{
            $(inputField).next().css('display','block')
        }
    }
    else{
        let yourPass = document.getElementById("YourPass");
        if(inputFieldValue == yourPass.value)
        {
            $(inputField).next().css('display' , 'none');
        }
        else
        {
            $(inputField).next().css('display' , 'block');
        }
    }
})


function validationEmail(email){
    var regex=/^[a-zA-Z0-9.!#$%&'*+/=?^-`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(regex.test(email))
    return true
    else
    return false
}

function validationPhone(Phone){
    var regex=/^(002)?(01)[0-25][0-9]{8}$/
    if(regex.test(Phone))
    return true
    else
    return false
}

function validationAge(Age){
    var regex=/^\d+$/
    if(regex.test(Age))
    return true
    else
    return false
}

function validationPass(pass)
{
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if(regex.test(pass))
        return true;
    else
        return false;
}














//Loading
$(window).ready(function(){
    $("#loading").fadeOut(1000);
    $("#loading").remove();
    $("body").css('overflow' , 'auto');
});