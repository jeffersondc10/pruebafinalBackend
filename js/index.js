/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

/*
Mostrar todo
*/

function mostrarTodos(datos){
  $.each(datos, function(indice,elemento){
    var insertar = "<div class = 'itemMostrado'><img src = './img/home.jpg' alt = 'home' height = '400px'/><div class='card-stacked'><b>Dirección:</b>"+ elemento.Direccion + "<div class = 'card-action'>Ver mas</div></div></div>"
    $(".colContenido").append(insertar);
  })
}

function extraerDatos(){
  $.ajax({
    url: "./data-1.json",
    type: "post",
    success: function(datos){
      mostrarTodos(datos)
    }
  })
}

$("#mostrarTodos").click(function(){
  extraerDatos();
})

/**************************
Seleccionar ciudad
**************************/
$("#selectCiudad").show();
function seleccionarCiudad(){
  var ciudad = "<option value='New York'>New York</option><option value='Orlando'>Orlando</option><option value='Los Angeles'>Los Angeles</option><option value='Houston'>Houston</option><option value='Washington'>Washington</option><option value='Miami'>Miami</option>"

  $("#selectCiudad").append(ciudad);
}
seleccionarCiudad()
function mostrarFiltroCiudad(datos){

  $.each(datos,function(indice,elemento){

    if (elemento.Ciudad) == $("#selectCiudad").val()){
      var insertar = "<div class = 'itemMostrado'><img src = './img/home.jpg' alt = 'home' height = '400px'/><div class='card-stacked'><b>Dirección:</b>"+ elemento.Direccion+ elemento.Ciudad+ elemento.Telefono + elemento.Codigo_Postal + elemento.Tipo + elemento.Precio + "<div class = 'card-action'>Ver mas</div></div></div>"
      $(".colContenido").append(insertar);
    }
  })
}
$("#selectCiudad").change(function(){
  $.ajax({
    url: "./data-1.json",
    type: "post",
    sucess: function(datos){
      mostrarFiltroCiudad(datos)
    }
  })
})


/*function filtroCiudad(datos){

  selectCiudad = $("#selectCiudad").val();
  if (selectCiudad != 0) {
    switch (selectCiudad) {
      case 1:

        break;
      default:

    }
  }
}*/
