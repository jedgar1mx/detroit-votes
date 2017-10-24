(function(){
  var getData = function getData(URL, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.response);
    };
    xmlHttp.open("GET", URL, true); // true for asynchronous
    xmlHttp.send(null);
  };

  var toggleDisplay = function toggleDisplay(e){
    // console.log(e.target);
    let tempContainer = document.querySelector('.accordion-content[data-id="' + e.target.getAttribute('data-id') + '"]');
    // console.log(tempContainer);
    (tempContainer === null) ? tempContainer = document.querySelector('.accordion-content-1[data-id="' + e.target.getAttribute('data-id') + '"]') : 0;
    // console.log(tempContainer.className);
    switch (true) {
      case tempContainer.className === 'accordion-content-1 active':
        tempContainer.className = 'accordion-content-1';
        break;
      case tempContainer.className === 'accordion-content-1':
        tempContainer.className = 'accordion-content-1 active';
        break;
      case tempContainer.className === 'accordion-content active':
        tempContainer.className = 'accordion-content';
        break;
      case tempContainer.className === 'accordion-content':
        tempContainer.className = 'accordion-content active';
        break;
      case tempContainer.className === 'accordion-content topic active':
        tempContainer.className = 'accordion-content topic';
        break;
      default:
        tempContainer.className = 'accordion-content topic active';
    }
  };

  document.querySelector('.loading').className = 'loading active';
  getData('js/data.json', function(response){
    var data = JSON.parse(response);
    var mayorHTML = '<article class="accordion-btn animated-button victoria-two" data-id="mayor">Candidates for City Mayor</article><article class="accordion-content" data-id="mayor">';
    var clerkHTML = '<article class="accordion-btn animated-button victoria-two" data-id="clerk">Candidates for City Clerk</article><article class="accordion-content" data-id="clerk">';
    var atLargeHTML = '<article class="accordion-btn animated-button victoria-two" data-id="at-large">Candidates for City Council at Large</article><article class="accordion-content" data-id="at-large">';
    var councilOneHTML = '<article class="accordion-btn animated-button victoria-two" data-id="council-1">Candidates for City Council District 1</article><article class="accordion-content" data-id="council-1">';
    var councilTwoHTML = '<article class="accordion-btn animated-button victoria-two" data-id="council-2">Candidates for City Council District 2</article><article class="accordion-content" data-id="council-2">';
    var councilThreeHTML = '<article class="accordion-btn animated-button victoria-two" data-id="council-3">Candidates for City Council District 3</article><article class="accordion-content" data-id="council-3">';
    var councilFourHTML = '<article class="accordion-btn animated-button victoria-two" data-id="council-4">Candidates for City Council District 4</article><article class="accordion-content" data-id="council-4">';
    var councilFiveHTML = '<article class="accordion-btn animated-button victoria-two" data-id="council-5">Candidates for City Council District 5</article><article class="accordion-content" data-id="council-5">';
    var councilSixHTML = '<article class="accordion-btn animated-button victoria-two" data-id="council-6">Candidates for City Council District 6</article><article class="accordion-content" data-id="council-6">';
    var councilSevenHTML = '<article class="accordion-btn animated-button victoria-two" data-id="council-7">Candidates for City Council District 7</article><article class="accordion-content" data-id="council-7">';
    var policeOneHTML = '<article class="accordion-btn animated-button victoria-two" data-id="police-1">Candidates for City Police Commissioner District 1</article><article class="accordion-content" data-id="police-1">';
    var policeTwoHTML = '<article class="accordion-btn animated-button victoria-two" data-id="police-2">Candidates for City Police Commissioner District 2</article><article class="accordion-content" data-id="police-2">';
    var policeThreeHTML = '<article class="accordion-btn animated-button victoria-two" data-id="police-3">Candidates for City Police Commissioner District 3</article><article class="accordion-content" data-id="police-3">';
    var policeFourHTML = '<article class="accordion-btn animated-button victoria-two" data-id="police-4">Candidates for City Police Commissioner District 4</article><article class="accordion-content" data-id="police-4">';
    var policeFiveHTML = '<article class="accordion-btn animated-button victoria-two" data-id="police-5">Candidates for City Police Commissioner District 5</article><article class="accordion-content" data-id="police-5">';
    var policeSixHTML = '<article class="accordion-btn animated-button victoria-two" data-id="police-6">Candidates for City Police Commissioner District 6</article><article class="accordion-content" data-id="police-6">';
    var policeSevenHTML = '<article class="accordion-btn animated-button victoria-two" data-id="police-7">Candidates for City Police Commissioner District 7</article><article class="accordion-content" data-id="police-7">';
    data.candidates.forEach(function(candidate, candidateIndex){
      switch (candidate.race) {
        case 'Mayor':
          mayorHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.mayor.forEach(function(question, questionIndex) {
            mayorHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          mayorHTML += '</div>';
          break;
        case 'City Clerk':
          clerkHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityClerk.forEach(function(question, questionIndex) {
            clerkHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p>'+ candidate.answers[questionIndex] +'</article></article>';
          });

          clerkHTML += '</div>';
          break;
        case 'City Council - At Large':
          atLargeHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            atLargeHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          atLargeHTML += '</div>';
          break;
        case 'City Council - District 1':
          councilOneHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            councilOneHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          councilOneHTML += '</div>';
          break;
        case 'City Council - District 2':
          councilTwoHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            councilTwoHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          councilTwoHTML += '</div>';
          break;
        case 'City Council - District 3':
          councilThreeHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            councilThreeHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          councilThreeHTML += '</div>';
          break;
        case 'City Council - District 4':
          councilFourHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            councilFourHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          councilFourHTML += '</div>';
          break;
        case 'City Council - District 5':
          councilFiveHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            councilFiveHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          councilFiveHTML += '</div>';
          break;
        case 'City Council - District 6':
          councilSixHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            councilSixHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          councilSixHTML += '</div>';
          break;
        case 'City Council - District 7':
          councilSevenHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            councilSevenHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          councilSevenHTML += '</div>';
          break;
        case 'Police Commissioner - District 1':
          policeOneHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.policeCommissioner.forEach(function(question, questionIndex) {
            policeOneHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          policeOneHTML += '</div>';
          break;
        case 'Police Commissioner - District 2':
          policeTwoHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.policeCommissioner.forEach(function(question, questionIndex) {
            policeTwoHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          policeTwoHTML += '</div>';
          break;
        case 'Police Commissioner - District 3':
          policeThreeHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.policeCommissioner.forEach(function(question, questionIndex) {
            policeThreeHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          policeThreeHTML += '</div>';
          break;
        case 'Police Commissioner - District 4':
          policeFourHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.policeCommissioner.forEach(function(question, questionIndex) {
            policeFourHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          policeFourHTML += '</div>';
          break;
        case 'Police Commissioner - District 5':
          policeFiveHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.policeCommissioner.forEach(function(question, questionIndex) {
            policeFiveHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          policeFiveHTML += '</div>';
          break;
        case 'Police Commissioner - District 6':
          policeSixHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.policeCommissioner.forEach(function(question, questionIndex) {
            policeSixHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          policeSixHTML += '</div>';
          break;
        case 'Police Commissioner - District 7':
          policeSevenHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.policeCommissioner.forEach(function(question, questionIndex) {
            policeSevenHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          policeSevenHTML += '</div>';
          break;
        default:

      }
    });
    document.getElementById('mayor').innerHTML = mayorHTML;
    document.getElementById('city-clerk').innerHTML = clerkHTML;
    document.getElementById('at-large').innerHTML = atLargeHTML;
    document.getElementById('council-1').innerHTML = councilOneHTML;
    document.getElementById('council-2').innerHTML = councilTwoHTML;
    document.getElementById('council-3').innerHTML = councilThreeHTML;
    document.getElementById('council-4').innerHTML = councilFourHTML;
    document.getElementById('council-5').innerHTML = councilFiveHTML;
    document.getElementById('council-6').innerHTML = councilSixHTML;
    document.getElementById('council-7').innerHTML = councilSevenHTML;
    document.getElementById('police-1').innerHTML = policeOneHTML;
    document.getElementById('police-2').innerHTML = policeTwoHTML;
    document.getElementById('police-3').innerHTML = policeThreeHTML;
    document.getElementById('police-4').innerHTML = policeFourHTML;
    document.getElementById('police-5').innerHTML = policeFiveHTML;
    document.getElementById('police-6').innerHTML = policeSixHTML;
    document.getElementById('police-7').innerHTML = policeSevenHTML;
    var sectionBtns = document.querySelectorAll('.accordion-btn');
    // console.log(sectionBtns);
    sectionBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e){
        // console.log(e);
        toggleDisplay(e);
      });
    });
    document.querySelector('.loading').className = 'loading';
    document.querySelector('.search-results').className = 'search-results active';
  });
})(window);
