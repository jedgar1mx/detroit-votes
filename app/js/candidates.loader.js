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
    Map.setToggleStatus(true);
    console.log(e.target);
    let tempContainer = document.querySelector('.accordion-content[data-id="' + e.target.getAttribute('data-id') + '"]');
    console.log(tempContainer);
    (tempContainer === null) ? tempContainer = document.querySelector('.accordion-content-1[data-id="' + e.target.getAttribute('data-id') + '"]') : 0;
    console.log(tempContainer.className);
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
    var councilHTML = '<article class="accordion-btn animated-button victoria-two" data-id="council">Candidates for City Council District 1</article><article class="accordion-content" data-id="council">';
    var policeHTML = '<article class="accordion-btn animated-button victoria-two" data-id="police">Candidates for City Police Commissioner District 1</article><article class="accordion-content" data-id="police">';
    console.log(data);
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
          councilHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.cityCouncil.forEach(function(question, questionIndex) {
            councilHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          councilHTML += '</div>';
          break;
        case 'Police Commissioner - District 1':
          policeHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

          data.questions.policeCommissioner.forEach(function(question, questionIndex) {
            policeHTML += '<article class="accordion-btn topic animated-button victoria-two" data-id="'+ candidateIndex +'-'+ questionIndex +'">'+ question.topic +'</article><article class="accordion-content topic" data-id="'+ candidateIndex +'-'+ questionIndex +'"><article class="question"><p>'+ question.q +'</p><p>'+ candidate.answers[questionIndex] +'</p></article></article>';
          });

          policeHTML += '</div>';
          break;
        default:

      }
      var sectionBtns = document.querySelectorAll('.accordion-btn');
      console.log(sectionBtns);
      sectionBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e){
          console.log(e);
          toggleDisplay(e);
        });
      });
      document.getElementById('mayor').innerHTML = mayorHTML;
      document.getElementById('city-clerk').innerHTML = clerkHTML;
      document.getElementById('at-large').innerHTML = atLargeHTML;
      document.getElementById('council-1').innerHTML = councilHTML;
      document.getElementById('police-1').innerHTML = policeHTML;
      document.querySelector('.loading').className = 'loading';
      document.querySelector('.search-results').className = 'search-results active';
    });
  });
})(window);
