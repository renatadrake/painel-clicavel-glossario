$(document).ready(function () {
  resizeBodyGlossario();
  $(window).resize(resizeBodyGlossario);


  const elementosOcultar = [".tela-inicial-glossario", "#quadrante-01", "#quadrante-02", "#quadrante-03", "#quadrante-04"];
  elementosOcultar.forEach(el => $(el).hide());

  const myModal = new bootstrap.Modal(document.getElementById('modal-capa-glossario'), {
    keyboard: false
  });
  myModal.show();
  $('.btn-capa').click(() => {
    $(".capa").hide();
    $(".tela-inicial-glossario").show();
    myModal.hide();
  });

  function exibirQuadrante(quadranteId) {
    elementosOcultar.forEach(el => $(el).hide());
    $(quadranteId).show();
  }

  const lupas = [".lupa1", ".lupa2", ".lupa3", ".lupa4"];
  lupas.forEach((lupa, index) => {
    $(lupa).click(() => exibirQuadrante(`#quadrante-0${index + 1}`));
  });

  $(".btn-voltar-glosario").click(() => exibirQuadrante(".tela-inicial-glossario"));

  const botoesPopover = ".lupa1, .lupa2, .lupa3, .lupa4, .btn-voltar-glosario, .btn-menu, .btn, .btn-ampliar";
  $(botoesPopover).click(() => $('.btn-ampliar').popover('hide'));


  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));


  const itensClicaveis = [".clicavel-01", ".clicavel-02", ".clicavel-03", ".clicavel-04"];
  itensClicaveis.forEach((item, index) => {
    $(item).click(function () {
      const palavra = $(this).data("palavra");
      $(lupas[index]).click();
      $(palavra).click();
      $("#fechar-menu").click();
    });
  });

  const somClique = new Audio('assets/audio/clique.mp3');
  $(botoesPopover).on('click', function () {
    somClique.play();
  });
  
  function resizeBodyGlossario() {
    const largura = 1920;
    const altura = 1080;

    const larguraScreen = $(window).width();
    const alturaScreen = $(window).height();
    const proporcaoAltura = (alturaScreen * 100) / altura;
    const proporcaoLargura = (larguraScreen * 100) / largura;

    let proporcao;
    if (proporcaoAltura < proporcaoLargura) {
      proporcao = proporcaoAltura / 100;
    } else {
      proporcao = proporcaoLargura / 100;
    }

    $(".conteudo-glossario").css({
      "transform": `scale(${proporcao})`,
      "transform-origin": "center center"
    });
  }
});
